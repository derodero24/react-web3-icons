import { createIcon } from '../utils';

// Source: https://bithumb.com (official brand)
/** Bithumb exchange icon (colored). */
export const Bithumb = /* @__PURE__ */ createIcon(
  'Bithumb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <path
        fill="#D53127"
        d="M6 7.29h2.57l-2 4.87s-1.04-.02-1.35-.93a1.4 1.4 0 0 1-.03-.83z"
      />
      <path
        fill="#F47320"
        d="m15.94 7.4-3.25-.07.73-2.41A1.48 1.48 0 0 0 12 3H9.03l-3.4 12.21s-1.22 5.22 3.4 5.7c0 0 7.3 1.49 9.64-7.33 0 0 1.24-5.34-2.73-6.19m-2.22 6.06s-.13 2.25-1.83 2.65a1 1 0 0 1-.75-.08c-.27-.14-.54-.42-.54-1.01q0-.26.08-.5l.63-2.35h1.72s.77.25.69 1.29"
      />
      <path
        fill={`url(#${_id}-a)`}
        d="M18.83 11.12c-.31-3.59-2.89-3.73-2.89-3.73l-3.25-.06-1.4 4.86h1.7c.32.02.9.53.7 1.45"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x1="18.23"
          x2="13.1"
          y1="15.91"
          y2="8.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".41" stopColor="#F47320" />
          <stop offset=".5" stopColor="#F16D21" />
          <stop offset=".62" stopColor="#E95C22" />
          <stop offset=".75" stopColor="#DC4125" />
          <stop offset=".81" stopColor="#D53127" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Bithumb exchange icon (monochrome). */
export const BithumbMono = /* @__PURE__ */ createIcon(
  'BithumbMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M13.36 17.34h7.97l-6.2 15.16s-3.24-.06-4.23-2.89a4.5 4.5 0 0 1-.06-2.6z" />
      <path d="m44.27 17.67-10.14-.18 2.28-7.52A4.6 4.6 0 0 0 32.01 4h-9.25L12.2 41.98S8.4 58.22 22.76 59.7c0 0 22.7 4.64 30-22.8 0 0 3.84-16.6-8.5-19.23M37.34 36.5s-.4 7-5.7 8.24a3.4 3.4 0 0 1-2.33-.24c-.82-.43-1.68-1.3-1.66-3.14q.02-.8.26-1.57l1.95-7.3h5.33s2.41.8 2.15 4.01" />
      <path d="M53.24 29.25c-.97-11.14-8.97-11.58-8.97-11.58l-10.14-.18-4.35 15.1h5.32c.97.05 2.75 1.66 2.17 4.51" />
    </>
  ),
  { fill: 'currentColor' },
);
