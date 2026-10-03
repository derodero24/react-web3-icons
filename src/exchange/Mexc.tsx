import { createIcon } from '../utils';

// Paths sourced from @web3icons/react (MIT) — MX token SVG (MEXC exchange)
/** Mexc exchange icon (colored). */
export const Mexc = /* @__PURE__ */ createIcon(
  'Mexc',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.301 -5.31)scale(3.1092)">
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
        d="M7.2 7.406a2.113 2.113 0 0 1 3.7 0l5.814 10.28H5.2c-1.691 0-2.748-1.87-1.905-3.368z"
      />
      <path
        fill="#002F81"
        d="M16.8 7.406a2.113 2.113 0 0 0-3.7 0l-4.123 7.296c-.753 1.327.185 2.985 1.682 2.985h8.14c1.691 0 2.748-1.872 1.904-3.369z"
      />
      <path
        fill={`url(#${_id}-mx-a)`}
        d="M10.659 17.686h6.055L12 9.348 8.971 14.7c-.748 1.327.19 2.985 1.687 2.985"
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
      <path d="M17.085 17.717a6.57 6.57 0 0 1 11.507 0l18.074 31.965H10.87c-5.258 0-8.544-5.817-5.923-10.474z" />
      <path d="M46.934 17.717a6.57 6.57 0 0 0-11.508 0L22.61 40.4c-2.34 4.126.575 9.281 5.23 9.281h25.309c5.258 0 8.544-5.817 5.923-10.474z" />
      <path d="M27.84 49.682h18.826L32.01 23.752l-9.414 16.65c-2.326 4.122.59 9.28 5.245 9.28" />
    </>
  ),
  { fill: 'currentColor' },
);
