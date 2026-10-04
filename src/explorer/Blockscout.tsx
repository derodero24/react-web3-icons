import { createIcon } from '../utils';

// Source: https://docs.blockscout.com/logo/Color_BS_symbol.svg
// Colored: the official colour symbol Color_BS_symbol.svg served by docs.blockscout.com (#5353D3); the geometry is unchanged from the previous artwork, only the colour (#1258F6) was off-brand
// Mono: the same path in currentColor
/** Blockscout explorer icon (colored). */
export const Blockscout = /* @__PURE__ */ createIcon(
  'Blockscout',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M26.33 7.35a2.6 2.6 0 0 0-2.6-2.6h-6.15a2.6 2.6 0 0 0-2.6 2.6v6.16a2.6 2.6 0 0 1-2.6 2.6H6.63a2.6 2.6 0 0 0-2.6 2.59v37.93a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6V18.7a2.6 2.6 0 0 1 2.6-2.6h5.76a2.6 2.6 0 0 0 2.6-2.6zm22.7 0a2.6 2.6 0 0 0-2.6-2.6h-6.16a2.6 2.6 0 0 0-2.6 2.6v6.16a2.6 2.6 0 0 0 2.6 2.6h5.77a2.6 2.6 0 0 1 2.6 2.59v37.93a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6V18.7a2.6 2.6 0 0 0-2.6-2.6h-5.77a2.6 2.6 0 0 1-2.6-2.6zM37.68 29.07a2.6 2.6 0 0 0-2.6-2.6h-6.15a2.6 2.6 0 0 0-2.6 2.6v16.86a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6z"
    />
  ),
  { fill: '#5353D3' },
);

/** Blockscout explorer icon (monochrome). */
export const BlockscoutMono = /* @__PURE__ */ createIcon(
  'BlockscoutMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M26.33 7.35a2.6 2.6 0 0 0-2.6-2.6h-6.15a2.6 2.6 0 0 0-2.6 2.6v6.16a2.6 2.6 0 0 1-2.6 2.6H6.63a2.6 2.6 0 0 0-2.6 2.59v37.93a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6V18.7a2.6 2.6 0 0 1 2.6-2.6h5.76a2.6 2.6 0 0 0 2.6-2.6zm22.7 0a2.6 2.6 0 0 0-2.6-2.6h-6.16a2.6 2.6 0 0 0-2.6 2.6v6.16a2.6 2.6 0 0 0 2.6 2.6h5.77a2.6 2.6 0 0 1 2.6 2.59v37.93a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6V18.7a2.6 2.6 0 0 0-2.6-2.6h-5.77a2.6 2.6 0 0 1-2.6-2.6zM37.68 29.07a2.6 2.6 0 0 0-2.6-2.6h-6.15a2.6 2.6 0 0 0-2.6 2.6v16.86a2.6 2.6 0 0 0 2.6 2.6h6.15a2.6 2.6 0 0 0 2.6-2.6z"
    />
  ),
  { fill: 'currentColor' },
);
