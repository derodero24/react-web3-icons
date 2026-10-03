import { createIcon } from '../utils';

// Celoscan uses the Celo "C" mark — a square path forming an open C shape.
// viewBox is trimmed to the 180×180 mark area (offset 70,70 in the source 320×320 SVG).
/** Celoscan explorer icon (colored). */
export const Celoscan = /* @__PURE__ */ createIcon(
  'Celoscan',
  '0 0 64 64',
  () => (
    <path d="M60 4H4v56h56V40.45h-9.3c-3.2 7.13-10.4 12.1-18.66 12.1-11.38 0-20.6-9.3-20.6-20.59 0-11.3 9.22-20.5 20.6-20.5 8.41 0 15.62 5.12 18.83 12.4H60z" />
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
      <path d="M250 70H70v180h180v-62.83h-29.87c-10.3 22.92-33.48 38.89-60 38.89-36.57 0-66.19-29.87-66.19-66.19s29.62-65.92 66.19-65.92c27.03 0 50.21 16.48 60.51 39.92H250z" />
    </g>
  ),
  {},
);

/** Celoscan explorer icon (monochrome). */
export const CeloscanMono = /* @__PURE__ */ createIcon(
  'CeloscanMono',
  '0 0 64 64',
  () => (
    <path d="M60 4H4v56h56V40.45h-9.3c-3.2 7.13-10.4 12.1-18.66 12.1-11.38 0-20.6-9.3-20.6-20.59 0-11.3 9.22-20.5 20.6-20.5 8.41 0 15.62 5.12 18.83 12.4H60z" />
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
            d="M250 70H70v180h180v-62.83h-29.87c-10.3 22.92-33.48 38.89-60 38.89-36.57 0-66.19-29.87-66.19-66.19s29.62-65.92 66.19-65.92c27.03 0 50.21 16.48 60.51 39.92H250z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
