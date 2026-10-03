import { createIcon } from '../utils';

// Source: https://ton.org/assets/favicon.svg
// Default: the official site's symbol (ton.org/assets/favicon.svg: #30A1F5 disc with a white mark), a container drawn full-bleed; it replaces the #0098EA disc whose mark was a transparent cut-out. ton.org publishes no downloadable brand kit (ton.org/en/brand-assets serves the homepage)
// Mono: the disc in currentColor with the mark knocked out (fill-rule=evenodd)
/** Ton chain icon (colored). */
export const Ton = /* @__PURE__ */ createIcon(
  'Ton',
  '0 0 64 64',
  () => (
    <g transform="scale(.74419)">
      <circle cx="43" cy="43" r="43" fill="#30A1F5" />
      <path
        fill="#fff"
        d="M26.96 22.63c-5.98 0-9.76 6.44-6.76 11.65L40 68.61c1.34 2.3 4.67 2.3 6 0l19.8-34.33c3-5.2-.78-11.65-6.75-11.65Zm32.08 6.05c1.36 0 2.16 1.45 1.52 2.57l-10.4 18.63-4.14 7.98V28.68Zm-19.07 0v29.17l-4.12-7.98-10.4-18.61-.04-.06c-.6-1.11.2-2.51 1.54-2.51Z"
      />
    </g>
  ),
  {},
);

/** Ton chain icon (monochrome). */
export const TonMono = /* @__PURE__ */ createIcon(
  'TonMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64M20.06 16.84c-4.44 0-7.26 4.8-5.03 8.67l14.74 25.55c1 1.71 3.47 1.71 4.46 0L48.97 25.5c2.24-3.87-.58-8.67-5.03-8.67Zm23.88 4.5c1.01 0 1.6 1.08 1.12 1.92l-7.74 13.86-3.07 5.94V21.35Zm-14.2 0v21.71l-3.06-5.93-7.75-13.86-.02-.04a1.28 1.28 0 0 1 1.15-1.87Z"
    />
  ),
  { fill: 'currentColor' },
);
