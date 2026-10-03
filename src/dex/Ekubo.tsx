import { createIcon } from '../utils';

// Ekubo DEX icon — chain-link/infinity mark on circular background
// From ekubo.org/logo.svg (official); gradient #661CC4 → #000
/** Ekubo DEX icon (colored). */
export const Ekubo = /* @__PURE__ */ createIcon(
  'Ekubo',
  '0 0 134 134',
  (_props, _id) => (
    <>
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
    </>
  ),
  { ids: true },
);

/** Ekubo DEX icon (monochrome). */
export const EkuboMono = /* @__PURE__ */ createIcon(
  'EkuboMono',
  '0 0 134 134',
  () => (
    <path
      fillRule="evenodd"
      d="M0 67a67 67 0 1 0 134 0A67 67 0 1 0 0 67m30-12.923C30 47.959 34.97 43 41.1 43h51.8c6.13 0 11.1 4.96 11.1 11.077v25.846C104 86.041 99.03 91 92.9 91H41.1C34.97 91 30 86.04 30 79.923zM67 67c0 8.157-6.626 14.77-14.8 14.77S37.4 75.156 37.4 67s6.626-14.77 14.8-14.77S67 58.844 67 67m0 0c0-8.157 6.626-14.77 14.8-14.77S96.6 58.844 96.6 67s-6.626 14.77-14.8 14.77S67 75.156 67 67"
    />
  ),
  { fill: 'currentColor' },
);
