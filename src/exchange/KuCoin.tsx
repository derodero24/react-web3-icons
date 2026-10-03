import { createIcon } from '../utils';

// Source: https://assets.staticimg.com/kc-v2-config/site-config/693bcdd4680db10001fa9856_logo_general_green.svg
// Source: https://assets.staticimg.com/kc-v2-config/site-config/695545321abf9c0001915126_mini_logo.svg
// Colored: the K symbol path copied unchanged out of the official logo_general_green.svg lockup served by kucoin.com (the KUCOIN lettering is left out), #00B47D, placed on the 64 grid
// The official mini_logo.svg shows the same K in white on a #00B47D rounded tile, confirming the colour
// Mono: the same K path in currentColor
/** Ku Coin exchange icon (colored). */
export const KuCoin = /* @__PURE__ */ createIcon(
  'KuCoin',
  '0 0 64 64',
  () => (
    <path d="m22.47 31.98 16.58 16.58 10.49-10.48a4.75 4.75 0 0 1 6.7 0 4.75 4.75 0 0 1 0 6.7L42.4 58.62a4.75 4.75 0 0 1-6.7 0L15.84 38.7v11.87c0 2.59-2.11 4.77-4.77 4.77a4.73 4.73 0 0 1-4.76-4.77V13.52c0-2.66 2.1-4.76 4.76-4.76s4.77 2.1 4.77 4.76V25.3l19.9-19.92a4.75 4.75 0 0 1 6.71 0L56.3 19.22a4.75 4.75 0 0 1 0 6.7 4.75 4.75 0 0 1-6.7 0L39.1 15.44 22.47 32.02zM39.1 27.2a4.73 4.73 0 0 0-4.76 4.77c0 2.65 2.1 4.76 4.76 4.76s4.76-2.1 4.76-4.76c-.04-2.66-2.15-4.77-4.76-4.77" />
  ),
  { fill: '#00B47D' },
);

/** Ku Coin exchange icon (monochrome). */
export const KuCoinMono = /* @__PURE__ */ createIcon(
  'KuCoinMono',
  '0 0 64 64',
  () => (
    <path d="m22.47 31.98 16.58 16.58 10.49-10.48a4.75 4.75 0 0 1 6.7 0 4.75 4.75 0 0 1 0 6.7L42.4 58.62a4.75 4.75 0 0 1-6.7 0L15.84 38.7v11.87c0 2.59-2.11 4.77-4.77 4.77a4.73 4.73 0 0 1-4.76-4.77V13.52c0-2.66 2.1-4.76 4.76-4.76s4.77 2.1 4.77 4.76V25.3l19.9-19.92a4.75 4.75 0 0 1 6.71 0L56.3 19.22a4.75 4.75 0 0 1 0 6.7 4.75 4.75 0 0 1-6.7 0L39.1 15.44 22.47 32.02zM39.1 27.2a4.73 4.73 0 0 0-4.76 4.77c0 2.65 2.1 4.76 4.76 4.76s4.76-2.1 4.76-4.76c-.04-2.66-2.15-4.77-4.76-4.77" />
  ),
  { fill: 'currentColor' },
);
