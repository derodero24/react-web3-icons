import { createIcon } from '../utils';

// Source: https://dune.com/brand (official Dune Brand Hub, updated Dec 2025: Icon download, Dune_Icon_Square.zip)
// Source: https://drive.google.com/uc?export=download&id=1WL6VkGHYKuzkiLOQOPDkZg6GDewBdTvz (Icon zip linked from dune.com/brand)
// Default: the two mark paths of the kit's Dune_Icon_Square/Dune_Icon_1x1_Light.svg (#0F0F15 Off-Black) without its white square; the mark also stands alone in the kit's Dune_Logo_Rectangle logos.
// Square: Dune_Icon_Square/Dune_Icon_1x1_Dark.svg as-is (white mark on a full-bleed #0F0F15 square).
// Mono: the Default paths in currentColor. SquareMono: the Square's square with the Dark icon's two mark paths knocked out (evenodd).
// brandColor: the mark is Off-Black, so the manifest uses the palette's Dune Orange #F4603E (dune.com/brand colour palette).
/** Dune tracker icon (colored). */
export const Dune = /* @__PURE__ */ createIcon(
  'Dune',
  '0 0 64 64',
  () => (
    <>
      <path d="M59.98 31.77c.09 11.06-6.43 21.58-17.27 26.07s-22.89 1.66-30.65-6.22z" />
      <path d="M21.3 6.15C35.57.24 51.94 7.02 57.85 21.3a28 28 0 0 1 1.86 6.81L9.66 48.84a28 28 0 0 1-3.5-6.14C.25 28.43 7.03 12.06 21.3 6.15" />
    </>
  ),
  { fill: '#0F0F15' },
);

/** Dune tracker icon (monochrome). */
export const DuneMono = /* @__PURE__ */ createIcon(
  'DuneMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M59.98 31.77c.09 11.06-6.43 21.58-17.27 26.07s-22.89 1.66-30.65-6.22z" />
      <path d="M21.3 6.15C35.57.24 51.94 7.02 57.85 21.3a28 28 0 0 1 1.86 6.81L9.66 48.84a28 28 0 0 1-3.5-6.14C.25 28.43 7.03 12.06 21.3 6.15" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Dune Square tracker icon (colored). */
export const DuneSquare = /* @__PURE__ */ createIcon(
  'DuneSquare',
  '0 0 64 64',
  () => (
    <>
      <path fill="#0F0F15" d="M0 0h64v64H0z" />
      <path
        fill="#fff"
        d="M56.01 32.22c-.09 9.33-5.65 18.16-14.82 21.96s-19.35 1.5-26.01-5.05z"
      />
      <path
        fill="#fff"
        d="M22.81 9.82c12.25-5.07 26.3.74 31.37 13q1.1 2.7 1.54 5.46L12.6 46.14a24 24 0 0 1-2.78-4.95c-5.07-12.25.74-26.3 13-31.37"
      />
    </>
  ),
  {},
);

/** Dune Square tracker icon (monochrome). */
export const DuneSquareMono = /* @__PURE__ */ createIcon(
  'DuneSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0zm56.01 32.22c-.09 9.33-5.65 18.16-14.82 21.96s-19.35 1.5-26.01-5.05zm-33.2-22.4c12.25-5.07 26.3.74 31.37 13q1.1 2.7 1.54 5.46L12.6 46.14a24 24 0 0 1-2.78-4.95c-5.07-12.25.74-26.3 13-31.37"
    />
  ),
  { fill: 'currentColor' },
);
