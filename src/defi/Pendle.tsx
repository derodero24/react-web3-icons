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
        d="M54.395 26.4a22.392 22.392 0 1 1-44.783 0 22.392 22.392 0 0 1 44.783 0"
      />
      <path
        fill="#152E51"
        d="M21.927 59.988a12.318 12.318 0 1 0 .003-24.637 12.318 12.318 0 0 0 0 24.637"
      />
      <path
        fill="#152E51"
        d="M20.577 7.14v31.153h2.746V5.75q-1.427.604-2.746 1.387"
      />
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
      <path d="M21.927 59.988a12.318 12.318 0 1 0 .003-24.637 12.318 12.318 0 0 0 0 24.637" />
      <path d="M20.577 7.14v31.153h2.746V5.75q-1.427.604-2.746 1.387" />
    </>
  ),
  { fill: 'currentColor' },
);
