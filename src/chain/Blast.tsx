import { createIcon } from '../utils';

// Source: https://blast.io/favicon.svg (Blast's site icon, accessed 2026-10-09)
// Source: https://blast.io/icons/blast-color.svg (the round icon served by blast.io)
// No downloadable brand kit was found; the artwork is Blast's own site assets
// Default: the two polygons of favicon.svg (the mark in #FCFC03), shapes unchanged and placed on the 64 grid
// Mono: the same shapes in currentColor
// Circle: blast-color.svg (the #FCFC03 mark on a black disc), shapes unchanged without the file's no-op clip path and placed on the 64 grid as a full-bleed container; it is the light-background option for the pale default. CircleMono is the disc in currentColor with the mark knocked out (fill-rule=evenodd)
/** Blast chain icon (colored). */
export const Blast = /* @__PURE__ */ createIcon(
  'Blast',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.12 31.66 8.83-4.4 3.04-9.34-6.09-4.43H13.38L4 20.45h47.63l-2.52 7.83H30L28.17 34h19.1l-5.36 16.5 8.95-4.43 3.2-9.88-6-4.4z" />
      <path d="m17.48 43.4 5.51-17.17-6.11-4.58-9.2 28.83h34.23l2.3-7.08z" />
    </>
  ),
  { fill: '#FCFC03' },
);

/** Blast chain icon (monochrome). */
export const BlastMono = /* @__PURE__ */ createIcon(
  'BlastMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.12 31.66 8.83-4.4 3.04-9.34-6.09-4.43H13.38L4 20.45h47.63l-2.52 7.83H30L28.17 34h19.1l-5.36 16.5 8.95-4.43 3.2-9.88-6-4.4z" />
      <path d="m17.48 43.4 5.51-17.17-6.11-4.58-9.2 28.83h34.23l2.3-7.08z" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Blast Circle chain icon (colored). */
export const BlastCircle = /* @__PURE__ */ createIcon(
  'BlastCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.53333)">
      <circle cx="60" cy="60" r="60" />
      <path
        fill="#FCFC03"
        d="m82.74 59.54 12.27-6.12 4.23-12.98-8.46-6.15H34.45l-13.02 9.67h66.21l-3.52 10.89H57.57l-2.55 7.96h26.55L74.1 85.7l12.44-6.15L91 65.82l-8.33-6.11z"
      />
      <path
        fill="#FCFC03"
        d="M40.15 75.87 47.8 52l-8.5-6.36L26.54 85.7H74.1l3.19-9.84z"
      />
    </g>
  ),
  {},
);

/** Blast Circle chain icon (monochrome). */
export const BlastCircleMono = /* @__PURE__ */ createIcon(
  'BlastCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m44.13-.25 6.54-3.26 2.26-6.92-4.51-3.28H18.37l-6.94 5.16h35.31l-1.88 5.8H30.7l-1.36 4.25H43.5l-3.98 12.2 6.63-3.27 2.38-7.33-4.44-3.25zM21.4 40.46l4.1-12.73-4.54-3.39-6.82 21.37h25.37l1.7-5.25z"
    />
  ),
  { fill: 'currentColor' },
);
