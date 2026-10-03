#!/usr/bin/env node
/**
 * Regenerates the committed icon manifest module from the sources (icons/,
 * src/meta, src/deprecated.ts); no build is needed.
 *
 *   pnpm run generate-manifest            # writes src/manifest/index.ts
 *   pnpm run generate-manifest --check    # verify only (CI)
 *
 * `pnpm run build` emits the same entries as dist/manifest.json
 * (scripts/build-icons/emit-manifest-json.ts). test/manifest-sync.test.ts
 * additionally checks the module against the actual category exports.
 */

import { resolve } from 'node:path';
import { createFormatter } from './build-icons/format.ts';
import { CATEGORIES, loadCategory } from './build-icons/lib.ts';
import {
  buildManifest,
  renderManifestModule,
  sourceLookups,
} from './build-icons/manifest.ts';
import { runGenerator } from './build-icons/outputs.ts';

const ROOT = resolve(import.meta.dirname, '..');
const PATH = 'src/manifest/index.ts';

runGenerator({
  usage: `Usage: pnpm run generate-manifest [--check]\n\nRegenerates ${PATH} from icons/, src/meta and src/deprecated.ts.`,
  regenerate: 'pnpm run generate-manifest',
  root: ROOT,
  build: () => {
    const units = CATEGORIES.flatMap(category =>
      loadCategory(resolve(ROOT, 'icons'), category),
    );
    const entries = buildManifest({ units, ...sourceLookups() });
    const format = createFormatter(ROOT);
    return {
      files: new Map([[PATH, format(PATH, renderManifestModule(entries))]]),
      ownedDirs: [],
      keep: new Set(),
    };
  },
});
