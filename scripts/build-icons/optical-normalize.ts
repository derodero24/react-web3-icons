/**
 * Puts the artwork of one icon unit on the canonical 64×64 grid (see
 * optical.ts for the fill rule): measures every variant in Chromium, plans
 * the transforms, rewrites the sources, re-optimizes them with SVGO, and
 * checks that each new rendering is the old one scaled and centred.
 *
 * Used by scripts/normalize-viewbox.ts (the v5 migration, and a re-check of
 * every source) and by scripts/new-icon.ts (at ingest).
 */

import type { RasterRunner } from './chromium.ts';
import {
  isSvgoNormalized,
  type Optimizer,
  optimizeToFixedPoint,
} from './normalize.ts';
import {
  CANONICAL_VIEWBOX,
  checkUnitOnGrid,
  type FilePlan,
  fillDeviation,
  GRID,
  gridViewOf,
  KEEP_VIEWBOX_CLIP,
  type MeasuredVariant,
  mapBox,
  mappedRect,
  measurableSvg,
  OPTICAL_EXEMPTIONS,
  planUnit,
  toCanonicalGrid,
  unwrapBareGroup,
  viewBoxOf,
} from './optical.ts';
import type { Comparison, Measurement, RasterResult } from './raster.ts';
import { getAttr, parseSvg, serializeSvg } from './xml.ts';

/** One variant of a unit as stored (or about to be stored) in icons/. */
export interface SourceVariant {
  readonly suffix: string;
  /** File name inside the category directory. */
  readonly file: string;
  /** Path for messages, e.g. `icons/chain/foo.svg`. */
  readonly path: string;
  readonly svg: string;
}

/** The outcome for one source file. */
export interface NormalizedFile {
  readonly file: string;
  readonly path: string;
  readonly before: string;
  readonly after: string;
  readonly plan: FilePlan;
  /** False when the source already followed the fill rule on the grid. */
  readonly changed: boolean;
}

/**
 * A source already on the grid is left alone when its fitted box is within
 * this many units of the fill rule (avoids churn on re-runs).
 */
const SETTLED = 0.25;

/** Rendering side, in pixels, of the pixel-safety comparison. */
export const CHECK_SIZE = 256;

/** Pixel-safety tolerances at CHECK_SIZE (see checkPixels). */
const MAX_POOLED_DIFF = 64;
const MAX_MISMATCH = 0.002;
const MAX_BOUNDS_SHIFT = 1.5;

function expectKind<K extends RasterResult['kind']>(
  result: RasterResult | undefined,
  kind: K,
  path: string,
): Extract<RasterResult, { kind: K }> {
  if (result === undefined) {
    throw new Error(`${path}: no raster result`);
  }
  if (result.kind === 'error') {
    throw new Error(`${path}: rendering failed: ${result.message}`);
  }
  if (result.kind !== kind) {
    throw new Error(`${path}: unexpected raster result ${result.kind}`);
  }
  return result as Extract<RasterResult, { kind: K }>;
}

/** Measures each distinct source of `variants`, keyed by path. */
export async function measureSources(
  variants: readonly SourceVariant[],
  run: RasterRunner,
): Promise<Map<string, Measurement>> {
  const files = [...new Map(variants.map(v => [v.path, v])).values()];
  const results = await run(
    files.map(v => ({ kind: 'measure' as const, svg: measurableSvg(v.svg) })),
  );
  return new Map(
    files.map((v, i) => [v.path, expectKind(results[i], 'measure', v.path)]),
  );
}

/** Measures the sources of `units` and checks them on the grid. */
export async function verifyOnGrid(
  units: readonly (readonly SourceVariant[])[],
  run: RasterRunner,
): Promise<{ readonly path: string; readonly message: string }[]> {
  const measurements = await measureSources(units.flat(), run);
  return units.flatMap(variants => {
    const pathOf = new Map(variants.map(v => [v.file, v.path]));
    const path = (file: string): string => pathOf.get(file) ?? file;
    return checkUnitOnGrid(measure(variants, measurements), file =>
      Object.hasOwn(OPTICAL_EXEMPTIONS, path(file)),
    ).map(problem => ({ path: path(problem.file), message: problem.message }));
  });
}

function measure(
  variants: readonly SourceVariant[],
  measurements: ReadonlyMap<string, Measurement>,
): MeasuredVariant[] {
  return variants.map(v => {
    const measurement = measurements.get(v.path);
    if (measurement === undefined) {
      throw new Error(`${v.path}: not measured`);
    }
    return {
      suffix: v.suffix,
      file: v.file,
      measurement,
      keepClip: Object.hasOwn(KEEP_VIEWBOX_CLIP, v.path),
    };
  });
}

/**
 * Plans and rewrites the sources of one unit. Sources that already sit on
 * the grid and follow the fill rule come back unchanged. `nudge` is passed
 * to fitTransform (see normalizeChecked).
 */
export function normalizeUnit(
  variants: readonly SourceVariant[],
  measurements: ReadonlyMap<string, Measurement>,
  optimize: Optimizer,
  nudge = 0,
): NormalizedFile[] {
  const measured = measure(variants, measurements);
  const byFile = new Map(variants.map(v => [v.file, v]));
  return planUnit(measured, nudge).map(plan => {
    const source = byFile.get(plan.file);
    if (source === undefined) {
      throw new Error(`${plan.file}: unknown source`);
    }
    const root = parseSvg(source.svg, source.path);
    const settled =
      getAttr(root, 'viewBox') === CANONICAL_VIEWBOX &&
      fillDeviation(plan.fitted, plan.kind) <= SETTLED;
    if (settled) {
      return {
        file: plan.file,
        path: source.path,
        before: source.svg,
        after: source.svg,
        plan,
        changed: false,
      };
    }
    const rewritten = serializeSvg(
      toCanonicalGrid(root, plan.transform, plan.clip),
    );
    const optimized = optimizeToFixedPoint(optimize, rewritten, source.path);
    return {
      file: plan.file,
      path: source.path,
      before: source.svg,
      after: withoutBareGroup(optimize, optimized, source.path),
      plan,
      changed: true,
    };
  });
}

/**
 * `optimized` with its leftover transform group dissolved (unwrapBareGroup)
 * when the result is still SVGO-normalized.
 */
function withoutBareGroup(
  optimize: Optimizer,
  optimized: string,
  path: string,
): string {
  const root = parseSvg(optimized, path);
  const unwrapped = `${serializeSvg(unwrapBareGroup(root))}\n`;
  return isSvgoNormalized(optimize, unwrapped, path)
    ? unwrapped
    : `${serializeSvg(root)}\n`;
}

/** Result of the pixel-safety check of one rewritten source. */
export interface PixelCheck {
  readonly path: string;
  readonly comparison: Comparison;
  /** Largest shift of an edge of the painted bounds, in pixels. */
  readonly boundsShift: number;
  readonly ok: boolean;
}

/**
 * Renders the old source through the region of its user space that the
 * transform maps onto the grid (so without its old viewBox clip), and the
 * new source, at the same size, and compares them: they must
 * agree up to antialiasing (painted bounds within 1.5 px at 256 px, 4×4
 * pooled cells within 64/255, at most 0.2% of cells above 48/255). A
 * failure points at a transform bug, or at a mask, clip path or viewport
 * percentage that did not follow the transform.
 */
export async function checkPixels(
  files: readonly NormalizedFile[],
  run: RasterRunner,
): Promise<PixelCheck[]> {
  const changed = files.filter(f => f.changed);
  const results = await run(
    changed.map(f => ({
      kind: 'compare' as const,
      size: CHECK_SIZE,
      // Rendered through another viewBox: resolve its percentages first.
      before: measurableSvg(f.before),
      // A kept clip is compared with the old viewport clip in place.
      ...(f.plan.clip
        ? {
            beforeRect: mappedRect(
              viewBoxOf(parseSvg(f.before, f.path)),
              f.plan.transform,
              CHECK_SIZE,
            ),
          }
        : {
            beforeView: gridViewOf(f.plan.transform),
            beforeRect: [0, 0, CHECK_SIZE, CHECK_SIZE] as const,
          }),
      after: f.after,
      afterRect: [0, 0, CHECK_SIZE, CHECK_SIZE] as const,
    })),
  );
  return changed.map((f, i) => {
    const comparison = expectKind(results[i], 'compare', f.path);
    const { beforeBounds: a, afterBounds: b } = comparison;
    const boundsShift =
      a && b
        ? Math.max(
            Math.abs(a.x - b.x),
            Math.abs(a.y - b.y),
            Math.abs(a.x + a.width - b.x - b.width),
            Math.abs(a.y + a.height - b.y - b.height),
          )
        : a === b
          ? 0
          : Number.POSITIVE_INFINITY;
    return {
      path: f.path,
      comparison,
      boundsShift,
      ok:
        boundsShift <= MAX_BOUNDS_SHIFT &&
        comparison.maxDiff <= MAX_POOLED_DIFF &&
        comparison.mismatch <= MAX_MISMATCH,
    };
  });
}

/** The fitted box of a plan on the grid (for reports). */
export function gridBox(plan: FilePlan): string {
  const box = mapBox(plan.fitted, plan.transform);
  const f = (n: number): string => n.toFixed(2);
  return `${f(box.x)} ${f(box.y)} ${f(box.width)}×${f(box.height)} of ${GRID}`;
}

/** Largest `nudge` normalizeChecked tries on a unit. */
const MAX_NUDGE = 16;

/**
 * Normalizes units and pixel-checks the rewritten sources. A unit with a
 * failing source is redone with its scale nudged down (fitTransform), up
 * to MAX_NUDGE times: SVGO bakes the transform into path data at 0.001
 * units, and for a few circles drawn as two arcs the rounded radius ends up
 * larger than half the rounded chord, which bulges the circle. A unit also
 * counts as failing when verifyOnGrid finds a problem. Failures that
 * survive every nudge are returned as is.
 */
export async function normalizeChecked(
  units: readonly (readonly SourceVariant[])[],
  optimize: Optimizer,
  run: RasterRunner,
): Promise<{ files: NormalizedFile[]; checks: PixelCheck[] }> {
  const measurements = await measureSources(units.flat(), run);
  let pending = units.map(variants => ({
    variants,
    files: normalizeUnit(variants, measurements, optimize),
  }));
  const done: { files: NormalizedFile[]; checks: PixelCheck[] }[] = [];
  for (let nudge = 1; pending.length > 0; nudge++) {
    const checks = await checkPixels(
      pending.flatMap(u => u.files),
      run,
    );
    // Also re-measure the rewritten sources: a bulging arc can stay within
    // the pixel tolerance yet poke out of the grid.
    const afterOf = new Map(
      pending.flatMap(u => u.files.map(f => [f.path, f.after] as const)),
    );
    const problems = await verifyOnGrid(
      pending.map(u =>
        u.variants.map(v => ({ ...v, svg: afterOf.get(v.path) ?? v.svg })),
      ),
      run,
    );
    const failing = new Set([
      ...checks.filter(c => !c.ok).map(c => c.path),
      ...problems.map(p => p.path),
    ]);
    const isFailing = (u: (typeof pending)[number]): boolean =>
      u.files.some(f => failing.has(f.path));
    for (const u of pending) {
      if (!isFailing(u) || nudge > MAX_NUDGE) {
        const paths = new Set(u.files.map(f => f.path));
        done.push({
          files: u.files,
          checks: checks.filter(c => paths.has(c.path)),
        });
      }
    }
    pending =
      nudge > MAX_NUDGE
        ? []
        : pending.filter(isFailing).map(u => ({
            variants: u.variants,
            files: normalizeUnit(u.variants, measurements, optimize, nudge),
          }));
  }
  return {
    files: done.flatMap(d => d.files),
    checks: done.flatMap(d => d.checks),
  };
}
