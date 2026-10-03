import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT)
/** Maker Dao DeFi icon (colored). */
export const MakerDao = /* @__PURE__ */ createIcon(
  'MakerDao',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.322 -5.322)scale(3.11017)">
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
        d="M3.224 6.66a.45.45 0 0 1 .448-.001l7.199 4.095a.45.45 0 0 1 .228.39v5.806a.45.45 0 1 1-.9 0v-5.544L3.9 7.824v9.126a.45.45 0 0 1-.9 0v-9.9a.45.45 0 0 1 .224-.39m17.552 0a.45.45 0 0 0-.449-.001l-7.198 4.095a.45.45 0 0 0-.228.39v5.806a.45.45 0 0 0 .9 0v-5.544L20.1 7.824v9.126a.45.45 0 0 0 .9 0v-9.9a.45.45 0 0 0-.224-.39"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Maker Dao DeFi icon (monochrome). */
export const MakerDaoMono = /* @__PURE__ */ createIcon(
  'MakerDaoMono',
  '0 0 64 64',
  () => (
    <path d="M4.705 15.392a1.4 1.4 0 0 1 1.394-.003l22.39 12.736a1.4 1.4 0 0 1 .709 1.213v18.057a1.4 1.4 0 1 1-2.8 0V30.153L6.809 19.012v28.383a1.4 1.4 0 0 1-2.8 0v-30.79a1.4 1.4 0 0 1 .697-1.213m54.59 0a1.4 1.4 0 0 0-1.397-.003L35.511 28.125a1.4 1.4 0 0 0-.709 1.213v18.057a1.4 1.4 0 0 0 2.8 0V30.153l19.59-11.141v28.383a1.4 1.4 0 0 0 2.8 0v-30.79a1.4 1.4 0 0 0-.697-1.213" />
  ),
  { fill: 'currentColor' },
);
