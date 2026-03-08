import { createIcon } from '../utils';

export const Chainlink = createIcon('Chainlink', '0 0 37.8 43.6', () => (
  <>
    <path
      d="M18.9 0l-4 2.3L4 8.6l-4 2.3V32.7L4 35l11 6.3 4 2.3 4-2.3L33.8 35l4-2.3V10.9l-4-2.3-10.9-6.3-4-2.3z"
      fill="#2A5ADA"
    />
    <path
      d="M8 28.1V15.5l10.9-6.3 10.9 6.3v12.6l-10.9 6.3L8 28.1z"
      fill="#fff"
    />
  </>
));

export const ChainlinkMono = createIcon(
  'ChainlinkMono',
  '0 0 37.8 43.6',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-chl-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M8 28.1V15.5l10.9-6.3 10.9 6.3v12.6l-10.9 6.3L8 28.1z"
            fill="#000"
          />
        </mask>
      </defs>
      <path
        d="M18.9 0l-4 2.3L4 8.6l-4 2.3V32.7L4 35l11 6.3 4 2.3 4-2.3L33.8 35l4-2.3V10.9l-4-2.3-10.9-6.3-4-2.3z"
        mask={`url(#${_id}-chl-a)`}
      />
    </>
  ),
  'currentColor',
);
