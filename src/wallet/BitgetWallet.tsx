import { createIcon } from '../utils';

// Source: https://bitget.com
/** Bitget Wallet wallet icon (colored). */
export const BitgetWallet = /* @__PURE__ */ createIcon(
  'BitgetWallet',
  '0 0 64 64',
  () => (
    <>
      <path d="M29.27 24.1h13.32L56.2 38.27a2.44 2.44 0 0 1 .01 3.34L38.75 60H25.02l4.15-4.22 15.24-15.84L29.37 24.1" />
      <path d="M34.73 39.9H21.41L7.8 25.74a2.44 2.44 0 0 1-.01-3.35L25.25 4.01h13.72l-4.15 4.22L19.6 24.07 34.63 39.9" />
    </>
  ),
  { fill: '#00F0FF' },
);

/** Bitget Wallet wallet icon (monochrome). */
export const BitgetWalletMono = /* @__PURE__ */ createIcon(
  'BitgetWalletMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M29.27 24.1h13.32L56.2 38.27a2.44 2.44 0 0 1 .01 3.34L38.75 60H25.02l4.15-4.22 15.24-15.84L29.37 24.1" />
      <path d="M34.73 39.9H21.41L7.8 25.74a2.44 2.44 0 0 1-.01-3.35L25.25 4.01h13.72l-4.15 4.22L19.6 24.07 34.63 39.9" />
    </>
  ),
  { fill: 'currentColor' },
);
