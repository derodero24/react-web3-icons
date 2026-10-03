import { createIcon } from '../utils';

// Source: https://hedera.com/wp-content/uploads/2026/05/hedera-logo-library-26.zip (official logo library from https://brand.hedera.com: Logomark/Hedera-Icon-Dark.svg)
// Default: the official Hedera icon Hedera-Icon-Dark.svg (black disc with the H cut out; the 2026 H has two crossbars), replacing the older single-crossbar H; the H stays a cut-out as in the official file
// Mono: the same disc and H in currentColor (Hedera-Icon-White.svg is this geometry in white)
/** Hedera chain icon (colored). */
export const Hedera = /* @__PURE__ */ createIcon(
  'Hedera',
  '0 0 64 64',
  () => (
    <>
      <path d="M23 29.7h18v4.6H23Z" />
      <path d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0m13.22 46.37h-4.21v-9H23v9h-4.22V17.63H23v9h18v-9h4.22z" />
    </>
  ),
  {},
);

/** Hedera chain icon (monochrome). */
export const HederaMono = /* @__PURE__ */ createIcon(
  'HederaMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M23 29.7h18v4.6H23Z" />
      <path d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0m13.22 46.37h-4.21v-9H23v9h-4.22V17.63H23v9h18v-9h4.22z" />
    </>
  ),
  { fill: 'currentColor' },
);
