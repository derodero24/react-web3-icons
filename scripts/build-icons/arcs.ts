/**
 * Keeps half-circle arcs half circles after SVGO rounds path data.
 *
 * SVGO rounds an arc's radius and its end point independently. For an arc
 * that spans (about) a half circle, the rounded radius can end up a hair
 * larger than half the rounded chord, and the arc then misses the half
 * circle by far more than the rounding: at r = 15.87 and a chord of 31.73
 * the arc's height drops from 15.87 to 15.47 units, and the two arcs of a
 * circle written as `a…0 0 0 0-31.73` flatten or bulge it visibly.
 *
 * When the radii exceed what the end points need by at most one rounding
 * step, the arc is a half circle up to rounding, and its radii are rounded
 * *down* instead. Radii too small for the end points are scaled up by every
 * renderer until they just fit (SVG 2, "Out-of-range radii"), which draws
 * the exact half circle through the rounded end points. Every other arc is
 * left as it is, so the function is idempotent.
 */

/** Arguments per command (lowercase). */
const ARITY: Readonly<Record<string, number>> = {
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

const NUMBER = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y;
const SEPARATOR = /[\s,]*/y;

interface Token {
  readonly value: number;
  readonly start: number;
  readonly end: number;
}

class Scanner {
  readonly d: string;
  pos = 0;

  constructor(d: string) {
    this.d = d;
  }

  skip(): void {
    SEPARATOR.lastIndex = this.pos;
    SEPARATOR.exec(this.d);
    this.pos = SEPARATOR.lastIndex;
  }

  number(): Token | undefined {
    this.skip();
    NUMBER.lastIndex = this.pos;
    const match = NUMBER.exec(this.d);
    if (!match) {
      return undefined;
    }
    const start = this.pos;
    this.pos = NUMBER.lastIndex;
    return { value: Number(match[0]), start, end: this.pos };
  }

  /** An arc flag: a single `0` or `1`, possibly packed (`a1 1 0 01 1`). */
  flag(): Token | undefined {
    this.skip();
    const char = this.d[this.pos];
    if (char !== '0' && char !== '1') {
      return undefined;
    }
    this.pos += 1;
    return { value: Number(char), start: this.pos - 1, end: this.pos };
  }

  command(): string | undefined {
    this.skip();
    const char = this.d[this.pos];
    if (char !== undefined && /[A-Za-z]/.test(char)) {
      this.pos += 1;
      return char;
    }
    return undefined;
  }
}

/** One radius replacement: text span → new text. */
type Edit = readonly [start: number, end: number, text: string];

/** A number as SVGO writes it: no leading `0` before the point. */
function format(value: number): string {
  return String(value).replace(/^(-?)0\./, '$1.');
}

/**
 * The radius edits for one arc whose end point is (dx, dy) from its start,
 * or none.
 */
function snapArc(
  [rx, ry, rotation]: readonly Token[],
  dx: number,
  dy: number,
  step: number,
): Edit[] {
  if (rx === undefined || ry === undefined || rotation === undefined) {
    return [];
  }
  const a = Math.abs(rx.value);
  const b = Math.abs(ry.value);
  if (a === 0 || b === 0 || (dx === 0 && dy === 0)) {
    return [];
  }
  const phi = (rotation.value * Math.PI) / 180;
  const x = (Math.cos(phi) * dx + Math.sin(phi) * dy) / 2;
  const y = (-Math.sin(phi) * dx + Math.cos(phi) * dy) / 2;
  // Factor that scales the radii down to just fit the end points.
  const fit = Math.sqrt((x * x) / (a * a) + (y * y) / (b * b));
  if (fit >= 1 || Math.max(a, b) * (1 - fit) > step + 1e-9) {
    return [];
  }
  const down = (r: number): number =>
    Number((Math.floor((r * fit) / step) * step).toFixed(10));
  return [
    [rx.start, rx.end, format(down(a))],
    [ry.start, ry.end, format(down(b))],
  ];
}

/** One drawing command with one group of arguments. */
interface Segment {
  /** The command letter (`a`, `L`, …); implicit repeats keep it. */
  readonly command: string;
  readonly args: readonly Token[];
  /** A repeat of the previous command (no command letter in `d`). */
  readonly implicit: boolean;
}

/** Reads one argument group of `lower`, or `undefined` when none follows. */
function readArgs(scanner: Scanner, lower: string): Token[] | undefined {
  const arity = ARITY[lower] ?? 0;
  const args: Token[] = [];
  for (let i = 0; i < arity; i++) {
    const isFlag = lower === 'a' && (i === 3 || i === 4);
    const token = isFlag ? scanner.flag() : scanner.number();
    if (token === undefined) {
      return undefined;
    }
    args.push(token);
  }
  return args;
}

/** Path data as segments, or `undefined` when it does not parse. */
function parsePath(d: string): Segment[] | undefined {
  const scanner = new Scanner(d);
  const segments: Segment[] = [];
  for (
    let command = scanner.command();
    command !== undefined;
    command = scanner.command()
  ) {
    const lower = command.toLowerCase();
    if (ARITY[lower] === undefined) {
      return undefined;
    }
    const first = readArgs(scanner, lower);
    if (first === undefined) {
      return undefined;
    }
    segments.push({ command, args: first, implicit: false });
    // Implicit repeats of the command (none for `z`).
    for (
      let more = lower === 'z' ? undefined : readArgs(scanner, lower);
      more !== undefined;
      more = readArgs(scanner, lower)
    ) {
      segments.push({ command, args: more, implicit: true });
    }
  }
  scanner.skip();
  return scanner.pos === d.length ? segments : undefined;
}

/** Pen position while walking the segments. */
interface Pen {
  x: number;
  y: number;
  startX: number;
  startY: number;
}

/** Moves the pen over one segment. */
function advance(pen: Pen, { command, args, implicit }: Segment): void {
  const lower = command.toLowerCase();
  const relative = command === lower;
  const value = (i: number): number => args[i]?.value ?? 0;
  if (lower === 'z') {
    pen.x = pen.startX;
    pen.y = pen.startY;
    return;
  }
  if (lower === 'h') {
    pen.x = (relative ? pen.x : 0) + value(0);
  } else if (lower === 'v') {
    pen.y = (relative ? pen.y : 0) + value(0);
  } else {
    pen.x = (relative ? pen.x : 0) + value(args.length - 2);
    pen.y = (relative ? pen.y : 0) + value(args.length - 1);
  }
  if (lower === 'm' && !implicit) {
    pen.startX = pen.x;
    pen.startY = pen.y;
  }
}

/** `text` with the span replaced, kept apart from neighbouring numbers. */
function replace(text: string, [start, end, value]: Edit): string {
  const before = /[\d.]$/.test(text.slice(0, start)) ? ' ' : '';
  const after = !value.includes('.') && text[end] === '.' ? ' ' : '';
  return `${text.slice(0, start)}${before}${value}${after}${text.slice(end)}`;
}

/**
 * `d` with every half-circle arc's radii rounded down (see the module
 * comment); `precision` is the number of decimals path data is rounded to.
 * Path data it cannot parse comes back unchanged.
 */
export function snapHalfCircleArcs(d: string, precision: number): string {
  const segments = parsePath(d);
  if (segments === undefined) {
    return d;
  }
  const step = 10 ** -precision;
  const pen: Pen = { x: 0, y: 0, startX: 0, startY: 0 };
  const edits: Edit[] = [];
  for (const segment of segments) {
    const { x, y } = pen;
    advance(pen, segment);
    if (segment.command.toLowerCase() === 'a') {
      edits.push(...snapArc(segment.args, pen.x - x, pen.y - y, step));
    }
  }
  return edits.reverse().reduce(replace, d);
}
