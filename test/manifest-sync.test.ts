import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
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

/** Same derivation as scripts/generate-manifest.mjs, but from src modules. */
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
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
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

interface UnitMeta {
  name: string;
  aliases?: string[];
  variants?: Record<string, { file: string }>;
  localAliases?: { name: string; target: string; deprecated?: boolean }[];
  /** Directory the unit was loaded from (set by loadIconUnits). */
  dir?: string;
}

/**
 * True when the unit's colored default artwork (the `""` variant, or the
 * variant behind a `""` local alias) declares at least one hex colour, i.e.
 * when the generator must have been able to derive a `brandColor`.
 */
function defaultArtworkHasHexColor(unit: UnitMeta): boolean {
  const variants = unit.variants ?? {};
  const aliasTarget = (unit.localAliases ?? []).find(
    a => !a.deprecated && a.name === unit.name,
  )?.target;
  const suffix =
    '' in variants
      ? ''
      : aliasTarget?.startsWith(unit.name)
        ? aliasTarget.slice(unit.name.length)
        : undefined;
  const file = suffix === undefined ? undefined : variants[suffix]?.file;
  if (!(file && unit.dir)) {
    return false;
  }
  const svg = readFileSync(join(unit.dir, file), 'utf-8');
  return /(?:fill|stroke|stop-color)="#/.test(svg);
}

/** Same variant derivation as scripts/generate-manifest.mjs. */
function expectedVariants(unit: UnitMeta | undefined): string[] {
  if (!unit) {
    return [];
  }
  const variants = unit.variants ?? {};
  const aliasSuffixes = (unit.localAliases ?? [])
    .filter(
      a =>
        !a.deprecated &&
        a.name.startsWith(unit.name) &&
        a.target.startsWith(unit.name) &&
        a.target.slice(unit.name.length) in variants,
    )
    .map(a => a.name.slice(unit.name.length));
  return [...aliasSuffixes, ...Object.keys(variants)];
}

function loadIconUnits(): Map<string, UnitMeta> {
  const iconsDir = join(import.meta.dirname, '../icons');
  const unitByKey = new Map<string, UnitMeta>();
  for (const category of readdirSync(iconsDir)) {
    for (const file of readdirSync(join(iconsDir, category))) {
      if (!file.endsWith('.json')) {
        continue;
      }
      const meta = JSON.parse(
        readFileSync(join(iconsDir, category, file), 'utf-8'),
      ) as UnitMeta;
      meta.dir = join(iconsDir, category);
      unitByKey.set(`${category}/${meta.name}`, meta);
    }
  }
  return unitByKey;
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
  unit: UnitMeta | undefined,
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
      if (entry.variants) {
        expect(entry.variants, `${entry.name} variants`).toEqual(
          expectedVariants(unit),
        );
        expect(
          missingVariantExports(entry, entry.variants),
          `${entry.name} variants must all be exports`,
        ).toEqual([]);
      }
      if (entry.aliases) {
        expect(entry.aliases, `${entry.name} aliases`).toEqual(
          unit?.aliases ?? [],
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
