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
      <path d="M36.799 26.402c0 3.088-2.653 4.799-4.799 4.799v6.397a11.197 11.197 0 1 0-11.197-11.196v27.512l6.398 6.078v-33.59c0-2.078 1.71-4.796 4.799-4.796a4.8 4.8 0 0 1 4.799 4.799" />
      <path d="M32 4.009a22.27 22.27 0 0 0-16.795 7.582 22.3 22.3 0 0 0-5.598 14.81v16.796l6.397 6.158V26.402c0-8.351 6.718-15.996 15.996-15.996s15.996 7.726 15.996 15.996c0 9.277-7.645 15.995-15.996 15.995v6.398a22.393 22.393 0 1 0 0-44.786" />
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
      <path d="M36.799 26.402c0 3.088-2.653 4.799-4.799 4.799v6.397a11.197 11.197 0 1 0-11.197-11.196v27.512l6.398 6.078v-33.59c0-2.078 1.71-4.796 4.799-4.796a4.8 4.8 0 0 1 4.799 4.799" />
      <path d="M32 4.009a22.27 22.27 0 0 0-16.795 7.582 22.3 22.3 0 0 0-5.598 14.81v16.796l6.397 6.158V26.402c0-8.351 6.718-15.996 15.996-15.996s15.996 7.726 15.996 15.996c0 9.277-7.645 15.995-15.996 15.995v6.398a22.393 22.393 0 1 0 0-44.786" />
    </>
  ),
  { fill: 'currentColor' },
);
