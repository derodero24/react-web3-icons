import { createIcon } from '../utils';

// Source: https://www.redstone.finance/images/RedStoneLogoSymbolRed.svg
// Source: https://www.redstone.finance/brand-kit/ (official brand kit)
// Default: the official RedStone symbol in red #AE0822 (RedStoneLogoSymbolRed.svg from redstone.finance/brand-kit), path unchanged; it replaces a #FF0000 variant with an extra sparkle taken from a dex repository
// Mono: the same symbol path in currentColor
/** Red Stone oracle icon (colored). */
export const RedStone = /* @__PURE__ */ createIcon(
  'RedStone',
  '0 0 64 64',
  () => (
    <path
      fill="#AE0822"
      d="m46 8.34-.04-.08h-27.9L4.02 32 18 55.66l.05.09h27.91L59.99 32zm-23.77 10.4-6.73 11.4H9.1l9.92-16.78zm2.96 28.06H38.8l3.2 5.45H22zm13.65-29.82H25.17l-3.12-5.23h19.9zM25.19 43.3l-6.74-11.41 6.74-11.41h13.63l6.74 11.4-6.74 11.42zm23.32-13.16-6.73-11.4L45 13.38l9.9 16.77zm-26.27 14.9L19 50.6 8.98 33.64h6.52zm32.8-11.4L45 50.6l-3.24-5.55 6.74-11.42z"
    />
  ),
  {},
);

/** Red Stone oracle icon (monochrome). */
export const RedStoneMono = /* @__PURE__ */ createIcon(
  'RedStoneMono',
  '0 0 64 64',
  () => (
    <path d="m46 8.34-.04-.08h-27.9L4.02 32 18 55.66l.05.09h27.91L59.99 32zm-23.77 10.4-6.73 11.4H9.1l9.92-16.78zm2.96 28.06H38.8l3.2 5.45H22zm13.65-29.82H25.17l-3.12-5.23h19.9zM25.19 43.3l-6.74-11.41 6.74-11.41h13.63l6.74 11.4-6.74 11.42zm23.32-13.16-6.73-11.4L45 13.38l9.9 16.77zm-26.27 14.9L19 50.6 8.98 33.64h6.52zm32.8-11.4L45 50.6l-3.24-5.55 6.74-11.42z" />
  ),
  { fill: 'currentColor' },
);
