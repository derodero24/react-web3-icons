#!/usr/bin/env node
/**
 * Emits the static SVG files into dist/svg/<category>/<ExportName>.svg,
 * straight from the icons/ source tree (no React rendering involved).
 *
 * Alias and re-export names are resolved to their artwork unit so every
 * public export keeps a same-named SVG file, matching the pre-existing
 * `./svg/*` contract.
 */

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { CATEGORIES, loadCategory, unitLinks } from './lib.ts';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');
const OUT = join(ROOT, 'dist/svg');

/** An export backed by artwork, or a reference to another export. */
type Entry =
  | { readonly svg: string }
  | { readonly ref: { readonly category: string; readonly name: string } };

/** category → export name → entry */
const index = new Map<string, Map<string, Entry>>();

for (const category of CATEGORIES) {
  const map = new Map<string, Entry>();
  index.set(category, map);
  for (const unit of loadCategory(ICONS, category)) {
    for (const { exportName, svg } of unit.variants) {
      map.set(exportName, { svg });
    }
    for (const link of unitLinks(unit)) {
      map.set(link.name, {
        ref: { category: link.targetCategory, name: link.targetName },
      });
    }
  }
}

function resolveSvg(category: string, name: string, depth = 0): string {
  if (depth > 10) {
    throw new Error(`alias cycle at ${category}/${name}`);
  }
  const entry = index.get(category)?.get(name);
  if (!entry) {
    throw new Error(`unresolved export ${category}/${name}`);
  }
  return 'svg' in entry
    ? entry.svg
    : resolveSvg(entry.ref.category, entry.ref.name, depth + 1);
}

rmSync(OUT, { recursive: true, force: true });
let total = 0;
for (const [category, map] of index) {
  mkdirSync(join(OUT, category), { recursive: true });
  for (const name of map.keys()) {
    writeFileSync(
      join(OUT, category, `${name}.svg`),
      resolveSvg(category, name),
    );
    total++;
  }
}
console.log(`Done: ${total} SVGs written to dist/svg/.`);
