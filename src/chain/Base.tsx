import { createIcon } from '../utils';

// Source: https://raw.githubusercontent.com/base/brand-kit/main/logo/TheSquare/Digital/Base_square_blue.svg
// Source: https://www.base.org/brand (official brand kit, base-brand.zip)
// Default: the official Base symbol "The Square" (Base_square_blue.svg, Base Blue #0000FF) from base/brand-kit, a container drawn full-bleed on the 64 grid; it replaced the 2023 circle-with-bar mark (#0052FF)
// Mono: The Square in currentColor (the kit also ships it in black and white)
// Circle and Square: no official circle/tile version exists; plain repo-convention containers in #0000FF (circle r=32, square rx=12.8) with the official white Square (Base_square_white.svg) scaled by 0.025 (1280 -> 32 units) and centred at translate(16 16); the Mono variants knock the same square out with fill-rule=evenodd
/** Base chain icon (colored). */
export const Base = /* @__PURE__ */ createIcon(
  'Base',
  '0 0 64 64',
  () => (
    <path
      fill="#0000FF"
      d="M0 5.06c0-1.74 0-2.6.33-3.27A3.2 3.2 0 0 1 1.79.33C2.46 0 3.32 0 5.06 0h53.88c1.74 0 2.6 0 3.27.33a3.2 3.2 0 0 1 1.46 1.46c.33.67.33 1.53.33 3.27v53.88c0 1.74 0 2.6-.33 3.27a3.2 3.2 0 0 1-1.46 1.46c-.67.33-1.53.33-3.27.33H5.06c-1.74 0-2.6 0-3.27-.33a3.2 3.2 0 0 1-1.46-1.46C0 61.54 0 60.68 0 58.94z"
    />
  ),
  {},
);

/** Base chain icon (monochrome). */
export const BaseMono = /* @__PURE__ */ createIcon(
  'BaseMono',
  '0 0 64 64',
  () => (
    <path d="M0 5.06c0-1.74 0-2.6.33-3.27A3.2 3.2 0 0 1 1.79.33C2.46 0 3.32 0 5.06 0h53.88c1.74 0 2.6 0 3.27.33a3.2 3.2 0 0 1 1.46 1.46c.33.67.33 1.53.33 3.27v53.88c0 1.74 0 2.6-.33 3.27a3.2 3.2 0 0 1-1.46 1.46c-.67.33-1.53.33-3.27.33H5.06c-1.74 0-2.6 0-3.27-.33a3.2 3.2 0 0 1-1.46-1.46C0 61.54 0 60.68 0 58.94z" />
  ),
  { fill: 'currentColor' },
);

/** Base Circle chain icon (colored). */
export const BaseCircle = /* @__PURE__ */ createIcon(
  'BaseCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#0000FF" />
      <path
        fill="#fff"
        d="M16 18.53c0-.87 0-1.3.16-1.63q.25-.49.74-.74c.33-.16.76-.16 1.63-.16h26.94c.87 0 1.3 0 1.63.16q.49.25.74.74c.16.33.16.76.16 1.63v26.94c0 .87 0 1.3-.16 1.63a1.6 1.6 0 0 1-.74.74c-.33.16-.76.16-1.63.16H18.53c-.87 0-1.3 0-1.63-.16a1.6 1.6 0 0 1-.74-.74c-.16-.33-.16-.76-.16-1.63z"
      />
    </>
  ),
  {},
);

/** Base Square chain icon (colored). */
export const BaseSquare = /* @__PURE__ */ createIcon(
  'BaseSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#0000FF" rx="12.8" />
      <path
        fill="#fff"
        d="M16 18.53c0-.87 0-1.3.16-1.63q.25-.49.74-.74c.33-.16.76-.16 1.63-.16h26.94c.87 0 1.3 0 1.63.16q.49.25.74.74c.16.33.16.76.16 1.63v26.94c0 .87 0 1.3-.16 1.63a1.6 1.6 0 0 1-.74.74c-.33.16-.76.16-1.63.16H18.53c-.87 0-1.3 0-1.63-.16a1.6 1.6 0 0 1-.74-.74c-.16-.33-.16-.76-.16-1.63z"
      />
    </>
  ),
  {},
);

/** Base Square chain icon (monochrome). */
export const BaseSquareMono = /* @__PURE__ */ createIcon(
  'BaseSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 0h38.4A12.8 12.8 0 0 1 64 12.8v38.4A12.8 12.8 0 0 1 51.2 64H12.8A12.8 12.8 0 0 1 0 51.2V12.8A12.8 12.8 0 0 1 12.8 0M16 18.53c0-.87 0-1.3.16-1.63q.25-.49.74-.74c.33-.16.76-.16 1.63-.16h26.94c.87 0 1.3 0 1.63.16q.49.25.74.74c.16.33.16.76.16 1.63v26.94c0 .87 0 1.3-.16 1.63a1.6 1.6 0 0 1-.74.74c-.33.16-.76.16-1.63.16H18.53c-.87 0-1.3 0-1.63-.16a1.6 1.6 0 0 1-.74-.74c-.16-.33-.16-.76-.16-1.63z"
    />
  ),
  { fill: 'currentColor' },
);

/** Base Circle chain icon (monochrome). */
export const BaseCircleMono = /* @__PURE__ */ createIcon(
  'BaseCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 0 1 0-64M16 18.53c0-.87 0-1.3.16-1.63q.25-.49.74-.74c.33-.16.76-.16 1.63-.16h26.94c.87 0 1.3 0 1.63.16q.49.25.74.74c.16.33.16.76.16 1.63v26.94c0 .87 0 1.3-.16 1.63a1.6 1.6 0 0 1-.74.74c-.33.16-.76.16-1.63.16H18.53c-.87 0-1.3 0-1.63-.16a1.6 1.6 0 0 1-.74-.74c-.16-.33-.16-.76-.16-1.63z"
    />
  ),
  { fill: 'currentColor' },
);
