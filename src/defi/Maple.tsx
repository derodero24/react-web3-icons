import { createIcon } from '../utils';

// Maple Finance — orange circle with white maple leaf details
// Paths sourced from CoinSpace/crypto-db: logo/maple-finance.svg
/** Maple DeFi icon (colored). */
export const Maple = /* @__PURE__ */ createIcon(
  'Maple',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 64c17.67 0 32-14.33 32-32S49.67 0 32 0 0 14.33 0 32s14.33 32 32 32" />
      <path
        fill="#fff"
        d="M16.32 28.37c6.85-.2 23.17-.95 26.82-6.26 2.77-4.05-3.35-8.25-6.25-9.77-2.9-1.53-6.95-2.2-6.95-2.2 8.13.91 21 5.38 17 13.5-3.6 7.28-22.28 8.26-30.62 8.26zm0 18.1v-3.45c10.35-.34 24.19-.68 31.36-7.52.2 6.02-8.08 8.74-14.41 9.87-5.48.98-11.32 1.26-16.94 1.1"
      />
      <path
        fill="#fff"
        d="M47.36 28.12c-5.68 5.82-16.65 7.54-31.04 7.54v3.49c15.13 0 31-2.31 31.04-11.03"
      />
    </>
  ),
  { fill: '#FC784A' },
);

/** Maple DeFi icon (monochrome). */
export const MapleMono = /* @__PURE__ */ createIcon(
  'MapleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(3.2)">
      <path
        d="M10 20c5.52 0 10-4.48 10-10S15.52 0 10 0 0 4.48 0 10s4.48 10 10 10"
        mask={`url(#${_id}-maple-a)`}
      />
      <defs>
        <mask id={`${_id}-maple-a`}>
          <rect width="20" height="20" fill="#fff" />
          <path
            fill="#000"
            d="M5.1 8.87c2.14-.07 7.24-.3 8.38-1.96.87-1.27-1.04-2.58-1.95-3.05-.91-.48-2.17-.7-2.17-.7 2.54.3 6.56 1.7 5.3 4.23-1.11 2.27-6.95 2.58-9.56 2.58zm0 5.65v-1.08c3.24-.1 7.56-.2 9.8-2.35.06 1.89-2.52 2.73-4.5 3.09-1.71.3-3.54.4-5.3.34"
          />
          <path
            fill="#000"
            d="M14.8 8.79c-1.77 1.82-5.2 2.35-9.7 2.35v1.1c4.73 0 9.69-.73 9.7-3.45"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
