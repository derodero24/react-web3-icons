import { createIcon } from '../utils';

// Source: https://www.unichain.org/brand-kit (official brand kit, https://www.unichain.org/assets/zip/unichain-brand-kit.zip)
// Default: "Unichain Logo Assets/Unichain Icon - Vibrant.svg" (#F50DB4); Mono: "Unichain Icon - Dark.svg" with fill set to currentColor (same geometry).
/** Unichain chain icon (colored). */
export const Unichain = /* @__PURE__ */ createIcon(
  'Unichain',
  '0 0 64 64',
  () => (
    <path d="M60 31.47c-15.18 0-27.47-12.3-27.47-27.46h-1.06v27.46H4v1.06c15.18 0 27.47 12.3 27.47 27.46h1.06V32.53h27.46z" />
  ),
  { fill: '#f50db4' },
);

/** Unichain chain icon (monochrome). */
export const UnichainMono = /* @__PURE__ */ createIcon(
  'UnichainMono',
  '0 0 64 64',
  () => (
    <path d="M60 31.47c-15.18 0-27.47-12.3-27.47-27.46h-1.06v27.46H4v1.06c15.18 0 27.47 12.3 27.47 27.46h1.06V32.53h27.46z" />
  ),
  { fill: 'currentColor' },
);
