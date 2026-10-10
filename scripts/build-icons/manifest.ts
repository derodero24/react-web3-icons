/**
 * The icon manifest (`src/manifest/index.ts`, `dist/manifest.json`), derived
 * from the `icons/` units alone — artwork, lookup keys and deprecations — so
 * it never depends on a previous build.
 */

import { ownFill } from './isolate.ts';
import { quote } from './jsx.ts';
import {
  CATEGORIES,
  type Category,
  compareStrings,
  type SourceUnit,
  unitAllExportNames,
  unitLinks,
} from './lib.ts';
import { deprecatedExports, type PrimaryIds, primaryIds } from './meta.ts';
import { type ArtworkUnitMeta, isArtwork } from './unit.ts';
import { parseSvg, type XmlNode } from './xml.ts';

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

/** The colour keywords icon sources use, as `#rrggbb`. */
const NAMED_COLORS: ReadonlyMap<string, string> = new Map([
  ['black', '#000000'],
  ['white', '#ffffff'],
]);

/**
 * `#rgb`, `#rrggbb`, `#rrggbbaa` or a keyword of {@link NAMED_COLORS} →
 * lowercase `#rrggbb`.
 */
function normalizeHex(color: string): string {
  const hex = color.toLowerCase();
  const named = NAMED_COLORS.get(hex);
  if (named) {
    return named;
  }
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

/** Shapes that paint their `fill`. */
const FILLED_SHAPES = new Set([
  'circle',
  'ellipse',
  'path',
  'polygon',
  'polyline',
  'rect',
]);

/** Elements whose content is never painted where it stands. */
const UNRENDERED = new Set([
  'clipPath',
  'defs',
  'linearGradient',
  'marker',
  'mask',
  'pattern',
  'radialGradient',
  'symbol',
]);

/**
 * Whether a painted shape under `node` gets SVG's initial fill, black: no
 * `fill` (attribute or `style` declaration) on the shape nor on any ancestor
 * (`inherited` says whether one of `node`'s ancestors sets it).
 */
function paintsInitialFill(node: XmlNode, inherited = false): boolean {
  if (UNRENDERED.has(node.tag)) {
    return false;
  }
  const filled = inherited || ownFill(node) !== undefined;
  if (!filled && FILLED_SHAPES.has(node.tag)) {
    return true;
  }
  return node.children.some(child => paintsInitialFill(child, filled));
}

/**
 * Rewrites each `style` attribute as one attribute per declaration
 * (`style="fill: #F00; opacity: .5"` → ` fill="#F00" opacity=".5"`), in
 * place, so colours set in `style` count like attributes and in document
 * order.
 */
function styleAsAttributes(svgText: string): string {
  return svgText.replace(/\sstyle="([^"]*)"/g, (_, style: string) =>
    style
      .split(';')
      .map(declaration => {
        const colon = declaration.indexOf(':');
        return colon < 0
          ? ''
          : ` ${declaration.slice(0, colon).trim()}="${declaration.slice(colon + 1).trim()}"`;
      })
      .join(''),
  );
}

/**
 * Brand color of a colored SVG, by frequency of the fill/stroke/stop-color
 * values (hex, or the keywords `black` and `white`; as attributes or `style`
 * declarations): the most frequent non-neutral color (see
 * {@link isNeutralColor}), or — for artwork with nothing but neutrals — the
 * most frequent neutral other than pure white.
 * Artwork that names no such colour but paints a shape without any `fill`
 * (Hedera's disc, Linea's square) renders that shape black, SVG's initial
 * fill, and gets `#000000`. A heuristic: badge-style marks whose container
 * dominates still pick their accent, and a unit's `brandColor` overrides it
 * where it still misses the brand.
 */
export function extractBrandColor(svgText: string): string | undefined {
  const counts = new Map<string, number>();
  for (const [, color = ''] of styleAsAttributes(svgText).matchAll(
    /(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,8}|black|white)"/gi,
  )) {
    const hex = normalizeHex(color);
    if (hex !== '#ffffff') {
      counts.set(hex, (counts.get(hex) ?? 0) + 1);
    }
  }
  if (counts.size === 0) {
    return paintsInitialFill(parseSvg(svgText)) ? '#000000' : undefined;
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

/**
 * The colored default artwork of an artwork unit: its `""` variant, or the
 * variant a `""` local alias points at (TrustWallet → TrustWalletSquare).
 */
function defaultSvgOf(
  unitMeta: ArtworkUnitMeta,
  variants: SourceUnit['variants'],
): string | undefined {
  const svgBySuffix = new Map(variants.map(v => [v.suffix, v.svg]));
  const defaultSuffix = svgBySuffix.has('')
    ? ''
    : localAliasVariants(unitMeta).find(v => v.suffix === '')?.target;
  return defaultSuffix === undefined
    ? undefined
    : svgBySuffix.get(defaultSuffix);
}

/**
 * Resolves the `brandColor` of artwork units: the unit's curated value, or
 * the colour derived from its colored default artwork. A unit whose default
 * export re-exports another unit's base export (Ldo → `Lido`) has no artwork
 * of its own to derive from and takes that unit's colour, so the two never
 * drift apart.
 */
function brandColorResolver(
  units: readonly SourceUnit[],
): (unit: SourceUnit) => string | undefined {
  const byBaseName = new Map(
    units.map(unit => [`${unit.category}/${unit.meta.name}`, unit]),
  );
  const resolve = (
    unit: SourceUnit,
    seen: ReadonlySet<SourceUnit>,
  ): string | undefined => {
    const { meta: unitMeta, variants } = unit;
    if (!isArtwork(unitMeta) || seen.has(unit)) {
      return undefined;
    }
    if (unitMeta.brandColor) {
      return unitMeta.brandColor;
    }
    const defaultSvg = defaultSvgOf(unitMeta, variants);
    if (defaultSvg !== undefined) {
      return extractBrandColor(defaultSvg);
    }
    const link = unitLinks(unit).find(
      l => l.name === unitMeta.name && !l.deprecated,
    );
    const target =
      link && byBaseName.get(`${link.targetCategory}/${link.targetName}`);
    return target ? resolve(target, new Set([...seen, unit])) : undefined;
  };
  return unit => resolve(unit, new Set());
}

function enrichmentOf(
  unit: SourceUnit,
  brandColorOf: (unit: SourceUnit) => string | undefined,
): Enrichment {
  const unitMeta = unit.meta;
  if (!isArtwork(unitMeta)) {
    return {};
  }
  // Units may expose variants through `localAliases` (e.g. DogeCircle →
  // Doge), even their default export (Foo → FooSquare) instead of a `""`
  // variant; those aliases are variants of the unit as far as consumers go.
  const aliasVariants = localAliasVariants(unitMeta);
  const brandColor = brandColorOf(unit);
  const own = [
    ...aliasVariants.map(v => v.suffix),
    ...unit.variants.map(v => v.suffix),
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
  const brandColorOf = brandColorResolver(units);
  const entries = units.flatMap(unit => {
    const ids = primaryIds(unit);
    const deprecated = new Set(deprecatedExports(unit));
    const enrichment = enrichmentOf(unit, brandColorOf);
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
   * only when the artwork has nothing else, and artwork painted only in
   * SVG's default fill is \`'#000000'\`), or a curated override. An icon
   * that re-exports another icon's artwork has that icon's color. Base
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
