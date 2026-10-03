import { createIcon } from '../utils';

// Source: https://ton.org/assets/media/ton_white_logo.zip
// Source: https://ton.org/assets/media/ton_logo.zip
// Default: the TON symbol from the official Media Assets kit (ton.org/media). Geometry is the vector symbol of `TON Logo White.svg` (ton_white_logo.zip); colours follow `TON Logo on White` (ton_logo.zip), a #0098EA disc with a white mark, whose symbol is shipped only as an embedded PNG. Drawn full-bleed as a container
// Mono: the vector symbol of `TON Logo White.svg` unchanged, the disc in currentColor with the mark knocked out
/** Ton chain icon (colored). */
export const Ton = /* @__PURE__ */ createIcon(
  'Ton',
  '0 0 64 64',
  () => (
    <g transform="scale(.64)">
      <circle cx="50" cy="50" r="50" fill="#0098EA" />
      <path
        fill="#fff"
        d="M31.35 26.31c-6.95 0-11.35 7.5-7.86 13.55l23.03 39.92c1.55 2.68 5.42 2.68 6.97 0l23.03-39.92c3.49-6.05-.91-13.55-7.86-13.55zm37.3 7.04c1.59 0 2.52 1.68 1.76 3l-12.1 21.64-4.8 9.3V33.34zm-22.17 0v33.92L41.68 58l-12.1-21.64-.03-.06c-.7-1.3.23-2.93 1.8-2.93z"
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
    <path d="M32 0c17.68 0 32 14.33 32 32S49.69 64 32 64 0 49.69 0 32 14.33 0 32 0M20.06 16.84c-4.44 0-7.26 4.8-5.03 8.67l14.74 25.55c1 1.71 3.47 1.71 4.46 0L48.97 25.5c2.24-3.87-.58-8.67-5.03-8.67zm23.88 4.5c1.01 0 1.6 1.08 1.12 1.92l-7.74 13.86-3.07 5.94V21.35zm-14.2 0v21.71l-3.06-5.94-7.75-13.85-.02-.04a1.28 1.28 0 0 1 1.15-1.87z" />
  ),
  { fill: 'currentColor' },
);
