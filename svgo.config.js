/** @type {import('svgo').Config} */
export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep IDs — used by <mask>, <linearGradient>, <clipPath>, <filter>
          // (IDs are converted to dynamic useId()-based IDs during component creation)
          cleanupIds: false,

          // Don't merge paths — destroys multi-colored brand designs
          mergePaths: false,

          // Don't collapse groups — group structure can carry semantic meaning
          collapseGroups: false,

          // Don't convert shapes to paths — keeps ellipse/circle/rect readable
          convertShapeToPath: false,

          // Preserve brand colors exactly (disable hex shortening, name conversion, etc.)
          convertColors: false,

          // 2 decimal places — good balance of file size vs. visual accuracy
          cleanupNumericValues: {
            floatPrecision: 2,
          },
        },
      },
    },

    // Strip fixed width/height — sizing is controlled via component props
    'removeDimensions',
  ],
};
