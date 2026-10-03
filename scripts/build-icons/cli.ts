#!/usr/bin/env node
/**
 * Regenerates `src/<category>/` from the `icons/` source tree.
 *
 *   pnpm run generate-icons
 *
 * Writes one TSX module per icon unit plus each category's index.ts (and the
 * per-icon lazy import maps under src/dynamic/imports/), runs Biome over the
 * generated files, and records content hashes in
 * `scripts/build-icons/icons.lock.json` so test/icons-sync.test.ts can detect
 * drift (icons/ edited without regeneration, or generated files hand-edited).
 *
 * Units marked `"kind": "custom"` keep their hand-written TSX untouched.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  CATEGORIES,
  DYNAMIC_CATEGORIES,
  emitDynamicImports,
  generateCategory,
  loadCategory,
  sha256,
} from './lib.ts';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');
const SRC = join(ROOT, 'src');
const LOCK = join(ROOT, 'scripts/build-icons/icons.lock.json');

interface LockedUnit {
  readonly key: string;
  readonly input: string;
  /** Generated module, or `undefined` for hand-written (custom) units. */
  readonly outputPath: string | undefined;
}

const lockedUnits: LockedUnit[] = [];
const written: string[] = [];

for (const category of CATEGORIES) {
  const units = loadCategory(ICONS, category);
  const { files, indexTs } = generateCategory(units);

  for (const [fileName, content] of files) {
    const path = join(SRC, category, fileName);
    writeFileSync(path, content);
    written.push(path);
  }
  const indexPath = join(SRC, category, 'index.ts');
  writeFileSync(indexPath, indexTs);
  written.push(indexPath);

  if (DYNAMIC_CATEGORIES.includes(category)) {
    const importsPath = join(SRC, 'dynamic/imports', `${category}.ts`);
    writeFileSync(importsPath, emitDynamicImports(category, units));
    written.push(importsPath);
  }

  for (const unit of units) {
    lockedUnits.push({
      key: `${category}/${unit.slug}`,
      input: sha256(
        JSON.stringify(unit.meta) +
          unit.variants.map(variant => variant.svg).join('\n'),
      ),
      outputPath:
        unit.meta.kind === 'custom'
          ? undefined
          : join(SRC, category, `${unit.meta.name}.tsx`),
    });
  }
}

// Biome owns final formatting; hashes are taken after it runs so the sync
// test can compare committed files byte-for-byte without invoking Biome.
execFileSync('pnpm', ['exec', 'biome', 'format', '--write', ...written], {
  cwd: ROOT,
  stdio: 'inherit',
});

const hashFile = (path: string): string => sha256(readFileSync(path, 'utf-8'));

const lock = {
  units: Object.fromEntries(
    lockedUnits.map(({ key, input, outputPath }) => [
      key,
      outputPath === undefined
        ? { input }
        : { input, output: hashFile(outputPath) },
    ]),
  ),
  indexes: Object.fromEntries(
    CATEGORIES.map(category => [
      category,
      hashFile(join(SRC, category, 'index.ts')),
    ]),
  ),
  dynamicImports: Object.fromEntries(
    CATEGORIES.filter(category => DYNAMIC_CATEGORIES.includes(category)).map(
      category => [
      category,
        hashFile(join(SRC, 'dynamic/imports', `${category}.ts`)),
      ],
    ),
  ),
};

writeFileSync(LOCK, `${JSON.stringify(lock, null, 2)}\n`);
console.log(
  `Generated ${written.length} files across ${CATEGORIES.length} categories; lock updated.`,
);
