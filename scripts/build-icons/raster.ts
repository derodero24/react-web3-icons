/**
 * Browser-side rasterization of icon sources, for the optical-size
 * normalization (see optical.ts and "Optical size" in CONTRIBUTING.md).
 *
 * `runRasterJobs` runs in Chromium: through Playwright's `page.evaluate`
 * (scripts/normalize-viewbox.ts, new-icon), which serializes the function,
 * and directly in the visual test project. It must therefore be
 * self-contained: everything it uses is defined inside it, and this module
 * imports nothing.
 */

/** An axis-aligned box in SVG user units. */
export interface Box {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** Measures the painted content of one SVG document. */
export interface MeasureJob {
  readonly kind: 'measure';
  readonly svg: string;
}

/**
 * Renders two SVG documents into the same square canvas, each drawn into
 * its own destination rectangle (canvas pixels), and compares the results.
 */
export interface CompareJob {
  readonly kind: 'compare';
  /** Canvas side in pixels. */
  readonly size: number;
  readonly before: string;
  /**
   * Replaces the viewBox of `before` (user units, stretched onto
   * `beforeRect`): renders the old artwork straight into the new pixel
   * frame instead of resampling an image drawn at a fractional size.
   */
  readonly beforeView?: readonly [number, number, number, number];
  readonly beforeRect: readonly [number, number, number, number];
  readonly after: string;
  readonly afterRect: readonly [number, number, number, number];
}

export type RasterJob = MeasureJob | CompareJob;

export interface Measurement {
  readonly kind: 'measure';
  /** The document's viewBox. */
  readonly viewBox: Box;
  /**
   * Tight box of the painted pixels (alpha > 0) inside the viewBox, in user
   * units; `null` when nothing is painted.
   */
  readonly box: Box | null;
  /**
   * Tight painted box without the viewBox clip (the viewport widened to
   * three times the viewBox): differs from `box` when the artwork overflows
   * the viewBox and is clipped there.
   */
  readonly outer: Box | null;
  /**
   * Share of the ellipse inscribed in `box` that the artwork's footprint
   * (its painted pixels with enclosed holes filled) covers: about 1 for a
   * solid disc or (rounded) square container.
   */
  readonly footprint: number;
}

export interface Comparison {
  readonly kind: 'compare';
  /** Painted-pixel bounds (alpha > 16) of each render, in canvas pixels. */
  readonly beforeBounds: Box | null;
  readonly afterBounds: Box | null;
  /** Largest per-channel difference between 4×4-pooled renders (0–255). */
  readonly maxDiff: number;
  /** Mean per-channel difference between the pooled renders (0–255). */
  readonly meanDiff: number;
  /** Share of pooled cells whose largest channel difference exceeds 48. */
  readonly mismatch: number;
}

export type RasterResult =
  | Measurement
  | Comparison
  | { readonly kind: 'error'; readonly message: string };

/** Runs the jobs in order; a failing job yields an `error` result. */
export async function runRasterJobs(
  jobs: readonly RasterJob[],
): Promise<RasterResult[]> {
  type Rect = readonly [number, number, number, number];

  const parseBox = (value: string | null): Rect => {
    const parts = (value ?? '')
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    const [x = 0, y = 0, w = 0, h = 0] = parts;
    if (parts.length !== 4 || !(w > 0 && h > 0)) {
      throw new Error(`malformed viewBox ${JSON.stringify(value)}`);
    }
    return [x, y, w, h];
  };

  const parse = (svg: string): SVGSVGElement => {
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const root = doc.documentElement;
    if (!(root instanceof SVGSVGElement)) {
      throw new Error('not an SVG document');
    }
    return root;
  };

  /**
   * Rasterizes `svg` with its viewBox replaced by `view` (user units),
   * stretched to exactly `w`×`h` pixels, drawn at (`x`, `y`) into a canvas
   * of `cw`×`ch` pixels.
   */
  const render = async (
    svg: string,
    view: Rect | null,
    [x, y, w, h]: Rect,
    cw: number,
    ch: number,
  ): Promise<Uint8ClampedArray> => {
    const root = parse(svg);
    if (view) {
      root.setAttribute('viewBox', view.join(' '));
      root.setAttribute('preserveAspectRatio', 'none');
    }
    root.setAttribute('width', String(w));
    root.setAttribute('height', String(h));
    const text = new XMLSerializer().serializeToString(root);
    const url = URL.createObjectURL(
      new Blob([text], { type: 'image/svg+xml' }),
    );
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('the SVG failed to load'));
        img.src = url;
      });
      const canvas = new OffscreenCanvas(cw, ch);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('no 2d canvas context');
      }
      ctx.drawImage(img, x, y, w, h);
      return ctx.getImageData(0, 0, cw, ch).data;
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  /** Pixel bounds [x0, y0, x1, y1) of the pixels with alpha > `min`. */
  const pixelBounds = (
    data: Uint8ClampedArray,
    w: number,
    h: number,
    min: number,
  ): Rect | null => {
    let x0 = w;
    let y0 = h;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if ((data[(y * w + x) * 4 + 3] ?? 0) > min) {
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = y;
        }
      }
    }
    return x1 < 0 ? null : [x0, y0, x1 + 1, y1 + 1];
  };

  /** Renders `view` at `long` pixels on its longer side; painted user box. */
  const paintedBox = async (
    svg: string,
    view: Rect,
    long: number,
  ): Promise<{
    box: Rect | null;
    data: Uint8ClampedArray;
    w: number;
    h: number;
  }> => {
    const [vx, vy, vw, vh] = view;
    const w = Math.max(1, Math.round(vw >= vh ? long : (long * vw) / vh));
    const h = Math.max(1, Math.round(vh >= vw ? long : (long * vh) / vw));
    const data = await render(svg, view, [0, 0, w, h], w, h);
    const px = pixelBounds(data, w, h, 0);
    const box: Rect | null = px
      ? [
          vx + (px[0] * vw) / w,
          vy + (px[1] * vh) / h,
          ((px[2] - px[0]) * vw) / w,
          ((px[3] - px[1]) * vh) / h,
        ]
      : null;
    return { box, data, w, h };
  };

  /** Pixels reachable from the canvas border without crossing ink. */
  const flood = (ink: Uint8Array, w: number, h: number): Uint8Array => {
    const outside = new Uint8Array(w * h);
    const stack = new Int32Array(w * h);
    let top = 0;
    const push = (i: number): void => {
      if (i >= 0 && !(outside[i] || ink[i])) {
        outside[i] = 1;
        stack[top++] = i;
      }
    };
    for (let x = 0; x < w; x++) {
      push(x);
      push((h - 1) * w + x);
    }
    for (let y = 0; y < h; y++) {
      push(y * w);
      push(y * w + w - 1);
    }
    const neighbours = (i: number): void => {
      const x = i % w;
      push(x > 0 ? i - 1 : -1);
      push(x < w - 1 ? i + 1 : -1);
      push(i - w);
      push(i + w < w * h ? i + w : -1);
    };
    while (top > 0) {
      neighbours(stack[--top] ?? 0);
    }
    return outside;
  };

  /** Share of the ellipse inscribed in `bounds` that is not `outside`. */
  const ellipseCoverage = (
    outside: Uint8Array,
    w: number,
    [x0, y0, x1, y1]: Rect,
  ): number => {
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    const rx = (x1 - x0) / 2;
    const ry = (y1 - y0) / 2;
    const within = (x: number, y: number): boolean =>
      ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
    const bw = x1 - x0;
    let inside = 0;
    let covered = 0;
    for (let k = 0; k < bw * (y1 - y0); k++) {
      const x = x0 + (k % bw);
      const y = y0 + Math.floor(k / bw);
      const hit = within(x, y);
      inside += hit ? 1 : 0;
      covered += hit && !outside[y * w + x] ? 1 : 0;
    }
    return inside === 0 ? 0 : covered / inside;
  };

  /**
   * Share of the ellipse inscribed in the painted pixels whose footprint
   * (alpha >= 128, enclosed holes filled) is painted.
   */
  const footprintCoverage = (
    data: Uint8ClampedArray,
    w: number,
    h: number,
  ): number => {
    const bounds = pixelBounds(data, w, h, 127);
    if (!bounds) {
      return 0;
    }
    const ink = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      ink[i] = (data[i * 4 + 3] ?? 0) >= 128 ? 1 : 0;
    }
    return ellipseCoverage(flood(ink, w, h), w, bounds);
  };

  const toBox = (rect: Rect | null): Box | null =>
    rect ? { x: rect[0], y: rect[1], width: rect[2], height: rect[3] } : null;

  /**
   * Painted box inside `view`: a coarse pass at 1024 pixels, refined on the
   * coarse box plus a 2-pixel margin (kept inside `view`) at 2048 pixels.
   */
  const refine = async (
    svg: string,
    view: Rect,
  ): Promise<{ box: Rect | null; footprint: number }> => {
    const coarse = await paintedBox(svg, view, 1024);
    if (!coarse.box) {
      return { box: null, footprint: 0 };
    }
    const [vx, vy, vw, vh] = view;
    const [bx, by, bw, bh] = coarse.box;
    const mx = (2 * vw) / coarse.w;
    const my = (2 * vh) / coarse.h;
    const x0 = Math.max(vx, bx - mx);
    const y0 = Math.max(vy, by - my);
    const x1 = Math.min(vx + vw, bx + bw + mx);
    const y1 = Math.min(vy + vh, by + bh + my);
    const fine = await paintedBox(svg, [x0, y0, x1 - x0, y1 - y0], 2048);
    return {
      box: fine.box,
      footprint: footprintCoverage(fine.data, fine.w, fine.h),
    };
  };

  const measure = async (svg: string): Promise<Measurement> => {
    const viewBox = parseBox(parse(svg).getAttribute('viewBox'));
    const [vx, vy, vw, vh] = viewBox;
    const inner = await refine(svg, viewBox);
    const outer = await refine(svg, [vx - vw, vy - vh, vw * 3, vh * 3]);
    return {
      kind: 'measure',
      viewBox: { x: vx, y: vy, width: vw, height: vh },
      box: toBox(inner.box),
      outer: toBox(outer.box),
      footprint: inner.footprint,
    };
  };

  /** 4×4 average pooling of premultiplied RGBA over an n×n image. */
  const pool = (data: Uint8ClampedArray, n: number): Float32Array => {
    const cells = Math.floor(n / 4);
    const out = new Float32Array(cells * cells * 4);
    for (let i = 0; i < cells * 4 * n; i++) {
      const x = i % n;
      const alpha = data[i * 4 + 3] ?? 0;
      const o = (Math.floor(i / n / 4) * cells + Math.floor(x / 4)) * 4;
      for (let c = 0; c < 4 && x < cells * 4; c++) {
        const value = c === 3 ? alpha : ((data[i * 4 + c] ?? 0) * alpha) / 255;
        out[o + c] = (out[o + c] ?? 0) + value / 16;
      }
    }
    return out;
  };

  /** Largest, mean and >48 share of the per-cell differences of two pools. */
  const poolDiff = (
    a: Float32Array,
    b: Float32Array,
  ): { maxDiff: number; meanDiff: number; mismatch: number } => {
    const cells = a.length / 4;
    let maxDiff = 0;
    let sum = 0;
    let bad = 0;
    for (let cell = 0; cell < cells; cell++) {
      let cellMax = 0;
      for (let c = 0; c < 4; c++) {
        const d = Math.abs((a[cell * 4 + c] ?? 0) - (b[cell * 4 + c] ?? 0));
        sum += d;
        cellMax = Math.max(cellMax, d);
      }
      maxDiff = Math.max(maxDiff, cellMax);
      bad += cellMax > 48 ? 1 : 0;
    }
    return { maxDiff, meanDiff: sum / (cells * 4), mismatch: bad / cells };
  };

  const compare = async (job: CompareJob): Promise<Comparison> => {
    const n = job.size;
    const before = await render(
      job.before,
      job.beforeView ?? null,
      job.beforeRect,
      n,
      n,
    );
    const after = await render(job.after, null, job.afterRect, n, n);
    const bounds = (data: Uint8ClampedArray): Box | null => {
      const px = pixelBounds(data, n, n, 16);
      return px ? toBox([px[0], px[1], px[2] - px[0], px[3] - px[1]]) : null;
    };
    return {
      kind: 'compare',
      beforeBounds: bounds(before),
      afterBounds: bounds(after),
      ...poolDiff(pool(before, n), pool(after, n)),
    };
  };

  const results: RasterResult[] = [];
  for (const job of jobs) {
    try {
      results.push(
        job.kind === 'measure' ? await measure(job.svg) : await compare(job),
      );
    } catch (error) {
      results.push({
        kind: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
}
