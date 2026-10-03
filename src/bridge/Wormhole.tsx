import { createIcon } from '../utils';

// Source: https://static.wormhole.com/logomark-black.svg
// Source: https://wormhole.com/brand-and-press (official brand assets)
// Default: the official Wormhole logomark (logomark-black.svg from wormhole.com/brand-and-press); the brand publishes the logomark in black and white only. It replaces a moon-and-stars illustration from the website that was not the logo
// Mono: the same logomark path in currentColor; use it with a light color on dark backgrounds (the brand's logomark-white.svg)
/** Wormhole bridge icon (colored). */
export const Wormhole = /* @__PURE__ */ createIcon(
  'Wormhole',
  '0 0 64 64',
  () => (
    <path d="M47.4 42.29a9 9 0 0 1-7.8 4.5h-5.2V29.26L26.9 42.3a9 9 0 0 1-7.79 4.51h-5.17V20.9h10.4v17.5L34.4 20.93v-.01h10.4v17.57l10.9-18.96a2.4 2.4 0 0 0-.03-2.48C50.63 9.1 41.7 3.85 31.57 4 16.1 4.24 3.92 16.7 4 32.15 4.08 47.55 16.6 60 32 60s28-12.53 28-28q-.01-3.74-.95-7.2a.8.8 0 0 0-1.47-.2z" />
  ),
  { fill: '#000' },
);

/** Wormhole bridge icon (monochrome). */
export const WormholeMono = /* @__PURE__ */ createIcon(
  'WormholeMono',
  '0 0 64 64',
  () => (
    <path d="M47.4 42.29a9 9 0 0 1-7.8 4.5h-5.2V29.26L26.9 42.3a9 9 0 0 1-7.79 4.51h-5.17V20.9h10.4v17.5L34.4 20.93v-.01h10.4v17.57l10.9-18.96a2.4 2.4 0 0 0-.03-2.48C50.63 9.1 41.7 3.85 31.57 4 16.1 4.24 3.92 16.7 4 32.15 4.08 47.55 16.6 60 32 60s28-12.53 28-28q-.01-3.74-.95-7.2a.8.8 0 0 0-1.47-.2z" />
  ),
  { fill: 'currentColor' },
);
