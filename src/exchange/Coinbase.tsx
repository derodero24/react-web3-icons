import { createIcon } from '../utils';

// Source: https://www.coinbase.com (official site; walled, see notes)
// Source: https://github.com/coinbase/onchainkit/blob/3ecbd8fd28bf65002a4ad97092bfd0b157310e22/packages/onchainkit/src/internal/svg/coinbaseLogoSvg.tsx (official Coinbase repository, a UI copy of the C)
// Not verified (checked 2026-10-09): coinbase.com and coinbase.com/press answer automated requests with 403, so the brand kit could not be read. The official onchainkit UI icon coinbaseLogoSvg.tsx draws the same C in the same #0052FF with the same opening, but 5% narrower (a UI copy, aspect 0.95), so it corroborates the colour and structure only. The artwork, which predates the source policy, is unchanged
/** Coinbase Circle exchange icon (colored). */
export const CoinbaseCircle = /* @__PURE__ */ createIcon(
  'CoinbaseCircle',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#fff"
        d="M32 0c17.67 0 32 14.33 32 32S49.67 64 32 64 0 49.67 0 32 14.33 0 32 0"
      />
      <path
        fill="#0052ff"
        d="M32.01 43.25c-6.22 0-11.25-5.03-11.25-11.25s5.04-11.25 11.25-11.25c5.57 0 10.2 4.06 11.08 9.38h11.34C53.47 18.58 43.8 9.5 32 9.5 19.59 9.5 9.51 19.58 9.51 32s10.08 22.5 22.5 22.5c11.8 0 21.46-9.08 22.42-20.63H43.08c-.89 5.32-5.5 9.38-11.07 9.38"
      />
    </>
  ),
  {},
);

/** Coinbase Circle Alt exchange icon (colored). */
export const CoinbaseCircleAlt = /* @__PURE__ */ createIcon(
  'CoinbaseCircleAlt',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#0052ff"
        d="M32 0c17.67 0 32 14.33 32 32S49.67 64 32 64 0 49.67 0 32 14.33 0 32 0"
      />
      <path
        fill="#fff"
        d="M32.01 43.25c-6.22 0-11.25-5.03-11.25-11.25s5.04-11.25 11.25-11.25c5.57 0 10.2 4.06 11.08 9.38h11.34C53.47 18.58 43.8 9.5 32 9.5 19.59 9.5 9.51 19.58 9.51 32s10.08 22.5 22.5 22.5c11.8 0 21.46-9.08 22.42-20.63H43.08c-.89 5.32-5.5 9.38-11.07 9.38"
      />
    </>
  ),
  {},
);

/** Coinbase exchange icon (colored). */
export const Coinbase = /* @__PURE__ */ createIcon(
  'Coinbase',
  '0 0 64 64',
  () => (
    <path d="M32.05 46c-7.73 0-14-6.26-14-14s6.27-14 14-14c6.93 0 12.68 5.05 13.8 11.67h14.1C58.75 15.29 46.73 4 32.05 4c-15.46 0-28 12.54-28 28s12.54 28 28 28c14.68 0 26.7-11.3 27.9-25.67H45.83C44.73 40.95 38.98 46 32.05 46" />
  ),
  { fill: '#0052ff' },
);

/** Coinbase Circle exchange icon (monochrome). */
export const CoinbaseCircleMono = /* @__PURE__ */ createIcon(
  'CoinbaseCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0256)">
      <defs>
        <mask id={`${_id}-cbem-a`}>
          <rect width="2500" height="2500" fill="#fff" />
          <path
            fill="#000"
            d="M1250.4 1689.5c-242.8 0-439.4-196.7-439.4-439.5s196.7-439.4 439.4-439.4c217.5 0 398.1 158.6 432.9 366.2H2126c-37.4-451.2-414.9-805.7-875.6-805.7-485.2 0-878.9 393.7-878.9 878.9s393.7 878.9 878.9 878.9c460.7 0 838.3-354.5 875.6-805.7h-443.1c-34.8 207.7-215 366.3-432.5 366.3"
          />
        </mask>
      </defs>
      <path
        d="M1250 0c690.2 0 1250 559.8 1250 1250s-559.8 1250-1250 1250S0 1940.2 0 1250 559.8 0 1250 0"
        mask={`url(#${_id}-cbem-a)`}
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinbase exchange icon (monochrome). */
export const CoinbaseMono = /* @__PURE__ */ createIcon(
  'CoinbaseMono',
  '0 0 64 64',
  () => (
    <path d="M32.05 46c-7.73 0-14-6.26-14-14s6.27-14 14-14c6.93 0 12.68 5.05 13.8 11.67h14.1C58.75 15.29 46.73 4 32.05 4c-15.46 0-28 12.54-28 28s12.54 28 28 28c14.68 0 26.7-11.3 27.9-25.67H45.83C44.73 40.95 38.98 46 32.05 46" />
  ),
  { fill: 'currentColor' },
);
