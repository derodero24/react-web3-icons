import { createIcon } from '../utils';

// Source: https://ethena.fi (official brand)
// Ethena — dark circle with white "E" lettermark; background is integral to the brand
/** Ethena DeFi icon (colored). */
export const Ethena = /* @__PURE__ */ createIcon(
  'Ethena',
  '0 0 392 391',
  () => (
    <>
      <path
        fill="#111111"
        d="M196.092 3.529h.007c105.799 0 191.566 85.767 191.566 191.566v.007c0 105.799-85.767 191.566-191.566 191.566h-.007c-105.8 0-191.566-85.767-191.566-191.566v-.007c0-105.8 85.767-191.566 191.566-191.566"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M153.405 104.362h-4.157l-2.696 3.165-69.584 81.732L72 195.094l4.967 5.834 69.584 81.732 2.696 3.166H287.68v-60.959h-18v42.959h-96.594l57.813-66.845 5.092-5.887-5.092-5.888-57.813-66.844h96.594v42.959h18v-60.959zm.053 22.821-57.817 67.911 57.817 67.911 58.735-67.911z"
        clipRule="evenodd"
      />
    </>
  ),
  {},
);

/** Ethena DeFi icon (monochrome). */
export const EthenaMono = /* @__PURE__ */ createIcon(
  'EthenaMono',
  '0 0 392 391',
  (_props, _id) => (
    <>
      <path
        d="M196.092 3.529h.007c105.799 0 191.566 85.767 191.566 191.566v.007c0 105.799-85.767 191.566-191.566 191.566h-.007c-105.8 0-191.566-85.767-191.566-191.566v-.007c0-105.8 85.767-191.566 191.566-191.566"
        mask={`url(#${_id}-eth-a)`}
      />
      <defs>
        <mask id={`${_id}-eth-a`}>
          <rect width="392" height="391" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M153.405 104.362h-4.157l-2.696 3.165-69.584 81.732L72 195.094l4.967 5.834 69.584 81.732 2.696 3.166H287.68v-60.959h-18v42.959h-96.594l57.813-66.845 5.092-5.887-5.092-5.888-57.813-66.844h96.594v42.959h18v-60.959zm.053 22.821-57.817 67.911 57.817 67.911 58.735-67.911z"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
