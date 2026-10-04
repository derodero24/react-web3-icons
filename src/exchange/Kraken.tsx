import { createIcon } from '../utils';

// Source: https://assets-cms.kraken.com/images/51n36hrp/facade/4d67f3f4eac6aa0702c6ae62b1e0b1abc41b10cd-650x155.svg (the "kraken by Payward" header logo served by kraken.com, e.g. on https://www.kraken.com/press)
// Colored: the symbol path copied unchanged out of the official header lockup (the lettering is left out), #7132F5, placed on the 64 grid; it replaces the earlier #5841D8 artwork
// Mono: the same path in currentColor
/** Kraken exchange icon (colored). */
export const Kraken = /* @__PURE__ */ createIcon(
  'Kraken',
  '0 0 64 64',
  () => (
    <path d="M31.98 9.72C16.53 9.72 4 22.42 4 38.07v12.15c0 2.24 1.79 4.05 4 4.05s4-1.81 4-4.05V38.07c0-2.24 1.79-4.05 4-4.05s4 1.8 4 4.05v12.15c0 2.24 1.78 4.05 3.99 4.05s4-1.81 4-4.05V38.07c0-2.24 1.78-4.05 4-4.05s4 1.8 4 4.05v12.15c0 2.24 1.8 4.05 4 4.05s4-1.81 4-4.05V38.07c0-2.24 1.78-4.05 4-4.05 2.2 0 4 1.8 4 4.05v12.15c0 2.24 1.79 4.05 4 4.05s4-1.81 4-4.05V38.07c0-15.65-12.54-28.35-28-28.35" />
  ),
  { fill: '#7132F5' },
);

/** Kraken exchange icon (monochrome). */
export const KrakenMono = /* @__PURE__ */ createIcon(
  'KrakenMono',
  '0 0 64 64',
  () => (
    <path d="M31.98 9.72C16.53 9.72 4 22.42 4 38.07v12.15c0 2.24 1.79 4.05 4 4.05s4-1.81 4-4.05V38.07c0-2.24 1.79-4.05 4-4.05s4 1.8 4 4.05v12.15c0 2.24 1.78 4.05 3.99 4.05s4-1.81 4-4.05V38.07c0-2.24 1.78-4.05 4-4.05s4 1.8 4 4.05v12.15c0 2.24 1.8 4.05 4 4.05s4-1.81 4-4.05V38.07c0-2.24 1.78-4.05 4-4.05 2.2 0 4 1.8 4 4.05v12.15c0 2.24 1.79 4.05 4 4.05s4-1.81 4-4.05V38.07c0-15.65-12.54-28.35-28-28.35" />
  ),
  { fill: 'currentColor' },
);
