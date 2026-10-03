// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createFormatter } from '../scripts/build-icons/format.ts';
import { generateIconSources } from '../scripts/build-icons/generate.ts';
import { CATEGORIES, loadCategory } from '../scripts/build-icons/lib.ts';
import {
  buildManifest,
  renderManifestModule,
  sourceLookups,
} from '../scripts/build-icons/manifest.ts';
import { diffOutputs } from '../scripts/build-icons/outputs.ts';

/**
 * Guards the SVG-first pipeline: src/<category>/, src/dynamic/imports/,
 * icons/schema.json and src/manifest/ are generated, and this test runs the
 * generators in memory and fails on any difference from the committed
 * files — whether icons/ or the generator changed, or a generated file was
 * hand-edited or orphaned. CI runs the same comparison via `--check`.
 */

const ROOT = join(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const format = createFormatter(ROOT);
const units = CATEGORIES.flatMap(category => loadCategory(ICONS, category));
/** Generating and formatting ~300 modules takes a few seconds under load. */
const TIMEOUT = 60_000;

describe('icons/ ↔ src/ pipeline sync', () => {
  it(
    'generated sources are up to date (run: pnpm run generate-icons)',
    () => {
      expect(diffOutputs(ROOT, generateIconSources(ROOT, format))).toEqual({
        changed: [],
        orphans: [],
      });
    },
    TIMEOUT,
  );

  it('src/manifest is up to date (run: pnpm run generate-manifest)', () => {
    const path = 'src/manifest/index.ts';
    const entries = buildManifest({ units, ...sourceLookups() });
    expect(readFileSync(join(ROOT, path), 'utf-8')).toBe(
      format(path, renderManifestModule(entries)),
    );
  });

  it('custom units keep hand-written modules with matching exports', () => {
    for (const unit of units.filter(u => u.meta.kind === 'custom')) {
      const source = readFileSync(
        join(ROOT, 'src', unit.category, `${unit.meta.name}.tsx`),
        'utf-8',
      );
      for (const { exportName } of unit.variants) {
        expect(source, `${unit.path}: expected export ${exportName}`).toContain(
          `export const ${exportName}`,
        );
      }
    }
  });
});
