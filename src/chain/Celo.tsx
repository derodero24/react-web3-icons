import { createIcon } from '../utils';

// Source: https://celo.org
const celoContent = () => (
  <path d="M3 3h18v6.429h-3.111a6.429 6.429 0 1 0 0 5.142H21V21H3z" />
);

/** Celo chain icon (colored). */
export const Celo = /* @__PURE__ */ createIcon(
  'Celo',
  '0 0 24 24',
  celoContent,
  '#FCFE52',
);

/** Celo chain icon (monochrome). */
export const CeloMono = /* @__PURE__ */ createIcon(
  'CeloMono',
  '0 0 24 24',
  celoContent,
  'currentColor',
);
