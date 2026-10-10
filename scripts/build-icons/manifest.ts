/**
 * The icon manifest (`src/manifest/index.ts`, `dist/manifest.json`), derived
 * from the `icons/` units alone — artwork, lookup keys and deprecations — so
 * it never depends on a previous build.
 */

import { quote } from './jsx.ts';
import {
  CATEGORIES,
  type Category,
  compareStrings,
  type SourceUnit,
  unitAllExportNames,
} from './lib.ts';
import { deprecatedExports, type PrimaryIds, primaryIds } from './meta.ts';
import { type ArtworkUnitMeta, isArtwork } from './unit.ts';

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
  Readonly<PrimaryIds>;

/** `#rgb`, `#rrggbb` or `#rrggbbaa` → lowercase `#rrggbb`. */
function normalizeHex(color: string): string {
  const hex = color.toLowerCase();
  if (hex.length === 4 || hex.length === 5) {
    const [, r, g, b] = hex;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return hex.slice(0, 7);
}

/**
 * Whether a colour carries no hue a consumer could theme with: greys and
 * tinted greys (channel spread below 32/255), near-black (no channel above
 * 48/255) and near-white (no channel below 224/255).
 */
export function isNeutralColor(hex: string): boolean {
  const channels = [1, 3, 5].map(i => Number.parseInt(hex.slice(i, i + 2), 16));
  const max = Math.max(...channels);
  const min = Math.min(...channels);
  return max - min < 32 || max < 48 || min > 224;
}

/**
 * Brand color of a colored SVG, by frequency of the fill/stroke/stop-color
 * hex values: the most frequent non-neutral color (see
 * {@link isNeutralColor}), or — for artwork with nothing but neutrals — the
 * most frequent neutral other than pure white. A heuristic: badge-style
 * marks whose container dominates still pick their accent, and a unit's
 * `brandColor` overrides it where it still misses the brand.
 */
export function extractBrandColor(svgText: string): string | undefined {
  const counts = new Map<string, number>();
  for (const [, color = ''] of svgText.matchAll(
    /(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,8})"/g,
  )) {
    const hex = normalizeHex(color);
    if (hex !== '#ffffff') {
      counts.set(hex, (counts.get(hex) ?? 0) + 1);
    }
  }
  // Stable sort: ties keep the order of first appearance.
  const byFrequency = [...counts].sort(([, a], [, b]) => b - a);
  const [first] = byFrequency.find(([hex]) => !isNeutralColor(hex)) ??
    byFrequency[0] ?? [undefined];
  return first;
}

/**
 * Non-deprecated `localAliases` entries that point at one of the unit's own
 * variants, i.e. extra export suffixes of the unit (`DogeCircle` → `Doge`
 * yields `'Circle'`).
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

/** Orders the colored default and its mono first; the rest keep their order. */
function variantRank(suffix: string): number {
  return suffix === '' ? 0 : suffix === 'Mono' ? 1 : 2;
}

function enrichmentOf({ meta: unitMeta, variants }: SourceUnit): Enrichment {
  if (!isArtwork(unitMeta)) {
    return {};
  }
  // Units may expose variants through `localAliases` (e.g. DogeCircle →
  // Doge), even their default export (Foo → FooSquare) instead of a `""`
  // variant; those aliases are variants of the unit as far as consumers go.
  const aliasVariants = localAliasVariants(unitMeta);
  const svgBySuffix = new Map(variants.map(v => [v.suffix, v.svg]));
  const defaultSuffix = svgBySuffix.has('')
    ? ''
    : aliasVariants.find(v => v.suffix === '')?.target;
  const defaultSvg =
    defaultSuffix === undefined ? undefined : svgBySuffix.get(defaultSuffix);
  const brandColor =
    unitMeta.brandColor ??
    (defaultSvg === undefined ? undefined : extractBrandColor(defaultSvg));
  const own = [
    ...aliasVariants.map(v => v.suffix),
    ...variants.map(v => v.suffix),
  ];
  // An artwork unit may also re-export some of its variants from another
  // unit (Bnb draws Bnb/BnbMono and re-exports BnbCircle/BnbCircleMono);
  // those suffixes are variants of the unit too.
  const reexported = (unitMeta.reexport?.exports ?? []).flatMap(({ as }) =>
    as.startsWith(unitMeta.name) ? [as.slice(unitMeta.name.length)] : [],
  );
  return {
    variants:
      reexported.length > 0
        ? [...new Set([...own, ...reexported])].sort(
            (a, b) => variantRank(a) - variantRank(b),
          )
        : own,
    ...(unitMeta.aliases?.length ? { aliases: unitMeta.aliases } : {}),
    ...(brandColor ? { brandColor } : {}),
  };
}

/** One entry per exported icon component, sorted by category and name. */
export function buildManifest(units: readonly SourceUnit[]): ManifestEntry[] {
  const entries = units.flatMap(unit => {
    const ids = primaryIds(unit);
    const deprecated = new Set(deprecatedExports(unit));
    const enrichment = enrichmentOf(unit);
    return unitAllExportNames(unit).map(
      (name): ManifestEntry => ({
        name,
        category: unit.category,
        ...ids.get(name),
        ...(deprecated.has(name) ? { deprecated: true } : {}),
        ...(name === unit.meta.name ? enrichment : {}),
      }),
    );
  });
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
  return `// Auto-generated by scripts/build-icons/cli.ts from icons/<category>/<slug>.json
// — do not edit manually. Regenerate: pnpm run generate-icons

/** Icon category, mirroring the package subpaths. */
export type IconCategory =
${CATEGORIES.map(c => `  | ${quote(c)}`).join('\n')};

/** One exported icon component, as listed in the manifest. */
export interface IconManifestEntry {
  /** Export name of the component (e.g. \`'Ethereum'\`, \`'EthereumMono'\`). */
  readonly name: string;
  /** Category subpath the component is exported from. */
  readonly category: IconCategory;
  /** EVM chain ID, present on chain icons registered in \`CHAIN_ID_TO_NAME\` (the primary one when it has several). */
  readonly chainId?: number;
  /** Lowercased slug, present when the icon is registered in a slug map (the primary one when it has several). */
  readonly slug?: string;
  /** Uppercase ticker symbol, present on coins registered in \`TICKER_TO_COIN\` (the primary one when it has several). */
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
  /**
   * Brand color as a \`#rrggbb\` hex: the most frequent non-neutral color of
   * the colored artwork (a heuristic; greys, near-black and near-white count
   * only when the artwork has nothing else), or a curated override. Base
   * entries only.
   */
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
