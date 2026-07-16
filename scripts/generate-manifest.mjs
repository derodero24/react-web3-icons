#!/usr/bin/env node
/**
 * Generates the icon manifest.
 *
 * Default mode — regenerate the committed source module from built dist:
 *   pnpm run build && node scripts/generate-manifest.mjs
 *   → writes src/manifest/index.ts (commit the result)
 *
 * JSON mode — emit the machine-readable manifest into dist (used by `build`):
 *   node scripts/generate-manifest.mjs --json
 *   → writes dist/manifest.json from the built dist/manifest module
 *
 * test/manifest-sync.test.ts guards that the committed module stays in sync
 * with the actual category exports.
 */

import * as fsSync from 'node:fs';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const ICONS = resolve(ROOT, 'icons');

const CATEGORIES = [
  'bridge',
  'chain',
  'coin',
  'defi',
  'devtool',
  'dex',
  'domain',
  'exchange',
  'explorer',
  'marketplace',
  'node',
  'oracle',
  'portfolio',
  'storage',
  'tracker',
  'wallet',
];

const FORWARD_REF = Symbol.for('react.forward_ref');

async function importDist(subpath) {
  return import(pathToFileURL(resolve(DIST, subpath)).href);
}

/**
 * Dominant brand color of a colored SVG: the most frequent fill/stop-color
 * hex value, ignoring white and non-color values.
 */
function extractBrandColor(svgText) {
  const counts = new Map();
  for (const match of svgText.matchAll(/(?:fill|stop-color)="(#[0-9a-fA-F]{3,8})"/g)) {
    let hex = match[1].toLowerCase();
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    hex = hex.slice(0, 7);
    if (hex === '#ffffff') {
      continue;
    }
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  let best;
  let bestCount = 0;
  for (const [hex, count] of counts) {
    if (count > bestCount) {
      best = hex;
      bestCount = count;
    }
  }
  return best;
}

/** Loads per-unit enrichment (aliases, variants, brandColor) from icons/. */
function loadUnitEnrichment() {
  const { readdirSync } = fsSync;
  const byKey = new Map(); // `${category}/${BaseName}` → { aliases, variants, brandColor }
  for (const category of CATEGORIES) {
    const dir = resolve(ICONS, category);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.json')) {
        continue;
      }
      const meta = JSON.parse(readFileSync(resolve(dir, file), 'utf-8'));
      const enrichment = {};
      if (meta.aliases?.length) {
        enrichment.aliases = meta.aliases;
      }
      if (meta.variants) {
        enrichment.variants = Object.keys(meta.variants);
        const defaultVariant = meta.variants[''];
        if (defaultVariant) {
          const svg = readFileSync(resolve(dir, defaultVariant.file), 'utf-8');
          const brandColor = extractBrandColor(svg);
          if (brandColor) {
            enrichment.brandColor = brandColor;
          }
        }
      }
      byKey.set(`${category}/${meta.name}`, enrichment);
    }
  }
  return byKey;
}

/** Builds `name → identifier` reverse lookups from the meta maps. */
function invert(map) {
  const out = new Map();
  for (const [key, name] of Object.entries(map)) {
    if (!out.has(name)) {
      out.set(name, /^\d+$/.test(key) ? Number(key) : key);
    }
  }
  return out;
}

async function buildEntries() {
  const meta = await importDist('meta/index.mjs');
  const { DEPRECATED_ICON_NAMES } = await importDist('deprecated.mjs');
  const enrichment = loadUnitEnrichment();

  const idLookups = {
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

  const entries = [];
  for (const category of CATEGORIES) {
    const mod = await importDist(`${category}/index.mjs`);
    for (const [name, value] of Object.entries(mod)) {
      if (value?.$$typeof !== FORWARD_REF) {
        continue;
      }
      const entry = { name, category };
      const lookups = idLookups[category];
      if (lookups) {
        for (const [field, byName] of Object.entries(lookups)) {
          const id = byName.get(name);
          if (id !== undefined) {
            entry[field] = id;
          }
        }
      }
      if (DEPRECATED_ICON_NAMES.has(name)) {
        entry.deprecated = true;
      }
      const extra = enrichment.get(`${category}/${name}`);
      if (extra) {
        if (extra.variants) {
          entry.variants = extra.variants;
        }
        if (extra.aliases) {
          entry.aliases = extra.aliases;
        }
        if (extra.brandColor) {
          entry.brandColor = extra.brandColor;
        }
      }
      entries.push(entry);
    }
  }
  entries.sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
  );
  return entries;
}

function renderModule(entries) {
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
  const { execFileSync } = await import('node:child_process');
  execFileSync('pnpm', ['exec', 'biome', 'check', '--write', outPath], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  console.log(`src/manifest/index.ts written (${entries.length} entries).`);
}
