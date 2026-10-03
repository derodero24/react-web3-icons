import { createIcon } from '../utils';

// Source: https://ethena.fi/shared/ethena.svg (official site; media assets: https://docs.ethena.fi/resources/media-assets)
// Colored: the official ethena.svg unchanged (#040404 to #3D475A disc, white mark, white radial highlight on the rim stroke); the disc rect (rx = half its size) is written as the equivalent circle path and its two clip-paths are dropped (one is the full canvas, the other the disc, which trims the rim stroke by at most 0.2 of 390 units); placed on the 64 grid as a container
// Mono: the disc in currentColor with the mark knocked out (evenodd); the rim highlight is shading and is dropped
/** Ena coin icon (colored). */
export const Ena = /* @__PURE__ */ createIcon(
  'Ena',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.1641)">
      <path
        fill={`url(#${_id}-ena-a)`}
        d="M195 0a195 195 0 1 0 0 390 195 195 0 1 0 0-390"
      />
      <path
        fill="white"
        d="M281.07 109.92v58.77h-19.14v-39.6h-84.89l56.84 65.76-56.84 65.77h84.9v-39.6h19.13v58.76H151.7l-72.23-84.93 72.23-84.93zM104.6 194.85l51.58 60.64 52.4-60.64-52.4-60.64z"
      />
      <rect
        width="382.2"
        height="382.2"
        x="3.71"
        y="3.71"
        fill="none"
        stroke={`url(#${_id}-ena-b)`}
        strokeWidth="7.8"
        rx="191.1"
      />
      <defs>
        <radialGradient
          id={`${_id}-ena-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(135 161.63 93.74)scale(409.152)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset=".5" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${_id}-ena-a`}
          x1="195"
          x2="195"
          y1="-75.43"
          y2="476.73"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#040404" />
          <stop offset="1" stopColor="#3D475A" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Ena coin icon (monochrome). */
export const EnaMono = /* @__PURE__ */ createIcon(
  'EnaMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64m14.12 18.04v9.64h-3.14v-6.5H29.05l9.33 10.8-9.33 10.79h13.93v-6.5h3.14v9.64H24.9L13.04 31.98l11.85-13.94zM17.16 31.98l8.47 9.95 8.6-9.95-8.6-9.96z"
    />
  ),
  { fill: 'currentColor' },
);
