import { createIcon } from '../utils';

// Source: https://legacy.pyth.network/brand (official brand assets: pyth-logomark.zip, Pyth Logomark/SVG/Pyth Logomark_Dark.svg, #110F23 Dark Purple)
// Source: https://legacy.pyth.network/brand-assets/pyth-logomark.zip (official logomark zip)
// Source: https://legacy.pyth.network/_next/static/media/logomark.bd2e4fac.svg
// Default: the paths of the official Pyth Logomark_Dark.svg (#110F23) from the logomark zip linked on legacy.pyth.network/brand (the zip is reachable at legacy.pyth.network/brand-assets/pyth-logomark.zip; the pyth.network/brand-assets link returned 404 on 2026-10-03). legacy.pyth.network's live logomark.bd2e4fac.svg has the same geometry in #E6DAFE. It replaces paths taken from @web3icons/react. The coin subpath re-exports this artwork.
// brandColor: the logomark is near-black Dark Purple, so the manifest uses the palette's accent PURPLE #7142CF (legacy.pyth.network/brand).
// Mono: the same two paths in currentColor
/** Pyth oracle icon (colored). */
export const Pyth = /* @__PURE__ */ createIcon(
  'Pyth',
  '0 0 64 64',
  () => (
    <>
      <path d="M37.58 26.4c0 3.1-2.5 5.6-5.58 5.6v5.6c6.17 0 11.17-5.02 11.17-11.2 0-6.19-5-11.2-11.17-11.2-2.03 0-3.94.54-5.58 1.5a11.2 11.2 0 0 0-5.59 9.7v28l5.02 5.03.57.57V26.4c0-3.1 2.5-5.6 5.58-5.6s5.58 2.5 5.58 5.6" />
      <path d="M32 4c-4.07 0-7.88 1.1-11.17 3a22 22 0 0 0-5.58 4.59A22.4 22.4 0 0 0 9.66 26.4v16.8l5.59 5.6V26.4c0-4.97 2.15-9.44 5.58-12.52A16.7 16.7 0 0 1 32 9.6c9.25 0 16.75 7.52 16.75 16.8S41.25 43.2 32 43.2v5.6c12.34 0 22.34-10.03 22.34-22.4S44.34 4 32 4" />
    </>
  ),
  { fill: '#110F23' },
);

/** Pyth oracle icon (monochrome). */
export const PythMono = /* @__PURE__ */ createIcon(
  'PythMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M37.58 26.4c0 3.1-2.5 5.6-5.58 5.6v5.6c6.17 0 11.17-5.02 11.17-11.2 0-6.19-5-11.2-11.17-11.2-2.03 0-3.94.54-5.58 1.5a11.2 11.2 0 0 0-5.59 9.7v28l5.02 5.03.57.57V26.4c0-3.1 2.5-5.6 5.58-5.6s5.58 2.5 5.58 5.6" />
      <path d="M32 4c-4.07 0-7.88 1.1-11.17 3a22 22 0 0 0-5.58 4.59A22.4 22.4 0 0 0 9.66 26.4v16.8l5.59 5.6V26.4c0-4.97 2.15-9.44 5.58-12.52A16.7 16.7 0 0 1 32 9.6c9.25 0 16.75 7.52 16.75 16.8S41.25 43.2 32 43.2v5.6c12.34 0 22.34-10.03 22.34-22.4S44.34 4 32 4" />
    </>
  ),
  { fill: 'currentColor' },
);
