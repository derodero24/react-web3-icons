import { createIcon } from '../utils';

// Source: https://bithumb.com (official brand)
// Mono: the red flag behind the stem is cut back from the b by a 1.2-unit seam.
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
    <path
      fillRule="evenodd"
      d="M52.75 36.92c-7.28 27.43-29.99 22.8-29.99 22.8C8.4 58.21 12.2 41.98 12.2 41.98L22.76 4H32a4.6 4.6 0 0 1 4.42 5.97l-2.27 7.5 10.1.18s8.03.44 9 11.6h-.01c.33 4.1-.5 7.66-.5 7.66M27.9 39.8q-.25.75-.25 1.55c0 1.84.84 2.71 1.68 3.14.71.39 1.55.48 2.33.25 4.36-1.02 5.4-5.96 5.63-7.66l-.03.01.09-.5v-.09c.12-1.6-.4-2.6-.96-3.2-.44-.45-.93-.7-1.3-.72h-5.26zM13.34 17.35h4.46l-4.14 14.87c-.99-.33-2.21-1.05-2.74-2.61a4.4 4.4 0 0 1-.1-2.58z"
    />
  ),
  { fill: 'currentColor' },
);
