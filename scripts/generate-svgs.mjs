#!/usr/bin/env node
/**
 * Generates static SVG files from all built icon components.
 *
 * Run after `pnpm run build`:
 *   node scripts/generate-svgs.mjs
 *
 * Output: dist/svg/<category>/<Name>.svg
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SVG_OUT = resolve(DIST, 'svg');

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
  'portfolio',
  'storage',
  'tracker',
  'wallet',
];

// Non-icon exports to skip
const SKIP_NAMES = new Set([
  'IconContext',
  'DEPRECATED_ICON_NAMES',
]);

/** Strip render-context attributes not meaningful in standalone SVG files */
function cleanSvg(html) {
  return (
    html
      // Remove aria-hidden (standalone SVGs don't need it)
      .replace(/\s+aria-hidden="true"/g, '')
      // Remove role="img" (add back if needed per use case)
      .replace(/\s+role="img"/g, '')
      // Remove inline width/height="1em" — let viewBox control sizing
      .replace(/\s+width="1em"/g, '')
      .replace(/\s+height="1em"/g, '')
  );
}

let total = 0;
let skipped = 0;

for (const category of CATEGORIES) {
  const indexPath = join(DIST, category, 'index.mjs');
  if (!existsSync(indexPath)) {
    console.warn(`  skip ${category}: no dist/${category}/index.mjs`);
    continue;
  }

  const outDir = join(SVG_OUT, category);
  mkdirSync(outDir, { recursive: true });

  /** @type {Record<string, unknown>} */
  const mod = await import(indexPath);

  for (const [name, Component] of Object.entries(mod)) {
    if (SKIP_NAMES.has(name)) continue;

    // Only render function components / forwardRef components
    if (typeof Component !== 'function' && !(typeof Component === 'object' && Component !== null && '$$typeof' in Component)) {
      skipped++;
      continue;
    }

    try {
      const html = renderToStaticMarkup(
        createElement(Component, { size: '24' }),
      );
      const svg = cleanSvg(html);
      writeFileSync(join(outDir, `${name}.svg`), svg, 'utf8');
      total++;
    } catch (err) {
      console.warn(`  warn: failed to render ${category}/${name}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`✓ ${category}: generated SVGs in dist/svg/${category}/`);
}

console.log(`\nDone: ${total} SVGs written, ${skipped} skipped.`);
