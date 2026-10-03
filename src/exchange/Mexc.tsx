import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT) — MX token SVG (MEXC exchange)
// Mono: the dark front peak stays whole and the back peak is cut back from it by a 1.2-unit seam.
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
    <path
      fillRule="evenodd"
      d="M59.06 39.21c2.64 4.64-.65 10.48-5.9 10.48H27.83c-4.66 0-7.58-5.16-5.22-9.3l12.81-22.7a6.56 6.56 0 0 1 11.5 0zM17.09 17.7a6.56 6.56 0 0 1 11.5 0l2.73 4.84-9.74 17.27c-1.26 2.4-1.18 5.34-.03 7.37.56.99 1.42 1.86 2.46 2.51H10.87c-5.29 0-8.55-5.81-5.91-10.48z"
    />
  ),
  { fill: 'currentColor' },
);
