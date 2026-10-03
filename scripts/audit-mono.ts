#!/usr/bin/env node
/**
 * Mono-quality audit: rasterizes every colored/mono variant pair from the
 * icons/ source tree and reports pairs whose mono departs from the colored
 * silhouette (see "Mono design rules" in docs/icon-variants.md).
 *
 *   node scripts/audit-mono.ts            # table of outliers
 *   node scripts/audit-mono.ts --all      # full metric table
 *
 * Metrics per pair (128x128 raster, alpha>24 = ink):
 *   iou   — silhouette overlap between colored and mono (1 = identical)
 *   ink   — mono ink area / colored ink area (solid-blob or vanishing monos)
 *   edge  — mono edge count / colored color-boundary count (detail retention)
 *
 * Heuristic flags (tune with care, they mirror the initial audit):
 *   iou < 0.72        → silhouette/impression mismatch
 *   ink < 0.45        → mono much lighter than colored (container dropped?)
 *   ink > 1.45 && edge < 0.55 → mono went solid, detail lost
 */
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { CATEGORIES, loadCategory } from './build-icons/lib.ts';

const ICONS = join(resolve(import.meta.dirname, '..'), 'icons');
const showAll = process.argv.includes('--all');

interface Pair {
  readonly id: string;
  readonly colored: string;
  readonly mono: string;
}

type Result =
  | { readonly id: string; readonly error: true }
  | {
      readonly id: string;
      readonly error?: never;
      readonly iou: number;
      readonly ink: number;
      readonly edge: number;
      readonly refT: number;
      readonly refMiss: number;
      readonly refDegenerate: boolean;
    };

const pairs: Pair[] = [];
for (const category of CATEGORIES) {
  for (const { meta, variants } of loadCategory(ICONS, category)) {
    if (meta.kind !== 'icon') {
      continue;
    }
    const svgBySuffix = new Map(variants.map(v => [v.suffix, v.svg]));
    for (const { suffix, svg } of variants) {
      if (suffix.endsWith('Mono')) {
        continue;
      }
      const mono = svgBySuffix.get(suffix ? `${suffix}Mono` : 'Mono');
      if (mono === undefined) {
        continue;
      }
      pairs.push({
        id: `${category}/${meta.name}${suffix}`,
        colored: svg,
        mono,
      });
    }
  }
}

/**
 * Rasterizes and measures every pair. Runs in the browser (serialized by
 * `page.evaluate`), so everything it uses must be defined inside it.
 */
async function auditPairs(pairs: readonly Pair[]): Promise<Result[]> {
  const N = 128;
  type Mask = Uint8Array;

  async function raster(
    svgText: string,
    forceColor: boolean,
  ): Promise<Uint8ClampedArray> {
    const s = forceColor
      ? svgText.replace('<svg', '<svg color="#000"')
      : svgText;
    const url = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error('load'));
      img.src = url;
    });
    const c = new OffscreenCanvas(N, N);
    const ctx = c.getContext('2d');
    if (!ctx) {
      throw new Error('no 2d context');
    }
    const iw = img.width || N;
    const ih = img.height || N;
    const sc = Math.min(N / iw, N / ih);
    ctx.drawImage(img, (N - iw * sc) / 2, (N - ih * sc) / 2, iw * sc, ih * sc);
    URL.revokeObjectURL(url);
    return ctx.getImageData(0, 0, N, N).data;
  }
  const px = (d: Uint8ClampedArray, i: number): number => d[i] ?? 0;
  const at = (m: Mask, i: number): number => m[i] ?? 0;
  const mask = (d: Uint8ClampedArray): Mask => {
    const m = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) {
      m[i] = px(d, i * 4 + 3) > 24 ? 1 : 0;
    }
    return m;
  };
  const neighbours = (i: number): number[] => {
    const x = i % N;
    const y = Math.floor(i / N);
    return [
      x > 0 ? i - 1 : -1,
      x < N - 1 ? i + 1 : -1,
      y > 0 ? i - N : -1,
      y < N - 1 ? i + N : -1,
    ].filter(n => n >= 0);
  };
  /** Pixels reachable from the border without crossing ink. */
  const background = (m: Mask): Mask => {
    const bg = new Uint8Array(N * N);
    const stack: number[] = [];
    for (let k = 0; k < N; k++) {
      stack.push(k, (N - 1) * N + k, k * N, k * N + N - 1);
    }
    for (let i = stack.pop(); i !== undefined; i = stack.pop()) {
      if (!(at(bg, i) || at(m, i))) {
        bg[i] = 1;
        stack.push(...neighbours(i));
      }
    }
    return bg;
  };
  // outer footprint: fill enclosed holes so knockout monos compare fairly
  const filled = (m: Mask): Mask => {
    const bg = background(m);
    return m.map((v, i) => (at(bg, i) ? v : 1));
  };
  const ink = (m: Mask): number => m.reduce((a, b) => a + b, 0);
  const iou = (a: Mask, b: Mask): number => {
    let inter = 0;
    let union = 0;
    for (let k = 0; k < a.length; k++) {
      inter += at(a, k) & at(b, k);
      union += at(a, k) | at(b, k);
    }
    return union ? inter / union : 1;
  };
  /** Number of horizontal + vertical neighbour pairs whose keys differ. */
  const boundaries = (key: (i: number) => number): number => {
    let e = 0;
    for (let i = 0; i < N * N; i++) {
      if (i % N < N - 1 && key(i) !== key(i + 1)) {
        e++;
      }
      if (i + N < N * N && key(i) !== key(i + N)) {
        e++;
      }
    }
    return e;
  };
  const edges = (m: Mask): number => boundaries(i => at(m, i));
  // 3 bits per channel; transparent pixels form their own class.
  const colorEdges = (d: Uint8ClampedArray): number =>
    boundaries(i =>
      px(d, i * 4 + 3) < 24
        ? -1
        : ((px(d, i * 4) >> 5) << 6) |
          ((px(d, i * 4 + 1) >> 5) << 3) |
          (px(d, i * 4 + 2) >> 5),
    );
  const luminance = (d: Uint8ClampedArray, i: number): number =>
    px(d, i * 4) * 0.2126 +
    px(d, i * 4 + 1) * 0.7152 +
    px(d, i * 4 + 2) * 0.0722;

  // Threshold reference: binarize the colored art by luminance (best
  // threshold sweep) and measure disagreement with the mono ink. When
  // subject and background luminance are too close, the reference
  // degenerates to a near-solid or near-empty field -> flag instead.
  const thresholdReference = (
    cd: Uint8ClampedArray,
    md: Uint8ClampedArray,
    cf: Mask,
  ): { refT: number; refMiss: number; refDegenerate: boolean } => {
    const monoInk = new Uint8Array(N * N);
    const lum = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) {
      monoInk[i] = px(md, i * 4 + 3) > 128 && luminance(md, i) < 128 ? 1 : 0;
      const a = px(cd, i * 4 + 3) / 255;
      lum[i] = luminance(cd, i) * a + 255 * (1 - a);
    }
    const below = (t: number): Mask =>
      Uint8Array.from(lum, l => (l < t ? 1 : 0));
    let bestT = 128;
    let bestMiss = Number.POSITIVE_INFINITY;
    for (let t = 40; t <= 240; t += 5) {
      const ref = below(t);
      const miss = ref.reduce(
        (n, v, i) => n + (v === at(monoInk, i) ? 0 : 1),
        0,
      );
      if (miss < bestMiss) {
        bestMiss = miss;
        bestT = t;
      }
    }
    const refFrac = ink(below(bestT)) / Math.max(ink(cf), 1);
    return {
      refT: bestT,
      refMiss: Number(((100 * bestMiss) / (N * N)).toFixed(2)),
      refDegenerate: refFrac > 0.9 || refFrac < 0.08,
    };
  };

  const measure = async (p: Pair): Promise<Result> => {
    const cd = await raster(p.colored, false);
    const md = await raster(p.mono, true);
    const cm = mask(cd);
    const mm = mask(md);
    const cf = filled(cm);
    const mf = filled(mm);
    return {
      id: p.id,
      iou: iou(cf, mf),
      ink: ink(mf) / Math.max(ink(cf), 1),
      edge: edges(mm) / Math.max(colorEdges(cd), 1),
      ...thresholdReference(cd, md, cf),
    };
  };

  const out: Result[] = [];
  for (const p of pairs) {
    try {
      out.push(await measure(p));
    } catch {
      out.push({ id: p.id, error: true });
    }
  }
  return out;
}

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
const results = await page.evaluate(auditPairs, pairs);
await browser.close();

// Owner-approved designs that intentionally trip the generic thresholds
// (knockout polarity inversions, degenerate threshold references, wavy
// footprints). Reviewed on component-rendered proof sheets — see #746/#748.
const APPROVED: ReadonlySet<string> = new Set([
  'coin/Cake', // knockout polarity; threshold reference degenerate
  'dex/Osmosis', // wavy liquid surface narrows the flood-filled footprint
  'bridge/Stargate', // open petal ring: flood fill enters the gaps (refMiss 0.07%)
  'devtool/Drizzle', // threshold-faithful (refMiss 2.0%); kept as-is
  'defi/Liquity', // light-only palette degenerates the reference; ring+wave design owner-reviewed
]);
const flag = (r: Result): boolean =>
  !APPROVED.has(r.id) &&
  (r.error ||
    r.iou < 0.85 ||
    r.ink < 0.7 ||
    r.edge < 0.3 ||
    (!r.refDegenerate && r.refMiss > 8));
const iouOf = (r: Result): number => (r.error ? 0 : r.iou);
const rows = results
  .filter(r => showAll || flag(r))
  .sort((a, b) => iouOf(a) - iouOf(b));
console.log(
  `pairs: ${results.length}, flagged: ${results.filter(flag).length}`,
);
for (const r of rows) {
  console.log(
    r.error
      ? `${r.id.padEnd(48)} RENDER ERROR`
      : `${r.id.padEnd(48)} iou=${r.iou.toFixed(2)} ink=${r.ink.toFixed(2)} edge=${r.edge.toFixed(2)} refMiss=${r.refDegenerate ? 'degenerate' : `${r.refMiss}%`}${flag(r) ? '  ⚠' : ''}`,
  );
}
process.exitCode = 0;
