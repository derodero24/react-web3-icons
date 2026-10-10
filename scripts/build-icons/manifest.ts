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
import {
  deprecatedExports,
  lookupTargets,
  type PrimaryIds,
  primaryIds,
  targetOf,
} from './meta.ts';
import { isArtwork } from './unit.ts';
import { parseSvg, type XmlNode } from './xml.ts';

/**
 * Data from icons/ that only the entries of icons carry: base entries and
 * the `variantLookups` targets (`ArbitrumNova`), but no variant entries.
 */
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

/** Orders the colored default and its mono first; the rest keep their order. */
function variantRank(suffix: string): number {
  return suffix === '' ? 0 : suffix === 'Mono' ? 1 : 2;
}

/**
 * Resolves the `brandColor` of an export: the unit's curated value for its
 * base export, else the colour derived from the export's own artwork. An
 * export without artwork of its own re-exports another one (coin `Eth` →
 * chain `Ethereum`, `Ldo` → `Lido`) and takes the colour of that one, so
 * the two never drift apart.
 */
function brandColorResolver(
  units: readonly SourceUnit[],
): (unit: SourceUnit, name: string) => string | undefined {
  const byExport = new Map(
    units.flatMap(unit =>
      unitAllExportNames(unit).map(name => [`${unit.category}/${name}`, unit]),
    ),
  );
  const resolve = (
    unit: SourceUnit,
    name: string,
    seen: ReadonlySet<string>,
  ): string | undefined => {
    const key = `${unit.category}/${name}`;
    if (seen.has(key)) {
      return undefined;
    }
    const { meta: unitMeta, variants } = unit;
    if (isArtwork(unitMeta) && name === unitMeta.name && unitMeta.brandColor) {
      return unitMeta.brandColor;
    }
    const artwork = variants.find(v => v.exportName === name);
    if (artwork) {
      return extractBrandColor(artwork.svg);
    }
    const link = unitLinks(unit).find(l => l.name === name);
    const target =
      link && byExport.get(`${link.targetCategory}/${link.targetName}`);
    return link && target
      ? resolve(target, link.targetName, new Set([...seen, key]))
      : undefined;
  };
  return (unit, name) => resolve(unit, name, new Set());
}

/**
 * The enrichment of each icon of a unit, by export name. The icons are the
 * base export and the lookup targets, so a group of variants with its own
 * lookup keys (`ArbitrumNova`, `ArbitrumNovaMono`) is an icon of its own,
 * not variants of the base, as in the dynamic components. A deprecated
 * alias unit (an old name such as `BinanceSmartChain`) has none: its
 * replacement's entries carry the data.
 */
function enrichmentsOf(
  unit: SourceUnit,
  deprecated: ReadonlySet<string>,
  brandColorOf: (unit: SourceUnit, name: string) => string | undefined,
): Map<string, Enrichment> {
  const unitMeta = unit.meta;
  if (!isArtwork(unitMeta) && deprecated.has(unitMeta.name)) {
    return new Map();
  }
  const targets = [...new Set([unitMeta.name, ...lookupTargets(unit)])];
  // Local aliases first (DogeCircle → Doge): units may expose variants, even
  // their default export, through them.
  const names = [
    ...new Set([
      ...(isArtwork(unitMeta) ? (unitMeta.localAliases ?? []) : []).map(
        alias => alias.name,
      ),
      ...unitAllExportNames(unit),
    ]),
  ];
  return new Map(
    targets.map(target => {
      // A deprecated icon keeps all its variants, so the list is not empty.
      const variants = names
        .filter(
          name =>
            targetOf(name, targets) === target &&
            (deprecated.has(target) || !deprecated.has(name)),
        )
        .map(name => name.slice(target.length))
        .sort((a, b) => variantRank(a) - variantRank(b));
      const aliases =
        isArtwork(unitMeta) && target === unitMeta.name
          ? (unitMeta.aliases ?? [])
          : [];
      const brandColor = brandColorOf(unit, target);
      return [
        target,
        {
          variants,
          ...(aliases.length > 0 ? { aliases } : {}),
          ...(brandColor ? { brandColor } : {}),
        },
      ];
    }),
  );
}

/** One entry per exported icon component, sorted by category and name. */
export function buildManifest(units: readonly SourceUnit[]): ManifestEntry[] {
  const brandColorOf = brandColorResolver(units);
  const entries = units.flatMap(unit => {
    const ids = primaryIds(unit);
    const deprecated = new Set(deprecatedExports(unit));
    const enrichments = enrichmentsOf(unit, deprecated, brandColorOf);
    return unitAllExportNames(unit).map(
      (name): ManifestEntry => ({
        name,
        category: unit.category,
        ...ids.get(name),
        ...(deprecated.has(name) ? { deprecated: true } : {}),
        ...enrichments.get(name),
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

import type { IconName } from '../utils';

/** Icon category, mirroring the package subpaths. */
export type IconCategory =
${CATEGORIES.map(c => `  | ${quote(c)}`).join('\n')};

/** One exported icon component, as listed in the manifest. */
export interface IconManifestEntry {
  /** Export name of the component (e.g. \`'Ethereum'\`, \`'EthereumMono'\`). */
  readonly name: IconName;
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
   * Variant suffixes of this icon, the colored default (\`''\`) and
   * \`'Mono'\` first: each \`name + suffix\` is an export of the same
   * category. Deprecated variants are left out unless the icon itself is
   * deprecated, and so are the variants of an icon with its own entry
   * (\`'Nova'\` is not a variant of \`Arbitrum\`: \`ArbitrumNova\` has
   * \`['', 'Mono']\`). Present on base entries (re-exports such as \`Eth\`
   * included, old names such as \`BinanceSmartChain\` not) and on every
   * entry \`react-web3-icons/meta\` maps to.
   */
  readonly variants?: readonly string[];
  /** Extra lowercase search terms (e.g. \`'btc'\` on \`Bitcoin\`). Base entries only. */
  readonly aliases?: readonly string[];
  /**
   * Brand color as a \`#rrggbb\` hex: the most frequent non-neutral color of
   * the colored artwork (a heuristic; greys, near-black and near-white count
   * only when the artwork has nothing else, and artwork painted only in
   * SVG's default fill is \`'#000000'\`), or a curated override. An icon
   * that re-exports another icon's artwork (\`Eth\` → \`Ethereum\`) has that
   * icon's color. Present on the same entries as \`variants\`.
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
