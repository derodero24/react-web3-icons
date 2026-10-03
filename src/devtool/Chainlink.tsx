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
        d="m32 4-5.14 2.95-14 8.1L7.73 18v28l5.13 2.95L27 57.05 32.13 60l5.14-2.95 13.87-8.1L56.28 46V18l-5.14-2.95-14-8.1z"
      />
      <path fill="#fff" d="M18 40.1V23.9l14-8.08 14 8.09v16.18l-14 8.1z" />
    </>
  ),
  {},
);

/** Chainlink devtool icon (monochrome). */
export const ChainlinkMono = /* @__PURE__ */ createIcon(
  'ChainlinkMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(7.72 4)scale(1.2844)">
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
