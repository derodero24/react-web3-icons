import { createIcon } from '../utils';

// Source: https://zora.co
/** Zora chain icon (colored). */
export const Zora = /* @__PURE__ */ createIcon('Zora', '0 0 24 24', _id => (
  <>
    <path fill={`url(#${_id}-a)`} d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18" />
    <defs>
      <radialGradient
        id={`${_id}-a`}
        cx="0"
        cy="0"
        r="1"
        gradientTransform="rotate(180 8.043 3.92)scale(15.2029)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".007" stopColor="#F2CEFE" />
        <stop offset=".191" stopColor="#AFBAF1" />
        <stop offset=".498" stopColor="#4281D3" />
        <stop offset=".667" stopColor="#2E427D" />
        <stop offset=".823" stopColor="#230101" />
        <stop offset="1" stopColor="#8F6B40" />
      </radialGradient>
    </defs>
  </>
));

/** Zora chain icon (monochrome). */
export const ZoraMono = /* @__PURE__ */ createIcon(
  'ZoraMono',
  '0 0 24 24',
  () => <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18" />,
  'currentColor',
);
