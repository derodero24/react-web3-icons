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
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { CATEGORIES, isCategory, kebab } from './build-icons/lib.ts';
import {
  createOptimizer,
  normalizeRoot,
  type Optimizer,
} from './build-icons/normalize.ts';
import {
  type IconUnitMeta,
  SCHEMA_REF,
  type Variant,
} from './build-icons/unit.ts';
import { getAttr, parseSvg, serializeSvg } from './build-icons/xml.ts';

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

const slug = kebab(name);
const dir = join(ROOT, 'icons', category);
const jsonPath = join(dir, `${slug}.json`);
if (existsSync(jsonPath)) {
  console.error(`icons/${category}/${slug}.json already exists.`);
  process.exit(1);
}

/**
 * Optimizes `fromPath` with SVGO and normalizes it for the pipeline (see
 * build-icons/normalize.ts). Nothing is written yet, and the input file is
 * only read.
 */
function ingest(
  optimize: Optimizer,
  fromPath: string,
  file: string,
  isMono: boolean,
): { readonly variant: Variant; readonly svg: string } {
  let root: ReturnType<typeof normalizeRoot>;
  try {
    const optimized = optimize(readFileSync(fromPath, 'utf-8'), fromPath);
    root = normalizeRoot(parseSvg(optimized, fromPath), isMono);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
  const fill = getAttr(root, 'fill');
  return {
    variant: fill ? { file, fill } : { file },
    svg: `${serializeSvg(root)}\n`,
  };
}

// Keyed by export-name suffix ('' → <Name>, 'Mono' → <Name>Mono).
const optimize = await createOptimizer(ROOT);
const ingested = new Map([
  ['', ingest(optimize, resolve(svgPath), `${slug}.svg`, false)],
]);
if (monoPath) {
  ingested.set(
    'Mono',
    ingest(optimize, resolve(monoPath), `${slug}.mono.svg`, true),
  );
}
const meta: IconUnitMeta = {
  $schema: SCHEMA_REF,
  name,
  kind: 'icon',
  ...(source ? { source: [source] } : {}),
  variants: Object.fromEntries(
    [...ingested].map(([suffix, { variant }]) => [suffix, variant]),
  ),
};

// Every input was processed successfully; only now touch icons/.
for (const { variant, svg } of ingested.values()) {
  writeFileSync(join(dir, variant.file), svg);
}
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
  ${monoPath ? '2.' : '3.'} Regenerate the manifest: pnpm run generate-manifest
  ${monoPath ? '3.' : '4.'} Verify: pnpm test && pnpm run check
  ${monoPath ? '4.' : '5.'} Add a changeset: pnpm changeset
`);
