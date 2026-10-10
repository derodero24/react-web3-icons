#!/usr/bin/env node
/**
 * Icon scaffolding for the SVG-first pipeline.
 *
 * Usage:
 *   pnpm run new-icon --category chain --name Taiko --svg path/to/taiko.svg \
 *     --mono path/to/taiko.mono.svg --source https://taiko.xyz \
 *     --slug taiko --chain-id 167000
 *
 * An icon of a dynamic category (bridge, chain, coin, defi, dex, exchange,
 * oracle, wallet) needs --mono and at least one lookup key its category
 * accepts: --slug, --chain-id (chain) or --ticker (coin), each repeatable.
 *
 * What it does:
 *   1. Optimizes the SVG(s) with SVGO and normalizes the root element
 *      (the input files are only read, never modified)
 *   2. Puts the artwork on the canonical 64×64 grid following the fill rule
 *      ("Optical size" in CONTRIBUTING.md), measured in Chromium, and checks
 *      that the result renders like the input
 *   3. Writes icons/<category>/<slug>.svg (+ .mono.svg) and <slug>.json,
 *      with the lookup keys
 *   4. Regenerates src/ via the icon pipeline
 *   5. Prints the remaining manual steps (Mono variant, checks, changeset)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { withChromium } from './build-icons/chromium.ts';
import {
  CATEGORIES,
  DYNAMIC_CATEGORIES,
  isCategory,
  kebab,
  validateSvg,
} from './build-icons/lib.ts';
import {
  LOOKUP_FIELDS,
  LOOKUP_MAPS,
  type LookupField,
} from './build-icons/meta.ts';
import {
  createOptimizer,
  normalizeRoot,
  type Optimizer,
} from './build-icons/normalize.ts';
import {
  normalizeChecked,
  verifyOnGrid,
} from './build-icons/optical-normalize.ts';
import {
  assertUnitMeta,
  type IconUnitMeta,
  type LookupKeys,
  SCHEMA_REF,
  type Variant,
} from './build-icons/unit.ts';
import { getAttr, parseSvg, serializeSvg } from './build-icons/xml.ts';

const ROOT = resolve(import.meta.dirname, '..');

function fail(error: unknown): never {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const USAGE = `Usage: pnpm run new-icon --category <category> --name <PascalName> --svg <file>
         [--mono <file>] [--source <url>]
         [--slug <slug>]... [--chain-id <id>]... [--ticker <TICKER>]...

Icons of a dynamic category need --mono and at least one lookup key:
--ticker for coin, --slug (or --chain-id) for chain, --slug for the rest.
Dynamic categories: ${DYNAMIC_CATEGORIES.join(', ')}.`;

/** The option that sets each lookup field. */
const LOOKUP_OPTION: Readonly<Record<LookupField, string>> = {
  slugs: '--slug',
  chainIds: '--chain-id',
  tickers: '--ticker',
};

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
        slug: { type: 'string', multiple: true },
        'chain-id': { type: 'string', multiple: true },
        ticker: { type: 'string', multiple: true },
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
const {
  category,
  name,
  svg: svgPath,
  mono: monoPath,
  source,
  slug: slugs = [],
  'chain-id': chainIdArgs = [],
  ticker: tickers = [],
} = parsed;
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

for (const id of chainIdArgs) {
  if (!/^[1-9]\d*$/.test(id)) {
    usageError(`--chain-id must be a positive decimal integer (got '${id}')`);
  }
}
const lookupKeys: LookupKeys = {
  ...(slugs.length > 0 && { slugs }),
  ...(chainIdArgs.length > 0 && { chainIds: chainIdArgs.map(Number) }),
  ...(tickers.length > 0 && { tickers }),
};
const lookupFields = LOOKUP_MAPS.filter(map => map.category === category).map(
  map => map.field,
);
const lookupOptions =
  lookupFields.map(field => LOOKUP_OPTION[field]).join(', ') || 'none';
for (const field of LOOKUP_FIELDS) {
  if (lookupKeys[field] !== undefined && !lookupFields.includes(field)) {
    usageError(
      `${LOOKUP_OPTION[field]} is not a lookup key of the ${category} category (allowed: ${lookupOptions}).`,
    );
  }
}
if (DYNAMIC_CATEGORIES.includes(category)) {
  if (Object.keys(lookupKeys).length === 0) {
    usageError(
      `Icons in the ${category} category need at least one lookup key (${lookupOptions}): the dynamic components find icons only by their keys.`,
    );
  }
  if (!monoPath) {
    usageError(
      `Icons in the ${category} category need --mono: the dynamic components render <Name> and <Name>Mono.`,
    );
  }
}

const slug = kebab(name);
const dir = join(ROOT, 'icons', category);
const jsonPath = join(dir, `${slug}.json`);
// The lookup keys' spelling (lowercase slugs, uppercase tickers), before
// any SVG is processed; the whole unit is checked again before writing.
try {
  assertUnitMeta(
    { $schema: SCHEMA_REF, name, kind: 'icon', variants: {}, ...lookupKeys },
    `icons/${category}/${slug}.json`,
  );
} catch (error) {
  usageError(error instanceof Error ? error.message : String(error));
}
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
    // The same checks the generator applies when it loads icons/.
    validateSvg(root, getAttr(root, 'fill'));
  } catch (error) {
    return fail(error);
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

/**
 * Optical-size normalization (scripts/build-icons/optical.ts): the colored
 * artwork and its mono share one transform when their viewBoxes match.
 */
async function toGrid(): Promise<void> {
  const sources = [...ingested].map(([suffix, { variant, svg }]) => ({
    suffix,
    file: variant.file,
    path: `icons/${category}/${variant.file}`,
    svg,
  }));
  const { files, checks, problems } = await withChromium(async run => {
    const result = await normalizeChecked([sources], optimize, run);
    const afterOf = new Map(result.files.map(f => [f.file, f.after]));
    return {
      ...result,
      problems: await verifyOnGrid(
        [sources.map(v => ({ ...v, svg: afterOf.get(v.file) ?? v.svg }))],
        run,
      ),
    };
  });
  const failures = [
    ...checks
      .filter(c => !c.ok)
      .map(
        c =>
          `${c.path}: the artwork renders differently on the 64×64 grid (bounds shift ${c.boundsShift.toFixed(1)}px, ${(c.comparison.mismatch * 100).toFixed(2)}% of cells differ); check its masks and clip paths`,
      ),
    ...problems.map(p => `${p.path}: ${p.message}`),
  ];
  if (failures.length > 0) {
    fail(new Error(failures.join('\n')));
  }
  for (const file of files) {
    const [suffix, entry] =
      [...ingested].find(([, e]) => e.variant.file === file.file) ?? [];
    if (suffix === undefined || entry === undefined) {
      continue;
    }
    try {
      validateSvg(
        parseSvg(file.after, file.path),
        getAttr(parseSvg(entry.svg), 'fill'),
      );
    } catch (error) {
      fail(error);
    }
    ingested.set(suffix, { variant: entry.variant, svg: file.after });
  }
}
try {
  await toGrid();
} catch (error) {
  fail(error);
}

const meta: IconUnitMeta = {
  $schema: SCHEMA_REF,
  name,
  kind: 'icon',
  ...(source ? { source: [source] } : {}),
  variants: Object.fromEntries(
    [...ingested].map(([suffix, { variant }]) => [suffix, variant]),
  ),
  ...lookupKeys,
};

// Validate the unit exactly as the generator will (e.g. a root fill that is
// not a hex color, or a multi-line --source), before anything is written.
const metaJson = `${JSON.stringify(meta, null, 2)}\n`;
try {
  assertUnitMeta(JSON.parse(metaJson), `icons/${category}/${slug}.json`);
} catch (error) {
  fail(error);
}

// Every input was processed successfully; only now touch icons/. If the
// generator still rejects the unit (it also checks it against the rest of
// the category), remove the new files so a retry starts from a clean tree.
const written = [
  ...[...ingested.values()].map(({ variant }) => join(dir, variant.file)),
  jsonPath,
];
const existing = written.find(path => existsSync(path));
if (existing !== undefined) {
  console.error(`${existing} already exists.`);
  process.exit(1);
}
for (const { variant, svg } of ingested.values()) {
  writeFileSync(join(dir, variant.file), svg);
}
writeFileSync(jsonPath, metaJson);
try {
  execFileSync(process.execPath, ['scripts/build-icons/cli.ts'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
} catch {
  for (const path of written) {
    rmSync(path, { force: true });
  }
  console.error(
    `Generation failed; removed the new files under icons/${category}/.`,
  );
  process.exit(1);
}

const steps = [
  ...(monoPath
    ? []
    : [
        `Add a Mono variant (icons/${category}/${slug}.mono.svg + "Mono" entry in the JSON),
     then re-run: pnpm run generate-icons — mono coverage is enforced by tests.`,
      ]),
  'Verify: pnpm test && pnpm run check',
  'Add a changeset: pnpm changeset',
];
console.log(`
Created icons/${category}/${slug}.{svg,json} and generated src/${category}/${name}.tsx.

Next steps:
${steps.map((step, i) => `  ${i + 1}. ${step}`).join('\n')}
`);
