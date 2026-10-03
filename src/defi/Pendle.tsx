import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
/** Pendle DeFi icon (colored). */
export const Pendle = /* @__PURE__ */ createIcon(
  'Pendle',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#fff"
        d="M54.4 26.4a22.39 22.39 0 1 1-44.79 0 22.39 22.39 0 0 1 44.78 0"
      />
      <path
        fill="#152E51"
        d="M21.93 59.99a12.32 12.32 0 1 0 0-24.64 12.32 12.32 0 0 0 0 24.64"
      />
      <path fill="#152E51" d="M20.58 7.14V38.3h2.74V5.75q-1.42.6-2.74 1.39" />
    </>
  ),
  { fill: 'none' },
);

/** Pendle DeFi icon (monochrome). */
export const PendleMono = /* @__PURE__ */ createIcon(
  'PendleMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M21.93 59.99a12.32 12.32 0 1 0 0-24.64 12.32 12.32 0 0 0 0 24.64" />
      <path d="M20.58 7.14V38.3h2.74V5.75q-1.42.6-2.74 1.39" />
    </>
  ),
  { fill: 'currentColor' },
);
