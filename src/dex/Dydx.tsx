import { createIcon } from '../utils';

// Source: https://dydx.exchange
/** Dydx DEX icon (colored). */
export const Dydx = /* @__PURE__ */ createIcon(
  'Dydx',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-15.38 -15.7)scale(.51852)">
      <path fill="#fff" d="M116.38 38 41 146h23.14l75.77-108z" />
      <path
        fill={`url(#${_id}-dydx-a)`}
        d="m66.55 38 22.18 31.82-11.57 17.36L42.93 38z"
      />
      <path
        fill={`url(#${_id}-dydx-b)`}
        d="m118.63 146-24.6-35.2 11.58-16.87L141.77 146z"
      />
      <defs>
        <linearGradient
          id={`${_id}-dydx-a`}
          x1="61.25"
          x2="93"
          y1="44.75"
          y2="83.08"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id={`${_id}-dydx-b`}
          x1="123.93"
          x2="84.92"
          y1="137.8"
          y2="85.22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6966ff" />
          <stop offset="1" stopColor="#6966ff" stopOpacity=".36" />
        </linearGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Dydx Square DEX icon (colored). */
export const DydxSquare = /* @__PURE__ */ createIcon(
  'DydxSquare',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.34973)">
      <rect
        width="181"
        height="181"
        x="1"
        y="1"
        fill={`url(#${_id}-dydx-2a)`}
        rx="37"
      />
      <path fill="#fff" d="M115.32 43 45 142h21.59l70.68-99z" />
      <path
        fill={`url(#${_id}-dydx-2b)`}
        d="m68.84 43 20.69 29.17-10.8 15.91L46.8 43z"
      />
      <path
        fill={`url(#${_id}-dydx-2c)`}
        d="m117.41 142-22.94-32.26 10.8-15.47L139 142z"
      />
      <rect
        width="181"
        height="181"
        x="1"
        y="1"
        fill="none"
        stroke="#2d2d3d"
        strokeWidth="2"
        rx="37"
      />
      <defs>
        <linearGradient
          id={`${_id}-dydx-2a`}
          x1="147.5"
          x2="103"
          y1="-24.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2c2c3d" />
          <stop offset="1" stopColor="#1a1a27" />
        </linearGradient>
        <linearGradient
          id={`${_id}-dydx-2b`}
          x1="63.89"
          x2="92.89"
          y1="49.19"
          y2="84.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id={`${_id}-dydx-2c`}
          x1="122.36"
          x2="86.79"
          y1="134.49"
          y2="85.69"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6966ff" />
          <stop offset="1" stopColor="#6966ff" stopOpacity=".36" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Dydx DEX icon (monochrome). */
export const DydxMono = /* @__PURE__ */ createIcon(
  'DydxMono',
  '0 0 64 64',
  () => (
    <path d="M44.96 4 5.87 60h12l39.3-56zM19.12 4l11.5 16.5-6 9L6.87 4zm27 56L33.37 41.75l6-8.75 18.75 27z" />
  ),
  { fill: 'currentColor' },
);

/** Dydx Square DEX icon (monochrome). */
export const DydxSquareMono = /* @__PURE__ */ createIcon(
  'DydxSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.34973)">
      <rect
        width="181"
        height="181"
        x="1"
        y="1"
        mask={`url(#${_id}-dydxm2-a)`}
        rx="37"
      />
      <defs>
        <mask id={`${_id}-dydxm2-a`}>
          <rect width="183" height="183" fill="#fff" />
          <path
            fill="#000"
            d="M115.32 43 45 142h21.59l70.68-99zm-46.48 0 20.69 29.17-10.8 15.91L46.8 43zm48.57 99-22.94-32.26 10.8-15.47L139 142z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
