import { createIcon } from '../utils';

// Source: https://github.com/inkonchain/ink-kit/blob/767f5a2f03c9055803bb47a3701e046ee1efc131/src/icons/InkLogo.svg (Ink's official UI kit, linked from inkonchain.com)
// Source: https://github.com/inkonchain/ink-kit/blob/767f5a2f03c9055803bb47a3701e046ee1efc131/src/icons/Logo/Ink.svg
// Default: the official InkLogo.svg (the #7132F5 mark on a #F0EFFF disc), paths unchanged and full-bleed on the 64 grid; it replaces the same mark in #7757E2 without the light disc
// Mono: the official one-colour Logo/Ink.svg (the purple mark alone, fill-rule=evenodd) in currentColor
/** Ink chain icon (colored). */
export const Ink = /* @__PURE__ */ createIcon(
  'Ink',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#F0EFFF"
        d="M32 62.72a30.72 30.72 0 0 0 0-61.44 30.72 30.72 0 0 0 0 61.44"
      />
      <path
        fill="#7132F5"
        fillRule="evenodd"
        d="M64 32a32 32 0 1 0-64 0 32 32 0 0 0 64 0M36.56 55.96c0 2.16-1.76 3.92-4.32 4H32a27.94 27.94 0 1 1 .28-55.88c2.88 0 4.32 1.8 4.32 4 0 2.16-1.96 3.8-4 3.8-2.08 0-2.2 0-4.16.16-2 .16-4 1.8-4 4a4 4 0 0 0 4 4H46a4 4 0 0 1 4 4 4 4 0 0 1-4 4H18.92a4 4 0 0 0-4.04 4 4 4 0 0 0 4 3.96h13.68a4 4 0 0 1 4 4 4 4 0 0 1-4 4H28.4a4 4 0 0 0-4 4c0 2.16 1.8 3.8 4 3.96h.48l1.6.12h2.12c2.24 0 4 1.68 4 3.88"
        clipRule="evenodd"
      />
    </>
  ),
  { fill: 'none' },
);

/** Ink chain icon (monochrome). */
export const InkMono = /* @__PURE__ */ createIcon(
  'InkMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M64 32C64 14.33 49.67 0 32 0S0 14.33 0 32s14.33 32 32 32 32-14.33 32-32M36.56 55.95c0 2.17-1.77 3.93-4.3 4h-.31C16.55 59.89 4.07 47.4 4.07 32S16.57 4.07 32 4.07h.25c2.86.05 4.31 1.81 4.31 3.98 0 2.2-1.95 3.83-4.01 3.83s-2.18 0-4.16.16-4.03 1.79-4.03 4a4 4 0 0 0 4.03 4h17.57c2.21 0 4.01 1.77 4.01 3.97a4 4 0 0 1-4.01 4H18.89a4 4 0 0 0-4.01 4c0 2.2 1.8 3.99 4.03 3.99h13.62a4 4 0 0 1 4.02 4c0 2.19-1.8 3.97-4.02 3.97h-4.16a4 4 0 0 0-4.02 4c0 2.2 1.85 3.82 4.02 3.98l.48.04 1.6.1c.52.03 1.03.03 2.14.03 2.22 0 3.96 1.63 3.96 3.83"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
