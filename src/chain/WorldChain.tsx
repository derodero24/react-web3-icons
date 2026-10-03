import { createIcon } from '../utils';

// Source: https://world.org/brand (official brand assets, Logomark.zip: [World] Logomark-Black-RGB.svg)
// Source: https://world.org/world-chain
// Default: the official World logomark ([World] Logomark-Black-RGB.svg from the Logomark.zip on world.org/brand), which world.org/world-chain uses for World Chain; it replaces a glyph whose subpaths were displaced and clipped and which matched no official asset
// Mono: the same logomark path in currentColor (the kit also ships it in white)
/** World Chain chain icon (colored). */
export const WorldChain = /* @__PURE__ */ createIcon(
  'WorldChain',
  '0 0 64 64',
  () => (
    <path d="M48.03 4.32Q40.68.02 32.01.02T16 4.32 4.33 15.98.03 32t4.3 16.02T16 59.68t16 4.3 16.02-4.3T59.7 48.02 63.99 32t-4.3-16.02T48.03 4.32M33.61 43.17q-4.93 0-8.08-2.95a9.6 9.6 0 0 1-2.8-4.68h33.6a25 25 0 0 1-2.3 7.63zM22.74 28.6q.7-2.68 2.79-4.65 3.16-2.98 8.08-2.98h20.48a25 25 0 0 1 2.26 7.63zm-12.02-9.12q3.25-5.72 8.91-9.05T32.01 7.1t12.38 3.33a25 25 0 0 1 4.87 3.74H33.68q-5.48 0-9.75 2.3-4.26 2.28-6.62 6.27a17 17 0 0 0-2.11 5.86H7.67a25 25 0 0 1 3.05-9.12m33.67 34.1q-5.66 3.32-12.38 3.32t-12.38-3.33-8.91-9.05a25 25 0 0 1-3.03-8.98h7.5q.52 3.15 2.12 5.86 2.36 3.99 6.62 6.28t9.75 2.29H49.1a25 25 0 0 1-4.72 3.6Z" />
  ),
  { fill: '#000' },
);

/** World Chain chain icon (monochrome). */
export const WorldChainMono = /* @__PURE__ */ createIcon(
  'WorldChainMono',
  '0 0 64 64',
  () => (
    <path d="M48.03 4.32Q40.68.02 32.01.02T16 4.32 4.33 15.98.03 32t4.3 16.02T16 59.68t16 4.3 16.02-4.3T59.7 48.02 63.99 32t-4.3-16.02T48.03 4.32M33.61 43.17q-4.93 0-8.08-2.95a9.6 9.6 0 0 1-2.8-4.68h33.6a25 25 0 0 1-2.3 7.63zM22.74 28.6q.7-2.68 2.79-4.65 3.16-2.98 8.08-2.98h20.48a25 25 0 0 1 2.26 7.63zm-12.02-9.12q3.25-5.72 8.91-9.05T32.01 7.1t12.38 3.33a25 25 0 0 1 4.87 3.74H33.68q-5.48 0-9.75 2.3-4.26 2.28-6.62 6.27a17 17 0 0 0-2.11 5.86H7.67a25 25 0 0 1 3.05-9.12m33.67 34.1q-5.66 3.32-12.38 3.32t-12.38-3.33-8.91-9.05a25 25 0 0 1-3.03-8.98h7.5q.52 3.15 2.12 5.86 2.36 3.99 6.62 6.28t9.75 2.29H49.1a25 25 0 0 1-4.72 3.6Z" />
  ),
  { fill: 'currentColor' },
);
