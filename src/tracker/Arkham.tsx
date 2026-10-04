import { createIcon } from '../utils';

// Source: https://info.arkm.com (official Arkham site, header logo inline SVG)
// Source: https://info.arkm.com (favicon-light-512.png linked from the page head: the symbol in black)
// Default: the symbol path (the ten-piece pentagon) of the ARKHAM header logo served inline on info.arkm.com (viewBox 0 0 546 153), without the wordmark paths. The site draws it in white on dark; the page's official light favicon (favicon-light-512.png) shows the same symbol in pure black, which is the colour used here. No Arkham brand kit was found (arkm.com is behind a bot challenge).
// Mono: the same path in currentColor.
/** Arkham tracker icon (colored). */
export const Arkham = /* @__PURE__ */ createIcon(
  'Arkham',
  '0 0 64 64',
  () => (
    <path d="m12.47 44.43 19.55 14.18 6.75-4.9-23.72-17.23zm11.65-3.8 7.9 5.72 6.74-4.9-12.07-8.75zm9.58 6.95 6.76 4.9L60 38.27l-2.6-7.94zm-.01-12.25 6.76 4.9 7.88-5.73v-.01l-2.59-7.94zm-15-10.1-3.01 9.28 6.75 4.9 4.6-14.18zm-7.22-9.9L4.02 38.3l6.75 4.9 9.05-27.89zm10.44-.02-2.58 7.94h14.9l-2.58-7.94zm11.82 0 4.63 14.17 6.74-4.91-3.01-9.27zM14.7 5.4l-2.57 7.94 29.32-.02-2.58-7.94zm34.6-.03-8.35.01 9.08 27.89 6.74-4.91z" />
  ),
  { fill: '#000' },
);

/** Arkham tracker icon (monochrome). */
export const ArkhamMono = /* @__PURE__ */ createIcon(
  'ArkhamMono',
  '0 0 64 64',
  () => (
    <path d="m12.47 44.43 19.55 14.18 6.75-4.9-23.72-17.23zm11.65-3.8 7.9 5.72 6.74-4.9-12.07-8.75zm9.58 6.95 6.76 4.9L60 38.27l-2.6-7.94zm-.01-12.25 6.76 4.9 7.88-5.73v-.01l-2.59-7.94zm-15-10.1-3.01 9.28 6.75 4.9 4.6-14.18zm-7.22-9.9L4.02 38.3l6.75 4.9 9.05-27.89zm10.44-.02-2.58 7.94h14.9l-2.58-7.94zm11.82 0 4.63 14.17 6.74-4.91-3.01-9.27zM14.7 5.4l-2.57 7.94 29.32-.02-2.58-7.94zm34.6-.03-8.35.01 9.08 27.89 6.74-4.91z" />
  ),
  { fill: 'currentColor' },
);
