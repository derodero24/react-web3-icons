import { createIcon } from '../utils';

// Source: https://bitfinex.com (official brand)
/** Bitfinex exchange icon (colored). */
export const Bitfinex = /* @__PURE__ */ createIcon(
  'Bitfinex',
  '0 0 64 64',
  () => (
    <>
      <path d="M4.05 40.5c-.49-7.92 2.84-16.73 9.7-23.59C28.66 2 59.72 4.1 59.9 4.11c-.09.11-22.8 33.03-49.7 36.11a46 46 0 0 1-6.15.3z" />
      <path d="M7.2 50.65a20 20 0 0 0 2.73 3.42c9.2 9.2 25.84 7.5 37.16-3.83C62.04 35.3 59.89 4.1 59.89 4.1c-.07.18-16.35 36.66-42.22 44.62A45 45 0 0 1 7.2 50.65" />
    </>
  ),
  { fill: '#03ca9b' },
);

/** Bitfinex exchange icon (monochrome). */
export const BitfinexMono = /* @__PURE__ */ createIcon(
  'BitfinexMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M4.05 40.5c-.49-7.92 2.84-16.73 9.7-23.59C28.66 2 59.72 4.1 59.9 4.11c-.09.11-22.8 33.03-49.7 36.11a46 46 0 0 1-6.15.3z" />
      <path d="M7.2 50.65a20 20 0 0 0 2.73 3.42c9.2 9.2 25.84 7.5 37.16-3.83C62.04 35.3 59.89 4.1 59.89 4.1c-.07.18-16.35 36.66-42.22 44.62A45 45 0 0 1 7.2 50.65" />
    </>
  ),
  { fill: 'currentColor' },
);
