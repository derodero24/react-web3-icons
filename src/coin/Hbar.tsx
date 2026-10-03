import { createIcon } from '../utils';

// Source: https://brand.hedera.com/_assets/v11/aeb715f7e0214e08250dd88ec3a32db004821b84.svg (the primary black logomark on the official brand portal https://brand.hedera.com/)
// Colored: the official Hedera logomark unchanged (black disc with the H knocked out and its centre bar, two black paths), placed on the 64 grid as a container; brand.hedera.com: the logomark (the stand-alone H in a circle) is also used to represent HBAR on third-party exchanges
// Mono: the same two paths in currentColor
/** Hbar coin icon (colored). */
export const Hbar = /* @__PURE__ */ createIcon(
  'Hbar',
  '0 0 64 64',
  () => (
    <>
      <path d="M41 29.7H23v4.6h18z" />
      <path d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0m13.22 46.37h-4.21v-9H23v-.01 9.01h-4.22V17.63h4.21v9.01h18.02v-9h4.21z" />
    </>
  ),
  { fill: '#000' },
);

/** Hbar coin icon (monochrome). */
export const HbarMono = /* @__PURE__ */ createIcon(
  'HbarMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M41 29.7H23v4.6h18z" />
      <path d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0m13.22 46.37h-4.21v-9H23v-.01 9.01h-4.22V17.63h4.21v9.01h18.02v-9h4.21z" />
    </>
  ),
  { fill: 'currentColor' },
);
