import { createIcon } from '../utils';

// Source: https://routescan.io (official brand)
// Routescan uses a 6-facet isometric cube logo
/** Routescan explorer icon (colored). */
export const Routescan = /* @__PURE__ */ createIcon(
  'Routescan',
  '0 0 42 48',
  () => (
    <>
      <path d="M20.9455 0L0.0026505 11.9984L20.9455 24V0Z" fill="#00FF7F" />
      <path d="M41.8883 11.9984L20.9455 0V24L41.8883 11.9984Z" fill="#FBEC0D" />
      <path
        d="M0.0026505 11.9984L0 12V36L0.00261818 36.0016L20.9455 24L0.0026505 11.9984Z"
        fill="#4A9DFF"
      />
      <path
        d="M20.9455 24L41.8883 36.0016L41.8909 36V12L41.8883 11.9984L20.9455 24Z"
        fill="#FFB100"
      />
      <path
        d="M20.9455 48L41.8883 36.0016L20.9455 24L20.9455 48Z"
        fill="#FF4500"
      />
      <path
        d="M0.00261818 36.0016L20.9455 48L20.9455 24L0.00261818 36.0016Z"
        fill="#A46BFF"
      />
    </>
  ),
);

/** Routescan explorer icon (monochrome). */
export const RoutescanMono = /* @__PURE__ */ createIcon(
  'RoutescanMono',
  '0 0 42 48',
  () => (
    <>
      <path d="M20.9455 0L0.0026505 11.9984L20.9455 24V0Z" opacity="0.9" />
      <path d="M41.8883 11.9984L20.9455 0V24L41.8883 11.9984Z" />
      <path
        d="M0.0026505 11.9984L0 12V36L0.00261818 36.0016L20.9455 24L0.0026505 11.9984Z"
        opacity="0.5"
      />
      <path
        d="M20.9455 24L41.8883 36.0016L41.8909 36V12L41.8883 11.9984L20.9455 24Z"
        opacity="0.75"
      />
      <path
        d="M20.9455 48L41.8883 36.0016L20.9455 24L20.9455 48Z"
        opacity="0.65"
      />
      <path
        d="M0.00261818 36.0016L20.9455 48L20.9455 24L0.00261818 36.0016Z"
        opacity="0.45"
      />
    </>
  ),
  'currentColor',
);
