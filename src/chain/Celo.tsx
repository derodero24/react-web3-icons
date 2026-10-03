import { createIcon } from '../utils';

// Source: https://celo.org
/** Celo chain icon (colored). */
export const Celo = /* @__PURE__ */ createIcon(
  'Celo',
  '0 0 64 64',
  () => <path d="M4 4h56v20h-9.68a20 20 0 1 0 0 16h9.67v20H4.01z" />,
  { fill: '#FCFE52' },
);

/** Celo chain icon (monochrome). */
export const CeloMono = /* @__PURE__ */ createIcon(
  'CeloMono',
  '0 0 64 64',
  () => <path d="M4 4h56v20h-9.68a20 20 0 1 0 0 16h9.67v20H4.01z" />,
  { fill: 'currentColor' },
);
