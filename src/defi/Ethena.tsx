import { createIcon } from '../utils';

// Source: https://ethena.fi/shared/ethena-logo.svg
// Ethena: dark disc with the white "E" lettermark; the background is integral to the brand
// Colored: the official ethena-logo.svg (#040404→#3D475A disc, white lettermark, white radial rim), without its two clip paths, which clip nothing (the rim already ends at the disc edge)
// Mono: the disc in currentColor with the lettermark knocked out (the decorative rim is dropped)
/** Ethena DeFi icon (colored). */
export const Ethena = /* @__PURE__ */ createIcon(
  'Ethena',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.1641)">
      <defs>
        <radialGradient
          id={`${_id}-eth-b`}
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
          id={`${_id}-eth-a`}
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
      <rect width="390" height="390" fill={`url(#${_id}-eth-a)`} rx="195" />
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
        stroke={`url(#${_id}-eth-b)`}
        strokeWidth="7.8"
        rx="191.1"
      />
    </g>
  ),
  { ids: true },
);

/** Ethena DeFi icon (monochrome). */
export const EthenaMono = /* @__PURE__ */ createIcon(
  'EthenaMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.1641)">
      <defs>
        <mask id={`${_id}-eth-m`}>
          <rect width="390" height="390" fill="#fff" rx="195" />
          <path
            fill="#000"
            d="M281.07 109.92v58.77h-19.14v-39.6h-84.89l56.84 65.76-56.84 65.77h84.9v-39.6h19.13v58.76H151.7l-72.23-84.93 72.23-84.93zM104.6 194.85l51.58 60.64 52.4-60.64-52.4-60.64z"
          />
        </mask>
      </defs>
      <rect width="390" height="390" mask={`url(#${_id}-eth-m)`} rx="195" />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
