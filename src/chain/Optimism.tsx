import { createIcon } from '../utils';

// Source: https://optimism.io/brand (official brand assets, accessed 2026-10-03)
// Source: https://optimism.io/files/5a7eaedf4e0c96529342e556b52cb05da12d9f23.zip (Optimism - Brand Kit.zip: OP Mainnet/SVG/OP_mainnet.svg)
// Source: https://cdn.sanity.io/images/y6ka751a/production/0619395edc911805bcea3268156418134c1c5b32-2500x1875.svg (the brand page's OP Mainnet symbol card)
// Default: the official OP Mainnet symbol, OP_mainnet.svg from the brand kit (the same file as the brand page's "OP Mainnet" download): a full-bleed #FF0421 (Optimism Red) square with the glyph in #FAFAF9, paths unchanged and scaled 1024 -> 64. It replaces a #FF0420 disc with a white glyph, a shape and colours the current kit does not ship
// Square: the OP Mainnet symbol as the brand page draws it on its symbol card, the same glyph on a #FF0421 square with rounded corners (rx 80 on 817, 6.27 on the 64 grid), cropped to the tile; paths unchanged
// Circle: no official circular OP Mainnet asset exists (the kit's round Token.svg is the OP token mark, the letters OP, not this glyph); a repo-convention #FF0421 disc holding the official glyph in #FAFAF9 at the symbol's own scale (the glyph lies within 28.25 units of the centre, so it fits the r=32 disc)
// Mono, CircleMono and SquareMono: each variant's container in currentColor with the glyph knocked out as one evenodd path; the centre sparkle, a hole in the glyph, stays ink as the red shows through it in the colour artwork
// The OP token logo (the letters OP in #FAFAF9 on a #FF0421 disc, kit Token/SVG/Token.svg) and the Optimism avatar (Avatar/SVG/Avatar.svg, the same letters on a square) are separate marks the brand page reserves for the token and for avatars; they are not used here. The Op coin unit re-exports these Optimism variants
/** Optimism chain icon (colored). */
export const Optimism = /* @__PURE__ */ createIcon(
  'Optimism',
  '0 0 64 64',
  () => (
    <g transform="scale(.0625)">
      <rect width="1024" height="1024" fill="#FF0421" />
      <path
        fill="#FAFAF9"
        d="M512.34 60c196.77 0 356.33 159.56 356.33 356.34S709.11 772.68 512.34 772.68v191.3C315.56 963.97 156 804.4 156 607.63s159.56-356.34 356.34-356.34zm-1.65 275.7q-58.07 116.56-174.65 174.63v3.3q116.58 58.08 174.65 174.65h3.3q58.06-116.58 174.64-174.64v-3.3q-116.58-58.07-174.64-174.65z"
      />
    </g>
  ),
  {},
);

/** Optimism chain icon (monochrome). */
export const OptimismMono = /* @__PURE__ */ createIcon(
  'OptimismMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0Zm32.02 3.75c12.3 0 22.27 9.97 22.27 22.27S44.32 48.3 32.02 48.3v11.96c-12.3 0-22.27-9.97-22.27-22.27S19.72 15.7 32.02 15.7zm-.1 17.23Q28.29 28.27 21 31.9v.2q7.29 3.63 10.92 10.92h.2q3.63-7.29 10.92-10.92v-.2q-7.29-3.63-10.92-10.92z"
    />
  ),
  { fill: 'currentColor' },
);

/** Optimism Circle chain icon (colored). */
export const OptimismCircle = /* @__PURE__ */ createIcon(
  'OptimismCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.0625)">
      <circle cx="512" cy="512" r="512" fill="#FF0421" />
      <path
        fill="#FAFAF9"
        d="M512.34 60c196.77 0 356.33 159.56 356.33 356.34S709.11 772.68 512.34 772.68v191.3C315.56 963.97 156 804.4 156 607.63s159.56-356.34 356.34-356.34zm-1.65 275.7q-58.07 116.56-174.65 174.63v3.3q116.58 58.08 174.65 174.65h3.3q58.06-116.58 174.64-174.64v-3.3q-116.58-58.07-174.64-174.65z"
      />
    </g>
  ),
  {},
);

/** Optimism Square chain icon (colored). */
export const OptimismSquare = /* @__PURE__ */ createIcon(
  'OptimismSquare',
  '0 0 64 64',
  () => (
    <g transform="translate(-65.88 -41.44)scale(.07834)">
      <rect width="817" height="817" x="841" y="529" fill="#FF0421" rx="80" />
      <path
        fill="#FAFAF9"
        d="M1249.77 576.87c156.99 0 284.3 127.31 284.3 284.3s-127.31 284.31-284.3 284.31v152.63c-157 0-284.3-127.31-284.3-284.31s127.3-284.3 284.3-284.3zm-1.32 219.96q-46.32 93.02-139.34 139.34v2.64q93.02 46.33 139.34 139.33h2.64q46.33-93 139.33-139.33v-2.64q-93-46.32-139.33-139.34z"
      />
    </g>
  ),
  {},
);

/** Optimism Square chain icon (monochrome). */
export const OptimismSquareMono = /* @__PURE__ */ createIcon(
  'OptimismSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M6.27 0h51.46A6.27 6.27 0 0 1 64 6.27v51.46A6.27 6.27 0 0 1 57.73 64H6.27A6.27 6.27 0 0 1 0 57.73V6.27A6.27 6.27 0 0 1 6.27 0m25.75 3.75c12.3 0 22.27 9.97 22.27 22.27S44.32 48.3 32.02 48.3v11.96c-12.3 0-22.27-9.97-22.27-22.27S19.72 15.7 32.02 15.7zm-.1 17.23Q28.29 28.27 21 31.9v.2q7.29 3.63 10.92 10.92h.2q3.63-7.29 10.92-10.92v-.2q-7.29-3.63-10.92-10.92z"
    />
  ),
  { fill: 'currentColor' },
);

/** Optimism Circle chain icon (monochrome). */
export const OptimismCircleMono = /* @__PURE__ */ createIcon(
  'OptimismCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0M32.02 3.75c12.3 0 22.27 9.97 22.27 22.27S44.32 48.3 32.02 48.3v11.96c-12.3 0-22.27-9.97-22.27-22.27S19.72 15.7 32.02 15.7zm-.1 17.23Q28.29 28.27 21 31.9v.2q7.29 3.63 10.92 10.92h.2q3.63-7.29 10.92-10.92v-.2q-7.29-3.63-10.92-10.92z"
    />
  ),
  { fill: 'currentColor' },
);
