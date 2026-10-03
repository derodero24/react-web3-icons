import { createIcon } from '../utils';

// Source: https://binance.com
/** Busd coin icon (colored). */
export const Busd = /* @__PURE__ */ createIcon(
  'Busd',
  '0 0 64 64',
  () => (
    <path d="m32 4.001 6.917 7.083L21.5 28.5l-6.917-6.916zm10.5 10.5 6.916 7.083L21.501 49.5l-6.917-6.917zM11 25l6.916 7.083L11.001 39l-6.916-6.916zm42 0 6.917 7.083L32 59.999l-6.916-6.916z" />
  ),
  { fill: '#f0b90b' },
);

/** Busd coin icon (monochrome). */
export const BusdMono = /* @__PURE__ */ createIcon(
  'BusdMono',
  '0 0 64 64',
  () => (
    <path d="m32 4.001 6.917 7.083L21.5 28.5l-6.917-6.916zm10.5 10.5 6.916 7.083L21.501 49.5l-6.917-6.917zM11 25l6.916 7.083L11.001 39l-6.916-6.916zm42 0 6.917 7.083L32 59.999l-6.916-6.916z" />
  ),
  { fill: 'currentColor' },
);
