#!/usr/bin/env node
/**
 * Emits the build-time data of the docs site (example/) that the package
 * itself does not ship, from icons/ alone (no library build):
 *
 * - example/src/generated/catalog.json: every export's standalone SVG (the
 *   same markup as dist/svg) and the provenance of its unit (`source`,
 *   `notes` and the unit file);
 * - example/public/svg/<category>/<ExportName>.svg: the same files as
 *   dist/svg, which the gallery loads as images.
 *
 * The site runs it before `next build` and `next dev`. Both outputs are
 * gitignored.
 */

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { buildDistSvgs } from './emit-dist-svg.ts';
import {
  CATEGORIES,
  loadCategory,
  unitAllExportNames,
  unitLinks,
} from './lib.ts';

const ROOT = resolve(import.meta.dirname, '../..');
const OUT_DIR = join(ROOT, 'example/src/generated');
const SVG_DIR = join(ROOT, 'example/public/svg');

/** One export of the package, as the site reads it. */
interface CatalogExport {
  readonly category: string;
  readonly name: string;
  /** Unit file under icons/<category>/, without `.json`. */
  readonly unit: string;
  readonly source: readonly string[];
  readonly notes: readonly string[];
  /**
   * `<category>/<name>` of the export this one re-exports or aliases
   * (`coin/Eth` → `chain/Ethereum`), absent on artwork exports.
   */
  readonly target?: string;
  /** Standalone SVG markup, ids prefixed as in dist/svg. */
  readonly svg: string;
}

const iconsDir = join(ROOT, 'icons');
const svgs = buildDistSvgs(iconsDir);
const exports: CatalogExport[] = [];
for (const category of CATEGORIES) {
  for (const unit of loadCategory(iconsDir, category)) {
    const targets = new Map(
      unitLinks(unit).map(link => [
        link.name,
        `${link.targetCategory}/${link.targetName}`,
      ]),
    );
    for (const name of unitAllExportNames(unit)) {
      const svg = svgs.get(`${category}/${name}.svg`);
      // Case-only renames have no file of their own (see emit-dist-svg.ts);
      // the site skips them like every other deprecated alias.
      if (svg === undefined) {
        continue;
      }
      const target = targets.get(name);
      exports.push({
        category,
        name,
        unit: unit.slug,
        source: unit.meta.source ?? [],
        notes: unit.meta.notes ?? [],
        ...(target === undefined ? {} : { target }),
        svg: svg.trimEnd(),
      });
    }
  }
}

rmSync(SVG_DIR, { recursive: true, force: true });
for (const [path, content] of svgs) {
  const file = join(SVG_DIR, path);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, 'catalog.json'),
  `${JSON.stringify({ exports })}\n`,
);
console.log(
  `example/src/generated/catalog.json (${exports.length} exports) and example/public/svg/ (${svgs.size} files) written.`,
);
