import { createIcon } from '../utils';

// Source: https://liquity.org (official brand)
// Liquity V2 logo: light-blue circle + indigo column/arc overlay
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
