import { createIcon } from '../utils';

// GMX perpetuals DEX — triangular "G" mark
// Gradient: cyan #03D1CF (top) → indigo #4E09F8 (bottom), from official brand assets
/** Gmx DeFi icon (colored). */
export const Gmx = /* @__PURE__ */ createIcon(
  'Gmx',
  '0 0 24 24',
  (_props, _id) => (
    <>
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
        d="M21 19 12.015 5 3 19h12.56l-3.55-5.345-1.75 2.845H8.385l3.63-5.65L17.26 19z"
      />
    </>
  ),
  { ids: true },
);

/** Gmx DeFi icon (monochrome). */
export const GmxMono = /* @__PURE__ */ createIcon(
  'GmxMono',
  '0 0 24 24',
  () => (
    <path d="M21 19 12.015 5 3 19h12.56l-3.55-5.345-1.75 2.845H8.385l3.63-5.65L17.26 19z" />
  ),
  { fill: 'currentColor' },
);
