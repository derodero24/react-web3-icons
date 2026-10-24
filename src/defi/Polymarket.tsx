import { createIcon } from '../utils';

// Source: https://polymarket.com/brand (official brand page, accessed 2026-10-24: "Download logos")
// Source: https://polymarket-upload.s3.us-east-2.amazonaws.com/polymarket-logos.zip (polymarket-logos.zip: icon-black.svg, icon-blue.svg)
// Default: the official icon-black.svg mark, path unchanged, placed on the 64 grid. The kit ships the mark standalone in black and white and on a #2E5CFF square, so the base is the standalone mark (base icon background rule)
// Mono: the same mark in currentColor
// Square: the official icon-blue.svg (the white mark on a full-bleed #2E5CFF square), scaled 64/512
// SquareMono: the square in currentColor with the mark knocked out (fill-rule=evenodd)
// brandColor: #2E5CFF, the colour of the official app icon (the standalone mark is black)
/** Polymarket DeFi icon (colored). */
export const Polymarket = /* @__PURE__ */ createIcon(
  'Polymarket',
  '0 0 64 64',
  () => (
    <path d="M55.24 55.34c0 2.48 0 3.71-.81 4.33s-2 .28-4.39-.4l-38.3-10.74c-1.43-.4-2.15-.6-2.56-1.15s-.42-1.3-.42-2.79V19.4c0-1.49 0-2.23.42-2.78s1.13-.75 2.57-1.15l38.3-10.75c2.38-.67 3.57-1 4.38-.39.8.61.8 1.85.8 4.33zM18.3 45.03l31.72 8.9v-17.8zm-4.34-4.13L45.68 32l-31.7-8.9zm4.34-21.93 31.72 8.9v-17.8z" />
  ),
  { fill: '#000' },
);

/** Polymarket DeFi icon (monochrome). */
export const PolymarketMono = /* @__PURE__ */ createIcon(
  'PolymarketMono',
  '0 0 64 64',
  () => (
    <path d="M55.24 55.34c0 2.48 0 3.71-.81 4.33s-2 .28-4.39-.4l-38.3-10.74c-1.43-.4-2.15-.6-2.56-1.15s-.42-1.3-.42-2.79V19.4c0-1.49 0-2.23.42-2.78s1.13-.75 2.57-1.15l38.3-10.75c2.38-.67 3.57-1 4.38-.39.8.61.8 1.85.8 4.33zM18.3 45.03l31.72 8.9v-17.8zm-4.34-4.13L45.68 32l-31.7-8.9zm4.34-21.93 31.72 8.9v-17.8z" />
  ),
  { fill: 'currentColor' },
);

/** Polymarket Square DeFi icon (colored). */
export const PolymarketSquare = /* @__PURE__ */ createIcon(
  'PolymarketSquare',
  '0 0 64 64',
  () => (
    <>
      <path d="M0 0h64v64H0z" />
      <path
        fill="#fff"
        d="M46.98 48.68c0 1.77 0 2.65-.58 3.09s-1.43.2-3.13-.28L15.9 43.81c-1.02-.29-1.54-.43-1.83-.82-.3-.4-.3-.93-.3-2V23c0-1.06 0-1.6.3-1.99s.8-.53 1.83-.82l27.37-7.68c1.7-.48 2.55-.72 3.13-.28s.58 1.32.58 3.1zM20.6 41.3l22.65 6.36V34.95zm-3.1-2.95L40.15 32 17.5 25.64zm3.1-15.67 22.65 6.36V16.33z"
      />
    </>
  ),
  { fill: '#2E5CFF' },
);

/** Polymarket Square DeFi icon (monochrome). */
export const PolymarketSquareMono = /* @__PURE__ */ createIcon(
  'PolymarketSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0zm46.98 48.68c0 1.77 0 2.65-.58 3.09s-1.43.2-3.13-.28L15.9 43.81c-1.02-.29-1.54-.43-1.83-.82-.3-.4-.3-.93-.3-2V23c0-1.06 0-1.6.3-1.99s.8-.53 1.83-.82l27.37-7.68c1.7-.48 2.55-.72 3.13-.28s.58 1.32.58 3.1zM20.6 41.3l22.65 6.36V34.95zm-3.1-2.95L40.15 32 17.5 25.64zm3.1-15.67 22.65 6.36V16.33z"
    />
  ),
  { fill: 'currentColor' },
);
