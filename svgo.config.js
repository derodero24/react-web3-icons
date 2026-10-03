/** @type {import('svgo').Config} */
export default {
  multipass: true,
  plugins: [
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
  ],
};
