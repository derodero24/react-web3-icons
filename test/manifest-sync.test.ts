import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  compareStrings,
  loadCategory,
  type SourceUnit,
} from '../scripts/build-icons/lib.ts';
import {
  type ArtworkUnitMeta,
  isArtwork,
} from '../scripts/build-icons/unit.ts';
import * as bridge from '../src/bridge';
import * as chain from '../src/chain';
import * as coin from '../src/coin';
import * as defi from '../src/defi';
import { DEPRECATED_ICON_NAMES } from '../src/deprecated';
import * as devtool from '../src/devtool';
import * as dex from '../src/dex';
import * as domain from '../src/domain';
import * as exchange from '../src/exchange';
import * as explorer from '../src/explorer';
import { ICON_MANIFEST, type IconManifestEntry } from '../src/manifest';
import * as marketplace from '../src/marketplace';
import * as meta from '../src/meta';
import * as node from '../src/node';
import * as oracle from '../src/oracle';
import * as portfolio from '../src/portfolio';
import * as storage from '../src/storage';
import * as tracker from '../src/tracker';
import * as wallet from '../src/wallet';

const CATEGORY_MODULES = {
  bridge,
  chain,
  coin,
  defi,
  devtool,
  dex,
  domain,
  exchange,
  explorer,
  marketplace,
  node,
  oracle,
  portfolio,
  storage,
  tracker,
  wallet,
} as const;

const FORWARD_REF = Symbol.for('react.forward_ref');

function invert(map: Record<string, string>): Map<string, number | string> {
  const out = new Map<string, number | string>();
  for (const [key, name] of Object.entries(map)) {
    if (!out.has(name)) {
      out.set(name, /^\d+$/.test(key) ? Number(key) : key);
    }
  }
  return out;
}

const ID_LOOKUPS: Partial<
  Record<
    keyof typeof CATEGORY_MODULES,
    Partial<Record<'chainId' | 'slug' | 'ticker', Map<string, number | string>>>
  >
> = {
  chain: {
    chainId: invert(meta.CHAIN_ID_TO_NAME),
    slug: invert(meta.CHAIN_SLUG_TO_NAME),
  },
  coin: { ticker: invert(meta.TICKER_TO_COIN) },
  wallet: { slug: invert(meta.WALLET_SLUG_TO_NAME) },
  exchange: { slug: invert(meta.EXCHANGE_SLUG_TO_NAME) },
  defi: { slug: invert(meta.DEFI_SLUG_TO_NAME) },
  dex: { slug: invert(meta.DEX_SLUG_TO_NAME) },
  bridge: { slug: invert(meta.BRIDGE_SLUG_TO_NAME) },
  oracle: { slug: invert(meta.ORACLE_SLUG_TO_NAME) },
};

interface MutableEntry {
  name: string;
  category: IconManifestEntry['category'];
  chainId?: number;
  slug?: string;
  ticker?: string;
  deprecated?: true;
}

function deriveEntry(
  name: string,
  category: keyof typeof CATEGORY_MODULES,
): IconManifestEntry {
  const entry: MutableEntry = { name, category };
  const lookups = ID_LOOKUPS[category];
  for (const [field, byName] of Object.entries(lookups ?? {})) {
    const id = byName.get(name);
    if (id !== undefined) {
      if (field === 'chainId') {
        entry.chainId = id as number;
      } else if (field === 'slug') {
        entry.slug = id as string;
      } else {
        entry.ticker = id as string;
      }
    }
  }
  if (DEPRECATED_ICON_NAMES.has(name)) {
    entry.deprecated = true;
  }
  return entry;
}

/** Same derivation as scripts/generate-manifest.ts, but from src modules. */
function deriveExpected(): IconManifestEntry[] {
  const entries: IconManifestEntry[] = [];
  for (const [category, mod] of Object.entries(CATEGORY_MODULES)) {
    for (const [name, value] of Object.entries(mod)) {
      if ((value as { $$typeof?: symbol } | null)?.$$typeof === FORWARD_REF) {
        entries.push(
          deriveEntry(name, category as keyof typeof CATEGORY_MODULES),
        );
      }
    }
  }
  entries.sort(
    (a, b) =>
      compareStrings(a.category, b.category) || compareStrings(a.name, b.name),
  );
  return entries;
}

function baseProjection(entry: IconManifestEntry): IconManifestEntry {
  const { variants, aliases, brandColor, ...base } =
    entry as IconManifestEntry & {
      variants?: readonly string[];
      aliases?: readonly string[];
      brandColor?: string;
    };
  return base;
}

/**
 * True when the unit's colored default artwork (the `""` variant, or the
 * variant behind a `""` local alias) declares at least one hex colour, i.e.
 * when the generator must have been able to derive a `brandColor`.
 */
function defaultArtworkHasHexColor({ meta, variants }: SourceUnit): boolean {
  if (!isArtwork(meta)) {
    return false;
  }
  const aliasTarget = (meta.localAliases ?? []).find(
    a => !a.deprecated && a.name === meta.name,
  )?.target;
  const suffix =
    '' in meta.variants
      ? ''
      : aliasTarget?.startsWith(meta.name)
        ? aliasTarget.slice(meta.name.length)
        : undefined;
  const svg = variants.find(v => v.suffix === suffix)?.svg;
  if (svg === undefined) {
    return false;
  }
  // Mirror the generator: white (#fff / #ffffff) never counts as a brand colour.
  return [...svg.matchAll(/(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,8})"/g)]
    .map(m => m[1]?.toLowerCase() ?? '')
    .some(hex => !/^#(?:fff|ffffff)(?:[0-9a-f]{2})?$/.test(hex));
}

/** Same variant derivation as scripts/generate-manifest.ts. */
function expectedVariants(unit: SourceUnit | undefined): string[] {
  if (!(unit && isArtwork(unit.meta))) {
    return [];
  }
  const { meta } = unit;
  const aliasSuffixes = (meta.localAliases ?? [])
    .filter(
      a =>
        !a.deprecated &&
        a.name.startsWith(meta.name) &&
        a.target.startsWith(meta.name) &&
        a.target.slice(meta.name.length) in meta.variants,
    )
    .map(a => a.name.slice(meta.name.length));
  return [...aliasSuffixes, ...Object.keys(meta.variants)];
}

function artworkOf(unit: SourceUnit | undefined): ArtworkUnitMeta | undefined {
  return unit && isArtwork(unit.meta) ? unit.meta : undefined;
}

function loadIconUnits(): Map<string, SourceUnit> {
  const iconsDir = join(import.meta.dirname, '../icons');
  return new Map(
    CATEGORIES.flatMap(category => loadCategory(iconsDir, category)).map(
      unit => [`${unit.category}/${unit.meta.name}`, unit],
    ),
  );
}

/** Variant suffixes whose `name + suffix` is not a component export. */
function missingVariantExports(
  entry: IconManifestEntry,
  variants: readonly string[],
): string[] {
  const mod = CATEGORY_MODULES[entry.category] as Record<string, unknown>;
  return variants.filter(suffix => {
    const exported = mod[entry.name + suffix] as
      | { $$typeof?: symbol }
      | undefined;
    return exported?.$$typeof !== FORWARD_REF;
  });
}

/** Why an entry's `brandColor` is wrong, or undefined when it is fine. */
function brandColorProblem(
  entry: IconManifestEntry,
  unit: SourceUnit | undefined,
): string | undefined {
  if (entry.brandColor) {
    return /^#[0-9a-f]{6}$/.test(entry.brandColor)
      ? undefined
      : `brandColor ${entry.brandColor} is not #rrggbb`;
  }
  if (entry.variants && unit && defaultArtworkHasHexColor(unit)) {
    return 'default artwork declares hex colours but no brandColor was derived';
  }
  return undefined;
}

describe('Icon manifest sync', () => {
  // Fails when icons, meta maps, or deprecations change without running:
  //   pnpm run build && pnpm run generate-manifest
  it('src/manifest/index.ts matches the actual category exports', () => {
    expect(ICON_MANIFEST.map(baseProjection)).toEqual(deriveExpected());
  });

  it('enrichment fields match the icons/ unit definitions', () => {
    const unitByKey = loadIconUnits();
    for (const entry of ICON_MANIFEST) {
      const unit = unitByKey.get(`${entry.category}/${entry.name}`);
      const artwork = artworkOf(unit);
      // Guard on the unit too, so a manifest entry that dropped `variants`
      // entirely fails instead of being skipped.
      if (artwork || entry.variants) {
        expect(entry.variants ?? [], `${entry.name} variants`).toEqual(
          expectedVariants(unit),
        );
        expect(
          missingVariantExports(entry, entry.variants ?? []),
          `${entry.name} variants must all be exports`,
        ).toEqual([]);
      }
      if (entry.aliases) {
        expect(entry.aliases, `${entry.name} aliases`).toEqual(
          artwork?.aliases ?? [],
        );
      }
      expect(brandColorProblem(entry, unit), entry.name).toBeUndefined();
    }
  });

  it('has no duplicate name+category pairs', () => {
    const keys = ICON_MANIFEST.map(e => `${e.category}/${e.name}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
