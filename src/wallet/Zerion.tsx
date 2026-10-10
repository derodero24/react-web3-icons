import { createIcon } from '../utils';

// Source: https://design.zerion.io/assets/zerion_symbol_main.87a4f570.svg (official brand guidelines, Symbol .svg pack)
// Source: https://design.zerion.io/assets/zerion_icon-square_main.9c1ae08b.svg (official brand guidelines, Icon .svg pack)
// Source: https://design.zerion.io/assets/zerion_icon-circle_main.7309aeca.svg (official brand guidelines, Icon .svg pack)
// Source: https://design.zerion.io/logo (official brand guidelines, linked as Brand Assets from the zerion.io footer)
// Source: https://design.zerion.io/color (core colour Zerion Digital #2461ED)
// Default: the brand guidelines' Symbol, zerion_symbol_main.svg (the #2461ED Z, Zerion Digital), path unchanged, placed on the 64 grid; its no-op clipPath (the whole 400x400 canvas) is dropped
// Mono: the same Z path in currentColor; the guidelines' Symbol pack shows the same path in single colours (white, #06003C)
// Square and Circle: the guidelines' Icon, zerion_icon-square_main.svg (176 grid, rounded square) and zerion_icon-circle_main.svg (191 grid, disc): one #2461ED evenodd path with the Z knocked out, unchanged, scaled full-bleed to 64; the guidelines recommend the Icon for small sizes and monochrome use
// SquareMono and CircleMono: the same Icon paths in currentColor (the Z stays a hole)
/** Zerion wallet icon (colored). */
export const Zerion = /* @__PURE__ */ createIcon(
  'Zerion',
  '0 0 64 64',
  () => (
    <g>
      <path
        fill="#2461ED"
        d="M16.95 33.97c1.7-2.35 5.16-2.87 7.63-1.55 9.91 5.28 23.8 13.32 33.67 19.4 3.05 1.87 1.85 6.38-1.72 6.38H7.55c-2.84 0-4.31-2.94-3.1-5 4.08-6.96 8.69-14 12.5-19.24M55.86 5.79c2.6 0 4.33 2.9 3.04 5.07-3.12 5.39-7.68 12.25-11.48 17.67-2.05 2.91-5.4 3.42-7.88 2.08-10.24-5.56-22.7-12.74-32.1-18.58-2.78-2-1.37-6.24 1.97-6.24z"
      />
    </g>
  ),
  {},
);

/** Zerion wallet icon (monochrome). */
export const ZerionMono = /* @__PURE__ */ createIcon(
  'ZerionMono',
  '0 0 64 64',
  () => (
    <g>
      <path d="M16.95 33.97c1.7-2.35 5.16-2.87 7.63-1.55 9.91 5.28 23.8 13.32 33.67 19.4 3.05 1.87 1.85 6.38-1.72 6.38H7.55c-2.84 0-4.31-2.94-3.1-5 4.08-6.96 8.69-14 12.5-19.24M55.86 5.79c2.6 0 4.33 2.9 3.04 5.07-3.12 5.39-7.68 12.25-11.48 17.67-2.05 2.91-5.4 3.42-7.88 2.08-10.24-5.56-22.7-12.74-32.1-18.58-2.78-2-1.37-6.24 1.97-6.24z" />
    </g>
  ),
  { fill: 'currentColor' },
);

/** Zerion Circle wallet icon (colored). */
export const ZerionCircle = /* @__PURE__ */ createIcon(
  'ZerionCircle',
  '0 0 64 64',
  () => (
    <g>
      <path
        fill="#2461ED"
        fillRule="evenodd"
        d="M32 0c17.67 0 32 14.33 32 32S49.68 64 32 64 0 49.67 0 32 14.33 0 32 0m-4.2 32.3c-1.4-.74-3.35-.45-4.31.88-2.16 2.96-4.76 6.94-7.07 10.88-.68 1.16.14 2.83 1.75 2.83h27.7c2.01 0 2.7-2.55.98-3.62C41.26 39.84 33.4 35.3 27.8 32.3m-8.58-15.05c-1.9 0-2.69 2.4-1.12 3.53 5.3 3.31 12.36 7.37 18.16 10.5 1.4.76 3.29.48 4.45-1.17 2.15-3.07 4.72-6.94 6.49-9.99.73-1.23-.25-2.86-1.71-2.87z"
      />
    </g>
  ),
  {},
);

/** Zerion Square wallet icon (colored). */
export const ZerionSquare = /* @__PURE__ */ createIcon(
  'ZerionSquare',
  '0 0 64 64',
  () => (
    <g>
      <path
        fill="#2461ED"
        fillRule="evenodd"
        d="M45.9 0C55.9 0 64 8.1 64 18.1v27.8c0 10-8.1 18.1-18.1 18.1H18.1C8.1 64 0 55.9 0 45.9V18.1C0 8.1 8.1 0 18.1 0zM27.46 32.25c-1.52-.81-3.64-.49-4.67.94-2.34 3.22-5.15 7.52-7.65 11.78-.74 1.26.15 3.07 1.9 3.07H47c2.18 0 2.92-2.77 1.05-3.92-6.04-3.72-14.54-8.64-20.6-11.87m-9.3-16.29c-2.04 0-2.9 2.6-1.2 3.82 5.74 3.58 13.37 7.98 19.65 11.37 1.52.82 3.56.51 4.8-1.27 2.34-3.32 5.13-7.51 7.04-10.8.8-1.35-.27-3.12-1.85-3.12z"
      />
    </g>
  ),
  {},
);

/** Zerion Circle wallet icon (monochrome). */
export const ZerionCircleMono = /* @__PURE__ */ createIcon(
  'ZerionCircleMono',
  '0 0 64 64',
  () => (
    <g>
      <path
        fillRule="evenodd"
        d="M32 0c17.67 0 32 14.33 32 32S49.68 64 32 64 0 49.67 0 32 14.33 0 32 0m-4.2 32.3c-1.4-.74-3.35-.45-4.31.88-2.16 2.96-4.76 6.94-7.07 10.88-.68 1.16.14 2.83 1.75 2.83h27.7c2.01 0 2.7-2.55.98-3.62C41.26 39.84 33.4 35.3 27.8 32.3m-8.58-15.05c-1.9 0-2.69 2.4-1.12 3.53 5.3 3.31 12.36 7.37 18.16 10.5 1.4.76 3.29.48 4.45-1.17 2.15-3.07 4.72-6.94 6.49-9.99.73-1.23-.25-2.86-1.71-2.87z"
      />
    </g>
  ),
  { fill: 'currentColor' },
);

/** Zerion Square wallet icon (monochrome). */
export const ZerionSquareMono = /* @__PURE__ */ createIcon(
  'ZerionSquareMono',
  '0 0 64 64',
  () => (
    <g>
      <path
        fillRule="evenodd"
        d="M45.9 0C55.9 0 64 8.1 64 18.1v27.8c0 10-8.1 18.1-18.1 18.1H18.1C8.1 64 0 55.9 0 45.9V18.1C0 8.1 8.1 0 18.1 0zM27.46 32.25c-1.52-.81-3.64-.49-4.67.94-2.34 3.22-5.15 7.52-7.65 11.78-.74 1.26.15 3.07 1.9 3.07H47c2.18 0 2.92-2.77 1.05-3.92-6.04-3.72-14.54-8.64-20.6-11.87m-9.3-16.29c-2.04 0-2.9 2.6-1.2 3.82 5.74 3.58 13.37 7.98 19.65 11.37 1.52.82 3.56.51 4.8-1.27 2.34-3.32 5.13-7.51 7.04-10.8.8-1.35-.27-3.12-1.85-3.12z"
      />
    </g>
  ),
  { fill: 'currentColor' },
);
