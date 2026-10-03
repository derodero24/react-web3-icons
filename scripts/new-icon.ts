#!/usr/bin/env node
/**
 * Icon scaffolding for the SVG-first pipeline.
 *
 * Usage:
 *   pnpm run new-icon --category chain --name Taiko --svg path/to/taiko.svg \
 *     [--mono path/to/taiko.mono.svg] [--source https://taiko.xyz]
 *
 * What it does:
 *   1. Optimizes the SVG(s) with SVGO and normalizes the root element
 *      (the input files are only read, never modified)
 *   2. Writes icons/<category>/<slug>.svg (+ .mono.svg) and <slug>.json
 *   3. Regenerates src/<category>/ via the icon pipeline
 *   4. Prints the remaining manual steps (meta maps, manifest, changeset)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { ROOT_ATTRS } from './build-icons/jsx.ts';
import { CATEGORIES, isCategory } from './build-icons/lib.ts';
import type { IconUnitMeta, Variant } from './build-icons/unit.ts';
import { parseSvg, serializeSvg, type XmlAttr } from './build-icons/xml.ts';

const ROOT = resolve(import.meta.dirname, '..');

const USAGE =
  'Usage: pnpm run new-icon --category <category> --name <PascalName> --svg <file> [--mono <file>] [--source <url>]';

function usageError(message: string): never {
  console.error(`${message}\n${USAGE}`);
  process.exit(2);
}

function parseCli() {
  try {
    // Strict parsing: unknown flags and flags missing their value (`--svg
    // --mono x`) are errors instead of being taken as values.
    return parseArgs({
      options: {
        category: { type: 'string' },
        name: { type: 'string' },
        svg: { type: 'string' },
        mono: { type: 'string' },
        source: { type: 'string' },
        help: { type: 'boolean', short: 'h' },
      },
    }).values;
  } catch (error) {
    return usageError(error instanceof Error ? error.message : String(error));
  }
}

const parsed = parseCli();
if (parsed.help) {
  console.log(USAGE);
  process.exit(0);
}
const { category, name, svg: svgPath, mono: monoPath, source } = parsed;
if (!(category && name && svgPath)) {
  usageError('--category, --name and --svg are required.');
}
if (!isCategory(category)) {
  console.error(
    `Unknown category '${category}'. One of: ${CATEGORIES.join(', ')}`,
  );
  process.exit(2);
}
if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(`--name must be PascalCase (got '${name}')`);
  process.exit(2);
}

const slug = name
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
  .toLowerCase();
const dir = join(ROOT, 'icons', category);
const jsonPath = join(dir, `${slug}.json`);
if (existsSync(jsonPath)) {
  console.error(`icons/${category}/${slug}.json already exists.`);
  process.exit(1);
}

/**
 * Optimizes `fromPath` with SVGO (output captured from stdout, so the input
 * file is left untouched), normalizes the root element for the pipeline, and
 * writes the result to `icons/<category>/<file>`.
 *
 * @returns the variant metadata for the written file
 */
function ingest(fromPath: string, file: string, isMono: boolean): Variant {
  const optimized = execFileSync(
    'pnpm',
    ['exec', 'svgo', '--config', 'svgo.config.js', fromPath, '-o', '-'],
    { cwd: ROOT, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'] },
  );
  const root = parseSvg(optimized);
  const keep: XmlAttr[] = root.attrs.filter(([k]) => ROOT_ATTRS.includes(k));
  if (!keep.some(([k]) => k === 'xmlns')) {
    keep.unshift(['xmlns', 'http://www.w3.org/2000/svg']);
  }
  if (!keep.some(([k]) => k === 'viewBox')) {
    throw new Error(`${fromPath}: SVG needs a viewBox`);
  }
  if (isMono && !keep.some(([k]) => k === 'fill')) {
    keep.push(['fill', 'currentColor']);
  }
  writeFileSync(join(dir, file), `${serializeSvg({ ...root, attrs: keep })}\n`);
  const fill = keep.find(([k]) => k === 'fill')?.[1];
  return fill ? { file, fill } : { file };
}

// Keyed by export-name suffix ('' → <Name>, 'Mono' → <Name>Mono).
const variants = new Map<string, Variant>([
  ['', ingest(resolve(svgPath), `${slug}.svg`, false)],
]);
if (monoPath) {
  variants.set('Mono', ingest(resolve(monoPath), `${slug}.mono.svg`, true));
}
const meta: IconUnitMeta = {
  name,
  kind: 'icon',
  ...(source ? { source: [source] } : {}),
  variants: Object.fromEntries(variants),
};

writeFileSync(jsonPath, `${JSON.stringify(meta, null, 2)}\n`);
execFileSync(process.execPath, ['scripts/build-icons/cli.ts'], {
  cwd: ROOT,
  stdio: 'inherit',
});

console.log(`
Created icons/${category}/${slug}.{svg,json} and generated src/${category}/${name}.tsx.

Next steps:
  1.${
    monoPath
      ? ''
      : ` Add a Mono variant (icons/${category}/${slug}.mono.svg + "Mono" entry in the JSON),
     then re-run: pnpm run generate-icons — mono coverage is enforced by tests.
  2.`
  } Register identifiers in src/meta/index.ts (slug/ticker/chain ID map for '${category}').
  ${monoPath ? '2.' : '3.'} Regenerate the manifest: pnpm run build && pnpm run generate-manifest
  ${monoPath ? '3.' : '4.'} Verify: pnpm test && pnpm run check
  ${monoPath ? '4.' : '5.'} Add a changeset: pnpm changeset
`);
