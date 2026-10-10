import { createIcon } from '../utils';

// Source: https://chainstack.com/wp-content/themes/chainstack/img/chainstack-logo-blue.svg (the logomark download on https://chainstack.com/press-kit/)
// Source: https://chainstack.com/wp-content/themes/chainstack/img/Chainstack-Branding-and-Presskit-2023.zip (press kit: Logo/SVG/Chainstack-Mark-Blue.svg, Logo/SVG/Chainstack-Mark-White.svg)
// Default: the press-kit logomark chainstack-logo-blue.svg, its two #007BFF paths unchanged, placed on the 64 grid; the zip's Chainstack-Mark-Blue.svg is a lower-precision export of the same mark
// Mono: the same paths in currentColor, as in the one-colour chainstack-logo-white.svg on the press-kit page
/** Chainstack node icon (colored). */
export const Chainstack = /* @__PURE__ */ createIcon(
  'Chainstack',
  '0 0 64 64',
  () => (
    <>
      <path d="M43.99 43.96H16.78a7.2 7.2 0 0 1-5.1-2.1L6.1 36.3A7.2 7.2 0 0 1 4 31.23V16.81a7.2 7.2 0 0 1 2.12-5.1l5.56-5.56a7.2 7.2 0 0 1 5.09-2.08h27.2v7.99H19.22a7.2 7.2 0 0 0-5.08 2.1 7.2 7.2 0 0 0-2.11 5.07v9.57c0 1.9.76 3.73 2.1 5.08a7.2 7.2 0 0 0 5.09 2.1H44z" />
      <path d="M20.02 20.04h27.21c1.9 0 3.73.75 5.08 2.08l5.57 5.56a7.2 7.2 0 0 1 2.1 5.08v14.43c0 1.9-.75 3.73-2.1 5.08l-5.57 5.55a7.2 7.2 0 0 1-5.09 2.1h-27.2v-7.98H44.8a7.2 7.2 0 0 0 5.09-2.1 7.2 7.2 0 0 0 2.1-5.08v-9.57c0-1.9-.75-3.73-2.1-5.08a7.2 7.2 0 0 0-5.1-2.1H20.03z" />
    </>
  ),
  { fill: '#007BFF' },
);

/** Chainstack node icon (monochrome). */
export const ChainstackMono = /* @__PURE__ */ createIcon(
  'ChainstackMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M43.99 43.96H16.78a7.2 7.2 0 0 1-5.1-2.1L6.1 36.3A7.2 7.2 0 0 1 4 31.23V16.81a7.2 7.2 0 0 1 2.12-5.1l5.56-5.56a7.2 7.2 0 0 1 5.09-2.08h27.2v7.99H19.22a7.2 7.2 0 0 0-5.08 2.1 7.2 7.2 0 0 0-2.11 5.07v9.57c0 1.9.76 3.73 2.1 5.08a7.2 7.2 0 0 0 5.09 2.1H44z" />
      <path d="M20.02 20.04h27.21c1.9 0 3.73.75 5.08 2.08l5.57 5.56a7.2 7.2 0 0 1 2.1 5.08v14.43c0 1.9-.75 3.73-2.1 5.08l-5.57 5.55a7.2 7.2 0 0 1-5.09 2.1h-27.2v-7.98H44.8a7.2 7.2 0 0 0 5.09-2.1 7.2 7.2 0 0 0 2.1-5.08v-9.57c0-1.9-.75-3.73-2.1-5.08a7.2 7.2 0 0 0-5.1-2.1H20.03z" />
    </>
  ),
  { fill: 'currentColor' },
);
