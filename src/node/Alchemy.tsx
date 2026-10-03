import { createIcon } from '../utils';

// Source: https://media.alchemy.com/1702567897-alchemy-brand-assets.zip (official brand assets from https://www.alchemy.com/brand: Mark/Blue-gradient/alchemy-mark-blue-gradient.svg)
// Default: the brand kit's blue-gradient mark (#05D5FF -> #5533FF -> #363FF9), the colored mark the kit still ships; the site's logo lockup (https://media.alchemy.com/1701819587-logo.svg) shows the same mark in solid #363FF9
// Mono: the mark in currentColor (the kit's mark-onecolor-neutral-alchemy.svg)
/** Alchemy node icon (colored). */
export const Alchemy = /* @__PURE__ */ createIcon(
  'Alchemy',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 8.08)scale(.05556)">
      <path
        fill={`url(#${_id}-alc-a)`}
        d="M838.58 551.2 519.6 8.88a17.7 17.7 0 0 0-6.48-6.47 18.1 18.1 0 0 0-17.86-.11 17.7 17.7 0 0 0-6.56 6.38l-95.53 162.5c-3.13 5.32-4.78 11.36-4.78 17.5s1.65 12.18 4.78 17.5l207.99 353.79c3.13 5.32 7.64 9.74 13.06 12.82s11.58 4.68 17.84 4.68h191.06c3.13-.01 6.2-.83 8.9-2.37s4.96-3.75 6.53-6.4 2.39-5.68 2.4-8.75a17.3 17.3 0 0 0-2.37-8.75"
      />
      <path
        fill={`url(#${_id}-alc-a)`}
        d="M2.46 834.64 321.43 292.3c1.57-2.65 3.82-4.86 6.53-6.4s5.78-2.33 8.9-2.33 6.2.8 8.9 2.34 4.96 3.74 6.53 6.4l95.58 162.35c3.13 5.33 4.77 11.37 4.77 17.52s-1.64 12.2-4.77 17.52l-208 353.8c-3.11 5.32-7.6 9.74-13.03 12.81s-11.56 4.69-17.82 4.68H17.92a18 18 0 0 1-8.98-2.33c-2.73-1.54-5-3.76-6.56-6.44a17 17 0 0 1-2.38-8.8c.02-3.1.86-6.13 2.46-8.8"
      />
      <path
        fill={`url(#${_id}-alc-a)`}
        d="M352.25 860.88h637.94c3.13 0 6.2-.81 8.92-2.35s4.95-3.75 6.51-6.41 2.38-5.69 2.38-8.76-.83-6.09-2.4-8.74l-95.43-162.46c-3.13-5.32-7.64-9.74-13.06-12.81s-11.58-4.69-17.85-4.68H463.28c-6.27-.01-12.42 1.6-17.85 4.68s-9.93 7.49-13.06 12.81l-95.53 162.46a17 17 0 0 0-2.4 8.74 17 17 0 0 0 2.38 8.76 17.7 17.7 0 0 0 6.51 6.41 18 18 0 0 0 8.92 2.35"
      />
      <defs>
        <linearGradient
          id={`${_id}-alc-a`}
          x1="504"
          x2="415.04"
          y1="64"
          y2="861.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#05d5ff" />
          <stop offset=".72" stopColor="#363ff9" />
          <stop offset="1" stopColor="#53f" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Alchemy node icon (monochrome). */
export const AlchemyMono = /* @__PURE__ */ createIcon(
  'AlchemyMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M50.59 38.7 32.87 8.59a1 1 0 0 0-.36-.36 1 1 0 0 0-1 0 1 1 0 0 0-.36.35l-5.3 9.02a1.9 1.9 0 0 0 0 1.95L37.4 39.19q.26.45.72.71c.46.26.65.26 1 .26h10.6q.27 0 .5-.13c.23-.13.28-.2.37-.35s.13-.32.13-.49a1 1 0 0 0-.13-.48" />
      <path d="m4.14 54.45 17.72-30.13q.12-.22.36-.35c.24-.13.32-.13.5-.13s.34.04.49.13.27.2.36.35l5.31 9.02a1.9 1.9 0 0 1 0 1.95L17.33 54.94q-.27.46-.73.72c-.46.26-.64.26-.99.26H5a1 1 0 0 1-.5-.13 1 1 0 0 1-.37-.36 1 1 0 0 1-.13-.49q0-.26.14-.49" />
      <path d="M23.57 55.91H59q.27 0 .5-.13c.23-.13.27-.2.36-.36a1 1 0 0 0 0-.97l-5.3-9.02q-.27-.46-.73-.72c-.46-.26-.64-.26-1-.26h-23.1q-.54.01-1 .26c-.45.25-.55.42-.72.72l-5.3 9.02a1 1 0 0 0-.14.49 1 1 0 0 0 .13.48 1 1 0 0 0 .36.36 1 1 0 0 0 .5.13" />
    </>
  ),
  { fill: 'currentColor' },
);
