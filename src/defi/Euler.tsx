import { createIcon } from '../utils';

// Source: https://www.euler.finance/brand (official brand page, accessed 2026-10-24: Symbol transparent / dark / circle, brand colors)
// Source: https://www.euler.finance/branding/euler-brand-assets.zip (euler-brand-assets.zip: symbols/euler-symbol-transparent.svg, euler-symbol-dark.svg, euler-symbol-circle.svg)
// Default: the official euler-symbol-transparent.svg (three bars in #2AE5B9, #FCBF22 and #FF7829), paths unchanged, placed on the 64 grid. The kit ships the symbol standalone and on navy containers, so the base is the standalone symbol (base icon background rule)
// Mono: the three bars as one currentColor path; the kit's mono logos use the same bars in one colour
// Square: the official euler-symbol-dark.svg (the symbol on a full-bleed #08131F square), with its transform, scaled 64/1024
// Circle: the official euler-symbol-circle.svg (the symbol on a #08131F disc), with its transform, scaled 64/1024
// SquareMono / CircleMono: the container in currentColor with the bars knocked out (mask)
// brandColor: #2AE5B9, listed first as "Euler green" on the brand page
/** Euler DeFi icon (colored). */
export const Euler = /* @__PURE__ */ createIcon(
  'Euler',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#FF7829"
        d="m53.22 32.77-31.17 18a4.49 4.49 0 1 0 4.5 7.79l31.17-18a4.5 4.5 0 1 0-4.5-7.8"
      />
      <path
        fill="#FCBF22"
        d="M31.66 27.01 8.28 40.51a4.5 4.5 0 1 0 4.5 7.8l23.38-13.5a4.5 4.5 0 1 0-4.5-7.8"
      />
      <path
        fill="#2AE5B9"
        d="m37.45 5.43-31.18 18a4.5 4.5 0 1 0 4.5 7.8l31.17-18a4.5 4.5 0 1 0-4.5-7.8"
      />
    </>
  ),
  { fill: 'none' },
);

/** Euler DeFi icon (monochrome). */
export const EulerMono = /* @__PURE__ */ createIcon(
  'EulerMono',
  '0 0 64 64',
  () => (
    <path d="m53.22 32.77-31.17 18a4.49 4.49 0 1 0 4.5 7.79l31.17-18a4.5 4.5 0 1 0-4.5-7.8m-21.56-5.75L8.28 40.51a4.5 4.5 0 1 0 4.5 7.8l23.38-13.5a4.5 4.5 0 1 0-4.5-7.8m5.79-21.58-31.18 18a4.5 4.5 0 1 0 4.5 7.8l31.17-18a4.5 4.5 0 1 0-4.5-7.8" />
  ),
  { fill: 'currentColor' },
);

/** Euler Circle DeFi icon (colored). */
export const EulerCircle = /* @__PURE__ */ createIcon(
  'EulerCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.0625)">
      <circle cx="512" cy="512" r="512" fill="#08131F" />
      <g>
        <path
          fill="#FF7829"
          d="M711.65 525.3 418.41 694.62c-20.25 11.7-27.2 37.59-15.5 57.83 11.68 20.24 37.57 27.18 57.82 15.48l293.25-169.3c20.25-11.7 27.2-37.58 15.5-57.83-11.68-20.24-37.57-27.17-57.83-15.48"
        />
        <path
          fill="#FCBF22"
          d="M508.83 471.18 288.9 598.16c-20.25 11.7-27.2 37.58-15.5 57.83 11.68 20.24 37.57 27.18 57.82 15.48L551.16 544.5c20.25-11.69 27.2-37.58 15.5-57.82-11.68-20.25-37.58-27.18-57.83-15.49"
        />
        <path
          fill="#2AE5B9"
          d="M563.22 268.2 269.98 437.51c-20.25 11.7-27.2 37.58-15.5 57.83 11.68 20.24 37.57 27.17 57.82 15.48l293.25-169.3c20.25-11.7 27.2-37.59 15.5-57.83-11.68-20.24-37.58-27.18-57.83-15.49"
        />
      </g>
    </g>
  ),
  { fill: 'none' },
);

/** Euler Circle DeFi icon (monochrome). */
export const EulerCircleMono = /* @__PURE__ */ createIcon(
  'EulerCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <circle cx="512" cy="512" r="512" mask={`url(#${_id}-eulc-a)`} />
      <defs>
        <mask id={`${_id}-eulc-a`}>
          <rect width="1024" height="1024" fill="#fff" />
          <path
            fill="#000"
            d="M711.65 525.3 418.41 694.62c-20.25 11.7-27.2 37.59-15.5 57.83 11.68 20.24 37.57 27.18 57.82 15.48l293.25-169.3c20.25-11.7 27.2-37.58 15.5-57.83-11.68-20.24-37.57-27.17-57.83-15.48M508.83 471.2 288.9 598.16c-20.25 11.7-27.2 37.58-15.5 57.83 11.68 20.24 37.57 27.18 57.82 15.48L551.16 544.5c20.25-11.69 27.2-37.58 15.5-57.82-11.68-20.25-37.58-27.18-57.83-15.49m54.4-202.98-293.26 169.3c-20.25 11.7-27.2 37.58-15.5 57.83 11.68 20.24 37.57 27.17 57.82 15.48l293.25-169.3c20.25-11.7 27.2-37.59 15.5-57.83-11.68-20.24-37.58-27.18-57.83-15.49"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Euler Square DeFi icon (colored). */
export const EulerSquare = /* @__PURE__ */ createIcon(
  'EulerSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.0625)">
      <rect width="1024" height="1024" fill="#08131F" />
      <g>
        <path
          fill="#FF7829"
          d="M734.69 526.84 407.61 715.68c-22.59 13.04-30.33 41.92-17.3 64.5 13.04 22.58 41.92 30.3 64.5 17.27L781.9 608.6c22.59-13.04 30.33-41.92 17.3-64.5-13.04-22.58-41.92-30.31-64.51-17.27"
        />
        <path
          fill="#FCBF22"
          d="M508.47 466.47 263.15 608.1c-22.58 13.04-30.33 41.91-17.29 64.5 13.04 22.58 41.92 30.31 64.5 17.27l245.32-141.63c22.58-13.04 30.33-41.92 17.29-64.5s-41.92-30.32-64.5-17.27"
        />
        <path
          fill="#2AE5B9"
          d="M569.13 240.07 242.05 428.9c-22.59 13.04-30.33 41.92-17.3 64.5 13.04 22.58 41.92 30.3 64.51 17.27l327.08-188.84c22.6-13.04 30.33-41.92 17.3-64.5-13.04-22.58-41.92-30.31-64.5-17.27"
        />
      </g>
    </g>
  ),
  { fill: 'none' },
);

/** Euler Square DeFi icon (monochrome). */
export const EulerSquareMono = /* @__PURE__ */ createIcon(
  'EulerSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <rect width="1024" height="1024" mask={`url(#${_id}-euls-a)`} />
      <defs>
        <mask id={`${_id}-euls-a`}>
          <rect width="1024" height="1024" fill="#fff" />
          <path
            fill="#000"
            d="M734.69 526.84 407.61 715.68c-22.59 13.04-30.33 41.92-17.3 64.5 13.04 22.58 41.92 30.3 64.5 17.27L781.9 608.6c22.59-13.04 30.33-41.92 17.3-64.5-13.04-22.58-41.92-30.31-64.51-17.27m-226.22-60.37L263.15 608.1c-22.58 13.04-30.33 41.91-17.29 64.5 13.04 22.58 41.92 30.31 64.5 17.27l245.32-141.63c22.58-13.04 30.33-41.92 17.29-64.5s-41.92-30.32-64.5-17.27m60.66-226.4L242.05 428.9c-22.59 13.04-30.33 41.92-17.3 64.5 13.04 22.58 41.92 30.3 64.51 17.27l327.08-188.84c22.6-13.04 30.33-41.92 17.3-64.5-13.04-22.58-41.92-30.31-64.5-17.27"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
