import { createIcon } from '../utils';

// Source: https://safe.global/images/common/safe-icon.svg (official site icon)
// Source: https://github.com/safe-global/safe-wallet-monorepo/blob/b22a58cae13802bc4f77a42562718b9dae58aa0b/apps/web/public/images/logo-no-text.svg (official Safe{Wallet} repository, the same mark in currentColor)
// Default: the three paths of the official safe-icon.svg in its #1A1A1A, unchanged, placed on the 64 grid; it replaces the same mark in #000
// Mono: the same paths in currentColor, as the Safe{Wallet} app's own logo-no-text.svg
/** Safe wallet icon (colored). */
export const Safe = /* @__PURE__ */ createIcon(
  'Safe',
  '0 0 64 64',
  () => (
    <g>
      <path d="M55.99 31.98H50.1c-1.76 0-3.18 1.47-3.18 3.28v8.81c0 1.82-1.43 3.3-3.19 3.3H20.3c-1.76 0-3.19 1.46-3.19 3.28v6.07c0 1.81 1.43 3.28 3.19 3.28h24.78c1.76 0 3.17-1.47 3.17-3.28v-4.88c0-1.8 1.42-3.1 3.18-3.1h4.55c1.76 0 3.19-1.46 3.19-3.27V35.23c0-1.81-1.43-3.24-3.19-3.24" />
      <path d="M17.11 19.92c0-1.82 1.42-3.29 3.19-3.29h23.4c1.76 0 3.19-1.47 3.19-3.28V7.28C46.9 5.47 45.47 4 43.7 4H18.93c-1.75 0-3.18 1.47-3.18 3.28v4.68c0 1.81-1.43 3.28-3.19 3.28H8.03c-1.75 0-3.18 1.47-3.18 3.29v10.24a3.2 3.2 0 0 0 3.19 3.21h5.89c1.76 0 3.18-1.47 3.18-3.28z" />
      <path d="M29.24 25.6h5.66c1.84 0 3.34 1.54 3.34 3.44v5.84c0 1.9-1.5 3.44-3.34 3.44h-5.66c-1.84 0-3.34-1.54-3.34-3.44v-5.84c0-1.9 1.5-3.44 3.34-3.44" />
    </g>
  ),
  { fill: '#1A1A1A' },
);

/** Safe wallet icon (monochrome). */
export const SafeMono = /* @__PURE__ */ createIcon(
  'SafeMono',
  '0 0 64 64',
  () => (
    <g>
      <path d="M55.99 31.98H50.1c-1.76 0-3.18 1.47-3.18 3.28v8.81c0 1.82-1.43 3.3-3.19 3.3H20.3c-1.76 0-3.19 1.46-3.19 3.28v6.07c0 1.81 1.43 3.28 3.19 3.28h24.78c1.76 0 3.17-1.47 3.17-3.28v-4.88c0-1.8 1.42-3.1 3.18-3.1h4.55c1.76 0 3.19-1.46 3.19-3.27V35.23c0-1.81-1.43-3.24-3.19-3.24" />
      <path d="M17.11 19.92c0-1.82 1.42-3.29 3.19-3.29h23.4c1.76 0 3.19-1.47 3.19-3.28V7.28C46.9 5.47 45.47 4 43.7 4H18.93c-1.75 0-3.18 1.47-3.18 3.28v4.68c0 1.81-1.43 3.28-3.19 3.28H8.03c-1.75 0-3.18 1.47-3.18 3.29v10.24a3.2 3.2 0 0 0 3.19 3.21h5.89c1.76 0 3.18-1.47 3.18-3.28z" />
      <path d="M29.24 25.6h5.66c1.84 0 3.34 1.54 3.34 3.44v5.84c0 1.9-1.5 3.44-3.34 3.44h-5.66c-1.84 0-3.34-1.54-3.34-3.44v-5.84c0-1.9 1.5-3.44 3.34-3.44" />
    </g>
  ),
  { fill: 'currentColor' },
);
