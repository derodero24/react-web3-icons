/**
 * Computes every source file generated from the `icons/` tree, in memory:
 *
 *   src/<category>/<Name>.tsx       one module per unit
 *   src/<category>/index.ts         the category barrel
 *   src/dynamic/imports/<cat>.ts    per-icon lazy import maps and variants
 *   src/meta/index.ts               lookup maps (slugs, chain IDs, tickers)
 *   src/deprecated.ts               DEPRECATED_ICON_NAMES
 *   src/manifest/index.ts           ICON_MANIFEST
 *   icons/schema.json               JSON Schema of the unit definitions
 */

import { join } from 'node:path';
import { collectDynamic, emitDynamicImports } from './dynamic.ts';
import type { Formatter } from './format.ts';
import {
  CATEGORIES,
  DYNAMIC_CATEGORIES,
  generateCategory,
  loadCategory,
  type SourceUnit,
} from './lib.ts';
import { buildManifest, renderManifestModule } from './manifest.ts';
import { collectLookups, emitDeprecated, emitMeta } from './meta.ts';
import type { Outputs } from './outputs.ts';
import { UNIT_JSON_SCHEMA } from './unit.ts';

/**
 * @param root repository root; units are read from `<root>/icons`
 * @param format formats a generated TypeScript file (see format.ts)
 */
export function generateIconSources(root: string, format: Formatter): Outputs {
  const iconsDir = join(root, 'icons');
  const files = new Map<string, string>();
  const add = (path: string, content: string): void => {
    files.set(path, format(path, content));
  };

  const allUnits: SourceUnit[] = [];
  for (const category of CATEGORIES) {
    const units = loadCategory(iconsDir, category);
    allUnits.push(...units);
    const generated = generateCategory(units);
    for (const [file, content] of generated.files) {
      add(`src/${category}/${file}`, content);
    }
    add(`src/${category}/index.ts`, generated.indexTs);
  }
  // Lookups first: their checks (unique keys, Mono counterparts) are what
  // the dynamic import maps rely on.
  add('src/meta/index.ts', emitMeta(collectLookups(allUnits)));
  for (const category of DYNAMIC_CATEGORIES) {
    add(
      `src/dynamic/imports/${category}.ts`,
      emitDynamicImports(collectDynamic(category, allUnits)),
    );
  }
  add('src/deprecated.ts', emitDeprecated(allUnits));
  add('src/manifest/index.ts', renderManifestModule(buildManifest(allUnits)));
  files.set(
    'icons/schema.json',
    `${JSON.stringify(UNIT_JSON_SCHEMA, null, 2)}\n`,
  );

  return {
    files,
    ownedDirs: [
      ...CATEGORIES.map(category => `src/${category}`),
      'src/dynamic/imports',
      'src/meta',
      'src/manifest',
    ],
    keep: new Set(),
  };
}
