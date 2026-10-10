// biome-ignore-all lint/complexity/useLiteralKeys: SVGO types `attributes` as an index signature, and noPropertyAccessFromIndexSignature (@tsconfig/strictest) requires bracket access to it
// biome-ignore-all lint/performance/noDelete: SVGO removes an attribute only when its key is deleted; assigning undefined does not type-check
import { snapHalfCircleArcs } from './scripts/build-icons/arcs.ts';

/**
 * An icon's root `fill` is the default `fill` of its component (the
 * variant's `"fill"` in icons/<category>/<unit>.json), not a redundant
 * default: SVGO would drop a root `fill="#000"` (the initial value), so it
 * is set aside for the run. Only black is set aside: SVGO computes inherited
 * styles from it, which a hidden non-default fill would falsify.
 */
const ROOT_FILL_STASH = 'data-w3i-root-fill';
const BLACK = new Set(['#000', '#000000', 'black']);

/** @type {import('svgo').CustomPlugin} */
const stashRootFill = {
  name: 'stashRootFill',
  fn: () => ({
    element: {
      enter(node, parent) {
        const fill = node.attributes['fill'];
        if (parent.type === 'root' && fill !== undefined && BLACK.has(fill)) {
          node.attributes[ROOT_FILL_STASH] = fill;
          delete node.attributes['fill'];
        }
      },
    },
  }),
};

/** @type {import('svgo').CustomPlugin} */
const restoreRootFill = {
  name: 'restoreRootFill',
  fn: () => ({
    element: {
      enter(node, parent) {
        const fill = node.attributes[ROOT_FILL_STASH];
        if (parent.type === 'root' && fill !== undefined) {
          node.attributes['fill'] = fill;
          delete node.attributes[ROOT_FILL_STASH];
        }
      },
    },
  }),
};

/** Decimals of path data, transform offsets and numeric attributes. */
const PRECISION = 2;

/**
 * Rounds the radii of half-circle arcs down after convertPathData (see
 * scripts/build-icons/arcs.ts): independently rounded radii and end points
 * would otherwise flatten or bulge them.
 * @type {import('svgo').CustomPlugin}
 */
const snapHalfCircleArcsPlugin = {
  name: 'snapHalfCircleArcs',
  fn: () => ({
    element: {
      enter(node) {
        const d = node.attributes['d'];
        if (d !== undefined) {
          node.attributes['d'] = snapHalfCircleArcs(d, PRECISION);
        }
      },
    },
  }),
};

/** @type {import('svgo').Config} */
export default {
  multipass: true,

  // Rounds path data, transform offsets and plain numeric attributes (x,
  // width, r, stroke-width, …) to 2 decimals. Every icon is drawn on the
  // 64×64 grid (CONTRIBUTING.md, "Optical size"), where 0.01 units is
  // 0.04 px at 256 px; transform scale factors keep convertTransform's
  // 5-significant-digit transformPrecision. Half-circle arcs are kept
  // exact by snapHalfCircleArcsPlugin.
  floatPrecision: PRECISION,

  plugins: [
    stashRootFill,

    // Moves presentation properties out of `style` into attributes
    // (`style="fill:#F00"` → `fill="#F00"`), so every reader of the sources
    // (manifest brand colours, fill props, the legibility checks) finds
    // paint in attributes. Non-presentation properties such as
    // `mix-blend-mode` stay in `style`.
    'convertStyleToAttrs',

    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep IDs — used by <mask>, <linearGradient>, <clipPath>, <filter>
          // (the icon generator namespaces them per component as `${_id}-…`)
          cleanupIds: false,

          // Don't merge paths — destroys multi-colored brand designs
          mergePaths: false,

          // Don't collapse groups — group structure can carry semantic meaning
          collapseGroups: false,

          // Don't convert shapes to paths — keeps ellipse/circle/rect readable
          convertShapeToPath: false,

          // Preserve brand colors exactly (disable hex shortening, name conversion, etc.)
          convertColors: false,

          // makeArcs replaces curves by arcs that fit within threshold ×
          // 10^-PRECISION units; 0.25 keeps the 0.0025-unit fit of the
          // default 2.5 at 3 decimals (a looser fit visibly reshapes round
          // holes, e.g. Solscan's).
          convertPathData: {
            makeArcs: { threshold: 0.25, tolerance: 0.5 },
          },

          // Remove every <desc>, not only editor boilerplate: the icon
          // parser rejects text content.
          removeDesc: {
            removeAny: true,
          },
        },
      },
    },

    // SVGO v4 keeps <title> by default; icons get theirs from the `title`
    // prop, and the icon parser rejects text content.
    'removeTitle',

    // Strip fixed width/height — sizing is controlled via component props
    'removeDimensions',

    snapHalfCircleArcsPlugin,

    restoreRootFill,
  ],
};
