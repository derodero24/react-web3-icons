// @vitest-environment node
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { snapHalfCircleArcs } from '../scripts/build-icons/arcs.ts';
import { CATEGORIES, loadCategory } from '../scripts/build-icons/lib.ts';
import {
  CANONICAL_VIEWBOX,
  checkUnitOnGrid,
  colouredSuffix,
  fillDeviation,
  fitTransform,
  formatTransform,
  isContainerArtwork,
  isContainerSuffix,
  type MeasuredVariant,
  mapBox,
  measurableSvg,
  OPTICAL_EXEMPTIONS,
  overflows,
  planUnit,
  toCanonicalGrid,
} from '../scripts/build-icons/optical.ts';
import type { Box, Measurement } from '../scripts/build-icons/raster.ts';
import { getAttr, parseSvg, serializeSvg } from '../scripts/build-icons/xml.ts';

/**
 * Optical sizing (issue #704, "Optical size" in CONTRIBUTING.md): every icon
 * source sits on the canonical 64×64 grid. Whether its painted box follows
 * the fill rule needs a browser, so test/visual/optical-size.test.ts checks
 * that; this file checks the viewBox and the pure geometry.
 */

const ROOT = join(import.meta.dirname, '..');
const ICONS = join(ROOT, 'icons');
const XMLNS = 'xmlns="http://www.w3.org/2000/svg"';

const box = (x: number, y: number, width: number, height: number): Box => ({
  x,
  y,
  width,
  height,
});

function measured(
  suffix: string,
  painted: Box,
  options: { viewBox?: Box; outer?: Box; footprint?: number } = {},
): MeasuredVariant {
  const measurement: Measurement = {
    kind: 'measure',
    viewBox: options.viewBox ?? box(0, 0, 100, 100),
    box: painted,
    outer: options.outer ?? painted,
    footprint: options.footprint ?? 0.5,
  };
  return { suffix, file: `${suffix || 'base'}.svg`, measurement };
}

describe('icon sources', () => {
  const variants = CATEGORIES.flatMap(category =>
    loadCategory(ICONS, category).flatMap(unit => unit.variants),
  );

  it.each(variants.map(v => [v.path, v.root] as const))(
    '%s uses the canonical viewBox',
    (_path, root) => {
      expect(getAttr(root, 'viewBox')).toBe(CANONICAL_VIEWBOX);
    },
  );

  it('exemptions name existing sources and give a reason', () => {
    for (const [path, reason] of Object.entries(OPTICAL_EXEMPTIONS)) {
      expect(existsSync(join(ROOT, path)), path).toBe(true);
      expect(reason.trim(), path).not.toBe('');
    }
  });
});

describe('fill rule', () => {
  it('fits a mark to 56 units and a container to 64, centred', () => {
    const mark = fitTransform(box(10, 20, 200, 100), 'mark');
    expect(mark.scale).toBe(0.28);
    const mapped = mapBox(box(10, 20, 200, 100), mark);
    expect(mapped.x).toBeCloseTo(4, 9);
    expect(mapped.y).toBeCloseTo(18, 9);
    expect(mapped.width).toBeCloseTo(56, 9);
    expect(mapped.height).toBeCloseTo(28, 9);
    const container = fitTransform(box(0, 0, 24, 24), 'container');
    expect(container).toEqual({ scale: 2.666_66, tx: 0, ty: 0 });
    expect(
      fillDeviation(mapBox(box(0, 0, 24, 24), container), 'container'),
    ).toBeLessThan(0.001);
  });

  it('rounds the scale down to 6 significant digits, nudged in the last', () => {
    const fitted = box(0, 0, 134, 134);
    expect(fitTransform(fitted, 'container').scale).toBe(0.477_611);
    expect(fitTransform(fitted, 'container', 3).scale).toBe(0.477_608);
  });

  it('classifies containers by suffix and by measured footprint', () => {
    expect(isContainerSuffix('Circle')).toBe(true);
    expect(isContainerSuffix('SquareMono')).toBe(true);
    expect(isContainerSuffix('CircleAlt')).toBe(true);
    expect(isContainerSuffix('')).toBe(false);
    expect(isContainerSuffix('Symbol')).toBe(false);
    expect(colouredSuffix('CircleMono')).toBe('Circle');
    expect(colouredSuffix('Mono')).toBe('');
    expect(colouredSuffix('Alt')).toBeUndefined();
    const disc = measured('', box(0, 0, 50, 50), { footprint: 0.99 });
    expect(isContainerArtwork(disc.measurement)).toBe(true);
    const ring = measured('', box(0, 0, 50, 50), { footprint: 0.6 });
    expect(isContainerArtwork(ring.measurement)).toBe(false);
    const wide = measured('', box(0, 0, 60, 50), { footprint: 1 });
    expect(isContainerArtwork(wide.measurement)).toBe(false);
  });

  it('shares one transform per mono pair, fitted to their union', () => {
    const plans = planUnit([
      measured('', box(10, 10, 80, 40)),
      measured('Mono', box(10, 0, 80, 60)),
      measured('Circle', box(0, 0, 100, 100)),
      measured('CircleMono', box(0, 0, 100, 100), {
        viewBox: box(0, 0, 50, 50),
      }),
    ]);
    const plan = (file: string) => plans.find(p => p.file === file);
    expect(plan('base.svg')?.transform).toEqual(plan('Mono.svg')?.transform);
    expect(plan('Mono.svg')?.sharedWith).toBe('base.svg');
    expect(plan('base.svg')?.fitted).toEqual(box(10, 0, 80, 60));
    expect(plan('Circle.svg')?.kind).toBe('container');
    // Different source viewBoxes: fitted separately, same kind.
    expect(plan('CircleMono.svg')?.sharedWith).toBeUndefined();
    expect(plan('CircleMono.svg')?.kind).toBe('container');
    expect(plan('CircleMono.svg')?.reason).toBe('sibling');
  });

  it('fits artwork clipped by its old viewBox as a whole', () => {
    const clipped = measured('', box(0, 10, 100, 80), {
      outer: box(-20, 10, 140, 80),
    });
    expect(overflows(clipped.measurement)).toBe(true);
    const [plan] = planUnit([clipped]);
    expect(plan?.overflow).toBe(true);
    expect(plan?.fitted).toEqual(box(-20, 10, 140, 80));
  });

  it('reports sources off the grid or off the rule', () => {
    const grid = box(0, 0, 64, 64);
    const ok = measured('', box(4, 10, 56, 44), { viewBox: grid });
    expect(checkUnitOnGrid([ok])).toEqual([]);
    const small = measured('', box(8, 8, 48, 48), { viewBox: grid });
    expect(checkUnitOnGrid([small])[0]?.message).toMatch(/off the fill rule/);
    expect(checkUnitOnGrid([small], () => true)).toEqual([]);
    const old = measured('', box(4, 4, 56, 56));
    expect(checkUnitOnGrid([old])[0]?.message).toMatch(/viewBox/);
  });
});

describe('rewriting a source onto the grid', () => {
  it('wraps the artwork in the transform and keeps the root fill', () => {
    const root = parseSvg(
      `<svg ${XMLNS} viewBox="0 0 24 12" fill="#123456"><path d="M0 0h24v12z"/></svg>`,
    );
    const t = fitTransform(box(0, 0, 24, 12), 'mark');
    expect(serializeSvg(toCanonicalGrid(root, t))).toBe(
      `<svg ${XMLNS} viewBox="0 0 64 64" fill="#123456">\n  <g transform="${formatTransform(t)}">\n    <path d="M0 0h24v12z"/>\n  </g>\n</svg>`,
    );
    expect(formatTransform(t)).toBe('translate(4 18) scale(2.33333)');
  });

  it('resolves viewport percentages against the old viewBox', () => {
    const svg = `<svg ${XMLNS} viewBox="0 0 200 100"><mask id="a"><rect width="100%" height="200%" fill="#fff"/></mask><linearGradient id="g" x2="100%"/><radialGradient id="r" gradientUnits="userSpaceOnUse" r="50%"/><path d="M0 0h1" stroke-width="1%" mask="url(#a)"/></svg>`;
    const out = serializeSvg(
      toCanonicalGrid(parseSvg(svg), { scale: 0.5, tx: 0, ty: 0 }),
    );
    expect(out).toContain('<rect width="200" height="200" fill="#fff"/>');
    // objectBoundingBox fractions are left alone.
    expect(out).toContain('<linearGradient id="g" x2="100%"/>');
    expect(out).toContain('r="79.057"');
    expect(out).toContain('stroke-width="1.581"');
    expect(measurableSvg(svg)).toContain('width="200"');
  });

  it('leaves an identity transform out', () => {
    const root = parseSvg(
      `<svg ${XMLNS} viewBox="0 0 64 64"><path d="M0 0"/></svg>`,
    );
    expect(
      toCanonicalGrid(root, { scale: 1, tx: 0, ty: 0 }).children[0]?.tag,
    ).toBe('path');
  });
});

describe('half-circle arcs after rounding', () => {
  it('rounds radii down when they exceed the half chord by one step', () => {
    // r 15.87 over a 31.73 chord: no longer a half circle once rounded.
    expect(
      snapHalfCircleArcs('M32 52.13V43.6a15.87 15.87 0 0 0 0-31.73', 2),
    ).toBe('M32 52.13V43.6a15.86 15.86 0 0 0 0-31.73');
    expect(snapHalfCircleArcs('M10 10A5.01 5.01 0 1 0 10 20z', 2)).toBe(
      'M10 10A5 5 0 1 0 10 20z',
    );
    // Packed flags, and numbers kept apart.
    expect(snapHalfCircleArcs('m1 1a.5.5 0 01.99 0', 2)).toBe(
      'm1 1a.49 .49 0 01.99 0',
    );
  });

  it('leaves other arcs and unparsable data alone', () => {
    for (const d of [
      'M0 32a32 32 0 1 0 64 0A32 32 0 1 0 0 32', // exact half circles
      'M0 0a10 10 0 0 1 15 0', // a shallow arc
      'M0 0a5.1 5.1 0 0 1 10 0', // more than one step too large
      'M0 0A1 2 30 1 1 3 4z', // radii too small already
      'M0 0h1x', // not path data
      'M0 0l1', // an incomplete argument group
    ]) {
      expect(snapHalfCircleArcs(d, 2), d).toBe(d);
    }
  });

  it('tracks the pen through every command', () => {
    // The arc spans 10 units only if every command moved the pen right.
    const d =
      'M0 0H4V4h-4v-4L2 2l1 1C3 3 3 3 4 4c0 0 0 0 1 1S5 5 6 6s0 0 1 1Q7 7 8 8q0 0 1 1T10 10t1 1zm2 2 1 1A5.01 5.01 0 0 0 13 3';
    expect(snapHalfCircleArcs(d, 2)).toBe(d.replace('A5.01 5.01', 'A5 5'));
  });
});
