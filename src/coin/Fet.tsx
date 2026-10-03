import { createIcon } from '../utils';

// Source: https://superintelligence.io/wp-content/uploads/2025/01/mobile-logo.svg (official ASI Alliance site; FET is the ASI Alliance token, https://superintelligence.io/asi-token-fet/)
// Colored: the ASI Alliance symbol, the official mobile-logo.svg of superintelligence.io unchanged (three #151A1A paths), placed on the 64 grid; it replaces the retired Fetch.ai dot grid since FET became the ASI Alliance token (the ticker is still FET)
// Mono: the same three paths in currentColor
/** Fet coin icon (colored). */
export const Fet = /* @__PURE__ */ createIcon(
  'Fet',
  '0 0 64 64',
  () => (
    <>
      <path d="M4.02 32c0-3.44 2.8-6.24 6.25-6.24 3.44 0 6.24-2.8 6.24-6.24s2.8-6.25 6.25-6.25a6.24 6.24 0 0 1 0 12.49 6.24 6.24 0 1 0 0 12.49 6.24 6.24 0 1 1-6.25 6.24c0-3.44-2.8-6.24-6.24-6.24A6.24 6.24 0 0 1 4.02 32" />
      <path d="M60 32c0 3.45-2.8 6.25-6.24 6.25a6.24 6.24 0 0 0-6.25 6.24c0 3.45-2.8 6.25-6.24 6.25a6.24 6.24 0 0 1 0-12.5c3.44 0 6.24-2.79 6.24-6.24s-2.8-6.24-6.24-6.24a6.24 6.24 0 1 1 6.24-6.25c0 3.45 2.8 6.25 6.25 6.25S60 28.56 60 32" />
      <path d="M32.07 37.98a6.07 6.07 0 1 0 0-12.14 6.07 6.07 0 0 0 0 12.14" />
    </>
  ),
  { fill: '#151A1A' },
);

/** Fet coin icon (monochrome). */
export const FetMono = /* @__PURE__ */ createIcon(
  'FetMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M4.02 32c0-3.44 2.8-6.24 6.25-6.24 3.44 0 6.24-2.8 6.24-6.24s2.8-6.25 6.25-6.25a6.24 6.24 0 0 1 0 12.49 6.24 6.24 0 1 0 0 12.49 6.24 6.24 0 1 1-6.25 6.24c0-3.44-2.8-6.24-6.24-6.24A6.24 6.24 0 0 1 4.02 32" />
      <path d="M60 32c0 3.45-2.8 6.25-6.24 6.25a6.24 6.24 0 0 0-6.25 6.24c0 3.45-2.8 6.25-6.24 6.25a6.24 6.24 0 0 1 0-12.5c3.44 0 6.24-2.79 6.24-6.24s-2.8-6.24-6.24-6.24a6.24 6.24 0 1 1 6.24-6.25c0 3.45 2.8 6.25 6.25 6.25S60 28.56 60 32" />
      <path d="M32.07 37.98a6.07 6.07 0 1 0 0-12.14 6.07 6.07 0 0 0 0 12.14" />
    </>
  ),
  { fill: 'currentColor' },
);
