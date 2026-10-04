import { createIcon } from '../utils';

// Source: https://docs.routescan.io/routescan-brand-assets (official brand kit: Routescan-symbol.svg, also in Routescan_brand_asset.zip)
// Colored: matches the official Routescan-symbol.svg (six facets in the brand palette #00FF7F, #FBEC0D, #4A9DFF, #FFB100, #FF4500, #A46BFF; silhouette IoU 0.991), accessed 2026-10-04
// Mono: the six facets in currentColor, separated by thin knocked-out seams so the cube stays readable
/** Routescan explorer icon (colored). */
export const Routescan = /* @__PURE__ */ createIcon(
  'Routescan',
  '0 0 64 64',
  () => (
    <>
      <path fill="#00FF7F" d="M32 4 7.55 18l24.43 14z" />
      <path fill="#FBEC0D" d="M56.42 18 32 4v28z" />
      <path fill="#4A9DFF" d="M7.56 18v28l24.43-14z" />
      <path fill="#FFB100" d="m32 32 24.42 14V18z" />
      <path fill="#FF4500" d="m32 60 24.42-14L32 32z" />
      <path fill="#A46BFF" d="m7.56 46 24.43 14V32z" />
    </>
  ),
  {},
);

/** Routescan explorer icon (monochrome). */
export const RoutescanMono = /* @__PURE__ */ createIcon(
  'RoutescanMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M31.25 30.7 8.31 17.57 31.25 4.43zm-.76 1.3L7.56 45.14V18.86zm.76 1.3v26.28L8.32 46.44zm1.5 0 22.92 13.13-22.92 13.14zm.76-1.3 22.91-13.13v26.26zm-.76-1.3V4.44l22.92 13.14z"
    />
  ),
  { fill: 'currentColor' },
);
