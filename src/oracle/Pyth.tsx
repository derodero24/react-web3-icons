import { createIcon } from '../utils';

// Source: https://legacy.pyth.network/brand (official brand assets: Pyth Logomark_Dark.svg is #110F23, Dark Purple)
// Paths sourced from @web3icons/react (MIT); colour matches the official dark logomark. The coin subpath re-exports this artwork.
// brandColor: the logomark is near-black Dark Purple, so the manifest uses the palette's accent PURPLE #7142CF (legacy.pyth.network/brand).
/** Pyth oracle icon (colored). */
export const Pyth = /* @__PURE__ */ createIcon(
  'Pyth',
  '0 0 64 64',
  () => (
    <>
      <path d="M36.8 26.4c0 3.09-2.65 4.8-4.8 4.8v6.4a11.2 11.2 0 1 0-11.2-11.2v27.51L27.2 60V26.4c0-2.08 1.71-4.8 4.8-4.8a4.8 4.8 0 0 1 4.8 4.8" />
      <path d="M32 4a22.3 22.3 0 0 0-16.8 7.6 22.3 22.3 0 0 0-5.6 14.8v16.8l6.4 6.15V26.4c0-8.35 6.72-16 16-16s16 7.73 16 16c0 9.28-7.65 16-16 16v6.4A22.4 22.4 0 1 0 32 4" />
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
      <path d="M36.8 26.4c0 3.09-2.65 4.8-4.8 4.8v6.4a11.2 11.2 0 1 0-11.2-11.2v27.51L27.2 60V26.4c0-2.08 1.71-4.8 4.8-4.8a4.8 4.8 0 0 1 4.8 4.8" />
      <path d="M32 4a22.3 22.3 0 0 0-16.8 7.6 22.3 22.3 0 0 0-5.6 14.8v16.8l6.4 6.15V26.4c0-8.35 6.72-16 16-16s16 7.73 16 16c0 9.28-7.65 16-16 16v6.4A22.4 22.4 0 1 0 32 4" />
    </>
  ),
  { fill: 'currentColor' },
);
