import { createIcon } from '../utils';

// Source: https://github.com/sushi-labs/sushiswap/blob/master/apps/web/public/icon-512x512.svg (official Sushi Labs repository; the sushi.com app icon)
// Colored: the official icon-512x512.svg unchanged, the roll in the #27B0E6 to #FA52A0 linear gradient with the white rice ring on top, placed on the 64 grid; the previous artwork flattened the gradient to #FA52A0
// Mono: the roll in currentColor with the white ring knocked out (evenodd), so the centre stays ink as the gradient shows through it in the colored mark
/** Sushi Swap DEX icon (colored). */
export const SushiSwap = /* @__PURE__ */ createIcon(
  'SushiSwap',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 6.1)scale(.05657)">
      <path
        fill={`url(#${_id}-sus-a)`}
        fillRule="evenodd"
        d="m969.31 593.5-193.1 269.98c-28.13 39.37-82.97 56.71-152.8 51.1-97.04-8.45-225.94-60-349.2-148.59a975 975 0 0 1-113.6-94.36C95.27 608.2 47.26 542.2 21.55 483.34c-28.12-64.68-29.05-121.86-.93-161.23L214.2 52.12c28.13-39.37 82.5-56.7 152.81-51.09 97.03 7.97 225.46 60 349.19 148.12 123.28 88.6 213.75 194.05 252.18 283.11q4.98 11.46 8.82 22.6c19.11 55.34 16.91 103.91-7.89 138.63"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M938.38 445.38c-37.03-84.84-123.75-184.68-241.86-269.05C578.87 91.96 456.54 41.81 364.2 34.31c-56.25-4.69-100.78 5.63-123.27 37.03l-.95 1.87c-21.09 31.41-16.4 75.94 5.63 126.56 37.03 85.31 123.74 185.14 241.4 269.51C604.65 553.65 727 603.81 819.32 611.31c55.31 4.21 98.91-5.63 121.87-35.16l1.41-2.34c22.5-30.94 17.81-76.87-4.22-128.43m-172.96 1.88c-10.3 14.52-31.4 18.75-57.18 16.4-46.4-3.75-107.34-29.06-166.4-71.24-59.06-42.19-102.65-91.88-120.93-134.53-10.3-23.9-13.12-44.99-2.8-59.53s31.4-18.75 57.64-16.87c45.93 4.22 107.34 29.06 165.93 71.25 59.06 42.18 102.65 92.33 120.93 135 10.78 23.9 13.6 44.98 2.81 59.52"
      />
      <defs>
        <linearGradient
          id={`${_id}-sus-a`}
          x1="336.08"
          x2="653.89"
          y1="-11.07"
          y2="926.76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#27B0E6" />
          <stop offset=".11" stopColor="#49A1DB" />
          <stop offset=".29" stopColor="#7D8ACA" />
          <stop offset=".45" stopColor="#A279BD" />
          <stop offset=".57" stopColor="#BA6FB6" />
          <stop offset=".65" stopColor="#C26BB3" />
          <stop offset=".68" stopColor="#D563AD" />
          <stop offset=".71" stopColor="#E65BA7" />
          <stop offset=".76" stopColor="#F156A3" />
          <stop offset=".82" stopColor="#F853A1" />
          <stop offset="1" stopColor="#FA52A0" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Sushi Swap DEX icon (monochrome). */
export const SushiSwapMono = /* @__PURE__ */ createIcon(
  'SushiSwapMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M58.83 39.66 47.91 54.94c-1.6 2.22-4.7 3.2-8.65 2.89-5.49-.48-12.78-3.4-19.75-8.4a55 55 0 0 1-6.43-5.35c-3.69-3.58-6.4-7.32-7.86-10.65-1.6-3.66-1.64-6.89-.05-9.12L16.12 9.04c1.59-2.23 4.66-3.2 8.64-2.89 5.49.45 12.75 3.4 19.75 8.38 6.98 5.01 12.1 10.98 14.27 16.01q.27.66.5 1.28c1.08 3.13.95 5.88-.45 7.84m-1.75-8.37c-2.1-4.8-7-10.45-13.68-15.22-6.66-4.78-13.58-7.61-18.8-8.04-3.18-.26-5.7.32-6.97 2.1l-.06.1c-1.19 1.78-.92 4.3.32 7.16 2.1 4.83 7 10.48 13.66 15.25s13.57 7.6 18.8 8.03c3.12.24 5.59-.32 6.89-1.99l.08-.13c1.27-1.75 1-4.35-.24-7.26m-9.78.1c-.59.82-1.78 1.06-3.24.93-2.62-.21-6.07-1.64-9.41-4.03s-5.8-5.2-6.84-7.6c-.58-1.36-.74-2.55-.16-3.38.58-.82 1.78-1.06 3.26-.95 2.6.24 6.07 1.64 9.39 4.03 3.34 2.39 5.8 5.22 6.84 7.64.6 1.35.77 2.54.16 3.36"
    />
  ),
  { fill: 'currentColor' },
);
