import { createIcon } from '../utils';

// Source: https://thirdweb.com
/** Thirdweb devtool icon (colored). */
export const Thirdweb = /* @__PURE__ */ createIcon(
  'Thirdweb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 14.58)scale(.10853)">
      <path
        fill={`url(#${_id}-thw-a)`}
        d="M1.4 27C-3.73 14.02 5.85 0 19.88 0h87.05c8.18 0 15.42 4.87 18.46 12.4l69.3 172.9c1.86 4.63 1.86 9.85 0 14.6l-43.6 108.58c-6.65 16.58-30.26 16.58-36.92 0z"
      />
      <path
        fill={`url(#${_id}-thw-b)`}
        d="M169.55 26.42C164.87 13.56 174.45 0 188.25 0h75.83c8.41 0 15.89 5.22 18.7 12.98l62.97 172.9c1.52 4.29 1.52 9.04 0 13.44L307.9 303.27c-6.3 17.38-31.08 17.38-37.39 0z"
      />
      <path
        fill={`url(#${_id}-thw-c)`}
        d="M321.33 27c-5.14-12.98 4.44-27 18.46-27h87.06c8.17 0 15.42 4.87 18.46 12.4l69.29 172.9c1.87 4.63 1.87 9.85 0 14.6L471 308.48c-6.66 16.58-30.26 16.58-36.92 0z"
      />
      <defs>
        <linearGradient
          id={`${_id}-thw-a`}
          x1="7.41"
          x2="260.49"
          y1="55.24"
          y2="164.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-b`}
          x1="175.09"
          x2="410.97"
          y1="54.45"
          y2="148.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-c`}
          x1="327.33"
          x2="580.41"
          y1="55.24"
          y2="164.44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f213a4" />
          <stop offset=".15" stopColor="#e011a7" />
          <stop offset=".46" stopColor="#b20daf" />
          <stop offset=".88" stopColor="#6806bb" />
          <stop offset="1" stopColor="#5204bf" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Thirdweb devtool icon (monochrome). */
export const ThirdwebMono = /* @__PURE__ */ createIcon(
  'ThirdwebMono',
  '0 0 64 64',
  () => (
    <path d="M4.15 17.51c-.56-1.4.48-2.93 2-2.93h9.45c.9 0 1.68.53 2 1.35l7.53 18.76c.2.5.2 1.07 0 1.59L20.4 48.06c-.73 1.8-3.29 1.8-4.01 0zm18.25-.06c-.5-1.4.53-2.87 2.03-2.87h8.23c.91 0 1.72.57 2.03 1.41l6.83 18.76q.26.72 0 1.46l-4.1 11.28c-.69 1.89-3.38 1.89-4.06 0zm16.47.06a2.15 2.15 0 0 1 2-2.93h9.45c.9 0 1.68.53 2 1.35l7.53 18.76c.2.5.2 1.07 0 1.59l-4.73 11.78c-.73 1.8-3.29 1.8-4.01 0z" />
  ),
  { fill: 'currentColor' },
);
