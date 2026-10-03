import { createIcon } from '../utils';

// Source: https://static.phemex.com/s/home/logo/logo-black-newhome-v3.svg
// Colored: the symbol (two slanted bars) and its #87EC26 to #59D9D9 linear gradient copied unchanged out of the official logo-black-newhome-v3.svg lockup served by phemex.com (the PHEMEX lettering is left out), placed on the 64 grid
// Mono: the same symbol path in currentColor
/** Phemex exchange icon (colored). */
export const Phemex = /* @__PURE__ */ createIcon(
  'Phemex',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(16.4 3.56)scale(.6539)">
      <path
        fill={`url(#${_id}-phx-a)`}
        d="M21.53 70.95c0 2.26-1.03 4.4-2.8 5.82L6.93 86.3V47.9a7.4 7.4 0 0 1 2.79-5.79l11.82-9.4zm19.27-32c0 2.26-1.03 4.4-2.8 5.82l-11.8 9.51V15.9a7.4 7.4 0 0 1 2.79-5.8L40.8.72z"
      />
      <defs>
        <linearGradient
          id={`${_id}-phx-a`}
          x1="6.91"
          x2="42.04"
          y1="87.18"
          y2=".35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#87EC26" />
          <stop offset="1" stopColor="#59D9D9" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Phemex exchange icon (monochrome). */
export const PhemexMono = /* @__PURE__ */ createIcon(
  'PhemexMono',
  '0 0 64 64',
  () => (
    <path d="M30.48 49.95c0 1.48-.67 2.88-1.83 3.8l-7.73 6.23v-25.1c0-1.47.68-2.87 1.83-3.79l7.73-6.14zm12.6-20.93a4.9 4.9 0 0 1-1.82 3.81l-7.73 6.22v-25.1c0-1.47.67-2.87 1.82-3.78l7.73-6.15z" />
  ),
  { fill: 'currentColor' },
);
