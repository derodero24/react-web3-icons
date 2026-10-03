import { createIcon } from '../utils';

// Source: https://chain.link
/** Chainlink devtool icon (colored). */
export const Chainlink = /* @__PURE__ */ createIcon(
  'Chainlink',
  '0 0 37.8 43.6',
  () => (
    <>
      <path
        fill="#2A5ADA"
        d="m18.9 0-4 2.3L4 8.6l-4 2.3v21.8L4 35l11 6.3 4 2.3 4-2.3L33.8 35l4-2.3V10.9l-4-2.3-10.9-6.3z"
      />
      <path fill="#fff" d="M8 28.1V15.5l10.9-6.3 10.9 6.3v12.6l-10.9 6.3z" />
    </>
  ),
  {},
);

/** Chainlink devtool icon (monochrome). */
export const ChainlinkMono = /* @__PURE__ */ createIcon(
  'ChainlinkMono',
  '0 0 37.8 43.6',
  (_props, _id) => (
    <>
      <defs>
        <mask id={`${_id}-chl-a`}>
          <rect width="100%" height="100%" fill="#fff" />
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
    </>
  ),
  { fill: 'currentColor', ids: true },
);
