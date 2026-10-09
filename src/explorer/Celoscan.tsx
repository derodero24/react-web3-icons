import { createIcon } from '../utils';

// Source: https://celoscan.io/assets/celo/images/svg/logos/chain-light.svg
// Celoscan uses the Celo "C" mark, a square path forming an open C shape
// Default: the official chain-light.svg as is (#FCFF52 tile with the black C), without its no-op clip path; the old default was the C alone in the pre-2023 Celo green #35D07F
// Mono: the tile in currentColor with the C knocked out
// CeloscanSquare / CeloscanSquareMono: aliases of Celoscan / CeloscanMono. The official mark is already the square tile, so the Square variants render it instead of keeping a second copy of the same file
/** Celoscan explorer icon (colored). */
export const Celoscan = /* @__PURE__ */ createIcon(
  'Celoscan',
  '0 0 64 64',
  () => (
    <g transform="scale(.2)">
      <rect width="320" height="320" fill="#FCFF52" />
      <path d="M250 70H70v180h180v-62.83h-29.87c-10.3 22.92-33.48 38.89-60 38.89-36.57 0-66.19-29.87-66.19-66.19s29.62-65.92 66.19-65.92c27.03 0 50.21 16.48 60.51 39.92H250z" />
    </g>
  ),
  {},
);

/** Celoscan explorer icon (monochrome). */
export const CeloscanMono = /* @__PURE__ */ createIcon(
  'CeloscanMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.2)">
      <defs>
        <mask id={`${_id}-celo-m`}>
          <rect width="320" height="320" fill="#fff" />
          <path
            fill="#000"
            d="M250 70H70v180h180v-62.83h-29.87c-10.3 22.92-33.48 38.89-60 38.89-36.57 0-66.19-29.87-66.19-66.19s29.62-65.92 66.19-65.92c27.03 0 50.21 16.48 60.51 39.92H250z"
          />
        </mask>
      </defs>
      <rect width="320" height="320" mask={`url(#${_id}-celo-m)`} />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Celoscan Square explorer icon (colored). */
export const CeloscanSquare = Celoscan;

/** Celoscan Square explorer icon (monochrome). */
export const CeloscanSquareMono = CeloscanMono;
