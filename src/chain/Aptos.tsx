import { createIcon } from '../utils';

// Source: https://aptosnetwork.com/media-kit (official media kit, accessed 2026-10-03)
// Source: https://drive.google.com/drive/folders/16eFSRTkuPZckYNuu-lofz03IcLRW9_-1 (the media kit's logo download: Aptos Symbol/RGB [Digital]/SVG/Aptos-Network-Symbol-Black-RGB.svg)
// Default: the official Aptos Network symbol, Aptos-Network-Symbol-Black-RGB.svg from the media kit (five shapes in #0F0E0B with sharp diagonal cuts), paths unchanged. It replaces the earlier Aptos mark with rounded notches, which the current kit no longer ships
// Mono: the same five paths in currentColor (the kit's white symbol is this geometry in #F9F9F0); the shapes do not touch, so no seams are needed
/** Aptos chain icon (colored). */
export const Aptos = /* @__PURE__ */ createIcon(
  'Aptos',
  '0 0 64 64',
  () => (
    <>
      <path fill="#0F0E0B" d="M6.73 20q-1.78 3.73-2.41 7.98H27.8L32.94 20z" />
      <path
        fill="#0F0E0B"
        d="M59.68 27.98c-.4-2.82-1.23-5.5-2.4-7.99h-14.1L38.07 12h13.5A28 28 0 0 0 32 4.01a27.8 27.8 0 0 0-19.57 8h25.64l-5.13 7.98 5.13 8z"
      />
      <path
        fill="#0F0E0B"
        d="m17.55 43.97-5.13 7.99c5.05 4.94 11.94 8.03 19.56 8.03s14.63-2.93 19.7-8.03h-29z"
      />
      <path fill="#0F0E0B" d="M22.68 35.97H4.32a28 28 0 0 0 2.4 8h10.83z" />
      <path
        fill="#0F0E0B"
        d="M27.8 43.97h29.47q1.78-3.75 2.41-8H32.94L27.8 28l-5.13 7.99"
      />
    </>
  ),
  {},
);

/** Aptos chain icon (monochrome). */
export const AptosMono = /* @__PURE__ */ createIcon(
  'AptosMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M6.73 20q-1.78 3.73-2.41 7.98H27.8L32.94 20z" />
      <path d="M59.68 27.98c-.4-2.82-1.23-5.5-2.4-7.99h-14.1L38.07 12h13.5A28 28 0 0 0 32 4.01a27.8 27.8 0 0 0-19.57 8h25.64l-5.13 7.98 5.13 8z" />
      <path d="m17.55 43.97-5.13 7.99c5.05 4.94 11.94 8.03 19.56 8.03s14.63-2.93 19.7-8.03h-29z" />
      <path d="M22.68 35.97H4.32a28 28 0 0 0 2.4 8h10.83z" />
      <path d="M27.8 43.97h29.47q1.78-3.75 2.41-8H32.94L27.8 28l-5.13 7.99" />
    </>
  ),
  { fill: 'currentColor' },
);
