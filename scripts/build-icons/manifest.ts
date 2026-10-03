/**
 * The icon manifest (`src/manifest/index.ts`, `dist/manifest.json`), derived
 * from the sources alone — the `icons/` units plus the hand-maintained
 * identifier maps (`src/meta`) and deprecation list (`src/deprecated.ts`) —
 * so it never depends on a previous build.
 *
 * `buildManifest()` takes those inputs as plain data, so they can move to
 * `icons/` without touching the derivation.
 */

import { DEPRECATED_ICON_NAMES } from '../../src/deprecated.ts';
import * as meta from '../../src/meta/index.ts';
import { quote } from './jsx.ts';
import {
  CATEGORIES,
  type Category,
  compareStrings,
  type SourceUnit,
  unitAllExportNames,
} from './lib.ts';
import { type ArtworkUnitMeta, isArtwork } from './unit.ts';

/** Runtime identifier fields, keyed by export name via the meta maps. */
const ID_FIELDS = ['chainId', 'slug', 'ticker'] as const;
type IdField = (typeof ID_FIELDS)[number];
type IdLookups = Partial<Record<IdField, ReadonlyMap<string, number | string>>>;

/** Per-unit data from icons/ that only base entries carry. */
interface Enrichment {
  readonly variants?: readonly string[];
  readonly aliases?: readonly string[];
  readonly brandColor?: string;
}

export type ManifestEntry = {
  readonly name: string;
  readonly category: Category;
  readonly deprecated?: true;
} & Enrichment &
  Partial<Record<IdField, number | string>>;

export interface ManifestSources {
  /** Units of every category. */
  readonly units: readonly SourceUnit[];
  /** Per category: identifier field → (export name → identifier). */
  readonly idLookups: Partial<Record<Category, IdLookups>>;
  readonly deprecated: ReadonlySet<string>;
}

/** Builds `name → identifier` reverse lookups from a meta map. */
function invert(
  map: Readonly<Record<string, string>>,
): Map<string, number | string> {
  const out = new Map<string, number | string>();
  for (const [key, name] of Object.entries(map)) {
    if (!out.has(name)) {
      out.set(name, /^\d+$/.test(key) ? Number(key) : key);
    }
  }
  return out;
}

/** The manifest inputs that live outside `icons/` (src/meta, src/deprecated). */
export function sourceLookups(): Omit<ManifestSources, 'units'> {
  return {
    idLookups: {
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
    },
    deprecated: DEPRECATED_ICON_NAMES,
  };
}

/**
 * Dominant brand color of a colored SVG: the most frequent fill/stroke/
 * stop-color hex value, ignoring white and non-color values.
 */
function extractBrandColor(svgText: string): string | undefined {
  const counts = new Map<string, number>();
  for (const [, color = ''] of svgText.matchAll(
    /(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,8})"/g,
  )) {
    let hex = color.toLowerCase();
    if (hex.length === 4) {
      const [, r, g, b] = hex;
      hex = `#${r}${r}${g}${g}${b}${b}`;
    }
    hex = hex.slice(0, 7);
    if (hex === '#ffffff') {
      continue;
    }
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  let best: string | undefined;
  let bestCount = 0;
  for (const [hex, count] of counts) {
    if (count > bestCount) {
      best = hex;
      bestCount = count;
    }
  }
  return best;
}

/**
 * Non-deprecated `localAliases` entries that point at one of the unit's own
 * variants, i.e. extra export suffixes of the unit (`TrustWallet` →
 * `TrustWalletSquare` yields `''`).
 */
function localAliasVariants(
  unitMeta: ArtworkUnitMeta,
): { suffix: string; target: string }[] {
  return (unitMeta.localAliases ?? []).flatMap(alias => {
    if (
      alias.deprecated ||
      !alias.name.startsWith(unitMeta.name) ||
      !alias.target.startsWith(unitMeta.name)
    ) {
      return [];
    }
    const target = alias.target.slice(unitMeta.name.length);
    if (!unitMeta.variants[target]) {
      return [];
    }
    return [{ suffix: alias.name.slice(unitMeta.name.length), target }];
  });
}

function enrichmentOf({ meta: unitMeta, variants }: SourceUnit): Enrichment {
  if (!isArtwork(unitMeta)) {
    return {};
  }
  // Units may expose their default export through `localAliases`
  // (e.g. TrustWallet → TrustWalletSquare) instead of a `""` variant;
  // those aliases are variants of the unit as far as consumers go.
  const aliasVariants = localAliasVariants(unitMeta);
  const svgBySuffix = new Map(variants.map(v => [v.suffix, v.svg]));
  const defaultSuffix = svgBySuffix.has('')
    ? ''
    : aliasVariants.find(v => v.suffix === '')?.target;
  const defaultSvg =
    defaultSuffix === undefined ? undefined : svgBySuffix.get(defaultSuffix);
  const brandColor =
    defaultSvg === undefined ? undefined : extractBrandColor(defaultSvg);
  return {
    variants: [
      ...aliasVariants.map(v => v.suffix),
      ...variants.map(v => v.suffix),
    ],
    ...(unitMeta.aliases?.length ? { aliases: unitMeta.aliases } : {}),
    ...(brandColor ? { brandColor } : {}),
  };
}

/** The identifier fields registered for `name` in its category's maps. */
function idsOf(
  lookups: IdLookups | undefined,
  name: string,
): Partial<Record<IdField, number | string>> {
  const ids: { [F in IdField]?: number | string } = {};
  for (const idField of ID_FIELDS) {
    const id = lookups?.[idField]?.get(name);
    if (id !== undefined) {
      ids[idField] = id;
    }
  }
  return ids;
}

/** One entry per exported icon component, sorted by category and name. */
export function buildManifest(sources: ManifestSources): ManifestEntry[] {
  // `${category}/${unit name}` → enrichment of that unit's base entry
  const enrichment = new Map(
    sources.units.map(unit => [
      `${unit.category}/${unit.meta.name}`,
      enrichmentOf(unit),
    ]),
  );
  const entries = sources.units.flatMap(unit =>
    unitAllExportNames(unit).map(
      (name): ManifestEntry => ({
        name,
        category: unit.category,
        ...idsOf(sources.idLookups[unit.category], name),
        ...(sources.deprecated.has(name) ? { deprecated: true } : {}),
        ...enrichment.get(`${unit.category}/${name}`),
      }),
    ),
  );
  return entries.sort(
    (a, b) =>
      compareStrings(a.category, b.category) || compareStrings(a.name, b.name),
  );
}

function renderEntry(e: ManifestEntry): string {
  const fields = [`name: ${quote(e.name)}`, `category: ${quote(e.category)}`];
  if (e.chainId !== undefined) {
    fields.push(`chainId: ${e.chainId}`);
  }
  if (e.slug !== undefined) {
    fields.push(`slug: ${quote(String(e.slug))}`);
  }
  if (e.ticker !== undefined) {
    fields.push(`ticker: ${quote(String(e.ticker))}`);
  }
  if (e.deprecated) {
    fields.push('deprecated: true');
  }
  if (e.variants) {
    fields.push(`variants: [${e.variants.map(quote).join(', ')}]`);
  }
  if (e.aliases) {
    fields.push(`aliases: [${e.aliases.map(quote).join(', ')}]`);
  }
  if (e.brandColor) {
    fields.push(`brandColor: ${quote(e.brandColor)}`);
  }
  return `  { ${fields.join(', ')} },`;
}

/** Source of `src/manifest/index.ts` (before Biome formatting). */
export function renderManifestModule(
  entries: readonly ManifestEntry[],
): string {
  return `// Auto-generated by scripts/generate-manifest.ts — do not edit manually.
// Regenerate after adding or renaming icons:
//   pnpm run generate-manifest

/** Icon category, mirroring the package subpaths. */
export type IconCategory =
${CATEGORIES.map(c => `  | ${quote(c)}`).join('\n')};

/** One exported icon component, as listed in the manifest. */
export interface IconManifestEntry {
  /** Export name of the component (e.g. \`'Ethereum'\`, \`'EthereumMono'\`). */
  readonly name: string;
  /** Category subpath the component is exported from. */
  readonly category: IconCategory;
  /** EVM chain ID, present on chain icons registered in \`CHAIN_ID_TO_NAME\`. */
  readonly chainId?: number;
  /** Lowercased slug, present when the icon is registered in a slug map. */
  readonly slug?: string;
  /** Uppercase ticker symbol, present on coins registered in \`TICKER_TO_COIN\`. */
  readonly ticker?: string;
  /** Set when the export is a deprecated alias kept for backward compatibility. */
  readonly deprecated?: true;
  /**
   * Variant suffixes available for this base icon (\`''\` is the colored
   * default). Present only on base entries of artwork units.
   */
  readonly variants?: readonly string[];
  /** Extra lowercase search terms (e.g. \`'btc'\` on \`Bitcoin\`). Base entries only. */
  readonly aliases?: readonly string[];
  /** Dominant brand color of the colored artwork, as a \`#rrggbb\` hex. Base entries only. */
  readonly brandColor?: string;
}

/**
 * Flat catalog of every exported icon component with its category and
 * runtime identifiers. Useful for building icon pickers, search indexes,
 * and documentation without importing the component bundles.
 */
export const ICON_MANIFEST: readonly IconManifestEntry[] = [
${entries.map(renderEntry).join('\n')}
];
`;
}
