import { createIcon } from '../utils';

// Source: https://ethena.fi/shared/usde.svg (official site; media assets: https://docs.ethena.fi/resources/media-assets)
// Colored: the official usde.svg unchanged (#111111 disc under a #3A3A3A to #1C1C1C radial highlight at 0.7 opacity, white side arcs and $, white to #111111 rim stroke), with its gradient ids renamed; placed on the 64 grid as a container
// Mono: the disc (out to the rim stroke) in currentColor with the two arcs and the $ of the same paths knocked out (evenodd); the radial highlight and the rim gradient are shading and are dropped
/** Usde coin icon (colored). */
export const Usde = /* @__PURE__ */ createIcon(
  'Usde',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.06 -.06)scale(.16112)">
      <path
        fill="#111111"
        stroke="#111111"
        strokeWidth="7.05"
        d="M199 7.53c105.75 0 191.48 85.72 191.48 191.47S304.75 390.49 199 390.49 7.52 304.75 7.52 199.01V199C7.52 93.25 93.25 7.53 199 7.53Z"
      />
      <path
        fill={`url(#${_id}-usde-a)`}
        fillOpacity=".7"
        d="M199 4C91.3 4 4 91.3 4 199s87.3 195 195 195 195-87.3 195-195S306.7 4 199 4"
      />
      <path
        stroke={`url(#${_id}-usde-b)`}
        strokeWidth="7.14"
        d="M199 4C91.3 4 4 91.3 4 199s87.3 195 195 195 195-87.3 195-195S306.7 4 199 4Z"
      />
      <path
        fill="white"
        fillRule="evenodd"
        d="M167.8 38.56c-75.3 14.5-132.2 80.76-132.2 160.3s56.9 145.8 132.2 160.3v-15.3c-66.97-14.27-117.2-73.77-117.2-145s50.23-130.72 117.2-145zm62.4 15.36v-15.3c75.17 14.6 131.92 80.8 131.92 160.24S305.37 344.5 230.2 359.11v-15.3c66.83-14.39 116.92-73.82 116.92-144.95S297.03 68.3 230.2 53.92"
        clipRule="evenodd"
      />
      <path
        fill="white"
        d="M222.12 193.4q18.69 3.57 28.98 13.74 10.3 9.93 10.3 25.44v16.28q0 18.56-13.41 30-13.41 11.2-35.21 11.2h-5.03V316H190.5v-25.94h-5.27q-14.37 0-25.4-6.36-11.01-6.6-17.24-18.31-6-11.96-5.99-27.47h17.25q0 15.77 8.62 25.69 8.87 9.66 23.24 9.66h26.59q14.13 0 22.75-6.61 8.63-6.87 8.63-17.8v-16.28q0-8.66-6.47-14.76-6.23-6.1-17.25-7.88l-43.11-7.63q-18.2-3.3-28.27-13.74-10.05-10.42-10.06-26.2v-13.73q0-18.57 12.93-29.5 13.18-11.2 34.74-11.2h4.31V82h17.25v25.94h5.5q20.37 0 32.82 13.23 12.45 12.98 12.46 34.34h-17.25q0-14-7.66-22.38-7.67-8.4-20.36-8.4h-27.07q-13.65 0-21.8 6.61-8.14 6.36-8.14 17.3v13.74q0 8.9 5.98 15 6.24 6.1 17.01 8.14z"
      />
      <defs>
        <radialGradient
          id={`${_id}-usde-a`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 411.151 -289.409 0 199.42 60.95)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".03" stopColor="#3A3A3A" />
          <stop offset="1" stopColor="#1C1C1C" />
        </radialGradient>
        <linearGradient
          id={`${_id}-usde-b`}
          x1="199"
          x2="199"
          y1=".32"
          y2="397.69"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#111111" />
        </linearGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Usde coin icon (monochrome). */
export const UsdeMono = /* @__PURE__ */ createIcon(
  'UsdeMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64m-5.03 6.15C14.84 8.5 5.67 19.16 5.67 31.98s9.17 23.49 21.3 25.83v-2.47C16.18 53.04 8.1 43.45 8.1 31.98s8.1-21.06 18.88-23.36zm10.06 2.48V6.16c12.1 2.35 21.25 13.02 21.25 25.82S49.14 55.44 37.03 57.8v-2.47c10.76-2.32 18.84-11.9 18.84-23.35S47.79 10.94 37.03 8.63m-1.3 22.47q3 .57 4.66 2.21 1.66 1.6 1.66 4.1v2.62q0 3-2.16 4.84-2.16 1.8-5.67 1.8h-.81v4.18h-2.78v-4.18h-.85q-2.31 0-4.1-1.02-1.76-1.07-2.77-2.95-.96-1.93-.96-4.43h2.78q0 2.54 1.38 4.14 1.43 1.56 3.75 1.56h4.28q2.28 0 3.67-1.07 1.39-1.1 1.39-2.87v-2.62q0-1.4-1.04-2.38-1-.98-2.78-1.27l-6.95-1.23q-2.93-.53-4.55-2.21t-1.62-4.22v-2.21q0-3 2.08-4.76 2.12-1.8 5.6-1.8h.7v-4.18h2.77v4.18h.89q3.28 0 5.28 2.13 2.01 2.1 2.01 5.53h-2.78q0-2.25-1.23-3.6-1.24-1.36-3.28-1.36h-4.36q-2.2 0-3.52 1.07-1.3 1.02-1.3 2.79v2.21q0 1.43.96 2.42 1 .98 2.74 1.3z"
    />
  ),
  { fill: 'currentColor' },
);
