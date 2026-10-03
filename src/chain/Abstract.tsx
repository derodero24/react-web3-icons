import { createIcon } from '../utils';

// Source: https://www.abs.xyz (footer "Brand Kit" link to the official Air board, Logos / Icon / SVG)
// Default: Abstract_Icon_LightGreen.svg (#00DE73); Mono: Abstract_Icon_Black.svg with fill set to currentColor (same geometry).
/** Abstract chain icon (colored). */
export const Abstract = /* @__PURE__ */ createIcon(
  'Abstract',
  '0 0 64 64',
  () => (
    <>
      <path d="m40.85 40.72 11.23 11.24-5.27 5.26L35.58 46a5 5 0 0 0-3.6-1.49 5 5 0 0 0-3.6 1.49L17.17 57.23l-5.27-5.28 11.23-11.24z" />
      <path d="m42.72 37.48 15.34 4.1 1.92-7.2-15.34-4.11a5 5 0 0 1-3.08-2.37 5 5 0 0 1-.51-3.86l4.1-15.34-7.2-1.93-4.1 15.34z" />
      <path d="m21.26 37.48-15.34 4.1L4 34.39l15.33-4.11a5 5 0 0 0 3.1-2.37 5 5 0 0 0 .5-3.86L18.83 8.7l7.2-1.93 4.1 15.34z" />
    </>
  ),
  { fill: '#00de73' },
);

/** Abstract chain icon (monochrome). */
export const AbstractMono = /* @__PURE__ */ createIcon(
  'AbstractMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m40.85 40.73 11.23 11.23-5.27 5.27L35.58 46a5 5 0 0 0-3.6-1.5 5 5 0 0 0-3.6 1.5L17.17 57.23l-5.27-5.28 11.23-11.23z" />
      <path d="m42.72 37.49 15.34 4.1 1.92-7.2-15.34-4.1a5 5 0 0 1-3.08-2.38 5 5 0 0 1-.51-3.86l4.1-15.35-7.2-1.93-4.1 15.35z" />
      <path d="m21.26 37.49-15.34 4.1L4 34.4l15.33-4.1a5 5 0 0 0 3.1-2.38 5 5 0 0 0 .5-3.86L18.83 8.7l7.2-1.93 4.1 15.35-8.86 15.36z" />
    </>
  ),
  { fill: 'currentColor' },
);
