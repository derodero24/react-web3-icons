import { createIcon } from '../utils';

// Ekubo DEX icon — chain-link/infinity mark on circular background
// From ekubo.org/logo.svg (official); gradient #661CC4 → #000
/** Ekubo DEX icon (colored). */
export const Ekubo = /* @__PURE__ */ createIcon(
  'Ekubo',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.47761)">
      <defs>
        <linearGradient
          id={`${_id}-ekubo-a`}
          x1="0"
          x2="134"
          y1="0"
          y2="134"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#661CC4" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <circle cx="67" cy="67" r="67" fill={`url(#${_id}-ekubo-a)`} />
      <path
        fill="#F1F0FA"
        fillRule="evenodd"
        d="M30 54.08C30 47.96 34.97 43 41.1 43h51.8c6.13 0 11.1 4.96 11.1 11.08v25.84C104 86.04 99.03 91 92.9 91H41.1C34.97 91 30 86.04 30 79.92zM67 67c0 8.16-6.63 14.77-14.8 14.77S37.4 75.16 37.4 67s6.63-14.77 14.8-14.77S67 58.84 67 67m0 0c0-8.16 6.63-14.77 14.8-14.77S96.6 58.84 96.6 67s-6.63 14.77-14.8 14.77S67 75.16 67 67"
      />
    </g>
  ),
  { ids: true },
);

/** Ekubo DEX icon (monochrome). */
export const EkuboMono = /* @__PURE__ */ createIcon(
  'EkuboMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m14.33-6.17a5.3 5.3 0 0 1 5.3-5.3h24.74a5.3 5.3 0 0 1 5.3 5.3v12.34a5.3 5.3 0 0 1-5.3 5.3H19.63a5.3 5.3 0 0 1-5.3-5.3zM32 32c0 3.9-3.16 7.05-7.07 7.05S17.86 35.9 17.86 32s3.17-7.05 7.07-7.05S32 28.1 32 32m0 0c0-3.9 3.16-7.05 7.07-7.05s7.07 3.15 7.07 7.05-3.17 7.05-7.07 7.05S32 35.9 32 32"
    />
  ),
  { fill: 'currentColor' },
);
