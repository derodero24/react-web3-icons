import { createIcon } from '../utils';

// Source: https://cdn.prod.website-files.com/5fd883457ba5da4c3822b02c/671246973b22dfce4deb98be_liquity-logo.svg (navbar and footer logo of the official site https://www.liquity.org)
// Source: https://cdn.prod.website-files.com/5fd883457ba5da4c3822b02c/66b6165595ff1673d254ee8a_icon-logo.svg (standalone icon on https://www.liquity.org)
// Liquity V2 logo: a #95CBF3 disc with the #405AE5 column and arc. The paths are the 40×40 mark of the liquity.org navbar lockup liquity-logo.svg (without the wordmark), scaled 1.6× onto the 64 grid
// The site's standalone icon-logo.svg is the same mark in the same colours but draws the arc slightly differently (about 0.3% of the pixels differ, against 0.03% for the lockup mark)
// Mono: the #405AE5 column and arc in solid ink, with the disc as a 1.44-unit outline ring
// liquity.org links no brand or press kit (its /brand, /press and /media-kit pages return 404), and liquity.org/icon-logo.svg returns 404 (checked 2026-10-09)
/** Liquity DeFi icon (colored). */
export const Liquity = /* @__PURE__ */ createIcon(
  'Liquity',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#95CBF3"
        d="M64 32c0 17.67-14.33 32-32 32S0 49.67 0 32 14.33 0 32 0s32 14.33 32 32"
      />
      <path
        fill="#405AE5"
        d="M0 32c0 13.93 8.9 25.79 21.33 30.18V1.82C8.91 6.22 0 18.07 0 32m62.2-10.63q-.88-.04-1.75-.04c-21.6 0-39.12 17.52-39.12 39.12q0 .87.04 1.74A32 32 0 0 0 32 64c17.67 0 32-14.33 32-32 0-3.73-.64-7.3-1.8-10.63"
      />
    </>
  ),
  {},
);

/** Liquity DeFi icon (monochrome). */
export const LiquityMono = /* @__PURE__ */ createIcon(
  'LiquityMono',
  '0 0 64 64',
  () => (
    <>
      <path
        fillRule="evenodd"
        d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m1.44 0a30.56 30.56 0 1 0 61.12 0 30.56 30.56 0 1 0-61.12 0"
      />
      <path d="M0 32c0 13.93 8.9 25.79 21.33 30.18V1.82C8.91 6.22 0 18.07 0 32m62.2-10.63a38 38 0 0 0-1.76-.04c-21.6 0-39.1 17.51-39.1 39.11q0 .88.03 1.75A32 32 0 0 0 32 64c17.67 0 32-14.32 32-32a32 32 0 0 0-1.8-10.63" />
    </>
  ),
  { fill: 'currentColor' },
);
