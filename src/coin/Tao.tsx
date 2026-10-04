import { createIcon } from '../utils';

// Source: https://github.com/opentensor/developer-docs/blob/f6dd8e948952a7bb7ceab6f67d07d7c6d992e995/static/bittensor-media-assets/Bittensor-mediaassets-2024Dec02.zip (official Bittensor media assets of the Opentensor Foundation, the kit the Bittensor docs' Media Assets page linked)
// Colored: the kit's TAO symbol, Bittensor community assets/Symbol/Black/RGB/Bittensor_symbol_black_AF_RGB.svg, its two paths unchanged (black, the kit's only colours are black, white and greys), placed on the 64 grid; the kit has no token disc
// Mono: the same two paths in currentColor
/** Tao coin icon (colored). */
export const Tao = /* @__PURE__ */ createIcon(
  'Tao',
  '0 0 64 64',
  () => (
    <>
      <path d="M37.55 46.97V24c0-5.73-4.73-10.4-10.47-10.4v36.68c0 7.3 6.2 9.71 10.02 9.71 3.17 0 4.96-.55 7.11-2.06-6.03-.64-6.66-4.28-6.66-10.97" />
      <path d="M15.42 4c-5.27 0-9.55 4.35-9.55 9.62h42.71c5.27 0 9.55-4.36 9.55-9.62z" />
    </>
  ),
  {},
);

/** Tao coin icon (monochrome). */
export const TaoMono = /* @__PURE__ */ createIcon(
  'TaoMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M37.55 46.97V24c0-5.73-4.73-10.4-10.47-10.4v36.68c0 7.3 6.2 9.71 10.02 9.71 3.17 0 4.96-.55 7.11-2.06-6.03-.64-6.66-4.28-6.66-10.97" />
      <path d="M15.42 4c-5.27 0-9.55 4.35-9.55 9.62h42.71c5.27 0 9.55-4.36 9.55-9.62z" />
    </>
  ),
  { fill: 'currentColor' },
);
