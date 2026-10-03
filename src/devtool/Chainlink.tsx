import { createIcon } from '../utils';

// Source: https://chain.link
/** Chainlink devtool icon (colored). */
export const Chainlink = /* @__PURE__ */ createIcon(
  'Chainlink',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#2A5ADA"
        d="m32 4-5.137 2.954-14 8.092L7.725 18v28l5.138 2.954 14.128 8.092L32.129 60l5.137-2.954 13.872-8.092L56.275 46V18l-5.137-2.954-14-8.092z"
      />
      <path
        fill="#fff"
        d="M18 40.092V23.908l14-8.092 14 8.092v16.184l-14 8.091z"
      />
    </>
  ),
  {},
);

/** Chainlink devtool icon (monochrome). */
export const ChainlinkMono = /* @__PURE__ */ createIcon(
  'ChainlinkMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(7.725 4)scale(1.2844)">
      <defs>
        <mask id={`${_id}-chl-a`}>
          <rect width="37.8" height="43.6" fill="#fff" />
          <path
            fill="#000"
            d="M8 28.1V15.5l10.9-6.3 10.9 6.3v12.6l-10.9 6.3z"
          />
        </mask>
      </defs>
      <path
        d="m18.9 0-4 2.3L4 8.6l-4 2.3v21.8L4 35l11 6.3 4 2.3 4-2.3L33.8 35l4-2.3V10.9l-4-2.3-10.9-6.3z"
        mask={`url(#${_id}-chl-a)`}
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
