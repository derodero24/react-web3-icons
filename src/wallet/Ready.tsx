import { createIcon } from '../utils';

// Source: https://framerusercontent.com/images/tuUJVhzQ6d0kOUpd0oT5bsqm3Nc.svg (official www.ready.co favicon, its rel=icon for light and dark colour schemes)
// Source: https://www.ready.co (argent.xyz redirects here)
// Ready is Argent's new name (argent.xyz redirects to www.ready.co); the mark is unchanged, so the artwork carries over from the Argent unit
// Default: the ready.co favicon SVG, a single #FF875B path (its no-op clipPath is the whole canvas), placed on the 64 grid. It matches the shipped artwork (alpha IoU 0.998, checked 2026-10-09), so the path is unchanged. ready.co has no brand or press page; its #F36A3D accent is a site UI colour, not a logo file, so it is not used
// Mono: the same path in currentColor
/** Ready wallet icon (colored). */
export const Ready = /* @__PURE__ */ createIcon(
  'Ready',
  '0 0 64 64',
  () => (
    <path d="M39.2 6.4H24.8c-.49 0-.87.4-.88.9-.3 13.97-7.37 27.23-19.56 36.62a.93.93 0 0 0-.2 1.26l8.44 12.04a.87.87 0 0 0 1.24.2C21.46 51.58 27.59 44.55 32 36.75c4.41 7.8 10.54 14.84 18.17 20.67a.87.87 0 0 0 1.24-.2l8.43-12.04c.28-.4.2-.96-.2-1.26C47.46 34.53 40.38 21.27 40.1 7.3a.9.9 0 0 0-.88-.9" />
  ),
  { fill: '#ff875b' },
);

/** Ready wallet icon (monochrome). */
export const ReadyMono = /* @__PURE__ */ createIcon(
  'ReadyMono',
  '0 0 64 64',
  () => (
    <path d="M39.2 6.4H24.8c-.49 0-.87.4-.88.9-.3 13.97-7.37 27.23-19.56 36.62a.93.93 0 0 0-.2 1.26l8.44 12.04a.87.87 0 0 0 1.24.2C21.46 51.58 27.59 44.55 32 36.75c4.41 7.8 10.54 14.84 18.17 20.67a.87.87 0 0 0 1.24-.2l8.43-12.04c.28-.4.2-.96-.2-1.26C47.46 34.53 40.38 21.27 40.1 7.3a.9.9 0 0 0-.88-.9" />
  ),
  { fill: 'currentColor' },
);
