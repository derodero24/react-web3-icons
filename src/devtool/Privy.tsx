import { createIcon } from '../utils';

// Source: https://www.privy.io/brand-guidelines
// Colored: the logomark (circle and shadow ellipse) cropped from the official Privy logo on https://www.privy.io/brand-guidelines, path copied unchanged, in its rgb(1,1,16) = #010110; the old #5B4FFF appears in no official logo asset
// Mono: the same path in currentColor
/** Privy devtool icon (colored). */
export const Privy = /* @__PURE__ */ createIcon(
  'Privy',
  '0 0 64 64',
  () => (
    <path d="M32 47.39c12.01 0 21.76-9.72 21.76-21.7S44.01 4 32 4s-21.76 9.71-21.76 21.7c0 11.97 9.74 21.69 21.76 21.69M32 60c8.2 0 14.87-1.4 14.87-3.11s-6.66-3.11-14.88-3.11-14.87 1.4-14.87 3.1c0 1.72 6.65 3.12 14.87 3.12" />
  ),
  { fill: '#010110' },
);

/** Privy devtool icon (monochrome). */
export const PrivyMono = /* @__PURE__ */ createIcon(
  'PrivyMono',
  '0 0 64 64',
  () => (
    <path d="M32 47.39c12.01 0 21.76-9.72 21.76-21.7S44.01 4 32 4s-21.76 9.71-21.76 21.7c0 11.97 9.74 21.69 21.76 21.69M32 60c8.2 0 14.87-1.4 14.87-3.11s-6.66-3.11-14.88-3.11-14.87 1.4-14.87 3.1c0 1.72 6.65 3.12 14.87 3.12" />
  ),
  { fill: 'currentColor' },
);
