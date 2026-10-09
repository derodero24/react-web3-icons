import { createIcon } from '../utils';

// Source: https://stellar.org/brand-resources (Stellar brand resource hub, accessed 2026-10-09: "Stellar logo pack")
// Source: https://cdn.sanity.io/files/e2r40yh6/production-i18n/9ef5ab890833c2571489b41a23a0ffc29307300c.zip (Logo Press Kit 2026: Stellar/CMYK/Black/Stellar Logo Final Black CMYK.pdf and Stellar/RGB/Stellar Logo Final Black RGB.png)
// Default: the mark of the press kit's Stellar logo (the ring with the two bands, the first two paths of Stellar Logo Final Black CMYK.pdf, an Illustrator 30.2 file modified 2026-03-20), converted 1:1 with pdftocairo -svg, the wordmark dropped and a trailing empty moveto removed; paths otherwise unchanged and placed on the 64 grid. The kit's Stellar logo is vector only as .ai/.pdf/.eps, and its White CMYK files share the same path data
// Colour: #000, as in the kit's RGB export (Stellar Logo Final Black RGB.png is pure #000000); the PDF stores a CMYK rich black that converts to about #100F0D
// Mono: the same two paths in currentColor (the kit's White files are the same mark in one colour)
// It replaces a heavier version of the mark (thicker ring and bands), the one the stellar.org header logo still draws (cdn.sanity.io/images/e2r40yh6/production-i18n/8d48eccbfb27a38b4beb307ed3633f2b2744376b-106x26.svg, #0F0F0F); the brand kit is preferred over the site header
/** Stellar chain icon (colored). */
export const Stellar = /* @__PURE__ */ createIcon(
  'Stellar',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 8.01c3.2 0 6.3.63 9.2 1.86a24 24 0 0 1 4.44 2.47l-.3.15-3.8 1.94A20 20 0 0 0 32 11.97h-.15q-3.89.03-7.46 1.52-3.57 1.51-6.32 4.25a19.6 19.6 0 0 0-5.78 13.95q0 1.3.17 2.58l.04.27.24-.12L45.52 17.7l6.78-3.46 7.7-3.92v4.43l-7.92 4.04-3.88 1.98L13.64 38.4l-.15.08-1.77.9-1.8.92-.16.08-5.75 2.93v-4.44l1.94-.99a4.5 4.5 0 0 0 2.46-4.38q-.06-.9-.06-1.8 0-4.82 1.86-9.23 1.8-4.25 5.06-7.52a24 24 0 0 1 7.52-5.08A23.5 23.5 0 0 1 32 8.01" />
      <path d="M59.99 20.68v4.44l-1.94.99a4.5 4.5 0 0 0-2.47 4.38q.07.92.07 1.82 0 4.82-1.86 9.22a24 24 0 0 1-5.06 7.53 24 24 0 0 1-7.52 5.07C38.29 55.37 35.19 56 32 56s-6.29-.62-9.2-1.86a24 24 0 0 1-4.45-2.48l3.93-2 .16-.08c2.9 1.62 6.2 2.47 9.56 2.47h.14c2.58-.02 5.1-.53 7.47-1.53q3.57-1.5 6.32-4.25a19.6 19.6 0 0 0 5.78-13.95q0-1.3-.17-2.59l-.04-.27-.24.12-32.81 16.74-6.79 3.46-7.65 3.9v-4.43l7.88-4.03 3.89-1.98Z" />
    </>
  ),
  { fill: '#000' },
);

/** Stellar chain icon (monochrome). */
export const StellarMono = /* @__PURE__ */ createIcon(
  'StellarMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 8.01c3.2 0 6.3.63 9.2 1.86a24 24 0 0 1 4.44 2.47l-.3.15-3.8 1.94A20 20 0 0 0 32 11.97h-.15q-3.89.03-7.46 1.52-3.57 1.51-6.32 4.25a19.6 19.6 0 0 0-5.78 13.95q0 1.3.17 2.58l.04.27.24-.12L45.52 17.7l6.78-3.46 7.7-3.92v4.43l-7.92 4.04-3.88 1.98L13.64 38.4l-.15.08-1.77.9-1.8.92-.16.08-5.75 2.93v-4.44l1.94-.99a4.5 4.5 0 0 0 2.46-4.38q-.06-.9-.06-1.8 0-4.82 1.86-9.23 1.8-4.25 5.06-7.52a24 24 0 0 1 7.52-5.08A23.5 23.5 0 0 1 32 8.01" />
      <path d="M59.99 20.68v4.44l-1.94.99a4.5 4.5 0 0 0-2.47 4.38q.07.92.07 1.82 0 4.82-1.86 9.22a24 24 0 0 1-5.06 7.53 24 24 0 0 1-7.52 5.07C38.29 55.37 35.19 56 32 56s-6.29-.62-9.2-1.86a24 24 0 0 1-4.45-2.48l3.93-2 .16-.08c2.9 1.62 6.2 2.47 9.56 2.47h.14c2.58-.02 5.1-.53 7.47-1.53q3.57-1.5 6.32-4.25a19.6 19.6 0 0 0 5.78-13.95q0-1.3-.17-2.59l-.04-.27-.24.12-32.81 16.74-6.79 3.46-7.65 3.9v-4.43l7.88-4.03 3.89-1.98Z" />
    </>
  ),
  { fill: 'currentColor' },
);
