import { createIcon } from '../utils';

// Source: @web3icons/react (MIT) — Celo SVG (legacy third-party artwork)
// Source: https://celo.org
// Legacy artwork: the commit that added Celo (#488) took its paths from @web3icons/react (MIT), not from an official file; they have only been rescaled onto the 64 grid since
// Not verified (checked 2026-10-10): https://celo.org is the home page, not an official logo file, and the artwork has not been compared with one
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
