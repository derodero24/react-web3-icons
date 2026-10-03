#!/usr/bin/env node
/**
 * Emits dist/manifest.json, the machine-readable twin of the committed
 * `src/manifest/index.ts`, derived from the same sources (see manifest.ts)
 * rather than from the build output.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { CATEGORIES, loadCategory } from './lib.ts';
import { buildManifest, sourceLookups } from './manifest.ts';

const ROOT = resolve(import.meta.dirname, '../..');

const units = CATEGORIES.flatMap(category =>
  loadCategory(join(ROOT, 'icons'), category),
);
const entries = buildManifest({ units, ...sourceLookups() });
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(
  join(ROOT, 'dist/manifest.json'),
  `${JSON.stringify(entries, null, 2)}\n`,
);
console.log(`dist/manifest.json written (${entries.length} entries).`);
