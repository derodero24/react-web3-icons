import { createIcon } from '../utils';

// Source: https://routescan.io (official brand)
// Routescan uses a 6-facet isometric cube logo
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
    <>
      <path d="M32 4 7.55 18l24.43 14z" opacity=".9" />
      <path d="M56.42 18 32 4v28z" />
      <path d="M7.56 18v28l24.43-14z" opacity=".5" />
      <path d="m32 32 24.42 14V18z" opacity=".75" />
      <path d="m32 60 24.42-14L32 32z" opacity=".65" />
      <path d="m7.56 46 24.43 14V32z" opacity=".45" />
    </>
  ),
  { fill: 'currentColor' },
);
