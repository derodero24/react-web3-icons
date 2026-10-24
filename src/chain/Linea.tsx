import { createIcon } from '../utils';

// Source: https://linea.build/assets (official brand assets page, accessed 2026-10-24: "Download brand kit")
// Source: https://assets.ctfassets.net/64upluvbiuck/46y5rC2mj5Ocekur7vMSdP/c972526b87afa927a2e0bf2f506e8f75/Linea-Brand-Assets.zip (Linea-Brand-Assets.zip: Logo/SVG/Logomark Black.svg, Token/Linea-Token_Square.svg, Token/Linea-Token_Round.svg)
// Default: the official Logomark Black.svg (the L and dot in #121212), paths unchanged; its clip path only bounds the mark and is dropped. The kit also ships the logomark in white and on white, #61DFFF and #FFF068 backgrounds, so the base is the standalone mark (base icon background rule) and replaces the retired black tile with a white L, for which the kit has no file
// Mono: the logomark's two paths in currentColor
// Square: the official Linea-Token_Square.svg (the #190066 L and dot on a full-bleed #61DFFF square), paths unchanged; the #121212 rect it paints under the full-size #61DFFF square never shows and is dropped, together with the clip path that only bounds the square
// Circle: the official Linea-Token_Round.svg, the same artwork clipped to a disc (a #121212 disc under a #61DFFF square clipped to the same disc); written as the #61DFFF disc with the mark
// SquareMono and CircleMono: the token's square or disc in currentColor with the mark knocked out (fill-rule=evenodd)
// brandColor: #61DFFF, the colour of the official token (the logomark itself is the neutral #121212)
/** Linea chain icon (colored). */
export const Linea = /* @__PURE__ */ createIcon(
  'Linea',
  '0 0 64 64',
  () => (
    <>
      <path d="M49.7 60H5.2V13.1h10.18v37.8H49.7z" />
      <path d="M49.7 22.18c5.02 0 9.09-4.07 9.09-9.09S54.73 4 49.7 4s-9.08 4.09-9.08 9.1 4.07 9.1 9.08 9.1" />
    </>
  ),
  { fill: '#121212' },
);

/** Linea chain icon (monochrome). */
export const LineaMono = /* @__PURE__ */ createIcon(
  'LineaMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M49.7 60H5.2V13.1h10.18v37.8H49.7z" />
      <path d="M49.7 22.18c5.02 0 9.09-4.07 9.09-9.09S54.73 4 49.7 4s-9.08 4.09-9.08 9.1 4.07 9.1 9.08 9.1" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Linea Circle chain icon (colored). */
export const LineaCircle = /* @__PURE__ */ createIcon(
  'LineaCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.05926)">
      <circle cx="540" cy="540" r="540" />
      <path
        fill="#190066"
        d="M745.14 756.43H335.36V321.9h93.76v350.32h316.02z"
      />
      <path
        fill="#190066"
        d="M745.14 406.07c46.19 0 83.63-37.69 83.63-84.17s-37.44-84.17-83.63-84.17c-46.2 0-83.64 37.69-83.64 84.17s37.45 84.17 83.64 84.17"
      />
    </g>
  ),
  { fill: '#61DFFF' },
);

/** Linea Circle chain icon (monochrome). */
export const LineaCircleMono = /* @__PURE__ */ createIcon(
  'LineaCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64m12.16 44.83H19.87V19.08h5.56v20.76h18.73zm0-20.77c2.73 0 4.95-2.23 4.95-4.98s-2.22-5-4.95-5c-2.74 0-4.96 2.24-4.96 5s2.22 4.98 4.96 4.98"
    />
  ),
  { fill: 'currentColor' },
);

/** Linea Square chain icon (colored). */
export const LineaSquare = /* @__PURE__ */ createIcon(
  'LineaSquare',
  '0 0 64 64',
  () => (
    <>
      <path d="M64 0H0v64h64z" />
      <path fill="#190066" d="M44.16 44.83H19.87V19.08h5.56v20.76h18.73z" />
      <path
        fill="#190066"
        d="M44.16 24.06c2.73 0 4.95-2.23 4.95-4.98s-2.22-5-4.95-5c-2.74 0-4.96 2.24-4.96 5s2.22 4.98 4.96 4.98"
      />
    </>
  ),
  { fill: '#61DFFF' },
);

/** Linea Square chain icon (monochrome). */
export const LineaSquareMono = /* @__PURE__ */ createIcon(
  'LineaSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M64 0H0v64h64zM44.16 44.83H19.87V19.08h5.56v20.76h18.73zm0-20.77c2.73 0 4.95-2.23 4.95-4.98s-2.22-5-4.95-5c-2.74 0-4.96 2.24-4.96 5s2.22 4.98 4.96 4.98"
    />
  ),
  { fill: 'currentColor' },
);
