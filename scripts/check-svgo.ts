#!/usr/bin/env node
/**
 * Reports icon sources that are not SVGO-normalized, i.e. that the
 * repository's svgo.config.js would still change (ignoring attribute order
 * and whitespace). `pnpm run new-icon` always writes normalized sources.
 *
 *   pnpm run check:svgo                      # every icons/**\/*.svg
 *   pnpm run check:svgo icons/chain/foo.svg  # just these files
 *
 * Exits 1 when any checked file is not normalized.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { CATEGORIES } from './build-icons/lib.ts';
import { createOptimizer, isSvgoNormalized } from './build-icons/normalize.ts';

const ROOT = resolve(import.meta.dirname, '..');

const { positionals } = parseArgs({ allowPositionals: true });
const files =
  positionals.length > 0
    ? positionals.map(file => relative(ROOT, resolve(file)))
    : CATEGORIES.flatMap(category =>
        readdirSync(join(ROOT, 'icons', category))
          .filter(file => file.endsWith('.svg'))
          .map(file => `icons/${category}/${file}`),
      );

const optimize = await createOptimizer(ROOT);
const stale = files.filter(
  file =>
    !isSvgoNormalized(optimize, readFileSync(join(ROOT, file), 'utf-8'), file),
);
for (const file of stale) {
  console.log(`not SVGO-normalized: ${file}`);
}
console.log(
  `${files.length - stale.length} of ${files.length} SVGs are SVGO-normalized.`,
);
if (stale.length > 0) {
  process.exitCode = 1;
}
