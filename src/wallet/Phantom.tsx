import { createIcon } from '../utils';

// Source: https://sanity-proxy-v2.phantom.app/files/3nm6d03a/production/5e73f0ad2d621b5ed6ca3c66aad2b70686f8a00e.zip (official Phantom press kit, Nov 2024: Phantom Logomark/Phantom-Icon-Purple.svg, Phantom-Icon-Black.svg, Phantom App Icon/phantom-app-icon-drkprpl.svg)
// Source: https://phantom.com/_web_platform_assets/favicon.svg
// Default: the press kit's Phantom-Icon-Purple.svg ghost (#AB9FF2, the colour phantom.com's favicon.svg uses), placed on the 64 grid
// Mono: the press kit's single-colour Phantom-Icon-Black.svg ghost in currentColor (the eyes are holes)
// Square: the press kit's phantom-app-icon-drkprpl.svg (rounded square #9886E5, rx 74.39 of 309, with the #FFFDF8 ghost), scaled 64/309
// Circle: no official circular asset; plain container composition of the app icon: the same #9886E5 background as a circle r=32 with the app icon's #FFFDF8 ghost at the same scale and position
// CircleMono / SquareMono: the container in currentColor with the app icon's ghost knocked out by a mask (the eyes stay ink, as in the app icon)
// PhantomSymbolMono: deprecated alias of PhantomMono. Since the default became the standalone ghost, SymbolMono rendered the same artwork as Mono
/** Phantom wallet icon (colored). */
export const Phantom = /* @__PURE__ */ createIcon(
  'Phantom',
  '0 0 64 64',
  () => (
    <path
      fill="#AB9FF2"
      d="M10.63 55.31c7.14 0 12.51-6.21 15.71-11.12q-.6 1.64-.6 3.21c0 2.87 1.64 4.91 4.9 4.91 4.45 0 9.21-3.9 11.68-8.12q-.26.9-.26 1.7c0 2 1.13 3.25 3.42 3.25C52.72 49.14 60 36.32 60 25.11c0-8.73-4.42-16.42-15.5-16.42C25 8.69 4 32.5 4 47.89c0 6.03 3.25 7.42 6.63 7.42m27.15-31.15c0-2.18 1.2-3.7 2.98-3.7 1.74 0 2.95 1.52 2.95 3.7 0 2.17-1.21 3.73-2.95 3.73-1.77 0-2.98-1.56-2.98-3.73m9.26 0c0-2.18 1.22-3.7 3-3.7 1.72 0 2.94 1.52 2.94 3.7 0 2.17-1.22 3.73-2.95 3.73-1.77 0-2.99-1.56-2.99-3.73"
    />
  ),
  {},
);

/** Phantom wallet icon (monochrome). */
export const PhantomMono = /* @__PURE__ */ createIcon(
  'PhantomMono',
  '0 0 64 64',
  () => (
    <path d="M10.63 55.31c7.14 0 12.51-6.21 15.71-11.12q-.6 1.64-.6 3.21c0 2.87 1.64 4.91 4.9 4.91 4.45 0 9.21-3.9 11.68-8.12q-.26.9-.26 1.7c0 2 1.13 3.25 3.42 3.25C52.72 49.14 60 36.32 60 25.11c0-8.73-4.42-16.42-15.5-16.42C25 8.69 4 32.5 4 47.89c0 6.03 3.25 7.42 6.63 7.42m27.15-31.15c0-2.18 1.2-3.7 2.98-3.7 1.74 0 2.95 1.52 2.95 3.7 0 2.17-1.21 3.73-2.95 3.73-1.77 0-2.98-1.56-2.98-3.73m9.26 0c0-2.18 1.22-3.7 3-3.7 1.72 0 2.94 1.52 2.94 3.7 0 2.17-1.22 3.73-2.95 3.73-1.77 0-2.99-1.56-2.99-3.73" />
  ),
  { fill: 'currentColor' },
);

/** Phantom Circle wallet icon (colored). */
export const PhantomCircle = /* @__PURE__ */ createIcon(
  'PhantomCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.20712)">
      <circle cx="154.5" cy="154.5" r="154.5" fill="#9886E5" />
      <path
        fill="#FFFDF8"
        fillRule="evenodd"
        d="M133.12 200.08c-12.94 19.82-34.61 44.9-63.46 44.9-13.63 0-26.74-5.61-26.74-30 0-62.09 84.78-158.22 163.44-158.22 44.75 0 62.58 31.05 62.58 66.31 0 45.26-29.36 97-58.56 97-9.26 0-13.8-5.08-13.8-13.15q0-3.16 1.04-6.84c-9.96 17.01-29.2 32.8-47.2 32.8-13.1 0-19.75-8.25-19.75-19.82 0-4.21.87-8.6 2.45-12.98m67.76-78.24c0 10.28-6.06 15.42-12.85 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.85 5.14 12.85 15.41m38.52 0c0 10.28-6.06 15.42-12.84 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.84 5.14 12.84 15.41"
        clipRule="evenodd"
      />
    </g>
  ),
  {},
);

/** Phantom Circle wallet icon (monochrome). */
export const PhantomCircleMono = /* @__PURE__ */ createIcon(
  'PhantomCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.20712)">
      <circle cx="154.5" cy="154.5" r="154.5" mask={`url(#${_id}-phcm-a)`} />
      <defs>
        <mask id={`${_id}-phcm-a`}>
          <rect width="309" height="309" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M133.12 200.08c-12.94 19.82-34.61 44.9-63.46 44.9-13.63 0-26.74-5.61-26.74-30 0-62.09 84.78-158.22 163.44-158.22 44.75 0 62.58 31.05 62.58 66.31 0 45.26-29.36 97-58.56 97-9.26 0-13.8-5.08-13.8-13.15q0-3.16 1.04-6.84c-9.96 17.01-29.2 32.8-47.2 32.8-13.1 0-19.75-8.25-19.75-19.82 0-4.21.87-8.6 2.45-12.98m67.76-78.24c0 10.28-6.06 15.42-12.85 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.85 5.14 12.85 15.41m38.52 0c0 10.28-6.06 15.42-12.84 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.84 5.14 12.84 15.41"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Phantom Square wallet icon (colored). */
export const PhantomSquare = /* @__PURE__ */ createIcon(
  'PhantomSquare',
  '0 0 64 64',
  () => (
    <g transform="scale(.20712)">
      <rect width="309" height="309" fill="#9886E5" rx="74.39" />
      <path
        fill="#FFFDF8"
        fillRule="evenodd"
        d="M133.12 200.08c-12.94 19.82-34.61 44.9-63.46 44.9-13.63 0-26.74-5.61-26.74-30 0-62.09 84.78-158.22 163.44-158.22 44.75 0 62.58 31.05 62.58 66.31 0 45.26-29.36 97-58.56 97-9.26 0-13.8-5.08-13.8-13.15q0-3.16 1.04-6.84c-9.96 17.01-29.2 32.8-47.2 32.8-13.1 0-19.75-8.25-19.75-19.82 0-4.21.87-8.6 2.45-12.98m67.76-78.24c0 10.28-6.06 15.42-12.85 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.85 5.14 12.85 15.41m38.52 0c0 10.28-6.06 15.42-12.84 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.84 5.14 12.84 15.41"
        clipRule="evenodd"
      />
    </g>
  ),
  {},
);

/** Phantom Square wallet icon (monochrome). */
export const PhantomSquareMono = /* @__PURE__ */ createIcon(
  'PhantomSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.20712)">
      <rect width="309" height="309" mask={`url(#${_id}-phsqm-a)`} rx="74.39" />
      <defs>
        <mask id={`${_id}-phsqm-a`}>
          <rect width="309" height="309" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M133.12 200.08c-12.94 19.82-34.61 44.9-63.46 44.9-13.63 0-26.74-5.61-26.74-30 0-62.09 84.78-158.22 163.44-158.22 44.75 0 62.58 31.05 62.58 66.31 0 45.26-29.36 97-58.56 97-9.26 0-13.8-5.08-13.8-13.15q0-3.16 1.04-6.84c-9.96 17.01-29.2 32.8-47.2 32.8-13.1 0-19.75-8.25-19.75-19.82 0-4.21.87-8.6 2.45-12.98m67.76-78.24c0 10.28-6.06 15.42-12.85 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.85 5.14 12.85 15.41m38.52 0c0 10.28-6.06 15.42-12.84 15.42-6.88 0-12.84-5.14-12.84-15.41s5.96-15.42 12.84-15.42c6.78 0 12.84 5.14 12.84 15.41"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** @deprecated Phantom's default is the standalone ghost, so SymbolMono is the same artwork as Mono — use `PhantomMono` instead. */
export const PhantomSymbolMono = PhantomMono;
