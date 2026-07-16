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
import { CATEGORIES, loadCategory } from './lib.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const ICONS = join(ROOT, 'icons');
const OUT = join(ROOT, 'dist/svg');

/** @type {Map<string, Map<string, { svg?: string, ref?: { category: string, name: string } }>>} */
const index = new Map();

function categoryOf(spec, current) {
  // '../chain/Polygon' → chain; './Pol' → current category
  const match = /^\.\.\/([a-z]+)\//.exec(spec);
  return match ? match[1] : current;
}

for (const category of CATEGORIES) {
  const map = new Map();
  index.set(category, map);
  for (const unit of loadCategory(ICONS, category)) {
    const { meta, svgs } = unit;
    if (meta.kind === 'icon' || meta.kind === 'custom') {
      for (const suffix of Object.keys(meta.variants)) {
        map.set(meta.name + suffix, { svg: svgs[suffix] });
      }
    }
    if (meta.reexport) {
      const refCategory = categoryOf(meta.reexport.from, category);
      for (const { of, as } of meta.reexport.exports) {
        map.set(as, { ref: { category: refCategory, name: of } });
      }
    }
    if (meta.aliasConst) {
      const refCategory = categoryOf(meta.aliasConst.importFrom, category);
      for (const { name, target } of meta.aliasConst.exports) {
        map.set(name, { ref: { category: refCategory, name: target } });
      }
    }
    for (const alias of meta.localAliases ?? []) {
      map.set(alias.name, { ref: { category, name: alias.target } });
    }
  }
}

function resolveSvg(category, name, depth = 0) {
  if (depth > 10) {
    throw new Error(`alias cycle at ${category}/${name}`);
  }
  const entry = index.get(category)?.get(name);
  if (!entry) {
    throw new Error(`unresolved export ${category}/${name}`);
  }
  return entry.svg ?? resolveSvg(entry.ref.category, entry.ref.name, depth + 1);
}

rmSync(OUT, { recursive: true, force: true });
let total = 0;
for (const [category, map] of index) {
  mkdirSync(join(OUT, category), { recursive: true });
  for (const name of map.keys()) {
    writeFileSync(join(OUT, category, `${name}.svg`), resolveSvg(category, name));
    total++;
  }
}
console.log(`Done: ${total} SVGs written to dist/svg/.`);
