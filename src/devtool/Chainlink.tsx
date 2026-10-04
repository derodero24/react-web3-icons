import { createIcon } from '../utils';

// Source: https://cdn.prod.website-files.com/5f6b7190899f41fb70882d08/6aa7fef7f56d1f1d953c589d_Chainlink-Symbol-Blue.svg
// Official Chainlink-Symbol-Blue.svg from https://chain.link/brand-assets: the hexagon in #0847F7 with a transparent inner hexagon
// Mono: the same path in currentColor
/** Chainlink devtool icon (colored). */
export const Chainlink = /* @__PURE__ */ createIcon(
  'Chainlink',
  '0 0 64 64',
  () => (
    <path
      fill="#0847F7"
      d="M32 4 7.65 18v27.98l24.35 14 24.35-14V18zm14.04 36.05L32 48.12l-14.03-8.07V23.93L32 15.86l14.04 8.07z"
    />
  ),
  {},
);

/** Chainlink devtool icon (monochrome). */
export const ChainlinkMono = /* @__PURE__ */ createIcon(
  'ChainlinkMono',
  '0 0 64 64',
  () => (
    <path d="M32 4 7.65 18v27.98l24.35 14 24.35-14V18zm14.04 36.05L32 48.12l-14.03-8.07V23.93L32 15.86l14.04 8.07z" />
  ),
  { fill: 'currentColor' },
);
