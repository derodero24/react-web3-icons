import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
/** @deprecated MakerDAO rebranded to Sky — use `Sky` instead. */
export const MakerDao = /* @__PURE__ */ createIcon(
  'MakerDao',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <defs>
        <linearGradient
          id={`${_id}-mkr-a`}
          x1="3"
          x2="21"
          y1="12"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1BC4A3" />
          <stop offset="1" stopColor="#586979" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-mkr-a)`}
        d="M3.22 6.66a.5.5 0 0 1 .45 0l7.2 4.1a.5.5 0 0 1 .23.38v5.81a.45.45 0 1 1-.9 0v-5.54L3.9 7.82v9.13a.44.44 0 0 1-.9 0v-9.9a.5.5 0 0 1 .22-.39m17.56 0a.5.5 0 0 0-.45 0l-7.2 4.1a.5.5 0 0 0-.23.38v5.81a.45.45 0 0 0 .9 0v-5.54l6.3-3.59v9.13a.44.44 0 0 0 .9 0v-9.9a.5.5 0 0 0-.22-.39"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** @deprecated Use `SkyMono` instead. */
export const MakerDaoMono = /* @__PURE__ */ createIcon(
  'MakerDaoMono',
  '0 0 64 64',
  () => (
    <path d="M4.7 15.4a1.4 1.4 0 0 1 1.4-.01l22.39 12.73a1.4 1.4 0 0 1 .7 1.22V47.4a1.4 1.4 0 1 1-2.8 0V30.15L6.82 19.01V47.4a1.4 1.4 0 0 1-2.8 0V16.6a1.4 1.4 0 0 1 .7-1.2m54.58 0a1.4 1.4 0 0 0-1.4-.01L35.52 28.12a1.4 1.4 0 0 0-.7 1.22V47.4a1.39 1.39 0 0 0 2.8 0V30.15L57.2 19.01V47.4a1.39 1.39 0 0 0 2.8 0V16.6a1.4 1.4 0 0 0-.7-1.2" />
  ),
  { fill: 'currentColor' },
);
