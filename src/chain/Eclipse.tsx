import { createIcon } from '../utils';

// Source: https://drive.google.com/drive/folders/1fp98NVnYkGQSD0FNXPOMK7TABdFtsdbm (official brand kit linked from the eclipse.xyz footer: Eclipse_logo_logo_black.svg, Eclipse Brand Guidelines.pdf)
// Default: the kit's standalone symbol for light backgrounds, Eclipse_logo_logo_black.svg (#000), paths unchanged and placed on the 64 grid. The Brand Guidelines' logo suite (2.3) shows the symbol in black on white and in Eclipse Aurora green or white on black, always without a tile, and list 'put shapes around the wordmark' among the misuses; the kit ships the symbol in black, green (#A1FEA0) and white only. It replaces the eclipse.xyz webclip.svg (the black E on a #A1FEA0 tile), which is a site app icon, not the brand's symbol
// brandColor: the symbol is black, so the manifest uses Eclipse Aurora #A1FEA0, which the Brand Guidelines (5.2) name the primary brand colour
// Mono: the same symbol paths in currentColor (the kit also ships them in white)
/** Eclipse chain icon (colored). */
export const Eclipse = /* @__PURE__ */ createIcon(
  'Eclipse',
  '0 0 64 64',
  () => (
    <>
      <path d="M19.03 51.32c-5.18 0-8.33-4.2-7.04-9.37l4.96-19.9c1.3-5.17 6.54-9.37 11.71-9.37h27.05c-3.8-4.91-9.89-7.94-17.4-7.94C23.25 4.74 8.22 16.94 4.74 32s5.89 27.26 20.95 27.26c7.5 0 15-3.03 21.07-7.94z" />
      <path d="M32.52 20.34c-1.3 0-2.6 1.05-2.92 2.34l-1.37 5.49h21.06l-1.9 7.66H26.31l-1.37 5.49c-.32 1.3.46 2.34 1.76 2.34h27.24c2.5-3.53 4.35-7.49 5.32-11.66.96-4.17.94-8.13.08-11.66z" />
    </>
  ),
  { fill: '#000' },
);

/** Eclipse chain icon (monochrome). */
export const EclipseMono = /* @__PURE__ */ createIcon(
  'EclipseMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M19.03 51.32c-5.18 0-8.33-4.2-7.04-9.37l4.96-19.9c1.3-5.17 6.54-9.37 11.71-9.37h27.05c-3.8-4.91-9.89-7.94-17.4-7.94C23.25 4.74 8.22 16.94 4.74 32s5.89 27.26 20.95 27.26c7.5 0 15-3.03 21.07-7.94z" />
      <path d="M32.52 20.34c-1.3 0-2.6 1.05-2.92 2.34l-1.37 5.49h21.06l-1.9 7.66H26.31l-1.37 5.49c-.32 1.3.46 2.34 1.76 2.34h27.24c2.5-3.53 4.35-7.49 5.32-11.66.96-4.17.94-8.13.08-11.66z" />
    </>
  ),
  { fill: 'currentColor' },
);
