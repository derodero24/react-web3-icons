import { createIcon } from '../utils';

// Source: https://safe.global/images/common/safe-icon.svg (the mark the safe.global homepage serves)
// Safe: the three paths of safe-icon.svg, placed on the 64 grid unchanged, in that file's #1A1A1A (also the fill of every path in https://safe.global/images/common/safe-logo-wallet.svg and of https://safefoundation.org/images/common/safe-logo.svg); the previous #000 appeared in no official file
// SafeMono: the same paths in currentColor
// safe.global has no downloadable brand kit (/press, /brand, /brand-kit and /media-kit return 404, accessed 2026-10-09). The safe-wallet-monorepo logo-no-text.svg (currentColor) and the safefoundation.org logo are drawn about 7% squashed (aspect 1.04 against 0.97), so neither is used for the geometry
// SafeProtocol and SafeProtocolMono (defi) re-export these components
/** Safe wallet icon (colored). */
export const Safe = /* @__PURE__ */ createIcon(
  'Safe',
  '0 0 64 64',
  () => (
    <path d="M55.99 31.99h-5.9c-1.76 0-3.18 1.47-3.18 3.28v8.82c0 1.81-1.43 3.28-3.19 3.28H20.3c-1.76 0-3.19 1.47-3.19 3.28v6.08c0 1.8 1.43 3.28 3.19 3.28h24.79c1.76 0 3.16-1.47 3.16-3.28v-4.88c0-1.81 1.43-3.1 3.19-3.1h4.55c1.76 0 3.19-1.47 3.19-3.28V35.23c0-1.81-1.43-3.24-3.19-3.24M17.1 19.92c0-1.8 1.43-3.28 3.19-3.28H43.7c1.76 0 3.18-1.47 3.18-3.28V7.29C46.9 5.47 45.47 4 43.71 4H18.93c-1.76 0-3.19 1.47-3.19 3.29v4.67c0 1.82-1.42 3.29-3.18 3.29H8.02c-1.76 0-3.18 1.47-3.18 3.28v10.25c0 1.81 1.43 3.2 3.2 3.2h5.88c1.76 0 3.19-1.46 3.19-3.28zm12.13 5.69h5.66c1.85 0 3.34 1.54 3.34 3.44v5.83c0 1.9-1.5 3.45-3.34 3.45h-5.66c-1.84 0-3.34-1.55-3.34-3.45v-5.83c0-1.9 1.5-3.44 3.34-3.44" />
  ),
  { fill: '#1A1A1A' },
);

/** Safe wallet icon (monochrome). */
export const SafeMono = /* @__PURE__ */ createIcon(
  'SafeMono',
  '0 0 64 64',
  () => (
    <path d="M55.99 31.99h-5.9c-1.76 0-3.18 1.47-3.18 3.28v8.82c0 1.81-1.43 3.28-3.19 3.28H20.3c-1.76 0-3.19 1.47-3.19 3.28v6.08c0 1.8 1.43 3.28 3.19 3.28h24.79c1.76 0 3.16-1.47 3.16-3.28v-4.88c0-1.81 1.43-3.1 3.19-3.1h4.55c1.76 0 3.19-1.47 3.19-3.28V35.23c0-1.81-1.43-3.24-3.19-3.24M17.1 19.92c0-1.8 1.43-3.28 3.19-3.28H43.7c1.76 0 3.18-1.47 3.18-3.28V7.29C46.9 5.47 45.47 4 43.71 4H18.93c-1.76 0-3.19 1.47-3.19 3.29v4.67c0 1.82-1.42 3.29-3.18 3.29H8.02c-1.76 0-3.18 1.47-3.18 3.28v10.25c0 1.81 1.43 3.2 3.2 3.2h5.88c1.76 0 3.19-1.46 3.19-3.28zm12.13 5.69h5.66c1.85 0 3.34 1.54 3.34 3.44v5.83c0 1.9-1.5 3.45-3.34 3.45h-5.66c-1.84 0-3.34-1.55-3.34-3.45v-5.83c0-1.9 1.5-3.44 3.34-3.44" />
  ),
  { fill: 'currentColor' },
);
