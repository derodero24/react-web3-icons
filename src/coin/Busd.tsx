import { createIcon } from '../utils';

// Source: https://binance.com
/** Busd coin icon (colored). */
export const Busd = /* @__PURE__ */ createIcon(
  'Busd',
  '0 0 64 64',
  () => (
    <path d="m32 4 6.92 7.08L21.5 28.5l-6.92-6.92zm10.5 10.5 6.92 7.08L21.5 49.5l-6.92-6.92zM11 25l6.92 7.08L11 39l-6.92-6.92zm42 0 6.92 7.08L32 60l-6.92-6.92z" />
  ),
  { fill: '#f0b90b' },
);

/** Busd coin icon (monochrome). */
export const BusdMono = /* @__PURE__ */ createIcon(
  'BusdMono',
  '0 0 64 64',
  () => (
    <path d="m32 4 6.92 7.08L21.5 28.5l-6.92-6.92zm10.5 10.5 6.92 7.08L21.5 49.5l-6.92-6.92zM11 25l6.92 7.08L11 39l-6.92-6.92zm42 0 6.92 7.08L32 60l-6.92-6.92z" />
  ),
  { fill: 'currentColor' },
);
