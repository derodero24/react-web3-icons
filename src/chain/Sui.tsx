import { createIcon } from '../utils';

// Source: https://sui.io/media-kit (official media kit, 01_Sui_Logo.zip: Sui_Droplet/SVG/Logo_Sui_Droplet_Sui Blue.svg)
// Default: the official Sui droplet in Sui Blue #298DFF (Logo_Sui_Droplet_Sui Blue.svg from the sui.io media kit), replacing the older thinner #4BA2FF droplet
// Mono: the same droplet path in currentColor (the kit also ships it in black and white)
/** Sui chain icon (colored). */
export const Sui = /* @__PURE__ */ createIcon(
  'Sui',
  '0 0 64 64',
  () => (
    <path
      fill="#298DFF"
      fillRule="evenodd"
      d="M45.15 27.35A16.7 16.7 0 0 1 48.8 37.8c0 3.95-1.41 7.69-3.75 10.57l-.2.25-.06-.32-.16-.8c-1.18-5.17-5-9.59-11.3-13.17q-6.37-3.65-7.32-8.62c-.42-2.13-.11-4.28.48-6.12.6-1.83 1.48-3.37 2.23-4.3l2.45-2.99a1.07 1.07 0 0 1 1.66 0zm3.87-2.99L32.6 4.3a.78.78 0 0 0-1.21 0L14.97 24.36l-.05.07a21.8 21.8 0 0 0-4.83 13.7c0 12.08 9.8 21.87 21.9 21.87S53.9 50.2 53.9 38.13c0-5.19-1.8-9.95-4.83-13.7zM18.9 27.3l1.47-1.8.04.33.13.8c.95 4.98 4.35 9.14 10.02 12.36 4.93 2.8 7.8 6.03 8.63 9.57.35 1.48.4 2.93.26 4.2l-.01.08-.07.04a17 17 0 0 1-7.38 1.7c-9.27 0-16.8-7.51-16.8-16.78a16.7 16.7 0 0 1 3.7-10.5z"
      clipRule="evenodd"
    />
  ),
  {},
);

/** Sui chain icon (monochrome). */
export const SuiMono = /* @__PURE__ */ createIcon(
  'SuiMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M45.15 27.35A16.7 16.7 0 0 1 48.8 37.8c0 3.95-1.41 7.69-3.75 10.57l-.2.25-.06-.32-.16-.8c-1.18-5.17-5-9.59-11.3-13.17q-6.37-3.65-7.32-8.62c-.42-2.13-.11-4.28.48-6.12.6-1.83 1.48-3.37 2.23-4.3l2.45-2.99a1.07 1.07 0 0 1 1.66 0zm3.87-2.99L32.6 4.3a.78.78 0 0 0-1.21 0L14.97 24.36l-.05.07a21.8 21.8 0 0 0-4.83 13.7c0 12.08 9.8 21.87 21.9 21.87S53.9 50.2 53.9 38.13c0-5.19-1.8-9.95-4.83-13.7zM18.9 27.3l1.47-1.8.04.33.13.8c.95 4.98 4.35 9.14 10.02 12.36 4.93 2.8 7.8 6.03 8.63 9.57.35 1.48.4 2.93.26 4.2l-.01.08-.07.04a17 17 0 0 1-7.38 1.7c-9.27 0-16.8-7.51-16.8-16.78a16.7 16.7 0 0 1 3.7-10.5z"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
