import { createIcon } from '../utils';

// Source: https://dydx.trade/logos/logo-mark-dark.svg
// Source: https://github.com/dydxprotocol/v4-web/blob/main/public/logos/logo-mark-dark.svg
// Source: https://dydx.exchange
// Default: the official light-theme logomark logo-mark-dark.svg (#181818 strokes, #6966FF accent), which dydx.trade shows on light backgrounds
// Square and SquareMono: unchanged dark app-icon tile (https://dydx.exchange)
// Mono: the logomark's three strokes in currentColor
/** Dydx DEX icon (colored). */
export const Dydx = /* @__PURE__ */ createIcon(
  'Dydx',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(5.98 4)scale(1.37794)">
      <path fill="#181818" d="M28.25 0 0 40.63h8.67L37.07 0z" />
      <path
        fill={`url(#${_id}-dydx-a)`}
        d="m9.58 0 8.3 11.97-4.33 6.53L.72 0z"
      />
      <path
        fill={`url(#${_id}-dydx-b)`}
        d="m29.1 40.64-9.22-13.25 4.33-6.35 13.55 19.6z"
      />
      <defs>
        <linearGradient
          id={`${_id}-dydx-a`}
          x1="1"
          x2="19.73"
          y1="0"
          y2="16.22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#181818" />
          <stop offset=".08" />
          <stop offset="1" stopOpacity=".55" />
        </linearGradient>
        <linearGradient
          id={`${_id}-dydx-b`}
          x1="31.08"
          x2="16.38"
          y1="37.55"
          y2="17.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6966FF" />
          <stop offset="1" stopColor="#6966FF" stopOpacity=".36" />
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
    <>
      <path d="M44.91 4 5.98 60h11.96L57.06 4z" />
      <path d="m19.18 4 11.45 16.5-5.97 9L6.98 4z" />
      <path d="m46.07 60-12.7-18.25L39.35 33l18.67 27z" />
    </>
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
