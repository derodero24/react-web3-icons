import { createIcon } from '../utils';

// Source: https://okx.com/web3
/** Okx Wallet wallet icon (colored). */
export const OkxWallet = /* @__PURE__ */ createIcon(
  'OkxWallet',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M21.43 4H5.24A1.24 1.24 0 0 0 4 5.26v16.18c0 .68.56 1.24 1.24 1.24h16.18a1.24 1.24 0 0 0 1.24-1.25V5.25a1.24 1.24 0 0 0-1.24-1.24Zm18.66 18.67H23.92a1.24 1.24 0 0 0-1.24 1.24V40.1c0 .69.55 1.24 1.24 1.24H40.1a1.24 1.24 0 0 0 1.24-1.24V23.91a1.24 1.24 0 0 0-1.24-1.25ZM42.58 4h16.17c.7 0 1.25.55 1.25 1.24v16.18a1.24 1.24 0 0 1-1.25 1.24H42.58a1.24 1.24 0 0 1-1.24-1.25V5.25c0-.68.55-1.24 1.24-1.24ZM21.43 41.33H5.24A1.24 1.24 0 0 0 4 42.58v16.17c0 .7.56 1.25 1.24 1.25h16.18a1.24 1.24 0 0 0 1.24-1.25V42.58a1.24 1.24 0 0 0-1.24-1.24Zm21.15 0h16.17c.7 0 1.25.56 1.25 1.25v16.17A1.24 1.24 0 0 1 58.75 60H42.58a1.24 1.24 0 0 1-1.24-1.25V42.58c0-.69.55-1.24 1.24-1.24Z"
      clipRule="evenodd"
    />
  ),
  { fill: '#000000' },
);

/** Okx Wallet wallet icon (monochrome). */
export const OkxWalletMono = /* @__PURE__ */ createIcon(
  'OkxWalletMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M21.43 4H5.24A1.24 1.24 0 0 0 4 5.26v16.18c0 .68.56 1.24 1.24 1.24h16.18a1.24 1.24 0 0 0 1.24-1.25V5.25a1.24 1.24 0 0 0-1.24-1.24Zm18.66 18.67H23.92a1.24 1.24 0 0 0-1.24 1.24V40.1c0 .69.55 1.24 1.24 1.24H40.1a1.24 1.24 0 0 0 1.24-1.24V23.91a1.24 1.24 0 0 0-1.24-1.25ZM42.58 4h16.17c.7 0 1.25.55 1.25 1.24v16.18a1.24 1.24 0 0 1-1.25 1.24H42.58a1.24 1.24 0 0 1-1.24-1.25V5.25c0-.68.55-1.24 1.24-1.24ZM21.43 41.33H5.24A1.24 1.24 0 0 0 4 42.58v16.17c0 .7.56 1.25 1.24 1.25h16.18a1.24 1.24 0 0 0 1.24-1.25V42.58a1.24 1.24 0 0 0-1.24-1.24Zm21.15 0h16.17c.7 0 1.25.56 1.25 1.25v16.17A1.24 1.24 0 0 1 58.75 60H42.58a1.24 1.24 0 0 1-1.24-1.25V42.58c0-.69.55-1.24 1.24-1.24Z"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);

/** @deprecated OKXWallet was renamed to word casing — use `OkxWallet` instead. */
export const OKXWallet = OkxWallet;

/** @deprecated Use `OkxWalletMono` instead. */
export const OKXWalletMono = OkxWalletMono;
