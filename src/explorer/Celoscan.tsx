import { createIcon } from '../utils';

// Celoscan uses the Celo "C" mark — a square path forming an open C shape.
// viewBox is trimmed to the 180×180 mark area (offset 70,70 in the source 320×320 SVG).
/** Celoscan explorer icon (colored). */
export const Celoscan = /* @__PURE__ */ createIcon(
  'Celoscan',
  '70 70 180 180',
  () => (
    <path d="M250 70H70v180h179.995v-62.831h-29.87c-10.297 22.921-33.476 38.886-60 38.886-36.568 0-66.18-29.867-66.18-66.182s29.612-65.923 66.18-65.923c27.036 0 50.215 16.482 60.516 39.915H250z" />
  ),
  { fill: '#35D07F' },
);

/** Celoscan Square explorer icon (colored). */
export const CeloscanSquare = /* @__PURE__ */ createIcon(
  'CeloscanSquare',
  '0 0 320 320',
  () => (
    <>
      <rect width="320" height="320" fill="#FCFF52" />
      <path d="M250 70H70v180h179.995v-62.831h-29.87c-10.297 22.921-33.476 38.886-60 38.886-36.568 0-66.18-29.867-66.18-66.182s29.612-65.923 66.18-65.923c27.036 0 50.215 16.482 60.516 39.915H250z" />
    </>
  ),
  {},
);

/** Celoscan explorer icon (monochrome). */
export const CeloscanMono = /* @__PURE__ */ createIcon(
  'CeloscanMono',
  '70 70 180 180',
  () => (
    <path d="M250 70H70v180h179.995v-62.831h-29.87c-10.297 22.921-33.476 38.886-60 38.886-36.568 0-66.18-29.867-66.18-66.182s29.612-65.923 66.18-65.923c27.036 0 50.215 16.482 60.516 39.915H250z" />
  ),
  { fill: 'currentColor' },
);

/** Celoscan Square explorer icon (monochrome). */
export const CeloscanSquareMono = /* @__PURE__ */ createIcon(
  'CeloscanSquareMono',
  '0 0 320 320',
  (_props, _id) => (
    <>
      <rect width="320" height="320" mask={`url(#${_id}-celo-a)`} />
      <defs>
        <mask id={`${_id}-celo-a`}>
          <rect width="320" height="320" fill="#fff" />
          <path
            fill="#000"
            d="M250 70H70v180h179.995v-62.831h-29.87c-10.297 22.921-33.476 38.886-60 38.886-36.568 0-66.18-29.867-66.18-66.182s29.612-65.923 66.18-65.923c27.036 0 50.215 16.482 60.516 39.915H250z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
