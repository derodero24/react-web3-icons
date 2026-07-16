#!/usr/bin/env node
/**
 * Regenerates `src/<category>/` from the `icons/` source tree.
 *
 *   pnpm run generate-icons
 *
 * Writes one TSX module per icon unit plus each category's index.ts, runs
 * Biome over the generated files, and records content hashes in
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
  generateCategory,
  loadCategory,
  sha256,
} from './lib.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');
const SRC = join(ROOT, 'src');
const LOCK = join(ROOT, 'scripts/build-icons/icons.lock.json');

const lock = { units: {}, indexes: {} };
const written = [];

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

  for (const unit of units) {
    const inputHash = sha256(
      JSON.stringify(unit.meta) + Object.values(unit.svgs).join('\n'),
    );
    lock.units[`${category}/${unit.slug}`] = { input: inputHash };
  }
}

// Biome owns final formatting; hashes are taken after it runs so the sync
// test can compare committed files byte-for-byte without invoking Biome.
execFileSync('pnpm', ['exec', 'biome', 'format', '--write', ...written], {
  cwd: ROOT,
  stdio: 'inherit',
});

for (const category of CATEGORIES) {
  const units = loadCategory(ICONS, category);
  for (const unit of units) {
    if (unit.meta.kind === 'custom') {
      continue;
    }
    const path = join(SRC, category, `${unit.meta.name}.tsx`);
    lock.units[`${category}/${unit.slug}`].output = sha256(
      readFileSync(path, 'utf-8'),
    );
  }
  lock.indexes[category] = sha256(
    readFileSync(join(SRC, category, 'index.ts'), 'utf-8'),
  );
}

writeFileSync(LOCK, `${JSON.stringify(lock, null, 2)}\n`);
console.log(
  `Generated ${written.length} files across ${CATEGORIES.length} categories; lock updated.`,
);
