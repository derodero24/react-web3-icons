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
 *   2. Writes icons/<category>/<slug>.svg (+ .mono.svg) and <slug>.json
 *   3. Regenerates src/<category>/ via the icon pipeline
 *   4. Prints the remaining manual steps (meta maps, manifest, changeset)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { CATEGORIES } from './build-icons/lib.mjs';
import { parseSvg, serializeSvg } from './build-icons/xml.mjs';

const ROOT = resolve(import.meta.dirname, '..');

const args = process.argv.slice(2);
function opt(name) {
  const idx = args.indexOf(`--${name}`);
  return idx === -1 ? undefined : args[idx + 1];
}

const category = opt('category');
const name = opt('name');
const svgPath = opt('svg');
const monoPath = opt('mono');
const source = opt('source');

if (!category || !name || !svgPath) {
  console.error(
    'Usage: pnpm run new-icon --category <category> --name <PascalName> --svg <file> [--mono <file>] [--source <url>]',
  );
  process.exit(2);
}
if (!CATEGORIES.includes(category)) {
  console.error(`Unknown category '${category}'. One of: ${CATEGORIES.join(', ')}`);
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

/** Optimizes with SVGO, then normalizes the root element for the pipeline. */
function ingest(fromPath, isMono) {
  execFileSync('pnpm', ['exec', 'svgo', '--config', 'svgo.config.js', fromPath], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  const root = parseSvg(readFileSync(fromPath, 'utf-8'));
  const keep = root.attrs.filter(([k]) => ['xmlns', 'viewBox', 'fill'].includes(k));
  if (!keep.some(([k]) => k === 'xmlns')) {
    keep.unshift(['xmlns', 'http://www.w3.org/2000/svg']);
  }
  if (!keep.some(([k]) => k === 'viewBox')) {
    throw new Error(`${fromPath}: SVG needs a viewBox`);
  }
  if (isMono && !keep.some(([k]) => k === 'fill')) {
    keep.push(['fill', 'currentColor']);
  }
  root.attrs = keep;
  return { text: `${serializeSvg(root)}\n`, fill: keep.find(([k]) => k === 'fill')?.[1] };
}

const colored = ingest(resolve(svgPath), false);
writeFileSync(join(dir, `${slug}.svg`), colored.text);

const meta = { name, kind: 'icon' };
if (source) {
  meta.source = [source];
}
meta.variants = { '': { file: `${slug}.svg` } };
if (colored.fill) {
  meta.variants[''].fill = colored.fill;
}

if (monoPath) {
  const mono = ingest(resolve(monoPath), true);
  writeFileSync(join(dir, `${slug}.mono.svg`), mono.text);
  meta.variants.Mono = { file: `${slug}.mono.svg`, fill: mono.fill };
}

writeFileSync(jsonPath, `${JSON.stringify(meta, null, 2)}\n`);
execFileSync('node', ['scripts/build-icons/cli.mjs'], { cwd: ROOT, stdio: 'inherit' });

console.log(`
Created icons/${category}/${slug}.{svg,json} and generated src/${category}/${name}.tsx.

Next steps:
  1.${monoPath ? '' : ` Add a Mono variant (icons/${category}/${slug}.mono.svg + "Mono" entry in the JSON),
     then re-run: pnpm run generate-icons — mono coverage is enforced by tests.
  2.`} Register identifiers in src/meta/index.ts (slug/ticker/chain ID map for '${category}').
  ${monoPath ? '2.' : '3.'} Regenerate the manifest: pnpm run build && pnpm run generate-manifest
  ${monoPath ? '3.' : '4.'} Verify: pnpm test && pnpm run check
  ${monoPath ? '4.' : '5.'} Add a changeset: pnpm changeset
`);
