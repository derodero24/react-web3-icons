import { createIcon } from '../utils';

// GMX perpetuals DEX — triangular "G" mark
// Gradient: cyan #03D1CF (top) → indigo #4E09F8 (bottom), from official brand assets
/** Gmx DeFi icon (colored). */
export const Gmx = /* @__PURE__ */ createIcon(
  'Gmx',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <defs>
        <linearGradient
          id={`${_id}-gmx-a`}
          x1="12"
          x2="12"
          y1="5"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03D1CF" />
          <stop offset="1" stopColor="#4E09F8" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-gmx-a)`}
        d="M21 19 12.02 5 3 19h12.56l-3.55-5.35-1.75 2.85H8.39l3.63-5.65L17.26 19z"
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
    <path d="M60 53.77 32.04 10.23 4 53.77h39.06L32.03 37.15 26.6 46h-5.83l11.29-17.58 16.31 25.35z" />
  ),
  { fill: 'currentColor' },
);
