import { Okx, OkxMono } from '../exchange/Okx';

// Source: re-export of Okx — see src/exchange/Okx.tsx. OKX Wallet uses the OKX checker: its header lockup on web3.okx.com (https://web3.okx.com/cdn/assets/imgs/258/4C0F53E9427468A2.svg, the black checker + "Wallet") is the file exchange/Okx is checked against, so the artwork now lives in one place
// The two units' files drew the same five-cell checker and differed by less than 0.05 units
// The OKX Wallet app icon (the checker on a lime #9AED2C tile, https://web3.okx.com/cdn/assets/imgs/254/43DEFFE88CCA0D7C.png) exists only as a raster, so no tile variant is drawn
export const OkxWallet = Okx;

export const OkxWalletMono = OkxMono;

/** @deprecated OKXWallet was renamed to word casing — use `OkxWallet` instead. */
export const OKXWallet = OkxWallet;

/** @deprecated Use `OkxWalletMono` instead. */
export const OKXWalletMono = OkxWalletMono;
