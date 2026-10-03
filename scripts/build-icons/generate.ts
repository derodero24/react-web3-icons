/**
 * Computes every source file generated from the `icons/` tree, in memory:
 *
 *   src/<category>/<Name>.tsx       one module per unit (custom units excepted)
 *   src/<category>/index.ts         the category barrel
 *   src/dynamic/imports/<cat>.ts    per-icon lazy import maps
 *   icons/schema.json               JSON Schema of the unit definitions
 */

import { join } from 'node:path';
import type { Formatter } from './format.ts';
import {
  CATEGORIES,
  DYNAMIC_CATEGORIES,
  emitDynamicImports,
  generateCategory,
  loadCategory,
} from './lib.ts';
import type { Outputs } from './outputs.ts';
import { UNIT_JSON_SCHEMA } from './unit.ts';

/**
 * @param root repository root; units are read from `<root>/icons`
 * @param format formats a generated TypeScript file (see format.ts)
 */
export function generateIconSources(root: string, format: Formatter): Outputs {
  const iconsDir = join(root, 'icons');
  const files = new Map<string, string>();
  const keep = new Set<string>();
  const add = (path: string, content: string): void => {
    files.set(path, format(path, content));
  };

  for (const category of CATEGORIES) {
    const units = loadCategory(iconsDir, category);
    const generated = generateCategory(units);
    for (const unit of units) {
      const path = `src/${category}/${unit.meta.name}.tsx`;
      const content = generated.files.get(`${unit.meta.name}.tsx`);
      if (content === undefined) {
        keep.add(path);
      } else {
        add(path, content);
      }
    }
    add(`src/${category}/index.ts`, generated.indexTs);
    if (DYNAMIC_CATEGORIES.includes(category)) {
      add(
        `src/dynamic/imports/${category}.ts`,
        emitDynamicImports(category, units),
      );
    }
  }
  files.set(
    'icons/schema.json',
    `${JSON.stringify(UNIT_JSON_SCHEMA, null, 2)}\n`,
  );

  return {
    files,
    ownedDirs: [
      ...CATEGORIES.map(category => `src/${category}`),
      'src/dynamic/imports',
    ],
    keep,
  };
}
