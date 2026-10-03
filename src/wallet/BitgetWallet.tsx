import { createIcon } from '../utils';

// Source: https://web3.bitget.com/bgwactivity-static/_next/static/media/Bitget-Wallet-Logomark.07wqb3-5_b2ml.svg
// Source: https://web3.bitget.com/bgwactivity-static/_next/static/media/logo-pack.0q3ryo-u8dlm0.zip (official brand kit https://web3.bitget.com/brand-kit, logo pack of 2026-07-20: Bitget-Wallet-Logomark.svg, Bitget-Wallet-Logomark-Black.svg)
// Colored: the official Bitget-Wallet-Logomark.svg, the #00F0FF chevron on its #001F29 rounded tile (rx 60 of 256). The brand kit publishes the logomark only with its tile, so the tile is part of the default icon
// Mono: the tile in currentColor with the chevron knocked out (evenodd), the layout of the official single-colour Bitget-Wallet-Logomark-Black.svg
/** Bitget Wallet wallet icon (colored). */
export const BitgetWallet = /* @__PURE__ */ createIcon(
  'BitgetWallet',
  '0 0 64 64',
  () => (
    <g transform="scale(.25)">
      <rect width="256" height="256" fill="#001F29" rx="60" />
      <path
        fill="#00F0FF"
        d="M106.38 37.61H75.36c-6.27 0-8.63 7.88-3.96 12.54l70.6 70.6c2.2 2.02 3.57 4.2 3.62 7.1-.05 2.88-1.42 5.07-3.62 7.09l-70.6 70.6c-4.67 4.66-2.31 12.53 3.96 12.53 10.37.02 20.68.01 31.02 0h15.54c6.8 0 10.84-3.63 14.47-7.25l63.67-63.67c5.08-5.09 9.63-11.83 9.56-19.3.06-7.47-4.48-14.22-9.56-19.3l-63.67-63.67c-3.63-3.63-7.67-7.26-14.47-7.26z"
      />
    </g>
  ),
  {},
);

/** Bitget Wallet wallet icon (monochrome). */
export const BitgetWalletMono = /* @__PURE__ */ createIcon(
  'BitgetWalletMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M15 0h34a15 15 0 0 1 15 15v34a15 15 0 0 1-15 15H15A15 15 0 0 1 0 49V15A15 15 0 0 1 15 0m11.6 9.4h-7.76c-1.57 0-2.16 1.97-1 3.14L35.5 30.19c.55.5.9 1.05.9 1.77s-.35 1.27-.9 1.77L17.85 51.38c-1.17 1.17-.58 3.14.99 3.14h11.65c1.69 0 2.7-.9 3.6-1.82l15.93-15.9c1.27-1.27 2.41-2.96 2.4-4.83.01-1.87-1.13-3.55-2.4-4.82L34.1 11.22c-.91-.9-1.92-1.82-3.62-1.82z"
    />
  ),
  { fill: 'currentColor' },
);
