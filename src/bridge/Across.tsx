import { createIcon } from '../utils';

// Source: https://across.to (the round Across icon inlined on the site next to "Across V4": a #6CF9D8 disc with the #2D2E33 X)
// Default: that inline icon, its disc and X path unchanged, scaled 16 -> 64
// Mono: the disc in currentColor with the X knocked out (mask), the same silhouette as the default
// Not used: the across.to header logo draws the logomark in one colour with longer, heavier X arms beside the wordmark, and https://across.to/favicon.svg puts a third drawing of the X on a #6CF9D8 square. No brand kit was found on across.to
/** Across bridge icon (colored). */
export const Across = /* @__PURE__ */ createIcon(
  'Across',
  '0 0 64 64',
  () => (
    <g transform="scale(2)">
      <rect width="32" height="32" fill="#6CF9D8" rx="16" />
      <path
        fill="#2D2E33"
        fillRule="evenodd"
        d="m6.95 8.42 1.56-1.56 6.23 6.23a3.3 3.3 0 0 0-1.62 1.5zM13 17.44l-6.14 6.14 1.56 1.56 6.08-6.08a3.3 3.3 0 0 1-1.5-1.62m4.59 1.62 6 6 1.55-1.57-6.06-6.06q-.25.58-.7 1.04-.36.36-.79.59m1.38-4.47 6.08-6.08-1.56-1.56-6.15 6.14q.57.25 1.04.7.36.38.59.8"
        clipRule="evenodd"
      />
    </g>
  ),
  { fill: 'none' },
);

/** Across bridge icon (monochrome). */
export const AcrossMono = /* @__PURE__ */ createIcon(
  'AcrossMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(2)">
      <rect width="32" height="32" mask={`url(#${_id}-ac-m)`} rx="16" />
      <defs>
        <mask id={`${_id}-ac-m`}>
          <rect width="32" height="32" fill="white" />
          <path
            fill="black"
            fillRule="evenodd"
            d="m6.95 8.42 1.56-1.56 6.23 6.23a3.3 3.3 0 0 0-1.62 1.5zM13 17.44l-6.14 6.14 1.56 1.56 6.08-6.08a3.3 3.3 0 0 1-1.5-1.62m4.59 1.62 6 6 1.55-1.57-6.06-6.06q-.25.58-.7 1.04-.36.36-.79.59m1.38-4.47 6.08-6.08-1.56-1.56-6.15 6.14q.57.25 1.04.7.36.38.59.8"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
