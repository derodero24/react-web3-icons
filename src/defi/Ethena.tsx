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
        d="M32 .02c17.66 0 31.977 14.316 31.977 31.976v.001c0 17.66-14.316 31.977-31.976 31.977H32C14.34 63.974.023 49.657.023 31.997S14.34.02 32 .02"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M24.874 16.851h-.694l-.45.528-11.615 13.643-.829.974.83.974L23.73 46.613l.45.528h23.108V36.966h-3.005v7.17H28.16l9.65-11.157.85-.983-.85-.983-9.65-11.157h16.123v7.17h3.005V16.851zm.01 3.81-9.652 11.335 9.651 11.336 9.804-11.336z"
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
    <g transform="translate(-.732 -.569)scale(.16692)">
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
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
