import { createIcon } from '../utils';

// Source: https://celo.org
/** Celo chain icon (colored). */
export const Celo = /* @__PURE__ */ createIcon(
  'Celo',
  '0 0 64 64',
  () => (
    <path d="M4.009 4.009h55.983v19.995h-9.676a19.995 19.995 0 1 0 0 15.992h9.676v19.996H4.009z" />
  ),
  { fill: '#FCFE52' },
);

/** Celo chain icon (monochrome). */
export const CeloMono = /* @__PURE__ */ createIcon(
  'CeloMono',
  '0 0 64 64',
  () => (
    <path d="M4.009 4.009h55.983v19.995h-9.676a19.995 19.995 0 1 0 0 15.992h9.676v19.996H4.009z" />
  ),
  { fill: 'currentColor' },
);
