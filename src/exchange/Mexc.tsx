import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT) — MX token SVG (MEXC exchange)
/** Mexc exchange icon (colored). */
export const Mexc = /* @__PURE__ */ createIcon(
  'Mexc',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.3 -5.31)scale(3.1092)">
      <defs>
        <linearGradient
          id={`${_id}-mx-a`}
          x1="9.03"
          x2="18.19"
          y1="15.98"
          y2="15.98"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".12" stopColor="#1C6AD9" />
          <stop offset=".76" stopColor="#1C6AD9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="#1977F3"
        d="M7.2 7.4a2.11 2.11 0 0 1 3.7 0l5.81 10.29H5.2c-1.7 0-2.75-1.87-1.9-3.37z"
      />
      <path
        fill="#002F81"
        d="M16.8 7.4a2.11 2.11 0 0 0-3.7 0l-4.12 7.3c-.76 1.33.18 2.99 1.68 2.99h8.14c1.69 0 2.75-1.88 1.9-3.37z"
      />
      <path
        fill={`url(#${_id}-mx-a)`}
        d="M10.66 17.69h6.05L12 9.35 8.97 14.7c-.75 1.33.2 2.99 1.69 2.99"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Mexc exchange icon (monochrome). */
export const MexcMono = /* @__PURE__ */ createIcon(
  'MexcMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M17.09 17.72a6.57 6.57 0 0 1 11.5 0l18.08 31.96h-35.8c-5.26 0-8.54-5.81-5.92-10.47z" />
      <path d="M46.93 17.72a6.57 6.57 0 0 0-11.5 0L22.6 40.4c-2.34 4.13.58 9.28 5.23 9.28h25.3c5.27 0 8.55-5.81 5.93-10.47z" />
      <path d="M27.84 49.68h18.83L32 23.75 22.59 40.4c-2.32 4.12.6 9.28 5.25 9.28" />
    </>
  ),
  { fill: 'currentColor' },
);
