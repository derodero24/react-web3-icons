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
        d="M64 32c0 17.675-14.328 32-32 32S0 49.675 0 32C0 14.328 14.328 0 32 0s32 14.328 32 32"
      />
      <path
        fill="#405AE5"
        d="M0 32c0 13.933 8.907 25.787 21.333 30.18V1.82C8.907 6.214 0 18.068 0 32m62.192-10.627a38 38 0 0 0-1.747-.04c-21.6 0-39.112 17.512-39.112 39.112q0 .88.04 1.747A31.8 31.8 0 0 0 32 64c17.672 0 32-14.325 32-32a32 32 0 0 0-1.808-10.627"
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
      <path d="M0 32c0 13.933 8.907 25.787 21.333 30.18V1.82C8.907 6.214 0 18.068 0 32m62.192-10.627a38 38 0 0 0-1.747-.04c-21.6 0-39.112 17.512-39.112 39.112q0 .88.04 1.747A31.8 31.8 0 0 0 32 64c17.672 0 32-14.325 32-32a32 32 0 0 0-1.808-10.627" />
    </>
  ),
  { fill: 'currentColor' },
);
