import { createIcon } from '../utils';

// Source: https://routescan.io (official brand)
// Routescan uses a 6-facet isometric cube logo
/** Routescan explorer icon (colored). */
export const Routescan = /* @__PURE__ */ createIcon(
  'Routescan',
  '0 0 42 48',
  () => (
    <>
      <path fill="#00FF7F" d="M20.946 0 .002 11.998 20.946 24z" />
      <path fill="#FBEC0D" d="M41.888 11.998 20.946 0v24z" />
      <path fill="#4A9DFF" d="M.003 11.998 0 12v24l.003.002L20.946 24z" />
      <path
        fill="#FFB100"
        d="m20.946 24 20.942 12.002.003-.002V12l-.003-.002z"
      />
      <path fill="#FF4500" d="m20.946 48 20.942-11.998L20.946 24z" />
      <path fill="#A46BFF" d="M.003 36.002 20.946 48V24z" />
    </>
  ),
  {},
);

/** Routescan explorer icon (monochrome). */
export const RoutescanMono = /* @__PURE__ */ createIcon(
  'RoutescanMono',
  '0 0 42 48',
  () => (
    <>
      <path d="M20.946 0 .002 11.998 20.946 24z" opacity=".9" />
      <path d="M41.888 11.998 20.946 0v24z" />
      <path d="M.003 11.998 0 12v24l.003.002L20.946 24z" opacity=".5" />
      <path
        d="m20.946 24 20.942 12.002.003-.002V12l-.003-.002z"
        opacity=".75"
      />
      <path d="m20.946 48 20.942-11.998L20.946 24z" opacity=".65" />
      <path d="M.003 36.002 20.946 48V24z" opacity=".45" />
    </>
  ),
  { fill: 'currentColor' },
);
