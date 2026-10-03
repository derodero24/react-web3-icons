import { createIcon } from '../utils';

// Source: https://tron.network/favicon.svg
// Source: https://tron.network/static/doc/Brand-guidelines.pdf (official brand guidelines, Aug 2025)
// Default: the official site's favicon.svg (#EA0029), which carries the redrawn, heavier icon of the Aug 2025 brand guidelines ("Before / After"); it replaces the older thin icon in #C4342B. The guidelines list the primary red as #DC062B (RGB) while their own artwork and the site use #EA0029, so the official file is kept unchanged
// Mono: the same icon path in currentColor (the triangles stay holes)
/** Tron chain icon (colored). */
export const Tron = /* @__PURE__ */ createIcon(
  'Tron',
  '0 0 64 64',
  () => (
    <path
      fill="#EA0029"
      d="M45.6 9.7 5.1 4l22.62 56L58.9 20.09zm5.76 9.66L38.2 22.17l6.84-7.75zm-10.6-6.24-8.45 9.57L15.53 9.58zM27.33 48.17l-14.3-35.39 17.36 13.57zm4.02.57 3.04-21.6L51 23.6z"
    />
  ),
  {},
);

/** Tron chain icon (monochrome). */
export const TronMono = /* @__PURE__ */ createIcon(
  'TronMono',
  '0 0 64 64',
  () => (
    <path d="M45.6 9.7 5.1 4l22.62 56L58.9 20.09zm5.76 9.66L38.2 22.17l6.84-7.75zm-10.6-6.24-8.45 9.57L15.53 9.58zM27.33 48.17l-14.3-35.39 17.36 13.57zm4.02.57 3.04-21.6L51 23.6z" />
  ),
  { fill: 'currentColor' },
);
