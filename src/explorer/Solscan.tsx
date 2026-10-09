import { createIcon } from '../utils';

// Source: https://solscan.io/_next/static/media/solscan-logo-light.1410e164.svg (the symbol on the official Branding page https://solscan.io/branding: ring #00E8B5, dot #C74AE3)
// Source: https://solscan.io (home-page header logo: the inline <svg viewBox="0 0 99 16">, whose "o" is this mark)
// Default: the mark of the solscan.io home-page header logo, both paths unchanged (dot #C74AE3, ring #00E8B5, the colours of the Branding page's solscan-logo-light.svg), uniformly scaled onto the 64 grid (silhouette IoU 0.996). The Branding-page symbol is the same design as a coarser trace (IoU 0.968), so the cleaner header geometry is kept
// The header on the other pages (viewBox 0 0 100 24) draws the ring in #00E8B4. solscan.io pages and the Branding page zip return a Cloudflare challenge to scripts, so both header logos were read from the site's _app bundle (checked 2026-10-09)
// Mono: the same two paths in currentColor
/** Solscan explorer icon (colored). */
export const Solscan = /* @__PURE__ */ createIcon(
  'Solscan',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#c74ae3"
        d="M32.08 20.94a11.04 11.04 0 0 1-.31 22.09 11.04 11.04 0 1 1 .3-22.09"
      />
      <path
        fill="#00e8b5"
        d="M46.41 55.57c-9.63 7.75-26.83 4.98-35.75-5.46C.86 38.63 2 21.4 13.25 11.2a27.97 27.97 0 0 1 38.77 1.25c10.17 10.46 10.62 27.8 1.1 37.6l-6.78-7.1c3.61-5.05 4.73-10.82 2.57-17.02C45.7 16.7 35.5 11.8 26.18 14.96c-9.2 3.12-14.22 13.01-11.35 22.33 2.9 9.42 12.75 14.78 22.2 11.87 1.88-.58 2.92-.24 4.14 1.16 1.6 1.86 3.47 3.5 5.24 5.25"
      />
    </>
  ),
  {},
);

/** Solscan explorer icon (monochrome). */
export const SolscanMono = /* @__PURE__ */ createIcon(
  'SolscanMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32.08 20.94a11.04 11.04 0 0 1-.31 22.09 11.04 11.04 0 1 1 .3-22.09" />
      <path d="M46.41 55.57c-9.63 7.75-26.83 4.98-35.75-5.46C.86 38.63 2 21.4 13.25 11.2a27.97 27.97 0 0 1 38.77 1.25c10.17 10.46 10.62 27.8 1.1 37.6l-6.78-7.1c3.61-5.05 4.73-10.82 2.57-17.02C45.7 16.7 35.5 11.8 26.18 14.96c-9.2 3.12-14.22 13.01-11.35 22.33 2.9 9.42 12.75 14.78 22.2 11.87 1.88-.58 2.92-.24 4.14 1.16 1.6 1.86 3.47 3.5 5.24 5.25" />
    </>
  ),
  { fill: 'currentColor' },
);
