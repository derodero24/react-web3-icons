import { createIcon } from '../utils';

// Source: https://zora.co (the Zora orb inlined as the logo at the start of the site navigation, a 1001-unit vector)
// Source: https://zora.co/assets/favicon/safari-pinned-tab.svg (the site's one-colour pinned-tab icon, a solid disc)
// Default: the zora.co navigation orb, its paths, blurs and gradients unchanged, full-bleed on the 64 grid: a #A1723A field under blurred #531002, #2B5DF0, #FCB8D4 and white circles, a #387AFA glow and a translucent black band, clipped to the disc by an alpha mask (its no-op clip path, and the no-op flood and blend steps ahead of each blur, are left out). It replaces a single radial gradient from #F2CEFE to #8F6B40, taken from @web3icons, that matched no Zora asset
// Mono: the orb's disc (the mask path) in currentColor, the same solid disc as safari-pinned-tab.svg
// zora.co/brand is a user profile, not a brand page; no Zora brand kit was found (checked 2026-10-09)
/** Zora chain icon (colored). */
export const Zora = /* @__PURE__ */ createIcon(
  'Zora',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.03 -.03)scale(.06403)">
      <mask
        id={`${_id}-zora-m`}
        width="1000"
        height="1000"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
      >
        <path
          fill="#D9D9D9"
          d="M500.19 999.88c275.97 0 499.69-223.72 499.69-499.7C999.88 224.23 776.16.5 500.18.5 224.23.5.5 224.22.5 500.19s223.72 499.69 499.69 499.69"
        />
      </mask>
      <g mask={`url(#${_id}-zora-m)`}>
        <path fill="#A1723A" d="M1169.22-216.74H-153.7v1322.92h1322.92z" />
        <g filter={`url(#${_id}-zora-f0)`}>
          <path
            fill="#531002"
            d="M538.35 978.87c294.5 0 533.22-238.66 533.22-533.06S832.84-87.26 538.35-87.26 5.14 151.4 5.14 445.81c0 294.4 238.73 533.06 533.21 533.06"
          />
        </g>
        <g filter={`url(#${_id}-zora-f1)`}>
          <path
            fill="#2B5DF0"
            d="M595.83 810.14c238.85 0 432.48-193.7 432.48-432.63S834.68-55.12 595.83-55.12 163.35 138.58 163.35 377.5s193.63 432.63 432.48 432.63"
          />
        </g>
        <g filter={`url(#${_id}-zora-f2)`}>
          <path
            fill={`url(#${_id}-zora-g0)`}
            d="M587.95 834.86c249 0 450.86-201.93 450.86-451.02S836.96-67.17 587.95-67.17c-249 0-450.86 201.92-450.86 451.01s201.86 451.02 450.86 451.02"
          />
        </g>
        <g filter={`url(#${_id}-zora-f3)`}>
          <path
            fill="#FCB8D4"
            d="M662.73 497.41c125.45 0 227.13-101.69 227.13-227.13S788.18 43.15 662.73 43.15 435.6 144.84 435.6 270.28s101.7 227.13 227.13 227.13"
          />
        </g>
        <g filter={`url(#${_id}-zora-f4)`}>
          <path
            fill="white"
            d="M662.58 360.83c50.1 0 90.7-40.61 90.7-90.7s-40.6-90.7-90.7-90.7-90.7 40.6-90.7 90.7 40.6 90.7 90.7 90.7"
          />
        </g>
        <g filter={`url(#${_id}-zora-f5)`}>
          <path
            fill={`url(#${_id}-zora-g1)`}
            fillOpacity=".9"
            d="M602.32 1175.71c450.14 0 815.05-364.9 815.05-815.04s-364.91-815.05-815.05-815.05-815.04 364.91-815.04 815.05 364.9 815.04 815.04 815.04"
          />
        </g>
      </g>
      <defs>
        <filter
          id={`${_id}-zora-f0`}
          width="1313.65"
          height="1313.34"
          x="-118.47"
          y="-210.87"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="61.8" />
        </filter>
        <filter
          id={`${_id}-zora-f1`}
          width="1359.39"
          height="1359.7"
          x="-83.87"
          y="-302.34"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="123.61" />
        </filter>
        <filter
          id={`${_id}-zora-f2`}
          width="1087.14"
          height="1087.45"
          x="44.38"
          y="-159.88"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="46.35" />
        </filter>
        <filter
          id={`${_id}-zora-f3`}
          width="825.09"
          height="825.09"
          x="250.19"
          y="-142.26"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="92.71" />
        </filter>
        <filter
          id={`${_id}-zora-f4`}
          width="428.61"
          height="428.61"
          x="448.27"
          y="55.82"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="61.8" />
        </filter>
        <filter
          id={`${_id}-zora-f5`}
          width="1815.51"
          height="1815.51"
          x="-305.43"
          y="-547.09"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="46.35" />
        </filter>
        <radialGradient
          id={`${_id}-zora-g0`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(128.23 269.74 289.41)scale(851.508 851.439)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".29" stopColor="#387AFA" />
          <stop offset=".65" stopColor="#387AFA" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-zora-g1`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 120.83 481.5)scale(815.046)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".6" stopOpacity="0" />
          <stop offset=".67" />
          <stop offset=".73" stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Zora chain icon (monochrome). */
export const ZoraMono = /* @__PURE__ */ createIcon(
  'ZoraMono',
  '0 0 64 64',
  () => (
    <path d="M32 64c17.67 0 32-14.33 32-32S49.66 0 32 0 0 14.33 0 32s14.33 32 32 32" />
  ),
  { fill: 'currentColor' },
);
