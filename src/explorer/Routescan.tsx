import { createIcon } from '../utils';

// Source: https://routescan.io (official brand)
// Routescan uses a 6-facet isometric cube logo
/** Routescan explorer icon (colored). */
export const Routescan = /* @__PURE__ */ createIcon(
  'Routescan',
  '0 0 64 64',
  () => (
    <>
      <path fill="#00FF7F" d="M31.992 4 7.557 17.998 31.992 32z" />
      <path fill="#FBEC0D" d="M56.424 17.998 31.992 4v28z" />
      <path fill="#4A9DFF" d="M7.558 17.998 7.555 18v28l.003.002L31.992 32z" />
      <path
        fill="#FFB100"
        d="m31.992 32 24.432 14.002.004-.002V18l-.004-.002z"
      />
      <path fill="#FF4500" d="m31.992 60 24.432-13.998L31.992 32z" />
      <path fill="#A46BFF" d="M7.558 46.002 31.992 60V32z" />
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
      <path d="M31.992 4 7.557 17.998 31.992 32z" opacity=".9" />
      <path d="M56.424 17.998 31.992 4v28z" />
      <path d="M7.558 17.998 7.555 18v28l.003.002L31.992 32z" opacity=".5" />
      <path
        d="m31.992 32 24.432 14.002.004-.002V18l-.004-.002z"
        opacity=".75"
      />
      <path d="m31.992 60 24.432-13.998L31.992 32z" opacity=".65" />
      <path d="M7.558 46.002 31.992 60V32z" opacity=".45" />
    </>
  ),
  { fill: 'currentColor' },
);
