import { createIcon } from '../utils';

// Source: https://storage.thegraph.com/brand/The%20Graph%20-%20Logomark.zip
// Official brand kit linked from https://thegraph.com/brand/
// Colored: "The Graph - Logomark - Dark.svg" (#0C0A1D); the kit ships the logomark only in #0C0A1D and white, never in purple
// Mono: the same path in currentColor
// brandColor: the logomark is near-black, so the manifest uses the brand purple #6F4CFF from the palette on https://thegraph.com/brand/
/** The Graph devtool icon (colored). */
export const TheGraph = /* @__PURE__ */ createIcon(
  'TheGraph',
  '0 0 64 64',
  () => (
    <path d="M28.62 41.53c-10.17 0-18.45-8.27-18.45-18.45S18.45 4.63 28.62 4.63s18.45 8.27 18.45 18.45-8.28 18.45-18.45 18.45m0-30.75c-6.78 0-12.3 5.52-12.3 12.3s5.52 12.3 12.3 12.3 12.3-5.51 12.3-12.3c0-6.78-5.51-12.3-12.3-12.3m5.25 48.3 12.3-12.3a3.07 3.07 0 0 0 0-4.35 3.07 3.07 0 0 0-4.34 0l-12.3 12.3a3.07 3.07 0 0 0 2.17 5.25c.79 0 1.58-.3 2.17-.9M50.15 4.02a3.7 3.7 0 0 0-3.7 3.69 3.7 3.7 0 0 0 3.7 3.69 3.7 3.7 0 0 0 3.69-3.7 3.7 3.7 0 0 0-3.7-3.68" />
  ),
  { fill: '#0C0A1D' },
);

/** The Graph devtool icon (monochrome). */
export const TheGraphMono = /* @__PURE__ */ createIcon(
  'TheGraphMono',
  '0 0 64 64',
  () => (
    <path d="M28.62 41.53c-10.17 0-18.45-8.27-18.45-18.45S18.45 4.63 28.62 4.63s18.45 8.27 18.45 18.45-8.28 18.45-18.45 18.45m0-30.75c-6.78 0-12.3 5.52-12.3 12.3s5.52 12.3 12.3 12.3 12.3-5.51 12.3-12.3c0-6.78-5.51-12.3-12.3-12.3m5.25 48.3 12.3-12.3a3.07 3.07 0 0 0 0-4.35 3.07 3.07 0 0 0-4.34 0l-12.3 12.3a3.07 3.07 0 0 0 2.17 5.25c.79 0 1.58-.3 2.17-.9M50.15 4.02a3.7 3.7 0 0 0-3.7 3.69 3.7 3.7 0 0 0 3.7 3.69 3.7 3.7 0 0 0 3.69-3.7 3.7 3.7 0 0 0-3.7-3.68" />
  ),
  { fill: 'currentColor' },
);
