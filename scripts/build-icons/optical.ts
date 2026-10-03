/**
 * Optical-size normalization: puts every icon source on the canonical
 * 64×64 grid so that icons rendered at the same size look the same size
 * (see "Optical size" in CONTRIBUTING.md).
 *
 * Fill rule, applied to the tight box of the painted pixels:
 *   - marks: the longer side becomes MARK_SIZE (56) units, centred, which
 *     leaves 4 units of padding on the longer axis;
 *   - containers (Circle / Square variants and artwork that is itself a
 *     solid disc or square): the longer side becomes GRID (64) units,
 *     centred, so the container is full-bleed.
 * A `Mono` variant and its coloured sibling (`Foo` / `FooMono`,
 * `FooCircle` / `FooCircleMono`, …) form a pair: when their source viewBoxes
 * match they get one transform, computed from the union of their painted
 * boxes (which is the coloured box whenever the mono lies inside it), so
 * the pair stays aligned. The pair's kind is decided on the coloured member.
 *
 * Everything here is pure and browser-safe (the visual test project imports
 * it); measuring needs a browser (raster.ts).
 */

import type { Box, Measurement } from './raster.ts';
import {
  getAttr,
  parseSvg,
  serializeSvg,
  type XmlAttr,
  type XmlNode,
} from './xml.ts';

/** Side of the canonical square grid, in user units. */
export const GRID = 64;
/** Longer side of a bare mark's painted box on the grid. */
export const MARK_SIZE = 56;
/** The viewBox every icon source declares. */
export const CANONICAL_VIEWBOX = `0 0 ${GRID} ${GRID}`;

/** How a variant fills the grid. */
export type FillKind = 'mark' | 'container';

/** Longer-side target of each fill kind. */
export const FILL_TARGET: Readonly<Record<FillKind, number>> = {
  mark: MARK_SIZE,
  container: GRID,
};

/**
 * Container detection on measured artwork (for variants whose suffix does
 * not name a container): the painted box must be about square and its
 * footprint must cover the inscribed disc.
 */
const CONTAINER_ASPECT = 0.04;
const CONTAINER_FOOTPRINT = 0.97;

/** PascalCase tokens of a variant suffix (`CircleMono` → Circle, Mono). */
function suffixTokens(suffix: string): string[] {
  return suffix.match(/[A-Z][a-z0-9]*/g) ?? [];
}

/** Whether the suffix names a background container (Circle / Square). */
export function isContainerSuffix(suffix: string): boolean {
  return suffixTokens(suffix).some(
    token => token === 'Circle' || token === 'Square',
  );
}

/** Whether measured artwork is a full-bleed container (solid disc / square). */
export function isContainerArtwork(measurement: Measurement): boolean {
  const { box, footprint } = measurement;
  if (!box) {
    return false;
  }
  const aspect = box.width / box.height;
  return (
    Math.abs(aspect - 1) <= CONTAINER_ASPECT && footprint >= CONTAINER_FOOTPRINT
  );
}

/** Suffix of the coloured sibling of a `…Mono` variant (`'CircleMono'` → `'Circle'`). */
export function colouredSuffix(suffix: string): string | undefined {
  return suffix.endsWith('Mono') ? suffix.slice(0, -4) : undefined;
}

/** `translate(tx ty) scale(s)` applied to user coordinates. */
export interface CanonicalTransform {
  readonly scale: number;
  readonly tx: number;
  readonly ty: number;
}

export const IDENTITY: CanonicalTransform = { scale: 1, tx: 0, ty: 0 };

/** Rounds down to `digits` significant digits. */
function floorSignificant(value: number, digits: number): number {
  const magnitude = 10 ** (digits - 1 - Math.floor(Math.log10(value)));
  return Math.floor(value * magnitude) / magnitude;
}

/** Rounds to 3 decimals, normalizing `-0` to `0`. */
function round3(value: number): number {
  return Math.round(value * 1000) / 1000 + 0;
}

/**
 * The transform that maps `box` onto the grid following the fill rule. The
 * scale is rounded down (so the artwork never exceeds its target) to 6
 * significant digits: SVGO bakes the transform into path data at 0.001-unit
 * precision, and a coarser scale makes it round an arc's radius and chord
 * inconsistently (a circle drawn as two arcs then bulges). Offsets are
 * rounded to 0.001 units. `nudge` lowers the scale by that many units in
 * its 6th significant digit (an invisible change, at most 1e-5 relative) for
 * the rare artwork whose arcs still round badly (see normalizeUnit).
 */
export function fitTransform(
  box: Box,
  kind: FillKind,
  nudge = 0,
): CanonicalTransform {
  const exact = FILL_TARGET[kind] / Math.max(box.width, box.height);
  const step = 10 ** (Math.floor(Math.log10(exact)) - 5);
  const scale = Number(
    (floorSignificant(exact, 6) - nudge * step).toPrecision(6),
  );
  return {
    scale,
    tx: round3(GRID / 2 - scale * (box.x + box.width / 2)),
    ty: round3(GRID / 2 - scale * (box.y + box.height / 2)),
  };
}

export function mapBox(box: Box, t: CanonicalTransform): Box {
  return {
    x: box.x * t.scale + t.tx,
    y: box.y * t.scale + t.ty,
    width: box.width * t.scale,
    height: box.height * t.scale,
  };
}

export function unionBox(a: Box, b: Box): Box {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    height: Math.max(a.y + a.height, b.y + b.height) - y,
  };
}

/**
 * How far a box on the grid is from the fill rule: the largest of the
 * longer side's deviation from the target and the centre's offset from the
 * grid centre, in grid units.
 */
export function fillDeviation(box: Box, kind: FillKind): number {
  return Math.max(
    Math.abs(Math.max(box.width, box.height) - FILL_TARGET[kind]),
    Math.abs(box.x + box.width / 2 - GRID / 2),
    Math.abs(box.y + box.height / 2 - GRID / 2),
  );
}

/** A number in transform syntax: no trailing zeros, no leading `0.`. */
function formatNumber(value: number): string {
  return String(value).replace(/^(-?)0\./, '$1.');
}

export function formatTransform(t: CanonicalTransform): string {
  return `translate(${formatNumber(t.tx)} ${formatNumber(t.ty)}) scale(${formatNumber(t.scale)})`;
}

/**
 * Attributes holding user-space lengths, by axis, on elements whose
 * coordinates are always in user space.
 */
const SHAPE_LENGTHS: Readonly<
  Record<string, Readonly<Record<string, 'x' | 'y' | 'd'>>>
> = {
  rect: { x: 'x', y: 'y', width: 'x', height: 'y', rx: 'x', ry: 'y' },
  circle: { cx: 'x', cy: 'y', r: 'd' },
  ellipse: { cx: 'x', cy: 'y', rx: 'x', ry: 'y' },
  line: { x1: 'x', y1: 'y', x2: 'x', y2: 'y' },
  use: { x: 'x', y: 'y', width: 'x', height: 'y' },
};

/** Region / gradient attributes in user space when `*Units="userSpaceOnUse"`. */
const UNIT_LENGTHS: Readonly<
  Record<string, readonly [string, Readonly<Record<string, 'x' | 'y' | 'd'>>]>
> = {
  mask: ['maskUnits', { x: 'x', y: 'y', width: 'x', height: 'y' }],
  linearGradient: ['gradientUnits', { x1: 'x', y1: 'y', x2: 'x', y2: 'y' }],
  radialGradient: [
    'gradientUnits',
    { cx: 'x', cy: 'y', r: 'd', fx: 'x', fy: 'y', fr: 'd' },
  ],
};

/** Attributes that may never hold a viewport percentage inside the group. */
const ALWAYS_USER_SPACE = new Set(['stroke-width', 'stroke-dashoffset']);

/**
 * Replaces viewport percentages (`width="100%"`) by the user-space length
 * they resolve to in the original viewport. Inside the scaled group a
 * percentage would resolve against the new 64×64 viewport instead.
 */
export function resolvePercentages(
  node: XmlNode,
  viewBox: readonly [number, number, number, number],
): XmlNode {
  const [, , width, height] = viewBox;
  const diagonal = Math.sqrt((width * width + height * height) / 2);
  const unitSpec = UNIT_LENGTHS[node.tag];
  const lengths =
    SHAPE_LENGTHS[node.tag] ??
    (unitSpec && getAttr(node, unitSpec[0]) === 'userSpaceOnUse'
      ? unitSpec[1]
      : undefined);
  const attrs = node.attrs.map(([name, value]): XmlAttr => {
    const percent = /^\s*([+-]?(?:\d+\.?\d*|\.\d+))%\s*$/.exec(value);
    if (!percent) {
      return [name, value];
    }
    const axis =
      lengths?.[name] ?? (ALWAYS_USER_SPACE.has(name) ? 'd' : undefined);
    if (axis === undefined) {
      return [name, value];
    }
    const base = axis === 'x' ? width : axis === 'y' ? height : diagonal;
    const resolved = (Number(percent[1]) / 100) * base;
    return [name, String(Math.round(resolved * 1000) / 1000)];
  });
  return {
    tag: node.tag,
    attrs,
    children: node.children.map(child => resolvePercentages(child, viewBox)),
  };
}

/** The root's viewBox (validateSvg guarantees it is well-formed). */
export function viewBoxOf(
  root: XmlNode,
): readonly [number, number, number, number] {
  const [x, y, width, height, ...rest] = (getAttr(root, 'viewBox') ?? '')
    .trim()
    .split(/\s*,\s*|\s+/)
    .map(Number);
  if (
    x === undefined ||
    y === undefined ||
    width === undefined ||
    height === undefined ||
    rest.length > 0 ||
    ![x, y, width, height].every(Number.isFinite)
  ) {
    throw new Error('malformed or missing viewBox');
  }
  return [x, y, width, height];
}

/**
 * Rewrites a source document onto the canonical grid:
 * `<svg viewBox="0 0 64 64" [fill]><g transform="…">…children…</g></svg>`.
 * The kept root attributes stay on the root; viewport percentages are
 * resolved first (see resolvePercentages).
 */
export function toCanonicalGrid(
  root: XmlNode,
  t: CanonicalTransform,
  clip = false,
): XmlNode {
  const viewBox = viewBoxOf(root);
  const children = root.children.map(child =>
    resolvePercentages(child, viewBox),
  );
  const isIdentity = t.scale === 1 && t.tx === 0 && t.ty === 0 && !clip;
  const [x, y, width, height] = viewBox.map(String);
  // The old viewport clip, in the group's (old) coordinates.
  const clipDefs: XmlNode = {
    tag: 'defs',
    attrs: [],
    children: [
      {
        tag: 'clipPath',
        attrs: [['id', VIEWBOX_CLIP_ID]],
        children: [
          {
            tag: 'rect',
            attrs: [
              ['x', x ?? '0'],
              ['y', y ?? '0'],
              ['width', width ?? '0'],
              ['height', height ?? '0'],
            ],
            children: [],
          },
        ],
      },
    ],
  };
  return {
    tag: 'svg',
    attrs: root.attrs.map(
      ([name, value]): XmlAttr =>
        name === 'viewBox' ? [name, CANONICAL_VIEWBOX] : [name, value],
    ),
    children: isIdentity
      ? children
      : [
          ...(clip ? [clipDefs] : []),
          {
            tag: 'g',
            attrs: [
              ['transform', formatTransform(t)],
              ...(clip
                ? [['clip-path', `url(#${VIEWBOX_CLIP_ID})`] as const]
                : []),
            ],
            children,
          },
        ],
  };
}

/** One variant of a unit, measured in its source coordinates. */
export interface MeasuredVariant {
  readonly suffix: string;
  readonly file: string;
  readonly measurement: Measurement;
  /** Listed in KEEP_VIEWBOX_CLIP. */
  readonly keepClip?: boolean;
}

/** Id of the clip path that keeps an old viewport clip (KEEP_VIEWBOX_CLIP). */
export const VIEWBOX_CLIP_ID = 'viewbox-clip';

/**
 * Sources whose old viewBox hides stray artwork that is not part of the
 * mark, keyed by path, with the reason. Artwork that overflows its viewBox
 * is otherwise fitted and shown whole (the overflow was a crop of the real
 * mark); these keep the old crop instead, as a clip path on the grid.
 */
export const KEEP_VIEWBOX_CLIP: Readonly<Record<string, string>> = {
  'icons/chain/world-chain.svg':
    'the exported path carries displaced copies of the bar and an arc outside the viewBox',
  'icons/chain/world-chain.mono.svg':
    'the exported path carries displaced copies of the bar and an arc outside the viewBox',
};

/** The normalization decided for one source file. */
export interface FilePlan {
  readonly file: string;
  readonly kind: FillKind;
  /** Box the transform was fitted to (source user units). */
  readonly fitted: Box;
  readonly transform: CanonicalTransform;
  /** Coloured sibling whose transform this mono shares, if any. */
  readonly sharedWith?: string;
  /** Why the kind is `container`, for the report. */
  readonly reason: 'suffix' | 'measured' | 'sibling' | undefined;
  /**
   * The artwork overflowed its old viewBox, which clipped it; the fit uses
   * the whole artwork, so the clipped part becomes visible, unless `clip`.
   */
  readonly overflow: boolean;
  /** The old viewport clip is kept (KEEP_VIEWBOX_CLIP). */
  readonly clip: boolean;
}

/**
 * Artwork overflows its viewBox when the unclipped painted box extends past
 * the clipped one by more than this share of the viewBox's longer side.
 */
const OVERFLOW = 0.003;

/** Whether measured artwork is clipped by its own viewBox. */
export function overflows({ box, outer, viewBox }: Measurement): boolean {
  if (!(box && outer)) {
    return false;
  }
  const tolerance = OVERFLOW * Math.max(viewBox.width, viewBox.height);
  return (
    box.x - outer.x > tolerance ||
    box.y - outer.y > tolerance ||
    outer.x + outer.width - (box.x + box.width) > tolerance ||
    outer.y + outer.height - (box.y + box.height) > tolerance
  );
}

/** The box a variant is fitted by: the whole artwork, even where clipped. */
function paintedBox(v: MeasuredVariant): Box {
  const { box, outer } = v.measurement;
  if (!(box && outer)) {
    throw new Error(`${v.file}: the artwork paints nothing`);
  }
  return overflows(v.measurement) && !v.keepClip ? outer : box;
}

function kindOf(v: MeasuredVariant): {
  kind: FillKind;
  reason: FilePlan['reason'];
} {
  if (isContainerSuffix(v.suffix)) {
    return { kind: 'container', reason: 'suffix' };
  }
  if (isContainerArtwork(v.measurement)) {
    return { kind: 'container', reason: 'measured' };
  }
  return { kind: 'mark', reason: undefined };
}

function sameViewBox(a: Box, b: Box): boolean {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
}

/** Plans a variant and, if it has one, its mono sibling (see the module comment). */
function planFamily(
  v: MeasuredVariant,
  mono: MeasuredVariant | undefined,
  nudge: number,
): FilePlan[] {
  const { kind, reason } = kindOf(v);
  const shared =
    mono !== undefined &&
    sameViewBox(v.measurement.viewBox, mono.measurement.viewBox);
  const fitted =
    mono && shared ? unionBox(paintedBox(v), paintedBox(mono)) : paintedBox(v);
  const transform = fitTransform(fitted, kind, nudge);
  const plans: FilePlan[] = [
    {
      file: v.file,
      kind,
      fitted,
      transform,
      reason,
      overflow: overflows(v.measurement),
      clip: overflows(v.measurement) && v.keepClip === true,
    },
  ];
  if (mono) {
    const monoFitted = shared ? fitted : paintedBox(mono);
    plans.push({
      file: mono.file,
      kind,
      fitted: monoFitted,
      transform: shared ? transform : fitTransform(monoFitted, kind, nudge),
      ...(shared ? { sharedWith: v.file } : {}),
      reason: reason === undefined ? undefined : 'sibling',
      overflow: overflows(mono.measurement),
      clip: overflows(mono.measurement) && mono.keepClip === true,
    });
  }
  return plans;
}

/**
 * Decides the kind and transform of every source file of a unit (see the
 * module comment). Throws when a variant paints nothing or when a file
 * shared by two variants would need two different transforms.
 */
export function planUnit(
  variants: readonly MeasuredVariant[],
  nudge = 0,
): FilePlan[] {
  const bySuffix = new Map(variants.map(v => [v.suffix, v]));
  const plans = new Map<string, FilePlan>();
  for (const v of variants) {
    const coloured = colouredSuffix(v.suffix);
    if (coloured !== undefined && bySuffix.has(coloured)) {
      continue; // planned with its coloured sibling
    }
    for (const plan of planFamily(v, bySuffix.get(`${v.suffix}Mono`), nudge)) {
      const previous = plans.get(plan.file);
      if (
        previous &&
        formatTransform(previous.transform) !== formatTransform(plan.transform)
      ) {
        throw new Error(
          `${plan.file} is shared by variants that need different transforms`,
        );
      }
      plans.set(plan.file, previous ?? plan);
    }
  }
  return [...plans.values()];
}

/**
 * The region of the source's user space that the transform maps onto the
 * grid, as a viewBox: renders the old artwork straight onto the new grid.
 */
export function gridViewOf(
  t: CanonicalTransform,
): readonly [number, number, number, number] {
  return [-t.tx / t.scale, -t.ty / t.scale, GRID / t.scale, GRID / t.scale];
}

/** Destination rectangle of a viewBox drawn with `meet` into a size² box. */
export function fitRect(
  viewBox: readonly [number, number, number, number],
  size: number,
): readonly [number, number, number, number] {
  const [, , width, height] = viewBox;
  const k = size / Math.max(width, height);
  return [
    (size - width * k) / 2,
    (size - height * k) / 2,
    width * k,
    height * k,
  ];
}

/**
 * Where the original viewBox lands on a size² rendering of the canonical
 * grid under `t`, in pixels.
 */
export function mappedRect(
  viewBox: readonly [number, number, number, number],
  t: CanonicalTransform,
  size: number,
): readonly [number, number, number, number] {
  const k = size / GRID;
  const [x, y, width, height] = viewBox;
  return [
    (x * t.scale + t.tx) * k,
    (y * t.scale + t.ty) * k,
    width * t.scale * k,
    height * t.scale * k,
  ];
}

/**
 * Sources exempt from the fill rule, keyed by path (`icons/<category>/<file>`),
 * each with the reason. They still use the canonical viewBox. Keep this
 * rare: wordmarks and odd aspect ratios are centred on the grid like any
 * other mark.
 */
export const OPTICAL_EXEMPTIONS: Readonly<Record<string, string>> = {};

/** How far a measured source on the grid may be from the fill rule. */
export const GRID_TOLERANCE = 0.5;

/** One problem found by checkUnitOnGrid. */
export interface GridProblem {
  readonly file: string;
  readonly message: string;
}

/** What is wrong with one measured source on the grid, if anything. */
function sourceProblem({ measurement }: MeasuredVariant): string | undefined {
  const { viewBox, box } = measurement;
  if (!sameViewBox(viewBox, { x: 0, y: 0, width: GRID, height: GRID })) {
    return `viewBox is not ${CANONICAL_VIEWBOX}`;
  }
  if (!box) {
    return 'the artwork paints nothing';
  }
  return overflows(measurement)
    ? 'the artwork is clipped by the viewBox'
    : undefined;
}

/** How far a variant (with its mono, if any) is from the fill rule. */
function familyProblem(
  v: MeasuredVariant,
  mono: MeasuredVariant | undefined,
): string | undefined {
  const { kind } = kindOf(v);
  const box = mono ? unionBox(paintedBox(v), paintedBox(mono)) : paintedBox(v);
  const deviation = fillDeviation(box, kind);
  if (deviation <= GRID_TOLERANCE) {
    return undefined;
  }
  const f = (n: number): string => n.toFixed(2);
  return `${kind}${mono ? ` (with ${mono.file})` : ''} is ${f(deviation)} units off the fill rule (painted ${f(box.x)} ${f(box.y)} ${f(box.width)}×${f(box.height)})`;
}

/**
 * Checks a unit's sources on the grid: canonical viewBox, nothing clipped
 * by the 64×64 viewport, and the painted box of every variant / mono pair
 * (their union) within GRID_TOLERANCE of the fill rule. `isExempt` skips
 * the fill rule for a file.
 */
export function checkUnitOnGrid(
  variants: readonly MeasuredVariant[],
  isExempt: (file: string) => boolean = () => false,
): GridProblem[] {
  const problems: GridProblem[] = variants.flatMap(v => {
    const message = sourceProblem(v);
    return message === undefined ? [] : [{ file: v.file, message }];
  });
  if (problems.length > 0) {
    return problems;
  }
  const bySuffix = new Map(variants.map(v => [v.suffix, v]));
  return variants.flatMap(v => {
    const coloured = colouredSuffix(v.suffix);
    if (
      (coloured !== undefined && bySuffix.has(coloured)) ||
      isExempt(v.file)
    ) {
      return [];
    }
    const message = familyProblem(v, bySuffix.get(`${v.suffix}Mono`));
    return message === undefined ? [] : [{ file: v.file, message }];
  });
}

/**
 * The source prepared for measuring: viewport percentages resolved (the
 * measurement renders through other viewBoxes, which would change them).
 */
export function measurableSvg(svg: string): string {
  const root = parseSvg(svg);
  const viewBox = viewBoxOf(root);
  return serializeSvg({
    ...root,
    children: root.children.map(child => resolvePercentages(child, viewBox)),
  });
}

/** Inherited presentation attributes a group can hand down to its children. */
const INHERITED = new Set([
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'clip-rule',
]);

/**
 * Dissolves a root-level `<g>` that is the root's only child and carries
 * only inherited presentation attributes, which move onto its children
 * (where a child does not set them itself): what is left of the transform
 * group once SVGO has baked the transform into the path data and hoisted
 * the paths' shared attributes onto it (the SVGO config keeps groups).
 * This restores the structure of the source before the rewrite.
 */
export function unwrapBareGroup(root: XmlNode): XmlNode {
  const [only, ...rest] = root.children;
  if (
    only?.tag !== 'g' ||
    rest.length > 0 ||
    !only.attrs.every(([name]) => INHERITED.has(name))
  ) {
    return root;
  }
  return {
    ...root,
    children: only.children.map(child => ({
      ...child,
      attrs: [
        ...only.attrs.filter(
          ([name]) => !child.attrs.some(([own]) => own === name),
        ),
        ...child.attrs,
      ],
    })),
  };
}
