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
