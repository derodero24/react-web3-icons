import { createIcon } from '../utils';

// Source: https://backpack.app/media-kit (official media kit page; its inline header lockup draws the #E33E3F backpack symbol, and its Download button links the brand icons on Google Drive)
// Default: the three #E33E3F symbol paths of the media-kit page's inline header lockup (viewBox 0 0 1075 219, the BACKPACK lettering left out), unchanged, placed on the 64 grid. They replace an older drawing of the same backpack with sharper corners, including the tips of the handle (alpha IoU 0.97)
// Mono: the same three paths in currentColor (the round window stays a hole)
/** Backpack wallet icon (colored). */
export const Backpack = /* @__PURE__ */ createIcon(
  'Backpack',
  '0 0 64 64',
  () => (
    <g>
      <path d="M47.09 44.56c1.98 0 2.97 0 3.6.62s.6 1.6.6 3.59v2.8c0 3.98 0 5.96-1.23 7.19C48.82 60 46.84 60 42.87 60H21.12c-3.96 0-5.96 0-7.18-1.24-1.24-1.22-1.24-3.2-1.24-7.18v-2.8c0-1.99 0-2.97.62-3.6.62-.6 1.6-.6 3.6-.6z" />
      <path
        fillRule="evenodd"
        d="M32 12.1c19.57 0 19.3 13.06 19.3 19.3v7.02a2.1 2.1 0 0 1-2.11 2.11H14.8a2.1 2.1 0 0 1-2.1-2.12V31.4c0-6.23-.3-19.28 19.28-19.28m0 4.98a5.96 5.96 0 1 0 0 11.93 5.96 5.96 0 0 0 0-11.93"
      />
      <path d="M32 4.02c4.2 0 7.92 1.47 8.9 3.88.14.42.21.62.09.77-.14.15-.39.12-.9.02-1.3-.24-3.16-.4-4.8-.45A61 61 0 0 0 32 8.15q-1.74 0-3.3.1c-1.64.04-3.5.2-4.81.43-.5.1-.75.14-.87-.02-.14-.15-.07-.36.07-.76.98-2.4 4.68-3.88 8.9-3.88" />
    </g>
  ),
  { fill: '#E33E3F' },
);

/** Backpack wallet icon (monochrome). */
export const BackpackMono = /* @__PURE__ */ createIcon(
  'BackpackMono',
  '0 0 64 64',
  () => (
    <g>
      <path d="M47.09 44.56c1.98 0 2.97 0 3.6.62s.6 1.6.6 3.59v2.8c0 3.98 0 5.96-1.23 7.19C48.82 60 46.84 60 42.87 60H21.12c-3.96 0-5.96 0-7.18-1.24-1.24-1.22-1.24-3.2-1.24-7.18v-2.8c0-1.99 0-2.97.62-3.6.62-.6 1.6-.6 3.6-.6z" />
      <path
        fillRule="evenodd"
        d="M32 12.1c19.57 0 19.3 13.06 19.3 19.3v7.02a2.1 2.1 0 0 1-2.11 2.11H14.8a2.1 2.1 0 0 1-2.1-2.12V31.4c0-6.23-.3-19.28 19.28-19.28m0 4.98a5.96 5.96 0 1 0 0 11.93 5.96 5.96 0 0 0 0-11.93"
      />
      <path d="M32 4.02c4.2 0 7.92 1.47 8.9 3.88.14.42.21.62.09.77-.14.15-.39.12-.9.02-1.3-.24-3.16-.4-4.8-.45A61 61 0 0 0 32 8.15q-1.74 0-3.3.1c-1.64.04-3.5.2-4.81.43-.5.1-.75.14-.87-.02-.14-.15-.07-.36.07-.76.98-2.4 4.68-3.88 8.9-3.88" />
    </g>
  ),
  { fill: 'currentColor' },
);
