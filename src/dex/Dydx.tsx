import { createIcon } from '../utils';

// Source: https://dydx.exchange
/** Dydx DEX icon (colored). */
export const Dydx = /* @__PURE__ */ createIcon(
  'Dydx',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-15.385 -15.704)scale(.51852)">
      <path fill="#fff" d="M116.379 38 41 145.991h23.143L139.912 38z" />
      <path
        fill={`url(#${_id}-dydx-a)`}
        d="m66.554 38 22.179 31.821-11.571 17.357L42.929 38z"
      />
      <path
        fill={`url(#${_id}-dydx-b)`}
        d="m118.625 146-24.589-35.196 11.571-16.875L141.768 146z"
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
      <path fill="#fff" d="M115.316 43 45 141.992h21.588L137.269 43z" />
      <path
        fill={`url(#${_id}-dydx-2b)`}
        d="m68.838 43 20.689 29.17-10.795 15.91L46.799 43z"
      />
      <path
        fill={`url(#${_id}-dydx-2c)`}
        d="m117.411 142-22.937-32.263 10.794-15.469L139 142z"
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
    <path d="M44.96 4 5.874 59.995h12L57.162 4zM19.124 4l11.5 16.5-6 9L6.875 4zm27 56-12.75-18.25 6-8.75 18.75 27z" />
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
            d="M115.316 43 45 141.992h21.588L137.269 43zm-46.478 0 20.689 29.17-10.795 15.91L46.799 43zm48.573 99-22.937-32.263 10.794-15.469L139 142z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
