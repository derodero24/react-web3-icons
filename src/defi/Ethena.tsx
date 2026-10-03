import { createIcon } from '../utils';

// Source: https://ethena.fi (official brand)
// Ethena — dark circle with white "E" lettermark; background is integral to the brand
/** Ethena DeFi icon (colored). */
export const Ethena = /* @__PURE__ */ createIcon(
  'Ethena',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#111111"
        d="M32 .02C49.66.02 63.98 14.34 63.98 32S49.66 63.97 32 63.97.02 49.66.02 32 14.34.02 32 .02"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M24.87 16.85h-.69l-.45.53-11.61 13.64-.83.98.83.97 11.61 13.64.45.53h23.1V36.97h-3v7.17H28.16l9.65-11.16.85-.98-.85-.99-9.65-11.15h16.12v7.17h3V16.85h-22.4m.01 3.81L15.23 32l9.65 11.33L34.68 32z"
        clipRule="evenodd"
      />
    </>
  ),
  {},
);

/** Ethena DeFi icon (monochrome). */
export const EthenaMono = /* @__PURE__ */ createIcon(
  'EthenaMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.73 -.57)scale(.16692)">
      <path
        d="M196.1 3.53c105.8 0 191.57 85.77 191.57 191.57S301.9 386.67 196.1 386.67 4.52 300.9 4.52 195.1 90.29 3.53 196.09 3.53"
        mask={`url(#${_id}-eth-a)`}
      />
      <defs>
        <mask id={`${_id}-eth-a`}>
          <rect width="392" height="391" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M153.4 104.36h-4.15l-2.7 3.17-69.58 81.73-4.97 5.83 4.97 5.84 69.58 81.73 2.7 3.17h138.43v-60.96h-18v42.96h-96.6l57.82-66.85 5.1-5.89-5.1-5.88-57.81-66.85h96.6v42.96h18v-60.96zm.06 22.82L95.64 195.1l57.82 67.9 58.73-67.9z"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
