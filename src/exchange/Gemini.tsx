import { createIcon } from '../utils';

// Source: https://www.gemini.com (official site; header logo inline SVG, symbol + GEMINI lettering in black)
// Source: https://www.gemini.com (app icon inline SVG in the homepage app-download QR code: the white symbol on a #FE630C to #FF4809 rounded tile)
// Colored: the symbol path of the official gemini.com header logo unchanged, in its black, placed on the 64 grid (the lettering is left out); it replaces the old cyan #26DDF9 mark, which gemini.com no longer uses
// brandColor: the symbol is black, so the manifest uses the orange #FF4809 of the official app icon on gemini.com
// Mono: the same path in currentColor
// Square: the official Gemini app icon served as inline SVG in the gemini.com homepage app-download QR code (rechecked 2026-10-04): a 16.9056-unit tile with rx 5.07168 (30%) filled with a vertical #FE630C (bottom) to #FF4809 (top) linear gradient under the white evenodd symbol path, unchanged; the tile is scaled by 64/16.9056 to fill the 64 grid (rx 19.2) and the gradient written in grid coordinates (x 32, y 64 to 0) instead of the source's rotate(180) transform
// SquareMono: the same tile in currentColor with the Square symbol knocked out (single evenodd path)
/** Gemini exchange icon (colored). */
export const Gemini = /* @__PURE__ */ createIcon(
  'Gemini',
  '0 0 64 64',
  () => (
    <path d="M55.42 21.2H25.75A15 15 0 0 1 40.58 8.4a15 15 0 0 1 14.84 12.8m-17 17.24H25.59V25.56H38.4zm-.16 4.36a15 15 0 0 1-14.84 12.82A15 15 0 0 1 8.6 42.8zm-29.7-4.36A15.1 15.1 0 0 1 21.2 25.79v12.65zM55.4 25.56a15.1 15.1 0 0 1-12.63 12.65V25.56zM40.59 4.01c-9.83 0-18.23 7.56-19.24 17.33C11.55 22.37 4 30.77 4 40.59 4 51.31 12.68 60 23.4 60c9.82 0 18.19-7.56 19.25-17.33 9.77-1.03 17.33-9.43 17.33-19.25A19.4 19.4 0 0 0 40.58 4" />
  ),
  { fill: '#000' },
);

/** Gemini exchange icon (monochrome). */
export const GeminiMono = /* @__PURE__ */ createIcon(
  'GeminiMono',
  '0 0 64 64',
  () => (
    <path d="M55.42 21.2H25.75A15 15 0 0 1 40.58 8.4a15 15 0 0 1 14.84 12.8m-17 17.24H25.59V25.56H38.4zm-.16 4.36a15 15 0 0 1-14.84 12.82A15 15 0 0 1 8.6 42.8zm-29.7-4.36A15.1 15.1 0 0 1 21.2 25.79v12.65zM55.4 25.56a15.1 15.1 0 0 1-12.63 12.65V25.56zM40.59 4.01c-9.83 0-18.23 7.56-19.24 17.33C11.55 22.37 4 30.77 4 40.59 4 51.31 12.68 60 23.4 60c9.82 0 18.19-7.56 19.25-17.33 9.77-1.03 17.33-9.43 17.33-19.25A19.4 19.4 0 0 0 40.58 4" />
  ),
  { fill: 'currentColor' },
);

/** Gemini Square exchange icon (colored). */
export const GeminiSquare = /* @__PURE__ */ createIcon(
  'GeminiSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <defs>
        <linearGradient
          id={`${_id}-gems-a`}
          x1="32"
          x2="32"
          y1="64"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FE630C" />
          <stop offset="1" stopColor="#FF4809" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${_id}-gems-a)`} rx="19.2" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M26.2 51.02c-7.3 0-13.26-5.95-13.25-13.26 0-6.67 5.09-12.36 11.67-13.15.79-6.58 6.48-11.67 13.15-11.67C45.07 12.94 51 18.9 51 26.2c0 6.67-5.08 12.36-11.66 13.15-.8 6.58-6.48 11.67-13.15 11.67m21.3-26.5a9.9 9.9 0 0 0-9.74-8.21 9.9 9.9 0 0 0-9.74 8.2zm-8.05 11.42c4.08-.7 7.35-3.97 8.06-8.06h-8.06zm-3.37-8.06h-8.2v8.21h8.2zm-11.57.15c-4.08.7-7.35 3.97-8.05 8.05h8.05zm1.69 19.62a9.9 9.9 0 0 0 9.74-8.2H16.46c.8 4.71 4.89 8.2 9.74 8.2"
      />
    </>
  ),
  { ids: true },
);

/** Gemini Square exchange icon (monochrome). */
export const GeminiSquareMono = /* @__PURE__ */ createIcon(
  'GeminiSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M19.2 0h25.6A19.2 19.2 0 0 1 64 19.2v25.6A19.2 19.2 0 0 1 44.8 64H19.2A19.2 19.2 0 0 1 0 44.8V19.2A19.2 19.2 0 0 1 19.2 0m7 51.02c-7.3 0-13.26-5.95-13.25-13.26 0-6.67 5.09-12.36 11.67-13.15.79-6.58 6.48-11.67 13.15-11.67C45.07 12.94 51 18.9 51 26.2c0 6.67-5.08 12.36-11.66 13.15-.8 6.58-6.48 11.67-13.15 11.67m21.3-26.5a9.9 9.9 0 0 0-9.74-8.21 9.9 9.9 0 0 0-9.74 8.2zm-8.05 11.42c4.08-.7 7.35-3.97 8.06-8.06h-8.06zm-3.37-8.06h-8.2v8.21h8.2zm-11.57.15c-4.08.7-7.35 3.97-8.05 8.05h8.05zm1.69 19.62a9.9 9.9 0 0 0 9.74-8.2H16.46c.8 4.71 4.89 8.2 9.74 8.2"
    />
  ),
  { fill: 'currentColor' },
);
