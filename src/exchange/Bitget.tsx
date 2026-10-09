import { createIcon } from '../utils';

// Source: https://www.bitget.com/micro-runtime/images/logo-light.svg (official header lockup: the symbol and the Bitget wordmark in currentColor)
// Source: https://www.bitget.com (official site; its header also draws the app icon inline: the symbol in #00040C on a #00F0FF rounded tile, rx 8 of 36)
// Not verified (checked 2026-10-09): the shipped cyan symbol predates the source policy and differs from the symbol of the official header lockup and app-icon tile (the official chevrons are wider: aspect 0.93 against 0.89 here, alpha IoU 0.92). bitget.com publishes the symbol only in currentColor or dark on the #00F0FF tile, not as a standalone cyan mark, and has no brand kit page (/brand, /media-kit and /press return 404), so the artwork is unchanged; replacing it needs a decision on the default (standalone symbol in which colour, or the tile)
/** Bitget exchange icon (colored). */
export const Bitget = /* @__PURE__ */ createIcon(
  'Bitget',
  '0 0 64 64',
  () => (
    <>
      <path d="M29.27 24.1h13.32L56.2 38.27a2.44 2.44 0 0 1 .01 3.34L38.75 60H25.02l4.15-4.22 15.24-15.84L29.37 24.1" />
      <path d="M34.73 39.9H21.41L7.8 25.74a2.44 2.44 0 0 1-.01-3.35L25.25 4.01h13.72l-4.15 4.22L19.6 24.07 34.63 39.9" />
    </>
  ),
  { fill: '#00F0FF' },
);

/** Bitget exchange icon (monochrome). */
export const BitgetMono = /* @__PURE__ */ createIcon(
  'BitgetMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M29.27 24.1h13.32L56.2 38.27a2.44 2.44 0 0 1 .01 3.34L38.75 60H25.02l4.15-4.22 15.24-15.84L29.37 24.1" />
      <path d="M34.73 39.9H21.41L7.8 25.74a2.44 2.44 0 0 1-.01-3.35L25.25 4.01h13.72l-4.15 4.22L19.6 24.07 34.63 39.9" />
    </>
  ),
  { fill: 'currentColor' },
);
