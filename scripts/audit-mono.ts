#!/usr/bin/env node
/**
 * Mono-quality audit: rasterizes every colored/mono variant pair from the
 * icons/ source tree and reports pairs whose mono departs from the colored
 * silhouette (see "Mono design rules" in docs/icon-variants.md).
 *
 *   node scripts/audit-mono.ts            # table of outliers
 *   node scripts/audit-mono.ts --all      # full metric table
 *
 * The metrics, thresholds and the allowlist live in build-icons/mono-audit.ts;
 * test/visual/mono-audit.test.ts fails on the same flags. Allowlisted pairs
 * are reported but not counted as flagged.
 */
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { CATEGORIES, loadCategory } from './build-icons/lib.ts';
import {
  MONO_AUDIT_ALLOWLIST,
  type MonoResult,
  measureMonoPairs,
  monoPairs,
  monoProblems,
} from './build-icons/mono-audit.ts';

const ICONS = join(resolve(import.meta.dirname, '..'), 'icons');
const showAll = process.argv.includes('--all');

const pairs = monoPairs(
  CATEGORIES.flatMap(category =>
    loadCategory(ICONS, category).map(({ meta, variants }) => ({
      category,
      name: meta.name,
      kind: meta.kind,
      variants,
    })),
  ),
);

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
const results = await page.evaluate(measureMonoPairs, pairs);
await browser.close();

const allowed = (r: MonoResult): boolean =>
  Object.hasOwn(MONO_AUDIT_ALLOWLIST, r.id);
const tripped = (r: MonoResult): boolean => monoProblems(r).length > 0;
const iouOf = (r: MonoResult): number => (r.error === undefined ? r.iou : 0);
const rows = results
  .filter(r => showAll || tripped(r))
  .sort((a, b) => iouOf(a) - iouOf(b));
const flagged = results.filter(r => tripped(r) && !allowed(r));
console.log(
  `pairs: ${results.length}, flagged: ${flagged.length} (+${results.filter(r => tripped(r) && allowed(r)).length} allowlisted)`,
);
for (const r of rows) {
  const mark = tripped(r) ? (allowed(r) ? '  (allowlisted)' : '  ⚠') : '';
  console.log(
    r.error === undefined
      ? `${r.id.padEnd(48)} iou=${r.iou.toFixed(2)} ink=${r.ink.toFixed(2)} edge=${r.edge.toFixed(2)} refMiss=${r.refDegenerate ? 'degenerate' : `${r.refMiss}%`}${mark}`
      : `${r.id.padEnd(48)} RENDER ERROR: ${r.error}${mark}`,
  );
}
process.exitCode = 0;
