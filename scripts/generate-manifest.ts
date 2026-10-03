#!/usr/bin/env node
/**
 * Generates the icon manifest.
 *
 * Default mode — regenerate the committed source module from built dist:
 *   pnpm run build && node scripts/generate-manifest.ts
 *   → writes src/manifest/index.ts (commit the result)
 *
 * JSON mode — emit the machine-readable manifest into dist (used by `build`):
 *   node scripts/generate-manifest.ts --json
 *   → writes dist/manifest.json from the built dist/manifest module
 *
 * test/manifest-sync.test.ts guards that the committed module stays in sync
 * with the actual category exports.
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  CATEGORIES,
  type Category,
  loadCategory,
  type SourceUnit,
} from './build-icons/lib.ts';
import { type ArtworkUnitMeta, isArtwork } from './build-icons/unit.ts';
import { isArray, isRecord, isSet } from './guards.ts';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const ICONS = resolve(ROOT, 'icons');

const FORWARD_REF = Symbol.for('react.forward_ref');

/** Runtime identifier fields, keyed by export name via the meta maps. */
const ID_FIELDS = ['chainId', 'slug', 'ticker'] as const;
type IdField = (typeof ID_FIELDS)[number];
type IdLookups = Partial<Record<IdField, ReadonlyMap<string, number | string>>>;

type ManifestEntry = {
  readonly name: string;
  readonly category: Category;
  readonly deprecated?: true;
} & Enrichment &
  Partial<Record<IdField, number | string>>;

/** Per-unit data from icons/ that the built modules do not carry. */
interface Enrichment {
  readonly variants?: readonly string[];
  readonly aliases?: readonly string[];
  readonly brandColor?: string;
}

async function importDist(
  subpath: string,
): Promise<Readonly<Record<string, unknown>>> {
  const mod: unknown = await import(pathToFileURL(resolve(DIST, subpath)).href);
  if (!isRecord(mod)) {
    throw new Error(`dist/${subpath} is not an ES module`);
  }
  return mod;
}

function isStringRecord(
  value: unknown,
): value is Readonly<Record<string, string>> {
  return (
    isRecord(value) && Object.values(value).every(v => typeof v === 'string')
  );
}

function isForwardRef(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$$typeof' in value &&
    value.$$typeof === FORWARD_REF
  );
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
  meta: ArtworkUnitMeta,
): { suffix: string; target: string }[] {
  return (meta.localAliases ?? []).flatMap(alias => {
    if (
      alias.deprecated ||
      !alias.name.startsWith(meta.name) ||
      !alias.target.startsWith(meta.name)
    ) {
      return [];
    }
    const target = alias.target.slice(meta.name.length);
    if (!meta.variants[target]) {
      return [];
    }
    return [{ suffix: alias.name.slice(meta.name.length), target }];
  });
}

function enrichmentOf({ meta, variants }: SourceUnit): Enrichment {
  if (!isArtwork(meta)) {
    return {};
  }
  // Units may expose their default export through `localAliases`
  // (e.g. TrustWallet → TrustWalletSquare) instead of a `""` variant;
  // those aliases are variants of the unit as far as consumers go.
  const aliasVariants = localAliasVariants(meta);
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
    ...(meta.aliases?.length ? { aliases: meta.aliases } : {}),
    ...(brandColor ? { brandColor } : {}),
  };
}

/** Loads per-unit enrichment (aliases, variants, brandColor) from icons/. */
function loadUnitEnrichment(): Map<string, Enrichment> {
  const byKey = new Map<string, Enrichment>(); // `${category}/${BaseName}` → enrichment
  for (const category of CATEGORIES) {
    for (const unit of loadCategory(ICONS, category)) {
      byKey.set(`${category}/${unit.meta.name}`, enrichmentOf(unit));
    }
  }
  return byKey;
}

/** Builds `name → identifier` reverse lookups from the meta maps. */
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

/** The identifier fields registered for `name` in its category's maps. */
function idsOf(
  lookups: IdLookups | undefined,
  name: string,
): Partial<Record<IdField, number | string>> {
  const ids: { [F in IdField]?: number | string } = {};
  for (const field of ID_FIELDS) {
    const id = lookups?.[field]?.get(name);
    if (id !== undefined) {
      ids[field] = id;
    }
  }
  return ids;
}

async function buildEntries(): Promise<ManifestEntry[]> {
  const meta = await importDist('meta/index.mjs');
  const { DEPRECATED_ICON_NAMES } = await importDist('deprecated.mjs');
  if (!isSet(DEPRECATED_ICON_NAMES)) {
    throw new Error('dist/deprecated.mjs: DEPRECATED_ICON_NAMES is not a Set');
  }
  const lookup = (key: string): Map<string, number | string> => {
    const map = meta[key];
    if (!isStringRecord(map)) {
      throw new Error(`dist/meta: ${key} is not a map of icon names`);
    }
    return invert(map);
  };
  const enrichment = loadUnitEnrichment();

  const idLookups: Partial<Record<Category, IdLookups>> = {
    chain: {
      chainId: lookup('CHAIN_ID_TO_NAME'),
      slug: lookup('CHAIN_SLUG_TO_NAME'),
    },
    coin: { ticker: lookup('TICKER_TO_COIN') },
    wallet: { slug: lookup('WALLET_SLUG_TO_NAME') },
    exchange: { slug: lookup('EXCHANGE_SLUG_TO_NAME') },
    defi: { slug: lookup('DEFI_SLUG_TO_NAME') },
    dex: { slug: lookup('DEX_SLUG_TO_NAME') },
    bridge: { slug: lookup('BRIDGE_SLUG_TO_NAME') },
    oracle: { slug: lookup('ORACLE_SLUG_TO_NAME') },
  };

  const entries: ManifestEntry[] = [];
  for (const category of CATEGORIES) {
    const mod = await importDist(`${category}/index.mjs`);
    for (const [name, value] of Object.entries(mod)) {
      if (!isForwardRef(value)) {
        continue;
      }
      entries.push({
        name,
        category,
        ...idsOf(idLookups[category], name),
        ...(DEPRECATED_ICON_NAMES.has(name) ? { deprecated: true } : {}),
        ...enrichment.get(`${category}/${name}`),
      });
    }
  }
  entries.sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
  );
  return entries;
}

function renderModule(entries: readonly ManifestEntry[]): string {
  const rows = entries
    .map(e => {
      const fields = [`name: '${e.name}'`, `category: '${e.category}'`];
      if (e.chainId !== undefined) {
        fields.push(`chainId: ${e.chainId}`);
      }
      if (e.slug !== undefined) {
        fields.push(`slug: '${e.slug}'`);
      }
      if (e.ticker !== undefined) {
        fields.push(`ticker: '${e.ticker}'`);
      }
      if (e.deprecated) {
        fields.push('deprecated: true');
      }
      if (e.variants) {
        fields.push(`variants: [${e.variants.map(v => `'${v}'`).join(', ')}]`);
      }
      if (e.aliases) {
        fields.push(`aliases: [${e.aliases.map(a => `'${a}'`).join(', ')}]`);
      }
      if (e.brandColor) {
        fields.push(`brandColor: '${e.brandColor}'`);
      }
      return `  { ${fields.join(', ')} },`;
    })
    .join('\n');

  return `// Auto-generated by scripts/generate-manifest.mjs — do not edit manually.
// Regenerate after adding or renaming icons:
//   pnpm run build && pnpm run generate-manifest

/** Icon category, mirroring the package subpaths. */
export type IconCategory =
${CATEGORIES.map(c => `  | '${c}'`).join('\n')};

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
${rows}
];
`;
}

if (process.argv.includes('--json')) {
  const { ICON_MANIFEST } = await importDist('manifest/index.mjs');
  if (!isArray(ICON_MANIFEST)) {
    throw new Error('dist/manifest: ICON_MANIFEST is not an array');
  }
  writeFileSync(
    resolve(DIST, 'manifest.json'),
    `${JSON.stringify(ICON_MANIFEST, null, 2)}\n`,
  );
  console.log(`dist/manifest.json written (${ICON_MANIFEST.length} entries).`);
} else {
  const entries = await buildEntries();
  const outPath = resolve(ROOT, 'src/manifest/index.ts');
  writeFileSync(outPath, renderModule(entries));
  // Biome owns final formatting/style (e.g. numeric separators), keeping
  // regeneration byte-stable against the committed file.
  execFileSync('pnpm', ['exec', 'biome', 'check', '--write', outPath], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  console.log(`src/manifest/index.ts written (${entries.length} entries).`);
}
