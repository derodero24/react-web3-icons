import { createIcon } from '../utils';

// Source: https://bridge.zora.energy/img/zorb.svg (the Zorb on Zora Network's bridge, the MAINNET link on https://zora.energy)
// Source: https://zora.co/assets/favicon/safari-pinned-tab.svg (the zora.co one-colour pinned-tab icon, a solid disc)
// Default: the classic Zorb from bridge.zora.energy's zorb.svg, a disc filled by one radial gradient from #F2CEFE through #AFBAF1, #4281D3, #2E427D and #230101 to #8F6B40, the disc and the gradient's centre, radius and stops unchanged (offsets rounded to two decimals), full-bleed on the 64 grid (IoU 0.998 against the file)
// Mono: the disc in currentColor, the same solid disc as safari-pinned-tab.svg (IoU 0.997)
// zora.co's site navigation and zora.energy's favicon.png now show a newer orb, a deeper blue with a tighter pink and white highlight drawn from blurred circles. It is not used here: the Zorb above is still served as an official vector and is what this artwork already matched (checked 2026-10-09)
// zora.co/brand is a user profile, not a brand page; no Zora brand kit was found (checked 2026-10-09)
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
