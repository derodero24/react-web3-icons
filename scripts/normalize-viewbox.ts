#!/usr/bin/env node
/**
 * Optical-size normalization of the icon sources (issue #704): puts every
 * icon on the canonical `0 0 64 64` grid following the fill rule in
 * scripts/build-icons/optical.ts ("Optical size" in CONTRIBUTING.md).
 *
 *   node scripts/normalize-viewbox.ts                 # rewrite icons/ in place
 *   node scripts/normalize-viewbox.ts --check         # only report; exit 1 on drift
 *   node scripts/normalize-viewbox.ts icons/chain/ethereum.json …  # these units
 *   node scripts/normalize-viewbox.ts --report out.json  # per-file details
 *
 * Every rewritten source is pixel-checked against the original (rendered
 * old-at-new-position vs new); the script refuses to write when a check
 * fails. Sources already on the grid that follow the rule keep their
 * geometry and only go through SVGO, so re-running it is a no-op. Run
 * `pnpm run generate-icons` afterwards.
 * Needs Chromium through Playwright.
 */

import { writeFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { withChromium } from './build-icons/chromium.ts';
import { CATEGORIES, loadCategory, validateSvg } from './build-icons/lib.ts';
import { createOptimizer } from './build-icons/normalize.ts';
import {
  gridBox,
  normalizeChecked,
  type SourceVariant,
  verifyOnGrid,
} from './build-icons/optical-normalize.ts';
import { isArtwork } from './build-icons/unit.ts';
import { parseSvg } from './build-icons/xml.ts';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    check: { type: 'boolean' },
    report: { type: 'string' },
  },
});
const only = new Set(positionals.map(p => relative(ROOT, resolve(p))));

interface Unit {
  readonly path: string;
  readonly variants: readonly (SourceVariant & {
    readonly fill: string | undefined;
  })[];
}

const units: Unit[] = [];
for (const category of CATEGORIES) {
  for (const unit of loadCategory(ICONS, category)) {
    if (!isArtwork(unit.meta) || (only.size > 0 && !only.has(unit.path))) {
      continue;
    }
    units.push({
      path: unit.path,
      variants: unit.variants.map(v => ({
        suffix: v.suffix,
        file: basename(v.path),
        path: v.path,
        svg: v.svg,
        fill: v.fill,
      })),
    });
  }
}

const optimize = await createOptimizer(ROOT);
const { files, checks, problems } = await withChromium(async run => {
  const { files: normalized, checks: pixelChecks } = await normalizeChecked(
    units.map(u => u.variants),
    optimize,
    run,
  );
  const fillOf = new Map(
    units.flatMap(u => u.variants.map(v => [v.path, v.fill] as const)),
  );
  for (const file of normalized) {
    validateSvg(parseSvg(file.after, file.path), fillOf.get(file.path));
  }
  const afterOf = new Map(normalized.map(f => [f.path, f.after]));
  return {
    files: normalized,
    checks: pixelChecks,
    // The sources as they will be written, checked against the fill rule.
    problems: await verifyOnGrid(
      units.map(u =>
        u.variants.map(v => ({ ...v, svg: afterOf.get(v.path) ?? v.svg })),
      ),
      run,
    ),
  };
});

const changed = files.filter(f => f.changed);
const failed = checks.filter(c => !c.ok);
const measuredContainers = files.filter(
  f => f.plan.reason === 'measured' || f.plan.reason === 'sibling',
);

console.log(
  `${files.length} sources: ${changed.length} ${values.check ? 'not normalized' : 'rewritten'}, ${files.length - changed.length} unchanged.`,
);
console.log(
  `containers: ${files.filter(f => f.plan.kind === 'container').length} (${measuredContainers.length} detected by measurement):`,
);
for (const f of measuredContainers) {
  console.log(`  ${f.path} (${f.plan.reason})`);
}
for (const c of failed) {
  const { maxDiff, meanDiff, mismatch } = c.comparison;
  console.log(
    `PIXEL CHECK FAILED ${c.path}: bounds shift ${c.boundsShift.toFixed(2)}px, max ${maxDiff.toFixed(1)}, mean ${meanDiff.toFixed(3)}, mismatch ${(mismatch * 100).toFixed(2)}%`,
  );
}
console.log(
  `pixel check: ${checks.length - failed.length} of ${checks.length} rewritten sources pass.`,
);
for (const f of files.filter(file => file.plan.overflow)) {
  console.log(
    f.plan.clip
      ? `overflowed its old viewBox (clip kept, KEEP_VIEWBOX_CLIP): ${f.path}`
      : `overflowed its old viewBox (now shown whole): ${f.path}`,
  );
}
for (const p of problems) {
  console.log(`OFF THE GRID RULE ${p.path}: ${p.message}`);
}

if (values.report) {
  const checkOf = new Map(checks.map(c => [c.path, c]));
  writeFileSync(
    values.report,
    `${JSON.stringify(
      files.map(f => ({
        path: f.path,
        changed: f.changed,
        kind: f.plan.kind,
        overflow: f.plan.overflow,
        clip: f.plan.clip,
        reason: f.plan.reason ?? null,
        sharedWith: f.plan.sharedWith ?? null,
        fitted: f.plan.fitted,
        transform: f.plan.transform,
        onGrid: gridBox(f.plan),
        check: checkOf.get(f.path) ?? null,
        // The rewritten source of a failing check, for inspection.
        ...(checkOf.get(f.path)?.ok === false ? { after: f.after } : {}),
      })),
      null,
      2,
    )}\n`,
  );
}

if (values.check) {
  process.exitCode =
    changed.length > 0 || failed.length > 0 || problems.length > 0 ? 1 : 0;
} else if (failed.length > 0 || problems.length > 0) {
  console.error('Nothing written: fix the failing sources first.');
  process.exitCode = 1;
} else {
  for (const f of changed) {
    writeFileSync(join(ROOT, f.path), f.after);
  }
  if (changed.length > 0) {
    console.log('Now run: pnpm run generate-icons');
  }
}
