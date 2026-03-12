#!/usr/bin/env node
/**
 * Icon scaffolding script.
 *
 * Usage:
 *   pnpm run new-icon --category defi --name EtherFi [--svg path/to/icon.svg] [--slug etherfi]
 *   pnpm run new-icon --category coin --name Bitcoin [--svg path/to/btc.svg] [--ticker BTC]
 *   pnpm run new-icon --category chain --name Taiko  [--svg path/to/taiko.svg] [--slug taiko] [--chain-id 167000]
 *
 * What it does:
 *   1. Optimizes the SVG with SVGO (if --svg is provided)
 *   2. Creates src/<category>/<Name>.tsx with a createIcon template
 *   3. Adds `export * from './<Name>';` to src/<category>/index.ts
 *   4. Adds the slug/ticker entry to src/meta/index.ts (for categories that have one)
 *   5. Prints next steps (visual QA, changeset)
 */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

// ── Argument parsing ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

function hasArg(flag) {
  return args.includes(flag);
}

const category = getArg('--category');
const name = getArg('--name');
const svgPath = getArg('--svg');
const slug = getArg('--slug');
const ticker = getArg('--ticker');
const chainId = getArg('--chain-id');
const help = hasArg('--help') || hasArg('-h');

if (help) {
  console.log(`
Usage: pnpm run new-icon --category <category> --name <ComponentName> [options]

Required:
  --category    Icon category (bridge|chain|coin|defi|devtool|dex|domain|exchange|
                              explorer|marketplace|node|portfolio|storage|tracker|wallet)
  --name        PascalCase component name (e.g. EtherFi, BitcoinCircle)

Optional:
  --svg         Path to source SVG file (will be optimized with SVGO)
  --slug        Lowercase slug for the meta map (defaults to lowercased name)
  --ticker      Coin ticker for TICKER_TO_COIN meta map (coin category)
  --chain-id    Numeric chain ID for CHAIN_ID_TO_NAME meta map (chain category)
  --help        Show this help

Examples:
  pnpm run new-icon --category defi --name EtherFi --svg ./etherfi.svg --slug etherfi
  pnpm run new-icon --category coin --name Bitcoin --svg ./btc.svg --ticker BTC
  pnpm run new-icon --category chain --name Taiko --svg ./taiko.svg --slug taiko --chain-id 167000
  pnpm run new-icon --category wallet --name Phantom --slug phantomwallet
`);
  process.exit(0);
}

if (!category || !name) {
  console.error('Error: --category and --name are required. Run with --help for usage.');
  process.exit(1);
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(
    `Error: --name must be a PascalCase TypeScript identifier (e.g. "EtherFi", "Bitcoin"). Got: "${name}"`,
  );
  process.exit(1);
}

if (chainId && !/^\d+$/.test(chainId)) {
  console.error(`Error: --chain-id must be a positive integer. Got: "${chainId}"`);
  process.exit(1);
}

// ── Validate category ─────────────────────────────────────────────────────────

const VALID_CATEGORIES = [
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
  'portfolio',
  'storage',
  'tracker',
  'wallet',
];

if (!VALID_CATEGORIES.includes(category)) {
  console.error(`Error: unknown category "${category}". Valid: ${VALID_CATEGORIES.join(', ')}`);
  process.exit(1);
}

// ── Paths ─────────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, '..');
const categoryDir = resolve(ROOT, 'src', category);
const componentFile = resolve(categoryDir, `${name}.tsx`);
const indexFile = resolve(categoryDir, 'index.ts');
const metaFile = resolve(ROOT, 'src', 'meta', 'index.ts');

// ── Validate existing files ───────────────────────────────────────────────────

if (!existsSync(categoryDir)) {
  console.error(`Error: category directory not found: ${categoryDir}`);
  process.exit(1);
}

if (existsSync(componentFile)) {
  console.error(`Error: component file already exists: ${componentFile}`);
  console.error('Delete it first or choose a different name.');
  process.exit(1);
}

// ── SVG optimization ──────────────────────────────────────────────────────────

let svgContent = '';
let viewBox = '0 0 24 24';
let innerSvg = '';

if (svgPath) {
  const absPath = resolve(process.cwd(), svgPath);
  if (!existsSync(absPath)) {
    console.error(`Error: SVG file not found: ${absPath}`);
    process.exit(1);
  }

  const optPath = `${absPath}.opt.svg`;
  console.log(`Optimizing SVG with SVGO…`);
  try {
    const result = spawnSync(
      'pnpm',
      ['exec', 'svgo', '--config', 'svgo.config.js', absPath, '-o', optPath],
      { stdio: 'inherit', cwd: ROOT },
    );
    if (result.status !== 0) throw new Error('svgo exited non-zero');
    svgContent = readFileSync(optPath, 'utf8');
    // Clean up temp file
    spawnSync('rm', [optPath]);
  } catch {
    // Fall back to raw SVG if SVGO fails
    console.warn('SVGO optimization failed; using raw SVG.');
    svgContent = readFileSync(absPath, 'utf8');
  }

  // Extract viewBox
  const vbMatch = svgContent.match(/viewBox="([^"]+)"/);
  if (vbMatch) viewBox = vbMatch[1];

  // Extract inner content (between <svg ...> and </svg>)
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (innerMatch) {
    innerSvg = innerMatch[1]
      .trim()
      // SVG → JSX attribute conversions
      .replace(/\bclass=/g, 'className=')
      .replace(/\bstroke-width=/g, 'strokeWidth=')
      .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
      .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/\bstroke-dasharray=/g, 'strokeDasharray=')
      .replace(/\bstroke-dashoffset=/g, 'strokeDashoffset=')
      .replace(/\bstroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/\bstroke-opacity=/g, 'strokeOpacity=')
      .replace(/\bfill-rule=/g, 'fillRule=')
      .replace(/\bfill-opacity=/g, 'fillOpacity=')
      .replace(/\bclip-rule=/g, 'clipRule=')
      .replace(/\bclip-path=/g, 'clipPath=')
      .replace(/\bstop-color=/g, 'stopColor=')
      .replace(/\bstop-opacity=/g, 'stopOpacity=')
      .replace(/\bfont-size=/g, 'fontSize=')
      .replace(/\bfont-family=/g, 'fontFamily=')
      .replace(/\bfont-weight=/g, 'fontWeight=')
      .replace(/\bfont-style=/g, 'fontStyle=')
      .replace(/\btext-anchor=/g, 'textAnchor=')
      .replace(/\bdominant-baseline=/g, 'dominantBaseline=')
      .replace(/\bcolor-interpolation-filters=/g, 'colorInterpolationFilters=')
      .replace(/\bflood-color=/g, 'floodColor=')
      .replace(/\bflood-opacity=/g, 'floodOpacity=')
      .replace(/\bimage-rendering=/g, 'imageRendering=')
      .replace(/\bshape-rendering=/g, 'shapeRendering=')
      .replace(/\bpaint-order=/g, 'paintOrder=')
      .replace(/\bvector-effect=/g, 'vectorEffect=')
      .replace(/\bmask-type=/g, 'maskType=')
      .replace(/\bletter-spacing=/g, 'letterSpacing=')
      .replace(/\bword-spacing=/g, 'wordSpacing=')
      .replace(/\bbaseline-shift=/g, 'baselineShift=')
      .replace(/\bxlink:href=/g, 'xlinkHref=')
      .replace(/\bxmlns:xlink="[^"]*"/g, '')
      .trim();
  }
}

// ── Detect if SVG has gradients/masks/clips (needs dynamic IDs) ───────────────

const hasComplexElements =
  innerSvg.includes('<linearGradient') ||
  innerSvg.includes('<radialGradient') ||
  innerSvg.includes('<mask') ||
  innerSvg.includes('<clipPath') ||
  innerSvg.includes('<filter');

// ── Generate component file ───────────────────────────────────────────────────

const sourceComment =
  svgPath
    ? `// Source: TODO — add official source URL`
    : `// Source: TODO — add official source URL`;

const renderBody = innerSvg
  ? hasComplexElements
    ? `_id => (
  // TODO: Replace static IDs with dynamic ones using _id
  // e.g. id={\`\${_id}-${name.toLowerCase()}-a\`}
  <>
    ${innerSvg.replace(/\n/g, '\n    ')}
  </>
)`
    : `() => (
  <>
    ${innerSvg.replace(/\n/g, '\n    ')}
  </>
)`
  : `() => (
  // TODO: Add SVG content here
  <path d="" />\n)`
;

const monoRenderBody = innerSvg
  ? hasComplexElements
    ? `_id => (
  // TODO: Adjust for monochrome — remove hardcoded colors, rely on currentColor
  // TODO: Replace static IDs with dynamic ones using _id
  <>
    ${innerSvg.replace(/\n/g, '\n    ')}
  </>
)`
    : `() => (
  // TODO: Adjust for monochrome — remove hardcoded colors, rely on currentColor
  <>
    ${innerSvg.replace(/\n/g, '\n    ')}
  </>
)`
  : `() => (
  // TODO: Add SVG content here
  <path d="" />\n)`;

const tsxContent = `import { createIcon } from '../utils';

${sourceComment}

export const ${name} = createIcon(
  '${name}',
  '${viewBox}',
  ${renderBody},
);

export const ${name}Mono = createIcon(
  '${name}Mono',
  '${viewBox}',
  ${monoRenderBody},
  'currentColor',
);
`;

// ── Write component file ──────────────────────────────────────────────────────

writeFileSync(componentFile, tsxContent, 'utf8');
console.log(`✓ Created ${componentFile.replace(ROOT + '/', '')}`);

// ── Update category index ─────────────────────────────────────────────────────

const indexContent = readFileSync(indexFile, 'utf8');
const exportLine = `export * from './${name}';`;

if (indexContent.includes(exportLine)) {
  console.log(`  (index.ts already has ${exportLine})`);
} else {
  // Insert in alphabetical order
  const lines = indexContent.split('\n').filter(l => l.trim());
  const exportLines = lines.filter(l => l.startsWith('export * from'));
  const otherLines = lines.filter(l => !l.startsWith('export * from'));

  exportLines.push(exportLine);
  exportLines.sort();

  const newContent = [...otherLines, ...exportLines].join('\n') + '\n';
  writeFileSync(indexFile, newContent, 'utf8');
  console.log(`✓ Added export to src/${category}/index.ts`);
}

// ── Update meta map ───────────────────────────────────────────────────────────

const META_MAP_CONFIG = {
  bridge: {
    mapName: 'BRIDGE_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
  },
  chain: {
    mapName: 'CHAIN_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
    extraMap: chainId
      ? { mapName: 'CHAIN_ID_TO_NAME', keyType: 'number', keyValue: chainId }
      : null,
  },
  coin: {
    mapName: 'TICKER_TO_COIN',
    keyType: 'ticker',
    keyValue: ticker ? ticker.toUpperCase() : name.toUpperCase(),
  },
  defi: {
    mapName: 'DEFI_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
  },
  dex: {
    mapName: 'DEX_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
  },
  exchange: {
    mapName: 'EXCHANGE_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
  },
  wallet: {
    mapName: 'WALLET_SLUG_TO_NAME',
    keyType: 'slug',
    keyValue: slug ?? name.toLowerCase(),
  },
};

const metaConfig = META_MAP_CONFIG[category];

if (metaConfig) {
  let metaContent = readFileSync(metaFile, 'utf8');

  /**
   * @param {string} content   - full file text
   * @param {string} mapName   - e.g. "TICKER_TO_COIN"
   * @param {string} rawKey    - unquoted raw key value (slug, ticker, or chain ID)
   * @param {string} value     - component name to insert as the map value
   * @param {'slug'|'ticker'|'number'} keyType
   */
  function insertIntoMap(content, mapName, rawKey, value, keyType) {
    const mapRegex = new RegExp(`(export const ${mapName} = \\{)([\\s\\S]*?)(\\} as const)`);
    const match = content.match(mapRegex);
    if (!match) {
      console.warn(`  Warning: could not find ${mapName} in meta/index.ts — add manually`);
      return content;
    }

    // Compute the formatted key as it will appear in source
    function formatKey(raw) {
      if (keyType === 'number') return raw; // numeric literal: 1, 167000
      // String key: quote if not a valid JS identifier
      const isValidIdent = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(raw);
      return isValidIdent ? raw : `'${raw}'`;
    }

    const formattedKey = formatKey(rawKey);
    const keyStr = `  ${formattedKey}: '${value}'`;

    const existing = match[2];
    if (existing.includes(keyStr)) {
      console.log(`  (meta map ${mapName} already has key ${formattedKey})`);
      return content;
    }

    // Find insertion point (alphabetical / numeric order)
    const entryLines = existing
      .split('\n')
      .filter(l => l.trim() && l.includes(':'));

    entryLines.push(`  ${formattedKey}: '${value}',`);

    // Sort: numbers numerically, strings alphabetically (strip quotes for comparison)
    entryLines.sort((a, b) => {
      const ka = a.trim().split(':')[0].trim().replace(/['"]/g, '');
      const kb = b.trim().split(':')[0].trim().replace(/['"]/g, '');
      const na = Number(ka);
      const nb = Number(kb);
      if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
      return ka.localeCompare(kb);
    });

    const newBlock = '\n' + entryLines.join('\n') + '\n';
    return content.replace(mapRegex, `$1${newBlock}$3`);
  }

  metaContent = insertIntoMap(
    metaContent,
    metaConfig.mapName,
    metaConfig.keyValue,
    name,
    metaConfig.keyType,
  );

  if (metaConfig.extraMap && chainId) {
    metaContent = insertIntoMap(
      metaContent,
      metaConfig.extraMap.mapName,
      chainId,
      name,
      'number',
    );
  }

  writeFileSync(metaFile, metaContent, 'utf8');
  console.log(`✓ Updated src/meta/index.ts (${metaConfig.mapName})`);
} else {
  console.log(
    `  (category "${category}" has no meta map — skipping meta update)`,
  );
}

// ── Next steps ────────────────────────────────────────────────────────────────

console.log(`
Done! Next steps:

  1. Open src/${category}/${name}.tsx and:
     ${!svgPath ? '• Add SVG path data (paste optimized SVG content)' : ''}
     • Review/fix the JSX render function
     ${hasComplexElements ? '• Replace static IDs with dynamic ones using _id' : ''}
     • Add "// Source: <official URL>" comment
     • Adjust ${name}Mono to use currentColor correctly

  2. Run visual QA:
     cd example && pnpm dev
     → Open the browser and verify the icon looks correct

  3. Add a changeset:
     pnpm changeset
     → Select "minor" for new icons

  4. Commit:
     git add src/${category}/${name}.tsx src/${category}/index.ts${metaConfig ? ` src/meta/index.ts` : ''}
     git commit -m "feat(${category}): add ${name} icon"
`);
