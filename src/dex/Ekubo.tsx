import { createIcon } from '../utils';

// Source: https://ekubo.org/logo.svg
// Colored: the official logo.svg symbol unchanged, a rounded rectangle with two circles knocked out, in its light-scheme colour #101010 (the file's stylesheet switches it to #fff for prefers-color-scheme: dark; the style became a fill attribute), placed on the 64 grid. The former purple-gradient disc is not part of any official file
// Mono: the same path in currentColor; with a light color it is the official dark-scheme (white) symbol
/** Ekubo DEX icon (colored). */
export const Ekubo = /* @__PURE__ */ createIcon(
  'Ekubo',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M4 22.02c0-4.72 3.76-8.55 8.4-8.55h39.2c4.64 0 8.4 3.83 8.4 8.55v19.95c0 4.72-3.76 8.55-8.4 8.55H12.4c-4.64 0-8.4-3.83-8.4-8.55zM32 32c0 6.3-5.01 11.4-11.2 11.4S9.6 38.3 9.6 32s5.01-11.4 11.2-11.4S32 25.7 32 32m0 0c0-6.3 5.02-11.4 11.2-11.4 6.19 0 11.2 5.1 11.2 11.4s-5 11.4-11.2 11.4S32 38.3 32 32"
    />
  ),
  { fill: '#101010' },
);

/** Ekubo DEX icon (monochrome). */
export const EkuboMono = /* @__PURE__ */ createIcon(
  'EkuboMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M4 22.02c0-4.72 3.76-8.55 8.4-8.55h39.2c4.64 0 8.4 3.83 8.4 8.55v19.95c0 4.72-3.76 8.55-8.4 8.55H12.4c-4.64 0-8.4-3.83-8.4-8.55zM32 32c0 6.3-5.01 11.4-11.2 11.4S9.6 38.3 9.6 32s5.01-11.4 11.2-11.4S32 25.7 32 32m0 0c0-6.3 5.02-11.4 11.2-11.4 6.19 0 11.2 5.1 11.2 11.4s-5 11.4-11.2 11.4S32 38.3 32 32"
    />
  ),
  { fill: 'currentColor' },
);
