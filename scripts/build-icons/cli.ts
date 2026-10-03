#!/usr/bin/env node
/**
 * Regenerates `src/<category>/`, the dynamic import maps, the lookup maps
 * (`src/meta`), `src/deprecated.ts`, the manifest (`src/manifest`) and
 * `icons/schema.json` from the `icons/` source tree.
 *
 *   pnpm run generate-icons            # write
 *   pnpm run generate-icons --check    # verify only (CI)
 *
 * Everything is generated and Biome-formatted in memory first, so a
 * malformed input fails before any file is touched. `--check` exits 1 when
 * a generated file is stale (inputs *or* generator changed) or orphaned.
 */

import { resolve } from 'node:path';
import { createFormatter } from './format.ts';
import { generateIconSources } from './generate.ts';
import { runGenerator } from './outputs.ts';

const ROOT = resolve(import.meta.dirname, '../..');

runGenerator({
  usage:
    'Usage: pnpm run generate-icons [--check]\n\nRegenerates src/<category>/, src/dynamic/imports/, src/meta/, src/deprecated.ts,\nsrc/manifest/ and icons/schema.json from icons/.',
  regenerate: 'pnpm run generate-icons',
  root: ROOT,
  build: () => generateIconSources(ROOT, createFormatter(ROOT)),
});
