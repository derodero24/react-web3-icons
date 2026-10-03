import { createIcon } from '../utils';

// Source: https://zora.co
/** Zora chain icon (colored). */
export const Zora = /* @__PURE__ */ createIcon(
  'Zora',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-10.63 -10.64)scale(3.55337)">
      <path fill={`url(#${_id}-a)`} d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18" />
      <defs>
        <radialGradient
          id={`${_id}-a`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(16.09 7.84)scale(-15.2029)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".01" stopColor="#F2CEFE" />
          <stop offset=".19" stopColor="#AFBAF1" />
          <stop offset=".5" stopColor="#4281D3" />
          <stop offset=".67" stopColor="#2E427D" />
          <stop offset=".82" stopColor="#230101" />
          <stop offset="1" stopColor="#8F6B40" />
        </radialGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Zora chain icon (monochrome). */
export const ZoraMono = /* @__PURE__ */ createIcon(
  'ZoraMono',
  '0 0 64 64',
  () => (
    <path d="M32.01 63.98a31.98 31.98 0 1 1 0-63.96 31.98 31.98 0 0 1 0 63.96" />
  ),
  { fill: 'currentColor' },
);
