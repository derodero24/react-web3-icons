import { createIcon } from '../utils';

// Source: https://www.gemini.com (official site; header logo inline SVG, symbol + GEMINI lettering in black)
// Source: https://www.gemini.com (app icon inline SVG in the homepage app-download QR code: the white symbol on a #FE630C to #FF4809 rounded tile)
// Colored: the symbol path of the official gemini.com header logo unchanged, in its black, placed on the 64 grid (the lettering is left out); it replaces the old cyan #26DDF9 mark, which gemini.com no longer uses
// brandColor: the symbol is black, so the manifest uses the orange #FF4809 of the official app icon on gemini.com
// Mono: the same path in currentColor
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
