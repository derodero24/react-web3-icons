import { createIcon } from '../utils';

// Source: https://rendernetwork.com/api/medias/file/logo-footer.svg (official Render Network site lockup; the Render Network Foundation press page, https://renderfoundation.com/press, offers the logos as PNG only)
// Colored: the symbol (ring with its satellite and the centre dot, one #242532 evenodd path) copied unchanged out of the official logo-footer.svg lockup (the Render Network lettering is left out), placed on the 64 grid
// Mono: the same path in currentColor
/** Render coin icon (colored). */
export const Render = /* @__PURE__ */ createIcon(
  'Render',
  '0 0 64 64',
  () => (
    <path
      fill="#242532"
      fillRule="evenodd"
      d="M32 4c7.47 0 14.51 2.92 19.79 8.2C57.1 17.5 60 24.52 60 32s-2.92 14.51-8.2 19.8C46.5 57.1 39.48 60 32 60s-14.51-2.92-19.8-8.2C6.9 46.5 4 39.48 4 32c0-5.41 1.52-10.62 4.43-15.1a5.8 5.8 0 0 1-1.37-3.82 6.03 6.03 0 0 1 6.02-6.02 6.03 6.03 0 0 1 6.02 6.02 6.03 6.03 0 0 1-6.02 6.02q-1.5-.02-2.77-.68a25.7 25.7 0 0 0-3.9 13.57c0 6.83 2.66 13.26 7.5 18.08A25.4 25.4 0 0 0 32 57.58c6.84 0 13.25-2.66 18.08-7.49A25.4 25.4 0 0 0 57.58 32c0-6.84-2.66-13.27-7.5-18.08A25.4 25.4 0 0 0 32 6.4zm-15.32 9.08a3.6 3.6 0 0 0-3.6-3.6 3.6 3.6 0 0 0-3.6 3.62 3.6 3.6 0 0 0 3.62 3.6 3.6 3.6 0 0 0 3.6-3.61M45.4 32c0 7.4-6 13.4-13.4 13.4s-13.4-6-13.4-13.4 6-13.4 13.4-13.4 13.4 6 13.4 13.4"
      clipRule="evenodd"
    />
  ),
  {},
);

/** Render coin icon (monochrome). */
export const RenderMono = /* @__PURE__ */ createIcon(
  'RenderMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 4c7.47 0 14.51 2.92 19.79 8.2C57.1 17.5 60 24.52 60 32s-2.92 14.51-8.2 19.8C46.5 57.1 39.48 60 32 60s-14.51-2.92-19.8-8.2C6.9 46.5 4 39.48 4 32c0-5.41 1.52-10.62 4.43-15.1a5.8 5.8 0 0 1-1.37-3.82 6.03 6.03 0 0 1 6.02-6.02 6.03 6.03 0 0 1 6.02 6.02 6.03 6.03 0 0 1-6.02 6.02q-1.5-.02-2.77-.68a25.7 25.7 0 0 0-3.9 13.57c0 6.83 2.66 13.26 7.5 18.08A25.4 25.4 0 0 0 32 57.58c6.84 0 13.25-2.66 18.08-7.49A25.4 25.4 0 0 0 57.58 32c0-6.84-2.66-13.27-7.5-18.08A25.4 25.4 0 0 0 32 6.4zm-15.32 9.08a3.6 3.6 0 0 0-3.6-3.6 3.6 3.6 0 0 0-3.6 3.62 3.6 3.6 0 0 0 3.62 3.6 3.6 3.6 0 0 0 3.6-3.61M45.4 32c0 7.4-6 13.4-13.4 13.4s-13.4-6-13.4-13.4 6-13.4 13.4-13.4 13.4 6 13.4 13.4"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
