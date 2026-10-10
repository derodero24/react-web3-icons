// @vitest-environment node
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createFormatter } from '../scripts/build-icons/format.ts';
import { generateIconSources } from '../scripts/build-icons/generate.ts';
import { diffOutputs } from '../scripts/build-icons/outputs.ts';

/**
 * Guards the SVG-first pipeline: src/<category>/, src/dynamic/imports/,
 * src/meta/, src/deprecated.ts, src/icon-names.ts, src/manifest/ and
 * icons/schema.json are generated, and this test runs the generator in
 * memory and fails on any difference from the committed files — whether
 * icons/ or the generator changed, or a generated file was hand-edited or
 * orphaned. CI runs the same comparison via `--check`.
 */

const ROOT = join(import.meta.dirname, '..');
const format = createFormatter(ROOT);
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
});
