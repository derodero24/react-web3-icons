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

type IdField = 'chainId' | 'slug' | 'ticker';

/** The meta maps behind each manifest identifier field. */
const ID_MAPS: Partial<
  Record<
    keyof typeof CATEGORY_MODULES,
    Partial<Record<IdField, Readonly<Record<string, string>>>>
  >
> = {
  chain: { chainId: meta.CHAIN_ID_TO_NAME, slug: meta.CHAIN_SLUG_TO_NAME },
  coin: { ticker: meta.TICKER_TO_COIN },
  wallet: { slug: meta.WALLET_SLUG_TO_NAME },
  exchange: { slug: meta.EXCHANGE_SLUG_TO_NAME },
  defi: { slug: meta.DEFI_SLUG_TO_NAME },
  dex: { slug: meta.DEX_SLUG_TO_NAME },
  bridge: { slug: meta.BRIDGE_SLUG_TO_NAME },
  oracle: { slug: meta.ORACLE_SLUG_TO_NAME },
};

function deriveEntry(
  name: string,
  category: keyof typeof CATEGORY_MODULES,
): IconManifestEntry {
  return {
    name,
    category,
    ...(DEPRECATED_ICON_NAMES.has(name) ? { deprecated: true } : {}),
  };
}

/** Same derivation as scripts/build-icons/manifest.ts, but from src modules. */
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

/** The entry without the fields derived from lookup keys and artwork. */
function baseProjection({
  name,
  category,
  deprecated,
}: IconManifestEntry): IconManifestEntry {
  return { name, category, ...(deprecated ? { deprecated } : {}) };
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

/** Same variant derivation as scripts/build-icons/manifest.ts. */
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
  //   pnpm run generate-manifest
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

  it('identifier fields are lookup keys of their entry, and every target has one', () => {
    for (const entry of ICON_MANIFEST) {
      for (const field of ['chainId', 'slug', 'ticker'] as const) {
        const map = ID_MAPS[entry.category]?.[field];
        if (map === undefined) {
          continue;
        }
        const id = entry[field];
        const label = `${entry.category}/${entry.name} ${field}`;
        if (id === undefined) {
          expect(Object.values(map), label).not.toContain(entry.name);
        } else {
          expect(map[String(id)], label).toBe(entry.name);
        }
      }
    }
  });

  it('has no duplicate name+category pairs', () => {
    const keys = ICON_MANIFEST.map(e => `${e.category}/${e.name}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  // A name may appear in several categories only as a re-export of one
  // artwork (coin `Kaia` → chain `Kaia`), never as different artwork under
  // one name (the former coin/oracle `Pyth` pair, #810), so `name` is a
  // unique key for a component — and for `import { name }` from the root.
  it('each name identifies exactly one component', () => {
    const byName = new Map<string, IconManifestEntry[]>();
    for (const entry of ICON_MANIFEST) {
      byName.set(entry.name, [...(byName.get(entry.name) ?? []), entry]);
    }
    for (const [name, entries] of byName) {
      const components = new Set(
        entries.map(entry =>
          new Map<string, unknown>(
            Object.entries(CATEGORY_MODULES[entry.category]),
          ).get(name),
        ),
      );
      expect(components.size, name).toBe(1);
      expect(
        entries.filter(entry => entry.variants).length,
        `${name} artwork entries`,
      ).toBeLessThanOrEqual(1);
    }
  });
});
