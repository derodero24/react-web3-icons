import { parseViewBox } from '../../scripts/build-icons/lib.ts';
import {
  getAttr,
  serializeSvg,
  type XmlNode,
} from '../../scripts/build-icons/xml.ts';

/**
 * Static tone analysis behind `test/legibility.test.ts`: does an icon's
 * colored artwork vanish on a dark (or light) background?
 *
 * The unit tests run in jsdom, which cannot rasterize, so the analysis
 * works on the SVG tree:
 *
 *  - **Paints.** Every fill and stroke a rendered shape actually paints
 *    counts once: inherited fills, the initial black fill of shapes that set
 *    none, `<use>` references (a `<symbol>` in its own paint context), and
 *    gradients reached through `url(#…)` (following `href` templates).
 *    The weight is the paint's effective opacity times its colour's alpha,
 *    and a gradient splits it evenly across {@link GRADIENT_SAMPLES} colours
 *    sampled along its ramp (interpolated between the stop offsets), so a
 *    ramp from a pale stop to a dark one counts as partly of each tone, not
 *    half and half; paints that end up fully transparent are dropped. Lines and outlines without area are
 *    never filled (their strokes count). Mask, clip path and gradient
 *    definitions are skipped: their black and white is coverage, not ink.
 *    Unsupported colour syntax throws, so new artwork cannot slip past the
 *    audit.
 *  - **Container.** The first fill whose bounding box spans at least
 *    {@link CONTAINER_SPAN} of the viewBox in both directions (a disc,
 *    square, badge or the mark's main body), when there is other artwork,
 *    decides first: it shows on any background it contrasts with, and only
 *    when it blends in does the remaining "ink" have to carry the mark.
 *    Without this a blue disc behind six white facets would count as
 *    "mostly white", although the disc is what a light page shows.
 *  - **Tones.** A colour is near-black or near-white when every channel is
 *    beyond {@link DARK_MAX} / {@link LIGHT_MIN} (greys), or when its WCAG 2
 *    contrast against black / white is below {@link MIN_CONTRAST}, which
 *    also catches saturated pale colours (Blast's `#FCFC03`, 1.10:1 against
 *    white) and deep ones (HTX's `#00003E`, 1.07:1 against black).
 *  - **Dominance.** A tone dominates when it is at least half of the paint
 *    weight measured: the threshold of the original issue #712 audit.
 *
 * Counting paints instead of pixels misjudges artwork whose tones differ
 * mostly in area (a large black shape under a small coloured accent), and a
 * bounding box overstates diagonal shapes; such cases are rare in this set,
 * and the audit only decides which icons need a human look.
 */

/** A paint that resolved to a fixed sRGB colour. */
export type Rgb = readonly [red: number, green: number, blue: number];

/** A background tone a mark can vanish into. */
export type Tone = 'dark' | 'light';

/** Weighted paint shares; `dark + light ≤ 1`. */
export interface ToneShares {
  /** Share of paint weight that is near-black ({@link isNearBlack}). */
  readonly dark: number;
  /** Share of paint weight that is near-white ({@link isNearWhite}). */
  readonly light: number;
  /** Total paint weight measured (0 when nothing paints). */
  readonly weight: number;
}

export interface ToneAnalysis {
  /** Shares of the container's own fill, when the artwork has a container. */
  readonly container: ToneShares | undefined;
  /** Shares of every other paint (all paints when there is no container). */
  readonly ink: ToneShares;
  /** Shares of all paints, container included. */
  readonly overall: ToneShares;
}

/** Channels strictly below this are near-black (the issue #712 audit). */
export const DARK_MAX = 60;
/** Channels strictly above this are near-white (the mirror of DARK_MAX). */
export const LIGHT_MIN = 195;
/** A tone with at least this share of the paint dominates it. */
export const DOMINANT_SHARE = 0.5;
/**
 * Minimum share of the viewBox width and height a container spans: 60% of
 * the 56 units a mark's longer side fills on the 64×64 grid
 * (CONTRIBUTING.md, "Optical size").
 */
// 0.6 was tuned on tight viewBoxes (mark = whole viewBox); a mark now spans
// 56 of 64 units, so 0.6 × 56/64 = 0.525 keeps the same share of the mark.
export const CONTAINER_SPAN = 0.6 * (56 / 64);

const NAMED_COLORS: Readonly<Record<string, Rgb>> = {
  black: [0, 0, 0],
  white: [255, 255, 255],
};

/** Elements whose subtree is never painted where it stands. */
const NON_RENDERED = new Set([
  'clipPath',
  'defs',
  'linearGradient',
  'mask',
  'pattern',
  'radialGradient',
  'symbol',
]);

const GROUPS = new Set(['g', 'svg']);

/** A parsed colour: sRGB channels plus its alpha (0…1). */
export interface Color {
  readonly rgb: Rgb;
  readonly alpha: number;
}

/**
 * `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `black`, `white` or
 * `transparent` → channels and alpha. Throws on anything else (`rgba()`,
 * `hsla()`, other keywords) so that new artwork using another colour syntax
 * fails loudly instead of being mismeasured.
 */
export function parseColor(value: string): Color {
  const keyword = value.toLowerCase();
  if (keyword === 'transparent') {
    return { rgb: [0, 0, 0], alpha: 0 };
  }
  const named = NAMED_COLORS[keyword];
  if (named) {
    return { rgb: named, alpha: 1 };
  }
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value)?.[1];
  if (hex === undefined) {
    throw new Error(`unsupported colour ${JSON.stringify(value)}`);
  }
  const pairs =
    hex.length <= 4
      ? [...hex].map(digit => digit + digit)
      : (hex.match(/../g) ?? []);
  const [red = 0, green = 0, blue = 0, alpha = 255] = pairs.map(pair =>
    Number.parseInt(pair, 16),
  );
  return { rgb: [red, green, blue], alpha: alpha / 255 };
}

/**
 * WCAG 2 contrast ratio below which a paint counts as the background's own
 * tone even when its channels are not all near-black or near-white: a
 * saturated pale yellow such as Blast's `#FCFC03` (1.10:1 against white) or
 * a deep navy such as HTX's `#00003E` (1.07:1 against black) vanishes as
 * surely as a grey does.
 */
export const MIN_CONTRAST = 1.5;

/** WCAG 2 relative luminance of an sRGB colour: 0 (black) … 1 (white). */
export function relativeLuminance(rgb: Rgb): number {
  const [red = 0, green = 0, blue = 0] = rgb.map(channel => {
    const c = channel / 255;
    return c <= 0.040_45 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** WCAG 2 contrast ratio between two relative luminances (1 … 21). */
export const contrastRatio = (a: number, b: number): number =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/**
 * Vanishes on a dark background: every channel below {@link DARK_MAX}, or
 * less than {@link MIN_CONTRAST} against black.
 */
export const isNearBlack = (rgb: Rgb): boolean =>
  rgb.every(channel => channel < DARK_MAX) ||
  contrastRatio(relativeLuminance(rgb), 0) < MIN_CONTRAST;

/**
 * Vanishes on a light background: every channel above {@link LIGHT_MIN}, or
 * less than {@link MIN_CONTRAST} against white.
 */
export const isNearWhite = (rgb: Rgb): boolean =>
  rgb.every(channel => channel > LIGHT_MIN) ||
  contrastRatio(relativeLuminance(rgb), 1) < MIN_CONTRAST;

// --- Geometry: just enough to find a container's extent ---------------------

/** Affine matrix `[a, b, c, d, e, f]`, as in SVG's `matrix()`. */
type Matrix = readonly [number, number, number, number, number, number];
type Point = readonly [x: number, y: number];

const IDENTITY: Matrix = [1, 0, 0, 1, 0, 0];

/** `m × n`: applies `n` first, then `m` (SVG transform-list order). */
function multiply(m: Matrix, n: Matrix): Matrix {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}

/** Maps a point through an affine matrix. */
const apply = (m: Matrix, [x, y]: Point): Point => [
  m[0] * x + m[2] * y + m[4],
  m[1] * x + m[3] * y + m[5],
];

const NUMBER = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;

/** Every number in a `points` list or in transform arguments. */
const numbersIn = (text: string): number[] =>
  [...text.matchAll(NUMBER)].map(([n]) => Number(n));

/** The element's own `transform` list as one matrix (identity if none). */
function transformMatrix(node: XmlNode): Matrix {
  const value = getAttr(node, 'transform');
  if (value === undefined) {
    return IDENTITY;
  }
  const steps = [...value.matchAll(/([a-zA-Z]+)\s*\(([^)]*)\)/g)];
  if (steps.length === 0) {
    throw new Error(`malformed transform ${JSON.stringify(value)}`);
  }
  return steps.reduce<Matrix>(
    (matrix, [, name = '', args = '']) =>
      multiply(matrix, transformStep(name, numbersIn(args))),
    IDENTITY,
  );
}

/** One transform function (`translate(…)`, `matrix(…)`, …) as a matrix. */
function transformStep(name: string, args: readonly number[]): Matrix {
  const [p = 0, q, r = 0, s = 0, t = 0, u = 0] = args;
  const rad = (p * Math.PI) / 180;
  switch (name) {
    case 'matrix':
      return [p, q ?? 0, r, s, t, u];
    case 'translate':
      return [1, 0, 0, 1, p, q ?? 0];
    case 'scale':
      return [p, 0, 0, q ?? p, 0, 0];
    case 'rotate': {
      const cx = q ?? 0;
      const turn: Matrix = [
        Math.cos(rad),
        Math.sin(rad),
        -Math.sin(rad),
        Math.cos(rad),
        0,
        0,
      ];
      const there: Matrix = [1, 0, 0, 1, cx, r];
      const back: Matrix = [1, 0, 0, 1, -cx, -r];
      return multiply(multiply(there, turn), back);
    }
    case 'skewX':
      return [1, 0, Math.tan(rad), 1, 0, 0];
    case 'skewY':
      return [1, Math.tan(rad), 0, 1, 0, 0];
    default:
      throw new Error(`unsupported transform ${name}()`);
  }
}

const PATH_ARITY: Readonly<Record<string, number>> = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  a: 7,
  z: 0,
};

const COMMAND = /\s*,?\s*([MmLlHhVvCcSsQqTtAaZz])/y;
const COORDINATE = /\s*,?\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/y;
/** Arc flags are a single character, so `a1 1 0 0110 10` is valid. */
const FLAG = /\s*,?\s*([01])/y;

/** Matches a sticky `pattern` at `pos`: the captured text and the end. */
function readAt(
  d: string,
  pos: number,
  pattern: RegExp,
): [string, number] | undefined {
  pattern.lastIndex = pos;
  const match = pattern.exec(d)?.[1];
  return match === undefined ? undefined : [match, pattern.lastIndex];
}

/** The error for unparsable path data, quoting it from `pos`. */
function malformed(d: string, pos: number): Error {
  return new Error(`malformed path data at ${pos}: ${d.slice(pos, pos + 20)}`);
}

/** Reads the `arity` numbers of one segment starting at `pos`. */
function readArgs(d: string, pos: number, command: string): [number[], number] {
  const isArc = command.toLowerCase() === 'a';
  const args: number[] = [];
  let at = pos;
  for (let i = 0; i < (PATH_ARITY[command.toLowerCase()] ?? 0); i++) {
    const read = readAt(
      d,
      at,
      isArc && (i === 3 || i === 4) ? FLAG : COORDINATE,
    );
    if (read === undefined) {
      throw malformed(d, at);
    }
    args.push(Number(read[0]));
    at = read[1];
  }
  return [args, at];
}

/** Splits path data into segments: command letter and its numbers. */
function* pathCommands(d: string): Generator<[string, number[]]> {
  let pos = 0;
  let command = '';
  while (!/^\s*$/.test(d.slice(pos))) {
    const head = readAt(d, pos, COMMAND);
    if (head !== undefined) {
      [command, pos] = head;
    } else if (command === '' || command.toLowerCase() === 'z') {
      throw malformed(d, pos);
    }
    const [args, end] = readArgs(d, pos, command);
    pos = end;
    yield [command, args];
    // Extra coordinate pairs after a moveto are implicit linetos.
    command = command === 'M' ? 'L' : command === 'm' ? 'l' : command;
  }
}

/** Points on an elliptical arc (SVG 1.1 F.6.5 endpoint → centre form). */
function arcPoints(
  [x1, y1]: Point,
  [rxIn, ryIn, rotation, large, sweep, x2, y2]: readonly number[],
): Point[] {
  const end: Point = [x2 ?? 0, y2 ?? 0];
  let rx = Math.abs(rxIn ?? 0);
  let ry = Math.abs(ryIn ?? 0);
  if (rx === 0 || ry === 0) {
    return [end];
  }
  const phi = ((rotation ?? 0) * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - end[0]) / 2;
  const dy = (y1 - end[1]) / 2;
  const x1p = cos * dx + sin * dy;
  const y1p = -sin * dx + cos * dy;
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const coef = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
  const cxp = (coef * rx * y1p) / ry;
  const cyp = (-coef * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + end[0]) / 2;
  const cy = sin * cxp + cos * cyp + (y1 + end[1]) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number): number =>
    Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const ux = (x1p - cxp) / rx;
  const uy = (y1p - cyp) / ry;
  const theta = angle(1, 0, ux, uy);
  let delta = angle(ux, uy, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweep && delta > 0) {
    delta -= 2 * Math.PI;
  } else if (sweep && delta < 0) {
    delta += 2 * Math.PI;
  }
  const points: Point[] = [];
  const steps = 16;
  for (let i = 1; i <= steps; i++) {
    const t = theta + (delta * i) / steps;
    points.push([
      cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin,
      cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos,
    ]);
  }
  return points;
}

/** Points one path segment visits, starting from `current`. */
function segmentPoints(
  command: string,
  args: readonly number[],
  current: Point,
  start: Point,
): Point[] {
  const lower = command.toLowerCase();
  const [dx, dy] = command === lower ? current : [0, 0];
  const [first = 0] = args;
  switch (lower) {
    case 'z':
      return [start];
    case 'h':
      return [[dx + first, current[1]]];
    case 'v':
      return [[current[0], dy + first]];
    case 'a': {
      const [rx = 0, ry = 0, rotation = 0, large = 0, sweep = 0] = args;
      const end = [dx + (args[5] ?? 0), dy + (args[6] ?? 0)];
      return arcPoints(current, [rx, ry, rotation, large, sweep, ...end]);
    }
    default: {
      const points: Point[] = [];
      for (let i = 0; i < args.length; i += 2) {
        points.push([dx + (args[i] ?? 0), dy + (args[i + 1] ?? 0)]);
      }
      return points;
    }
  }
}

/**
 * End and control points of path data, one list per subpath (a superset of
 * each subpath's extent). A subpath starts at every moveto, and after a
 * closepath at the point it closed to.
 */
function pathSubpaths(d: string): Point[][] {
  const subpaths: Point[][] = [];
  let points: Point[] = [];
  let current: Point = [0, 0];
  let start: Point = [0, 0];
  for (const [command, args] of pathCommands(d)) {
    const visited = segmentPoints(command, args, current, start);
    const moveto = command === 'M' || command === 'm';
    if (moveto || points.length === 0) {
      points = moveto ? [] : [current];
      subpaths.push(points);
    }
    points.push(...visited);
    current = visited.at(-1) ?? current;
    if (moveto) {
      start = current;
    } else if (command === 'Z' || command === 'z') {
      // The next drawing command starts a new subpath at `start`.
      points = [];
    }
  }
  return subpaths;
}

/** The four corners of a box, which stay its hull under any transform. */
const corners = (x: number, y: number, w: number, h: number): Point[] => [
  [x, y],
  [x + w, y],
  [x, y + h],
  [x + w, y + h],
];

/** Whether the points are not all on one line, i.e. can bound an area. */
function enclosesArea(points: readonly Point[]): boolean {
  const [origin] = points;
  const other = points.find(
    ([x, y]) => origin !== undefined && (x !== origin[0] || y !== origin[1]),
  );
  if (origin === undefined || other === undefined) {
    return false;
  }
  const [ox, oy] = origin;
  const [ax, ay] = other;
  return points.some(
    ([bx, by]) =>
      Math.abs((ax - ox) * (by - oy) - (ay - oy) * (bx - ox)) > 1e-9,
  );
}

/**
 * Untransformed outline points of a shape element, one list per subpath
 * (only paths have more than one).
 */
function shapeOutlines(node: XmlNode): Point[][] {
  return node.tag === 'path'
    ? pathSubpaths(getAttr(node, 'd') ?? '')
    : [shapePoints(node)];
}

/** Untransformed outline points of a basic (non-path) shape element. */
function shapePoints(node: XmlNode): Point[] {
  const n = (name: string): number => Number(getAttr(node, name) ?? 0);
  switch (node.tag) {
    case 'rect':
      return corners(n('x'), n('y'), n('width'), n('height'));
    case 'circle':
    case 'ellipse': {
      const rx = node.tag === 'circle' ? n('r') : n('rx');
      const ry = node.tag === 'circle' ? n('r') : n('ry');
      return corners(n('cx') - rx, n('cy') - ry, 2 * rx, 2 * ry);
    }
    case 'line':
      return [
        [n('x1'), n('y1')],
        [n('x2'), n('y2')],
      ];
    case 'polygon':
    case 'polyline': {
      const values = numbersIn(getAttr(node, 'points') ?? '');
      const points: Point[] = [];
      for (let i = 0; i + 1 < values.length; i += 2) {
        points.push([values[i] ?? 0, values[i + 1] ?? 0]);
      }
      return points;
    }
    default:
      throw new Error(`unsupported element <${node.tag}>`);
  }
}

// --- Paints -----------------------------------------------------------------

interface WeightedColor {
  /** `undefined` for `currentColor`: themed by the consumer, never fixed. */
  readonly rgb: Rgb | undefined;
  readonly weight: number;
}

/** One painted fill or stroke, in paint order. */
interface Layer {
  readonly colors: readonly WeightedColor[];
  /** Fraction of the viewBox width and height the shape spans (fills only). */
  readonly span: number;
}

/** Inherited paint state while walking the tree. */
interface Context {
  readonly fill: string;
  readonly stroke: string;
  readonly fillOpacity: number;
  readonly strokeOpacity: number;
  /** Product of the ancestors' (non-inherited) `opacity`. */
  readonly opacity: number;
  readonly matrix: Matrix;
}

/** `opacity`-style attribute (number or percentage), clamped to 0…1. */
function opacityOf(node: XmlNode, name: string, fallback = 1): number {
  const value = getAttr(node, name);
  if (value === undefined) {
    return fallback;
  }
  const number = Number.parseFloat(value) / (value.endsWith('%') ? 100 : 1);
  if (!Number.isFinite(number)) {
    throw new Error(`malformed ${name} ${JSON.stringify(value)}`);
  }
  return Math.min(1, Math.max(0, number));
}

/**
 * Walks an SVG in paint order, recording each fill and stroke that paints
 * as a {@link Layer}.
 */
class Painter {
  readonly ids = new Map<string, XmlNode>();
  readonly layers: Layer[] = [];
  readonly viewBox: readonly [number, number, number, number];

  constructor(root: XmlNode) {
    const viewBox = parseViewBox(getAttr(root, 'viewBox') ?? '');
    if (viewBox === undefined) {
      throw new Error('missing or malformed viewBox');
    }
    this.viewBox = viewBox;
    this.collectIds(root);
  }

  /** Indexes every `id` in the subtree, for `url(#…)` and `href`. */
  collectIds(node: XmlNode): void {
    const id = getAttr(node, 'id');
    if (id !== undefined) {
      this.ids.set(id, node);
    }
    for (const child of node.children) {
      this.collectIds(child);
    }
  }

  /** `#id` or `url(#id)` → the referenced element. */
  resolve(ref: string): XmlNode {
    const match = /^(?:url\(\s*#([^)\s]+)\s*\)|#(.+))$/.exec(ref.trim());
    const target = this.ids.get(match?.[1] ?? match?.[2] ?? '');
    if (target === undefined) {
      throw new Error(`unresolved reference ${JSON.stringify(ref)}`);
    }
    return target;
  }

  /** The `<stop>`s of a gradient, following `href` templates. */
  stops(gradient: XmlNode, depth = 0): readonly XmlNode[] {
    const stops = gradient.children.filter(child => child.tag === 'stop');
    const href = getAttr(gradient, 'href') ?? getAttr(gradient, 'xlink:href');
    if (stops.length > 0 || href === undefined) {
      return stops;
    }
    if (depth > 8) {
      throw new Error('gradient href chain too deep (cycle?)');
    }
    return this.stops(this.resolve(href), depth + 1);
  }

  /**
   * Colours one fill or stroke value paints, with their weights (opacity ×
   * colour alpha). Fully transparent colours are dropped, so a paint that
   * shows nothing yields no colours and records no layer.
   */
  colors(paint: string, weight: number): WeightedColor[] {
    return this.weighted(paint, weight).filter(color => color.weight > 0);
  }

  /**
   * Whether a fill or stroke value shows anything at full opacity: not
   * `none`, `transparent`, a zero-alpha colour or a gradient whose stops are
   * all invisible. Shared by the tone and geometry measures.
   */
  paints(paint: string): boolean {
    return this.colors(paint, 1).length > 0;
  }

  /** `colors` before zero-weight colours are dropped. */
  weighted(paint: string, weight: number): WeightedColor[] {
    if (paint === 'none') {
      return [];
    }
    if (paint === 'currentColor') {
      return [{ rgb: undefined, weight }];
    }
    if (!paint.startsWith('url(')) {
      const { rgb, alpha } = parseColor(paint);
      return [{ rgb, weight: weight * alpha }];
    }
    const server = this.resolve(paint);
    if (server.tag !== 'linearGradient' && server.tag !== 'radialGradient') {
      throw new Error(`unsupported paint server <${server.tag}>`);
    }
    const stops = rampStops(this.stops(server));
    if (stops.length === 0) {
      return [];
    }
    return Array.from({ length: GRADIENT_SAMPLES }, (_, i) => {
      const { rgb, alpha } = rampAt(stops, (i + 0.5) / GRADIENT_SAMPLES);
      return { rgb, weight: (weight * alpha) / GRADIENT_SAMPLES };
    });
  }

  /** Fraction of the viewBox the transformed points span (min of x and y). */
  span(points: readonly Point[], matrix: Matrix): number {
    const [left, top, width, height] = this.viewBox;
    const mapped = points.map(point => apply(matrix, point));
    const extent = (axis: 0 | 1, from: number, size: number): number => {
      const values = mapped.map(point => point[axis]);
      const low = Math.max(from, Math.min(...values));
      const high = Math.min(from + size, Math.max(...values));
      return Math.max(0, high - low) / size;
    };
    return Math.min(extent(0, left, width), extent(1, top, height));
  }

  /**
   * Records the layers `node` paints, skipping definition-only subtrees.
   * `using` holds the `<use>` targets being expanded, to reject cycles.
   */
  walk(node: XmlNode, parent: Context, using: readonly XmlNode[] = []): void {
    if (NON_RENDERED.has(node.tag) || node.tag === 'stop') {
      return;
    }
    const context = inherit(node, parent);
    if (node.tag === 'use') {
      this.use(node, context, using);
    } else if (GROUPS.has(node.tag)) {
      for (const child of node.children) {
        this.walk(child, context, using);
      }
    } else {
      this.paint(node, context);
    }
  }

  /** Renders the element a `<use>` (whose paint is `context`) references. */
  use(node: XmlNode, context: Context, using: readonly XmlNode[]): void {
    const target = this.resolve(
      getAttr(node, 'href') ?? getAttr(node, 'xlink:href') ?? '',
    );
    if (using.includes(target)) {
      throw new Error('circular <use> reference');
    }
    const inner = [...using, target];
    if (target.tag !== 'symbol') {
      this.walk(target, context, inner);
      return;
    }
    // A referenced <symbol> renders its children in its own paint context,
    // inheriting from the <use>; where it is defined it renders nothing.
    const symbol = inherit(target, context);
    for (const child of target.children) {
      this.walk(child, symbol, inner);
    }
  }

  /**
   * Records the fill and stroke layers of a shape element. `<line>` is never
   * filled, and an outline without area (a two-point polyline, a straight
   * path, a path made only of such subpaths) fills nothing either; their
   * strokes still count.
   */
  paint(node: XmlNode, context: Context): void {
    // Only subpaths that bound an area are filled, so only they size it.
    const filled =
      node.tag === 'line' ? [] : shapeOutlines(node).filter(enclosesArea);
    const { opacity } = context;
    const fill =
      filled.length === 0
        ? []
        : this.colors(context.fill, opacity * context.fillOpacity);
    if (fill.length > 0) {
      const span = this.span(filled.flat(), context.matrix);
      this.layers.push({ colors: fill, span });
    }
    const stroke = this.colors(context.stroke, opacity * context.strokeOpacity);
    if (stroke.length > 0) {
      this.layers.push({ colors: stroke, span: 0 });
    }
  }
}

/** Evenly spaced samples a gradient paint is split into. */
const GRADIENT_SAMPLES = 16;

/** A gradient stop: its colour, its alpha times `stop-opacity`, its offset. */
interface RampStop extends Color {
  readonly offset: number;
}

/**
 * The stops of a gradient in ramp order: a missing `offset` is 0, and an
 * offset below the one before it is raised to that one (SVG 1.1, 13.2.4).
 */
function rampStops(stops: readonly XmlNode[]): RampStop[] {
  let previous = 0;
  return stops.map(stop => {
    const { rgb, alpha } = parseColor(getAttr(stop, 'stop-color') ?? 'black');
    previous = Math.max(previous, opacityOf(stop, 'offset', 0));
    return {
      rgb,
      alpha: alpha * opacityOf(stop, 'stop-opacity'),
      offset: previous,
    };
  });
}

/**
 * The colour of a gradient ramp at `t` (0…1): interpolated in sRGB between
 * the stops around it, and the first or last stop's colour outside them
 * (the default `spreadMethod="pad"`).
 */
function rampAt(stops: readonly RampStop[], t: number): Color {
  const next = stops.findIndex(stop => stop.offset >= t);
  const to = stops.at(next === -1 ? -1 : next);
  const from = next > 0 ? stops[next - 1] : to;
  if (from === undefined || to === undefined) {
    throw new Error('gradient without stops');
  }
  const span = to.offset - from.offset;
  const f = span > 0 ? (t - from.offset) / span : 1;
  const mix = (a: number, b: number): number => a + (b - a) * f;
  return {
    rgb: [
      mix(from.rgb[0], to.rgb[0]),
      mix(from.rgb[1], to.rgb[1]),
      mix(from.rgb[2], to.rgb[2]),
    ],
    alpha: mix(from.alpha, to.alpha),
  };
}

/** The paint state of `node`, inheriting from its parent's. */
function inherit(node: XmlNode, parent: Context): Context {
  let matrix = multiply(parent.matrix, transformMatrix(node));
  if (node.tag === 'use') {
    const x = Number(getAttr(node, 'x') ?? 0);
    const y = Number(getAttr(node, 'y') ?? 0);
    matrix = multiply(matrix, [1, 0, 0, 1, x, y]);
  }
  return {
    fill: getAttr(node, 'fill') ?? parent.fill,
    stroke: getAttr(node, 'stroke') ?? parent.stroke,
    fillOpacity: opacityOf(node, 'fill-opacity', parent.fillOpacity),
    strokeOpacity: opacityOf(node, 'stroke-opacity', parent.strokeOpacity),
    opacity: parent.opacity * opacityOf(node, 'opacity'),
    matrix,
  };
}

/** Near-black and near-white shares of the layers' combined paint weight. */
function shares(layers: readonly Layer[]): ToneShares {
  let weight = 0;
  let dark = 0;
  let light = 0;
  for (const { rgb, weight: w } of layers.flatMap(layer => layer.colors)) {
    weight += w;
    if (rgb !== undefined && isNearBlack(rgb)) {
      dark += w;
    } else if (rgb !== undefined && isNearWhite(rgb)) {
      light += w;
    }
  }
  return weight === 0
    ? { dark: 0, light: 0, weight: 0 }
    : { dark: dark / weight, light: light / weight, weight };
}

/** Measures a parsed SVG (`VariantSource.root` from the icon loader). */
export function analyzeTone(root: XmlNode): ToneAnalysis {
  const painter = new Painter(root);
  painter.walk(root, {
    fill: 'black',
    stroke: 'none',
    fillOpacity: 1,
    strokeOpacity: 1,
    opacity: 1,
    matrix: IDENTITY,
  });
  const { layers } = painter;
  const container = layers.find(layer => layer.span >= CONTAINER_SPAN);
  const overall = shares(layers);
  if (container === undefined || layers.length < 2) {
    return { container: undefined, ink: overall, overall };
  }
  return {
    container: shares([container]),
    ink: shares(layers.filter(layer => layer !== container)),
    overall,
  };
}

/**
 * Whether the artwork is dominated by `tone`, i.e. mostly vanishes on a
 * background of that tone: its container (if any) blends into the
 * background and so does most of the remaining ink.
 */
export function isDominatedBy(analysis: ToneAnalysis, tone: Tone): boolean {
  const { container, ink } = analysis;
  return (
    (container === undefined || container[tone] >= DOMINANT_SHARE) &&
    ink[tone] >= DOMINANT_SHARE
  );
}

/**
 * Whether every fixed paint of the artwork is of one `tone`: a black-only
 * (or white-only) mark with no brand colour to lose, whose Mono variant in a
 * contrasting `color` is the brand's reversed mark.
 */
export function isMonochrome(analysis: ToneAnalysis, tone: Tone): boolean {
  return analysis.overall.weight > 0 && analysis.overall[tone] > 1 - 1e-9;
}

const PAINT_ATTRS = new Set(['fill', 'stroke', 'stop-color']);
/** Elements whose effective fill/stroke decides what they cover. */
const PAINTED = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'use',
]);

interface Inherited {
  readonly fill: string;
  readonly stroke: string;
}

/**
 * Replaces paint colours with whether each shape's (inherited) fill and
 * stroke paint at all, so a ring and a disc stay different. Inside a
 * `<mask>` colours are coverage, so they are kept verbatim.
 */
function stripPaint(
  painter: Painter,
  node: XmlNode,
  parent: Inherited,
  inMask: boolean,
): XmlNode {
  const masked = inMask || node.tag === 'mask';
  const inherited: Inherited = {
    fill: getAttr(node, 'fill') ?? parent.fill,
    stroke: getAttr(node, 'stroke') ?? parent.stroke,
  };
  const attrs = masked
    ? node.attrs
    : node.attrs.filter(([name]) => !PAINT_ATTRS.has(name));
  const enablement = (paint: string): string =>
    painter.paints(paint) ? 'paint' : 'none';
  const effective: XmlNode['attrs'] =
    !masked && PAINTED.has(node.tag)
      ? [
          ['fill', enablement(inherited.fill)],
          ['stroke', enablement(inherited.stroke)],
        ]
      : [];
  return {
    tag: node.tag,
    attrs: [...attrs, ...effective],
    children: node.children.map(child =>
      stripPaint(painter, child, inherited, masked),
    ),
  };
}

/**
 * The SVG's shapes without their paint colours, to compare geometry across
 * variants: whether each shape fills and/or strokes is kept (resolved
 * through inheritance, and off for paints that show nothing, exactly as
 * {@link analyzeTone} drops them), the colours themselves are not.
 */
export function geometryOf(root: XmlNode): string {
  const painter = new Painter(root);
  return serializeSvg(
    stripPaint(painter, root, { fill: 'black', stroke: 'none' }, false),
  );
}
