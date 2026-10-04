#!/usr/bin/env node
/**
 * Emits the static SVG files into dist/svg/<category>/<ExportName>.svg,
 * straight from the icons/ source tree (no React rendering involved).
 *
 * Alias and re-export names are resolved to their artwork unit so every
 * public export keeps a same-named SVG file, matching the pre-existing
 * `./svg/*` contract.
 *
 * Internal ids (gradients, masks, clip paths) are prefixed per file with
 * `w3i-<category>-<kebab-name>_`, so any number of these files can be inlined
 * into one page without their ids colliding.
 */

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { namespaceIds } from './ids.ts';
import {
  CATEGORIES,
  type Category,
  isCaseOnlyRename,
  kebab,
  loadCategory,
  unitLinks,
  type VariantSource,
} from './lib.ts';
import { serializeSvg } from './xml.ts';

const ROOT = resolve(import.meta.dirname, '../..');

/** An export backed by artwork, or a reference to another export. */
type Entry =
  | { readonly variant: VariantSource }
  | { readonly ref: { readonly category: string; readonly name: string } };

/** The id prefix of `dist/svg/<category>/<name>.svg`. */
export const distSvgIdPrefix = (category: string, name: string): string =>
  `w3i-${category}-${kebab(name)}`;

/** The exports of one category that get a file: export name → entry. */
function categoryEntries(
  iconsDir: string,
  category: Category,
): Map<string, Entry> {
  const map = new Map<string, Entry>();
  for (const unit of loadCategory(iconsDir, category)) {
    for (const variant of unit.variants) {
      map.set(variant.exportName, { variant });
    }
    for (const link of unitLinks(unit)) {
      // Same component as its target, whose file a case-insensitive file
      // system could not tell apart from this one.
      if (isCaseOnlyRename(category, link)) {
        continue;
      }
      map.set(link.name, {
        ref: { category: link.targetCategory, name: link.targetName },
      });
    }
  }
  return map;
}

/**
 * Every dist/svg file: `<category>/<ExportName>.svg` → content.
 *
 * @param iconsDir the `icons/` source tree
 */
export function buildDistSvgs(iconsDir: string): Map<string, string> {
  /** category → export name → entry */
  const index = new Map<string, Map<string, Entry>>(
    CATEGORIES.map(category => [category, categoryEntries(iconsDir, category)]),
  );

  const resolveVariant = (
    category: string,
    name: string,
    depth = 0,
  ): VariantSource => {
    if (depth > 10) {
      throw new Error(`alias cycle at ${category}/${name}`);
    }
    const entry = index.get(category)?.get(name);
    if (!entry) {
      throw new Error(`unresolved export ${category}/${name}`);
    }
    return 'variant' in entry
      ? entry.variant
      : resolveVariant(entry.ref.category, entry.ref.name, depth + 1);
  };

  const files = new Map<string, string>();
  for (const [category, map] of index) {
    for (const name of map.keys()) {
      const { root } = resolveVariant(category, name);
      const svg = serializeSvg(
        namespaceIds(root, distSvgIdPrefix(category, name)),
      );
      files.set(`${category}/${name}.svg`, `${svg}\n`);
    }
  }
  return files;
}

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const out = join(ROOT, 'dist/svg');
  const files = buildDistSvgs(join(ROOT, 'icons'));
  rmSync(out, { recursive: true, force: true });
  for (const category of CATEGORIES) {
    mkdirSync(join(out, category), { recursive: true });
  }
  for (const [path, content] of files) {
    writeFileSync(join(out, path), content);
  }
  console.log(`Done: ${files.size} SVGs written to dist/svg/.`);
}
