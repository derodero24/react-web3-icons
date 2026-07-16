import { createIcon } from '../utils';

// GMX perpetuals DEX — triangular "G" mark
// Gradient: cyan #03D1CF (top) → indigo #4E09F8 (bottom), from official brand assets
/** Gmx DeFi icon (colored). */
export const Gmx = /* @__PURE__ */ createIcon('Gmx', '0 0 24 24', _id => (
  <>
    <defs>
      <linearGradient
        id={`${_id}-gmx-a`}
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#03D1CF" />
        <stop offset="1" stopColor="#4E09F8" />
      </linearGradient>
    </defs>
    <path
      d="M21 19.0001L12.015 5L3 19.0001H15.5599L12.01 13.655L10.26 16.5H8.38501L12.015 10.85L17.26 19.0001H21Z"
      fill={`url(#${_id}-gmx-a)`}
    />
  </>
));

/** Gmx DeFi icon (monochrome). */
export const GmxMono = /* @__PURE__ */ createIcon(
  'GmxMono',
  '0 0 24 24',
  () => (
    <path d="M21 19.0001L12.015 5L3 19.0001H15.5599L12.01 13.655L10.26 16.5H8.38501L12.015 10.85L17.26 19.0001H21Z" />
  ),
  'currentColor',
);
