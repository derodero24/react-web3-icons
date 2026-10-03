/**
 * Mono-quality audit: rasterizes every colored/mono variant pair and flags
 * pairs whose mono departs from the colored artwork (see "Mono design rules"
 * in docs/icon-variants.md).
 *
 * Used by scripts/audit-mono.ts (a report, through Playwright) and by the
 * visual test project (test/visual/mono-audit.test.ts, which fails on any
 * flagged pair outside {@link MONO_AUDIT_ALLOWLIST}).
 *
 * `measureMonoPairs` runs in Chromium: through Playwright's `page.evaluate`,
 * which serializes the function, and directly in the visual test project.
 * It must therefore be self-contained: everything it uses is defined inside
 * it. The module has type-only imports.
 */

import type { Category } from './lib.ts';

/** `<category>/<ExportName of the colored variant>`, e.g. `coin/Atom`. */
export type PairId = `${Category}/${string}`;

/** A colored variant and its mono counterpart (`Foo` / `FooMono`, …). */
export interface MonoPair {
  readonly id: PairId;
  /** SVG source of the colored variant. */
  readonly colored: string;
  /** SVG source of the mono variant. */
  readonly mono: string;
}

/**
 * Metrics of one pair, measured on a 128×128 raster (alpha > 24 = ink).
 * Footprints fill enclosed holes, so knockout monos compare fairly.
 */
export interface MonoMetrics {
  /** Footprint overlap between colored and mono (1 = identical). */
  readonly iou: number;
  /** Mono footprint area / colored footprint area. */
  readonly ink: number;
  /** Mono edge count / colored colour-boundary count (detail retention). */
  readonly edge: number;
  /** Best luminance threshold of the colored artwork (see `refMiss`). */
  readonly refT: number;
  /**
   * Pixel disagreement (%) between the mono ink and the colored artwork
   * binarized at `refT`: a high value means the mono departs from a straight
   * black-and-white reading of the original.
   */
  readonly refMiss: number;
  /**
   * Subject and background luminance are too close for the threshold
   * reference (near-solid or near-empty): `refMiss` says nothing then.
   */
  readonly refDegenerate: boolean;
}

export type MonoResult =
  | { readonly id: PairId; readonly error: string }
  | ({ readonly id: PairId; readonly error?: never } & MonoMetrics);

/** A unit's variants, as far as pairing needs them. */
export interface PairableUnit {
  readonly category: Category;
  /** `meta.name` of the unit (the base export name). */
  readonly name: string;
  readonly kind: string;
  readonly variants: readonly {
    readonly suffix: string;
    readonly svg: string;
  }[];
}

/**
 * Every colored variant of an icon unit that has a `…Mono` counterpart
 * (`""` → `Mono`, `Circle` → `CircleMono`, …), in declaration order.
 */
export function monoPairs(units: readonly PairableUnit[]): MonoPair[] {
  const pairs: MonoPair[] = [];
  for (const unit of units) {
    if (unit.kind !== 'icon') {
      continue;
    }
    const svgBySuffix = new Map(unit.variants.map(v => [v.suffix, v.svg]));
    for (const { suffix, svg } of unit.variants) {
      if (suffix.endsWith('Mono')) {
        continue;
      }
      const mono = svgBySuffix.get(`${suffix}Mono`);
      if (mono !== undefined) {
        pairs.push({
          id: `${unit.category}/${unit.name}${suffix}`,
          colored: svg,
          mono,
        });
      }
    }
  }
  return pairs;
}

/**
 * Flag thresholds. They mirror the initial audit of #746; a pair is flagged
 * when any of them is crossed (`refMiss` only with a usable reference).
 */
export const MONO_THRESHOLDS = {
  /** Footprint overlap below this: silhouette or impression mismatch. */
  minIou: 0.85,
  /** Footprint ratio below this: container or large parts dropped. */
  minInk: 0.7,
  /** Edge ratio below this: the mono lost the colored mark's detail. */
  minEdge: 0.3,
  /** Threshold-reference disagreement (%) above this. */
  maxRefMiss: 8,
} as const;

/**
 * Why a pair is flagged (empty when it is not). `margin` > 1 tightens every
 * threshold by that factor: an allowlisted pair is stale only when it also
 * passes the tightened thresholds, so rasterizer noise around a threshold
 * cannot flip it back and forth.
 */
export function monoProblems(result: MonoResult, margin = 1): string[] {
  if (result.error !== undefined) {
    return [`render error: ${result.error}`];
  }
  const t = MONO_THRESHOLDS;
  const problems: string[] = [];
  if (result.iou < t.minIou * margin) {
    problems.push(`iou ${result.iou.toFixed(2)} < ${t.minIou}`);
  }
  if (result.ink < t.minInk * margin) {
    problems.push(`ink ${result.ink.toFixed(2)} < ${t.minInk}`);
  }
  if (result.edge < t.minEdge * margin) {
    problems.push(`edge ${result.edge.toFixed(2)} < ${t.minEdge}`);
  }
  if (!result.refDegenerate && result.refMiss > t.maxRefMiss / margin) {
    problems.push(`refMiss ${result.refMiss}% > ${t.maxRefMiss}%`);
  }
  return problems;
}

/** Why a pair that trips the thresholds is accepted. */
export type MonoAllowance =
  | {
      /**
       * The mono was reviewed on component-rendered proof sheets (colored /
       * mono at 16–128 px on light and dark) and reads as the colored mark;
       * the metric misjudges it (knockouts open to the edge, gradients that
       * inflate the colour-boundary count, a degenerate reference, …).
       */
      readonly kind: 'false-positive';
      readonly reason: string;
    }
  | {
      /** A known problem left for a tracked decision or redraw. */
      readonly kind: 'pending';
      /** The issue or PR tracking it. */
      readonly issue: `#${number}`;
      readonly reason: string;
    };

/**
 * Pairs the audit flags that are accepted. Keep it short: fix the mono
 * instead when it does not read as the colored mark. An entry goes stale
 * (and the visual test fails) once its pair passes the thresholds with a
 * margin.
 */
export const MONO_AUDIT_ALLOWLIST: Readonly<Record<PairId, MonoAllowance>> = {
  'bridge/Stargate': {
    kind: 'false-positive',
    reason:
      'Open petal ring: the flood fill enters the gaps (refMiss is 0.07%).',
  },
  'chain/Astar': {
    kind: 'false-positive',
    reason:
      'The rainbow gradient of the knot inflates the colour-boundary count; the inked knot reads fully.',
  },
  'chain/Scroll': {
    kind: 'false-positive',
    reason:
      'Container polarity: the beige tile becomes ink with the scroll knocked out, so the threshold reference is inverted.',
  },
  'chain/Zora': {
    kind: 'false-positive',
    reason:
      'A gradient sphere: the mono is the solid disc, and the gradient inflates the colour-boundary count.',
  },
  'coin/Icp': {
    kind: 'false-positive',
    reason:
      'Knockout seams keep the blue strand over the orange and purple loops and open the loop counters to the background, so the footprint flood fill enters them.',
  },
  'coin/Shib': {
    kind: 'false-positive',
    reason:
      'The gap that keeps the head apart from the disc opens between the ears and joins the muzzle knockout, so the footprint flood fill enters it.',
  },
  'defi/RocketPool': {
    kind: 'false-positive',
    reason:
      'The gradient disc and rim inflate the colour-boundary count; the rocket knockout reads at every size.',
  },
  'devtool/Drizzle': {
    kind: 'false-positive',
    reason: 'Threshold-faithful (refMiss 2.0%); kept as-is.',
  },
  'dex/Aerodrome': {
    kind: 'false-positive',
    reason:
      'All five stripes are ink, kept apart by knockout seams; the pale #9CADFF and near-white #F5F3E6 stripes fall above the threshold cut of the reference.',
  },
  'dex/Camelot': {
    kind: 'false-positive',
    reason:
      'Knockout polarity: the cream chevrons and blade are holes in the mono and open into the background at the top of the blade, so the footprint flood fill enters them.',
  },
  'dex/DydxSquare': {
    kind: 'false-positive',
    reason:
      'The gradient tile and the gradient X strokes inflate the colour-boundary count (the edge ratio sits on the threshold); the X knockout reads at every size.',
  },
  'dex/Osmosis': {
    kind: 'false-positive',
    reason: 'The wavy liquid surface narrows the flood-filled footprint.',
  },
  'explorer/Arbiscan': {
    kind: 'false-positive',
    reason:
      'The white strokes cut through the ring as in the colored mark, so the footprint flood fill enters the strokes and the ring gap.',
  },
  'explorer/CeloscanSquare': {
    kind: 'false-positive',
    reason:
      'Container polarity: the yellow tile becomes ink with the C knocked out, so the threshold reference is inverted.',
  },
  'marketplace/LooksRare': {
    kind: 'false-positive',
    reason:
      'The bright green diamond falls above the best threshold cut, which keeps only the black eye; the mono inks the diamond with the eye knocked out.',
  },
  'node/Drpc': {
    kind: 'false-positive',
    reason:
      'Knockout seams keep the prism faces apart and open the enclosed play triangle to the background, so the footprint flood fill enters it.',
  },
  'storage/Ipfs': {
    kind: 'false-positive',
    reason:
      'Translucent currentColor fill distinguishes the cube faces (allowed by mono rule 2); the gradient faces inflate the colour-boundary count.',
  },
  'tracker/DefiLlama': {
    kind: 'false-positive',
    reason:
      'The llama is knocked out of the D and opens at its bottom edge, so the footprint flood fill enters it.',
  },
  'wallet/MetaMaskSquare': {
    kind: 'false-positive',
    reason:
      'Like the colored variant, the fox is a featureless knockout; the antialiasing seams between the colored facets inflate the colour-boundary count.',
  },
  'wallet/RainbowWallet': {
    kind: 'false-positive',
    reason:
      'The band gradients inflate the colour-boundary count; the bands stay apart through knockout seams.',
  },
  'wallet/RainbowWalletCircle': {
    kind: 'false-positive',
    reason:
      'The band and disc gradients inflate the colour-boundary count; the bands stay apart through seams.',
  },
  'wallet/RainbowWalletSquare': {
    kind: 'false-positive',
    reason:
      'The band and tile gradients inflate the colour-boundary count; the bands stay apart through seams.',
  },
  'wallet/RainbowWalletSymbol': {
    kind: 'false-positive',
    reason:
      'The band gradients inflate the colour-boundary count, and the seams between the bands open the footprint at their ends.',
  },
  'wallet/TrustWalletCircle': {
    kind: 'false-positive',
    reason:
      'Container polarity: the white disc becomes ink with the shield knocked out, so the threshold reference is inverted.',
  },
  'wallet/TrustWalletSquare': {
    kind: 'false-positive',
    reason:
      'Container polarity: the white tile becomes ink with the shield knocked out, so the threshold reference is inverted.',
  },
  'wallet/ZerionCircle': {
    kind: 'false-positive',
    reason:
      'The gradient disc inflates the colour-boundary count; the Z knockout reads at every size.',
  },
};

/**
 * Rasterizes and measures every pair. Runs in the browser (serialized by
 * `page.evaluate`), so everything it uses must be defined inside it.
 */
export async function measureMonoPairs(
  pairs: readonly MonoPair[],
): Promise<MonoResult[]> {
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
      img.onerror = () => rej(new Error('the SVG failed to load'));
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

  const measure = async (p: MonoPair): Promise<MonoResult> => {
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

  const out: MonoResult[] = [];
  for (const p of pairs) {
    try {
      out.push(await measure(p));
    } catch (error) {
      out.push({
        id: p.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return out;
}
