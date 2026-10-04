import { createIcon } from '../utils';

// Source: https://aave.com/aave-brand-assets.zip (official brand kit: Logomark Purple.svg)
/** Aave DeFi icon (colored). */
export const Aave = /* @__PURE__ */ createIcon(
  'Aave',
  '0 0 64 64',
  () => (
    <>
      <path d="M24.57 46.6a5.69 5.69 0 1 0 0-11.4 5.69 5.69 0 0 0 0 11.4" />
      <path d="M39.45 46.6a5.69 5.69 0 1 0 0-11.4 5.69 5.69 0 0 0 0 11.4" />
      <path d="M32 17.39c-15.47 0-28 12.77-28 28.53h7.15c0-11.8 9.26-21.38 20.85-21.38s20.84 9.57 20.84 21.38H60C60 30.16 47.46 17.4 32 17.4" />
    </>
  ),
  { fill: '#9391F7' },
);

/** Aave DeFi icon (monochrome). */
export const AaveMono = /* @__PURE__ */ createIcon(
  'AaveMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M24.57 46.6a5.69 5.69 0 1 0 0-11.4 5.69 5.69 0 0 0 0 11.4" />
      <path d="M39.45 46.6a5.69 5.69 0 1 0 0-11.4 5.69 5.69 0 0 0 0 11.4" />
      <path d="M32 17.39c-15.47 0-28 12.77-28 28.53h7.15c0-11.8 9.26-21.38 20.85-21.38s20.84 9.57 20.84 21.38H60C60 30.16 47.46 17.4 32 17.4" />
    </>
  ),
  { fill: 'currentColor' },
);
