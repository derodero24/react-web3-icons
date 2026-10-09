import { createIcon } from '../utils';

// Source: https://cdn.sanity.io/files/7gbik6p1/production/93a4bce6e91c627d1c1c3995fbb5c5ce6115540c.zip (official brand kit, the Download Brand Kit link of https://www.openzeppelin.com/brand-kit)
// OpenZeppelin: OpenZeppelin-Logo Kit/Favicon/OZ-Logo-FavIconColor.svg, the three paths copied unchanged (#2E99FF/#4F56FA/#09C2FF) and placed on the 64 grid; the kit's main logos (Main/SVG) draw the same Z mark. It replaces the retired #63D2F9/#4E5EE4/#63B0F9 mark of the old openzeppelin-contracts logo.svg
// OpenZeppelinMono: the same three paths in currentColor, matching the one-colour mark of the kit's Main/SVG/OZ-Logo-Black.svg
// Accessed 2026-10-09
/** Open Zeppelin devtool icon (colored). */
export const OpenZeppelin = /* @__PURE__ */ createIcon(
  'OpenZeppelin',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#2E99FF"
        d="M8.11 59.98c6.22-10.75 11.5-19.62 18.21-31.77 2.37-4.1 6.47-6.65 11.53-6.65h7.94L23.6 59.98z"
      />
      <path fill="#4F56FA" d="M8.18 4h47.69l-8.15 14.2H8.18z" />
      <path
        fill="#09C2FF"
        d="M32.07 51.14c1.8-3.18 4.67-5.14 8.71-5.14l15.1-.05v14.03H26.95c1.81-3.1 3.39-5.78 5.12-8.85"
      />
    </>
  ),
  {},
);

/** Open Zeppelin devtool icon (monochrome). */
export const OpenZeppelinMono = /* @__PURE__ */ createIcon(
  'OpenZeppelinMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M8.11 59.98c6.22-10.75 11.5-19.62 18.21-31.77 2.37-4.1 6.47-6.65 11.53-6.65h7.94L23.6 59.98z" />
      <path d="M8.18 4h47.69l-8.15 14.2H8.18z" />
      <path d="M32.07 51.14c1.8-3.18 4.67-5.14 8.71-5.14l15.1-.05v14.03H26.95c1.81-3.1 3.39-5.78 5.12-8.85" />
    </>
  ),
  { fill: 'currentColor' },
);
