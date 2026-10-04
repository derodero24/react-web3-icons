import { createIcon } from '../utils';

// Source: https://raw.githubusercontent.com/gmx-io/gmx-interface/master/src/img/logo_GMX_small.svg
// GMX perpetuals DEX: triangular "G" mark
// Colored: the official logo_GMX_small.svg from gmx-io/gmx-interface, copied unchanged (diagonal #03D1CF → #4E09F8 gradient)
// Mono: the same path in currentColor
/** Gmx DeFi icon (colored). */
export const Gmx = /* @__PURE__ */ createIcon(
  'Gmx',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(2.54 9.66)scale(2.0235)">
      <defs>
        <linearGradient
          id={`${_id}-gmx-a`}
          x1="15.56"
          x2="5.48"
          y1=".57"
          y2="23.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03D1CF" stopOpacity=".99" />
          <stop offset="1" stopColor="#4E09F8" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-gmx-a)`}
        d="M28.4 22.08 14.58 0 .73 22.08h19.3l-5.45-8.43-2.7 4.38H9.01l5.57-8.8 8.07 12.85z"
      />
    </g>
  ),
  { ids: true },
);

/** Gmx DeFi icon (monochrome). */
export const GmxMono = /* @__PURE__ */ createIcon(
  'GmxMono',
  '0 0 64 64',
  () => (
    <path d="M60 54.33 32.05 9.66 4.02 54.33h39.06L32.05 37.28l-5.46 8.86h-5.82l11.29-17.8 16.31 26z" />
  ),
  { fill: 'currentColor' },
);
