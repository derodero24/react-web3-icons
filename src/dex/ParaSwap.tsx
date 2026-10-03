import { createIcon } from '../utils';

// Source: https://paraswap.io
/** Para Swap DEX icon (colored). */
export const ParaSwap = /* @__PURE__ */ createIcon(
  'ParaSwap',
  '0 0 64 64',
  () => (
    <>
      <path d="M59.992 54.393 34.099 9.607 8.207 54.393z" />
      <path d="M15.905 30.6 27.8 9.607H4.01z" />
      <path d="M49.417 48.465H18.782l15.317-26.498z" />
    </>
  ),
  { fill: '#2669F5' },
);

/** Para Swap DEX icon (monochrome). */
export const ParaSwapMono = /* @__PURE__ */ createIcon(
  'ParaSwapMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M59.992 54.393 34.099 9.607 8.207 54.393z" />
      <path d="M15.905 30.6 27.8 9.607H4.01z" />
      <path d="M49.417 48.465H18.782l15.317-26.498z" />
    </>
  ),
  { fill: 'currentColor' },
);
