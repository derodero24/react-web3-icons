import { createIcon } from '../utils';

// Source: https://paraswap.io
/** Para Swap DEX icon (colored). */
export const ParaSwap = /* @__PURE__ */ createIcon(
  'ParaSwap',
  '0 0 64 64',
  () => (
    <>
      <path d="M60 54.4 34.1 9.6 8.2 54.4z" />
      <path d="m15.9 30.6 11.9-21H4z" />
      <path d="M49.42 48.47H18.78l15.32-26.5z" />
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
      <path d="M60 54.4 34.1 9.6 8.2 54.4z" />
      <path d="m15.9 30.6 11.9-21H4z" />
      <path d="M49.42 48.47H18.78l15.32-26.5z" />
    </>
  ),
  { fill: 'currentColor' },
);
