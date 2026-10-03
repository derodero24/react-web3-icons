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

/** @type {import('svgo').Config} */
export default {
  multipass: true,
  plugins: [
    stashRootFill,

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

          // Rounds plain numeric attributes (x, width, r, stroke-width, …) to
          // 2 decimals. Path data and transforms are not affected: they keep
          // the 3-decimal default of convertPathData / convertTransform
          // (lowering those would rewrite most committed artwork).
          cleanupNumericValues: {
            floatPrecision: 2,
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

    restoreRootFill,
  ],
};
