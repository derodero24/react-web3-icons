import { createIcon } from '../utils';

// Source: https://bitget.com (official brand)
/** Bitget exchange icon (colored). */
export const Bitget = /* @__PURE__ */ createIcon(
  'Bitget',
  '0 0 64 64',
  () => (
    <>
      <path d="M29.266 24.1h13.321l13.626 14.167a2.44 2.44 0 0 1 .009 3.347L38.749 59.992H25.024l4.149-4.22 15.234-15.838-15.041-15.837" />
      <path d="M34.734 39.9H21.413L7.787 25.736a2.44 2.44 0 0 1-.009-3.346L25.251 4.009h13.722l-4.149 4.22L19.59 24.066l15.041 15.837" />
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
      <path d="M29.266 24.1h13.321l13.626 14.167a2.44 2.44 0 0 1 .009 3.347L38.749 59.992H25.024l4.149-4.22 15.234-15.838-15.041-15.837" />
      <path d="M34.734 39.9H21.413L7.787 25.736a2.44 2.44 0 0 1-.009-3.346L25.251 4.009h13.722l-4.149 4.22L19.59 24.066l15.041 15.837" />
    </>
  ),
  { fill: 'currentColor' },
);
