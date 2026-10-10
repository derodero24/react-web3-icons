import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, expectTypeOf, it } from 'vitest';
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
import {
  ICON_MANIFEST,
  type IconManifestEntry,
  type IconManifestName,
} from '../src/manifest';
import * as marketplace from '../src/marketplace';
import * as meta from '../src/meta';
import * as node from '../src/node';
import * as oracle from '../src/oracle';
import * as portfolio from '../src/portfolio';
import * as storage from '../src/storage';
import * as tracker from '../src/tracker';
import type { IconName } from '../src/utils';
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
  name: IconName,
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
          // A component export of a category module is an icon name.
          deriveEntry(
            name as IconName,
            category as keyof typeof CATEGORY_MODULES,
          ),
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

/** Export names `react-web3-icons/meta` resolves to, as `category/name`. */
function metaTargets(): Set<string> {
  return new Set(
    Object.entries(ID_MAPS).flatMap(([category, maps]) =>
      Object.values(maps).flatMap(map =>
        Object.values(map).map(name => `${category}/${name}`),
      ),
    ),
  );
}

/**
 * The variants of every icon, by `category/name`, derived from the
 * generated modules rather than by the generator's code. The icons of a
 * unit are its base export and the exports a meta map resolves to
 * (`ArbitrumNova`); a deprecated alias unit has none. Each export of the
 * unit's module belongs to the longest icon name it extends by nothing or a
 * capitalized suffix, and counts unless it is deprecated and the icon is not.
 */
async function expectedVariants(
  units: Iterable<SourceUnit>,
): Promise<Map<string, string[]>> {
  const targets = metaTargets();
  const variants = new Map<string, string[]>();
  for (const unit of units) {
    const base = unit.meta.name;
    if (!isArtwork(unit.meta) && DEPRECATED_ICON_NAMES.has(base)) {
      continue;
    }
    const exports = Object.keys(
      await import(`../src/${unit.category}/${base}.tsx`),
    );
    const icons = exports.filter(
      name => name === base || targets.has(`${unit.category}/${name}`),
    );
    const iconOf = (name: string): string | undefined =>
      icons
        .filter(
          icon =>
            name.startsWith(icon) &&
            /^(?:[A-Z].*)?$/.test(name.slice(icon.length)),
        )
        .sort((a, b) => b.length - a.length)[0];
    for (const icon of icons) {
      variants.set(
        `${unit.category}/${icon}`,
        exports
          .filter(
            name =>
              iconOf(name) === icon &&
              (DEPRECATED_ICON_NAMES.has(icon) ||
                !DEPRECATED_ICON_NAMES.has(name)),
          )
          .map(name => name.slice(icon.length)),
      );
    }
  }
  return variants;
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

/**
 * Why an entry's `brandColor` is wrong, or undefined when it is fine. Every
 * icon (an entry carrying `variants`) has one: artwork always paints in some
 * colour, if only SVG's default black, and an icon without artwork of its
 * own re-exports one that has (Eth → Ethereum, Ldo → Lido).
 */
function brandColorProblem(entry: IconManifestEntry): string | undefined {
  if (entry.brandColor) {
    return /^#[0-9a-f]{6}$/.test(entry.brandColor)
      ? undefined
      : `brandColor ${entry.brandColor} is not #rrggbb`;
  }
  return entry.variants ? 'an icon has no brandColor' : undefined;
}

/** The component an entry names. */
function componentOf(entry: IconManifestEntry): unknown {
  return new Map<string, unknown>(
    Object.entries(CATEGORY_MODULES[entry.category]),
  ).get(entry.name);
}

describe('Icon manifest sync', () => {
  // Fails when icons/ (artwork, lookup keys, deprecations) change without
  // running: pnpm run generate-icons
  it('src/manifest/index.ts matches the actual category exports', () => {
    expect(ICON_MANIFEST.map(baseProjection)).toEqual(deriveExpected());
  });

  // The manifest spells the names out instead of importing IconName, so its
  // types load without the icon types and @types/react.
  it('IconManifestName is IconName, and the manifest module imports nothing', () => {
    expectTypeOf<IconManifestName>().toEqualTypeOf<IconName>();
    const source = readFileSync(
      join(import.meta.dirname, '../src/manifest/index.ts'),
      'utf8',
    );
    expect(source).not.toMatch(/^(?:import|export .* from) /m);
  });

  it('variants are the exports of each icon, colored and mono first', async () => {
    const expected = await expectedVariants(loadIconUnits().values());
    for (const entry of ICON_MANIFEST) {
      const label = `${entry.category}/${entry.name} variants`;
      const variants = expected.get(`${entry.category}/${entry.name}`);
      if (variants === undefined) {
        expect(entry.variants, label).toBeUndefined();
        continue;
      }
      expect([...(entry.variants ?? [])].sort(compareStrings), label).toEqual(
        variants.sort(compareStrings),
      );
      const first = ['', 'Mono'].filter(s => variants.includes(s));
      expect(entry.variants?.slice(0, first.length), label).toEqual(first);
      expect(
        missingVariantExports(entry, entry.variants ?? []),
        `${label} must all be exports`,
      ).toEqual([]);
    }
  });

  it('a current icon lists no deprecated variant', () => {
    for (const entry of ICON_MANIFEST) {
      if (!entry.deprecated) {
        expect(
          (entry.variants ?? []).filter(suffix =>
            DEPRECATED_ICON_NAMES.has(entry.name + suffix),
          ),
          `${entry.category}/${entry.name}`,
        ).toEqual([]);
      }
    }
  });

  it('every icon a meta map resolves to has variants and a brandColor', () => {
    const targets = metaTargets();
    expect(targets.size).toBeGreaterThan(100);
    for (const target of targets) {
      const entry = ICON_MANIFEST.find(
        e => `${e.category}/${e.name}` === target,
      );
      expect(entry?.variants?.length, `${target} variants`).toBeGreaterThan(0);
      expect(entry?.brandColor, `${target} brandColor`).toBeDefined();
    }
  });

  // Eth renders Ethereum's artwork, so it has Ethereum's colour.
  it('entries of the same component have the same brandColor', () => {
    const byComponent = new Map<unknown, IconManifestEntry>();
    for (const entry of ICON_MANIFEST) {
      if (entry.brandColor) {
        const first = byComponent.get(componentOf(entry));
        if (first) {
          expect(
            entry.brandColor,
            `${entry.category}/${entry.name} like ${first.category}/${first.name}`,
          ).toBe(first.brandColor);
        } else {
          byComponent.set(componentOf(entry), entry);
        }
      }
    }
  });

  it('aliases and brandColor match the icons/ unit definitions', () => {
    const unitByKey = loadIconUnits();
    for (const entry of ICON_MANIFEST) {
      const unit = unitByKey.get(`${entry.category}/${entry.name}`);
      const artwork = artworkOf(unit);
      if (entry.aliases) {
        expect(entry.aliases, `${entry.name} aliases`).toEqual(
          artwork?.aliases ?? [],
        );
      }
      expect(brandColorProblem(entry), entry.name).toBeUndefined();
      if (artwork?.brandColor) {
        expect(entry.brandColor, `${entry.name} override`).toBe(
          artwork.brandColor,
        );
      }
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
    const unitByKey = loadIconUnits();
    const byName = new Map<string, IconManifestEntry[]>();
    for (const entry of ICON_MANIFEST) {
      byName.set(entry.name, [...(byName.get(entry.name) ?? []), entry]);
    }
    for (const [name, entries] of byName) {
      expect(new Set(entries.map(componentOf)).size, name).toBe(1);
      expect(
        entries.filter(entry =>
          artworkOf(unitByKey.get(`${entry.category}/${entry.name}`)),
        ).length,
        `${name} artwork entries`,
      ).toBeLessThanOrEqual(1);
    }
  });
});
