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
        d="M30 54.077C30 47.959 34.97 43 41.1 43h51.8c6.13 0 11.1 4.96 11.1 11.077v25.846C104 86.041 99.03 91 92.9 91H41.1C34.97 91 30 86.04 30 79.923zM67 67c0 8.157-6.626 14.77-14.8 14.77S37.4 75.156 37.4 67s6.626-14.77 14.8-14.77S67 58.844 67 67m0 0c0-8.157 6.626-14.77 14.8-14.77S96.6 58.844 96.6 67s-6.626 14.77-14.8 14.77S67 75.156 67 67"
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
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m14.328-6.172a5.296 5.296 0 0 1 5.302-5.29h24.74a5.296 5.296 0 0 1 5.302 5.29v12.344a5.296 5.296 0 0 1-5.302 5.29H19.63a5.296 5.296 0 0 1-5.302-5.29zM32 32c0 3.896-3.165 7.054-7.069 7.054S17.863 35.895 17.863 32s3.164-7.054 7.068-7.054S32 28.105 32 32m0 0c0-3.896 3.165-7.054 7.069-7.054s7.068 3.159 7.068 7.054-3.164 7.054-7.068 7.054-7.07-3.159-7.07-7.054"
    />
  ),
  { fill: 'currentColor' },
);
