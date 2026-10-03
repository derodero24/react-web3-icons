import { createIcon } from '../utils';

// Celoscan uses the Celo "C" mark — a square path forming an open C shape.
// viewBox is trimmed to the 180×180 mark area (offset 70,70 in the source 320×320 SVG).
/** Celoscan explorer icon (colored). */
export const Celoscan = /* @__PURE__ */ createIcon(
  'Celoscan',
  '0 0 64 64',
  () => (
    <path d="M60 4H4v56h55.998V40.452h-9.293C47.502 47.583 40.291 52.55 32.04 52.55c-11.377 0-20.59-9.292-20.59-20.59s9.213-20.51 20.59-20.51c8.41 0 15.622 5.129 18.827 12.419H60z" />
  ),
  { fill: '#35D07F' },
);

/** Celoscan Square explorer icon (colored). */
export const CeloscanSquare = /* @__PURE__ */ createIcon(
  'CeloscanSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.2)">
      <rect width="320" height="320" fill="#FCFF52" />
      <path d="M250 70H70v180h179.995v-62.831h-29.87c-10.297 22.921-33.476 38.886-60 38.886-36.568 0-66.18-29.867-66.18-66.182s29.612-65.923 66.18-65.923c27.036 0 50.215 16.482 60.516 39.915H250z" />
    </g>
  ),
  {},
);

/** Celoscan explorer icon (monochrome). */
export const CeloscanMono = /* @__PURE__ */ createIcon(
  'CeloscanMono',
  '0 0 64 64',
  () => (
    <path d="M60 4H4v56h55.998V40.452h-9.293C47.502 47.583 40.291 52.55 32.04 52.55c-11.377 0-20.59-9.292-20.59-20.59s9.213-20.51 20.59-20.51c8.41 0 15.622 5.129 18.827 12.419H60z" />
  ),
  { fill: 'currentColor' },
);

/** Celoscan Square explorer icon (monochrome). */
export const CeloscanSquareMono = /* @__PURE__ */ createIcon(
  'CeloscanSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.2)">
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
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
