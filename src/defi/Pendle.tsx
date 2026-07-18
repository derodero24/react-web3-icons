import { createIcon } from '../utils';

// Logomark re-drawn to match the official pendle.finance logo (gray backdrop disc, two-tone pendulum ball); original paths from @web3icons/react (MIT)
/** Pendle DeFi icon (colored). */
export const Pendle = /* @__PURE__ */ createIcon(
  'Pendle',
  '0 0 24 24',
  _id => (
    <>
      <path
        fill="#DFDFDF"
        d="M19.2 10.2a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0"
      />
      <path
        fill="#184281"
        d="M8.76 21a3.961 3.961 0 1 0 .001-7.922 3.961 3.961 0 0 0 0 7.922"
      />
      <clipPath id={`${_id}-pndl-a`}>
        <path d="M19.2 10.2a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0" />
      </clipPath>
      <path
        fill="#0D2A50"
        clipPath={`url(#${_id}-pndl-a)`}
        d="M8.76 21a3.961 3.961 0 1 0 .001-7.922 3.961 3.961 0 0 0 0 7.922"
      />
      <path
        fill="#0D2A50"
        d="M8.326 4.007v10.017h.883V3.56q-.459.194-.883.446"
      />
    </>
  ),
  'none',
);

/** Pendle DeFi icon (monochrome). */
export const PendleMono = /* @__PURE__ */ createIcon(
  'PendleMono',
  '0 0 24 24',
  () => (
    <>
      <path
        opacity=".25"
        d="M19.2 10.2a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0"
      />
      <path d="M8.76 21a3.961 3.961 0 1 0 .001-7.922 3.961 3.961 0 0 0 0 7.922" />
      <path d="M8.326 4.007v10.017h.883V3.56q-.459.194-.883.446" />
    </>
  ),
  'currentColor',
);
