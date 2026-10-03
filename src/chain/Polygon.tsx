import { createIcon } from '../utils';

// Source: https://polygon.technology/brand-guidelines (official brand guidelines; logo files in the linked Google Drive "Polygon Logo Repository")
// Source: https://drive.google.com/drive/folders/1DE7ujCZf6g5INteEpTmvHSfqoZ8VYlJH (Polygon Logo Repository: Icon/SVG/polygon-icon-primary-purple.svg, Round/SVG/polygon-round-primary-dark.svg, Rounded Square/SVG/polygon-rounded sq-primary-dark.svg)
// Default: the official icon polygon-icon-primary-purple.svg (solid #670DE5; the guidelines forbid gradients), replacing the older rounded-corner gradient mark
// Circle: the official polygon-round-primary-dark.svg (#670DE5 disc, white icon); Square: the official polygon-rounded sq-primary-dark.svg (#670DE5 tile with rx 20/320, white icon)
// Mono: the icon path in currentColor; CircleMono and SquareMono: the official disc / rounded square in currentColor with the same icon path knocked out (fill-rule=evenodd), like the kit's monochrome round and rounded-square files
/** Polygon chain icon (colored). */
export const Polygon = /* @__PURE__ */ createIcon(
  'Polygon',
  '0 0 64 64',
  () => (
    <path
      fill="#670DE5"
      d="m25 23.93-5.24-3.03-15.74 9.08v18.16l15.74 9.08 15.74-9.08V19.89l8.74-5.04L53 19.89V30l-8.75 5.04L39 32v8.07l5.24 3.03 15.74-9.08V15.86L44.24 6.78 28.5 15.86V44.1l-8.74 5.04-8.74-5.04V34l8.74-5.04L25 32z"
    />
  ),
  {},
);

/** Polygon chain icon (monochrome). */
export const PolygonMono = /* @__PURE__ */ createIcon(
  'PolygonMono',
  '0 0 64 64',
  () => (
    <path d="m25 23.93-5.24-3.03-15.74 9.08v18.16l15.74 9.08 15.74-9.08V19.89l8.74-5.04L53 19.89V30l-8.75 5.04L39 32v8.07l5.24 3.03 15.74-9.08V15.86L44.24 6.78 28.5 15.86V44.1l-8.74 5.04-8.74-5.04V34l8.74-5.04L25 32z" />
  ),
  { fill: 'currentColor' },
);

/** Polygon Square chain icon (colored). */
export const PolygonSquare = /* @__PURE__ */ createIcon(
  'PolygonSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.2)">
      <rect width="320" height="320" fill="#670DE5" rx="20" />
      <path
        fill="white"
        d="m142.25 139.52-13.31-7.68L89 154.88v46.08L128.94 224l39.94-23.04v-71.68l22.18-12.8 22.2 12.8v25.6l-22.2 12.8-13.3-7.68v20.48l13.3 7.68L231 165.12v-46.08L191.06 96l-39.93 23.04v71.68l-22.2 12.8-22.18-12.8v-25.6l22.19-12.8 13.3 7.68z"
      />
    </g>
  ),
  {},
);

/** Polygon Square chain icon (monochrome). */
export const PolygonSquareMono = /* @__PURE__ */ createIcon(
  'PolygonSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M4 0h56a4 4 0 0 1 4 4v56a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4m24.45 27.9-2.66-1.53-7.99 4.6v9.22l7.99 4.61 7.99-4.6V25.85l4.43-2.56 4.44 2.56v5.12l-4.44 2.56L35.55 32v4.1l2.66 1.53 7.99-4.6V23.8l-7.99-4.61-7.98 4.6v14.34l-4.44 2.56-4.44-2.56v-5.12l4.44-2.56L28.45 32z"
    />
  ),
  { fill: 'currentColor' },
);

/** Polygon Circle chain icon (colored). */
export const PolygonCircle = /* @__PURE__ */ createIcon(
  'PolygonCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.2)">
      <rect width="320" height="320" fill="#670DE5" rx="160" />
      <path
        fill="white"
        d="m142.25 139.52-13.31-7.68L89 154.88v46.08L128.94 224l39.94-23.04v-71.68l22.18-12.8 22.2 12.8v25.6l-22.2 12.8-13.3-7.68v20.48l13.3 7.68L231 165.12v-46.08L191.06 96l-39.93 23.04v71.68l-22.2 12.8-22.18-12.8v-25.6l22.19-12.8 13.3 7.68z"
      />
    </g>
  ),
  {},
);

/** Polygon Circle chain icon (monochrome). */
export const PolygonCircleMono = /* @__PURE__ */ createIcon(
  'PolygonCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64m-3.55 27.9-2.66-1.53-7.99 4.6v9.22l7.99 4.61 7.99-4.6V25.85l4.43-2.56 4.44 2.56v5.12l-4.44 2.56L35.55 32v4.1l2.66 1.53 7.99-4.6V23.8l-7.99-4.61-7.98 4.6v14.34l-4.44 2.56-4.44-2.56v-5.12l4.44-2.56L28.45 32z"
    />
  ),
  { fill: 'currentColor' },
);
