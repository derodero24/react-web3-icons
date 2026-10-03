import { createIcon } from '../utils';

// Source: https://files.vechain.org/branding/Logos/VeChain.zip (official VeChain brand kit, files VeChain/VeChain_Dark.svg and VeChain_Light.svg; guidelines: https://files.vechain.org/branding/Guidelines/VeChain%20Brand%20Guidelines.pdf)
// Colored: the V of the official VeChain lockup, its own #7266FF path (identical in VeChain_Dark.svg and VeChain_Light.svg) copied unchanged without the wordmark paths, placed on the 64 grid. The kit's mark-only files, VeChain_Logomark_Light.png and VeChain_Logomark_Dark.png, are PNG only and put a white V on a rounded tile (#7266FF / #0C0A1F), so the bare V is taken from the vector lockup instead
// Mono: the same path in currentColor
/** Vet coin icon (colored). */
export const Vet = /* @__PURE__ */ createIcon(
  'Vet',
  '0 0 64 64',
  () => (
    <path d="M60 6.18h-5c-1.22 0-2.34.71-2.87 1.83L38.99 35.69l-.01-.03-3.5 7.38.01.03-3.5 7.37L14.5 13.57h5c1.21 0 2.33.71 2.86 1.83l11.42 23.92 3.5-7.38-9.22-19.31c-1.87-3.94-5.8-6.45-10.12-6.45H4l3.5 7.39 21 44.25h6.99z" />
  ),
  { fill: '#7266FF' },
);

/** Vet coin icon (monochrome). */
export const VetMono = /* @__PURE__ */ createIcon(
  'VetMono',
  '0 0 64 64',
  () => (
    <path d="M60 6.18h-5c-1.22 0-2.34.71-2.87 1.83L38.99 35.69l-.01-.03-3.5 7.38.01.03-3.5 7.37L14.5 13.57h5c1.21 0 2.33.71 2.86 1.83l11.42 23.92 3.5-7.38-9.22-19.31c-1.87-3.94-5.8-6.45-10.12-6.45H4l3.5 7.39 21 44.25h6.99z" />
  ),
  { fill: 'currentColor' },
);
