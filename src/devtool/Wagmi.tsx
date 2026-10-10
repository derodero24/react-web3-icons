import { createIcon } from '../utils';

// Source: https://github.com/wevm/wagmi/blob/main/site/public/favicon.svg (served as https://wagmi.sh/favicon.svg)
// Source: https://github.com/wevm/wagmi/blob/main/site/public/logo-light.svg (served as https://wagmi.sh/logo-light.svg)
// Mark: the w-and-dot path of wagmi's official favicon.svg (white in the source), uniformly scaled (56/629) onto the 64 grid (silhouette IoU 0.993). The colour #1B1B1B is the fill of the official light-mode wordmark logo-light.svg
// Mono: the same path in currentColor
/** Wagmi devtool icon (colored). */
export const Wagmi = /* @__PURE__ */ createIcon(
  'Wagmi',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M10.4 34.82a3.2 3.2 0 0 0 3.19 3.2h6.39a3.2 3.2 0 0 0 3.2-3.2V22.04a3.19 3.19 0 1 1 6.39 0v12.78a3.2 3.2 0 0 0 3.2 3.2h6.38a3.2 3.2 0 0 0 3.2-3.2V22.04a3.19 3.19 0 1 1 6.39 0V41.2a3.2 3.2 0 0 1-3.2 3.2H7.2A3.2 3.2 0 0 1 4 41.2V22.04a3.2 3.2 0 1 1 6.4 0zm45.34 10.35a4.25 4.25 0 1 0 0-8.52 4.25 4.25 0 0 0 0 8.52"
      clipRule="evenodd"
    />
  ),
  { fill: '#1B1B1B' },
);

/** Wagmi devtool icon (monochrome). */
export const WagmiMono = /* @__PURE__ */ createIcon(
  'WagmiMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M10.4 34.82a3.2 3.2 0 0 0 3.19 3.2h6.39a3.2 3.2 0 0 0 3.2-3.2V22.04a3.19 3.19 0 1 1 6.39 0v12.78a3.2 3.2 0 0 0 3.2 3.2h6.38a3.2 3.2 0 0 0 3.2-3.2V22.04a3.19 3.19 0 1 1 6.39 0V41.2a3.2 3.2 0 0 1-3.2 3.2H7.2A3.2 3.2 0 0 1 4 41.2V22.04a3.2 3.2 0 1 1 6.4 0zm45.34 10.35a4.25 4.25 0 1 0 0-8.52 4.25 4.25 0 0 0 0 8.52"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
