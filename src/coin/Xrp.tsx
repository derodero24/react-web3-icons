import { createIcon } from '../utils';

// Source: https://xrpl.org/assets/xrp-symbol-black.8ecaf7670b5ebd82b8283c9eae4388cff60ec37c3a57351436b36eeeee131dd8.c92cfbea.svg (official XRP Ledger site, xrpl.org)
// Source: https://xrpl.org/XRPL_Brand_Kit.zip (official XRPL Brand Kit: the white symbol and #141414, the kit's black, for the Circle)
// Colored: the official xrp-symbol-black.svg unchanged (one evenodd path in #141414), placed on the 64 grid
// Mono: the same path in currentColor
// Circle: the repository's container convention, since the XRPL Brand Kit has only the black and white symbol and logotypes and no token disc: a #141414 disc (the kit's black) under the same symbol path in white (the white symbol of xrpl.org and the kit), scaled by 0.822857 (46.08/56, the convention's 72% mark width) about the centre, i.e. translate(5.668571 5.668571) scale(0.822857). It replaces legacy artwork of unidentified origin (a smaller white mark on a #23292F disc, a colour not in the kit)
// CircleMono: the disc in currentColor with the Circle's symbol knocked out (one evenodd path)
/** Xrp coin icon (colored). */
export const Xrp = /* @__PURE__ */ createIcon(
  'Xrp',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M59.89 8.02h-8.1L39 20.67c-3.86 3.83-10.12 3.83-13.98 0L12.2 8.02H4.1l16.84 16.65c6.1 6.04 16 6.04 22.1 0zM4 55.97h8.1L25 43.17c3.86-3.83 10.12-3.83 13.99 0l12.9 12.8H60l-16.95-16.8c-6.1-6.05-16-6.05-22.1 0z"
    />
  ),
  { fill: '#141414' },
);

/** Xrp coin icon (monochrome). */
export const XrpMono = /* @__PURE__ */ createIcon(
  'XrpMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M59.89 8.02h-8.1L39 20.67c-3.86 3.83-10.12 3.83-13.98 0L12.2 8.02H4.1l16.84 16.65c6.1 6.04 16 6.04 22.1 0zM4 55.97h8.1L25 43.17c3.86-3.83 10.12-3.83 13.99 0l12.9 12.8H60l-16.95-16.8c-6.1-6.05-16-6.05-22.1 0z"
    />
  ),
  { fill: 'currentColor' },
);

/** Xrp Circle coin icon (colored). */
export const XrpCircle = /* @__PURE__ */ createIcon(
  'XrpCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#141414" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M54.95 12.27h-6.67l-10.52 10.4c-3.18 3.16-8.33 3.16-11.5 0L15.7 12.28H9.04l13.86 13.7c5.02 4.97 13.16 4.97 18.18 0zM8.96 51.72h6.67L26.24 41.2c3.18-3.15 8.33-3.15 11.51 0l10.62 10.53h6.67L41.09 37.9c-5.02-4.98-13.16-4.98-18.18 0z"
      />
    </>
  ),
  {},
);

/** Xrp Circle coin icon (monochrome). */
export const XrpCircleMono = /* @__PURE__ */ createIcon(
  'XrpCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m54.95-19.73h-6.67l-10.52 10.4c-3.18 3.16-8.33 3.16-11.5 0L15.7 12.28H9.04l13.86 13.7c5.02 4.97 13.16 4.97 18.18 0zM8.96 51.72h6.67L26.24 41.2c3.18-3.15 8.33-3.15 11.51 0l10.62 10.53h6.67L41.09 37.9c-5.02-4.98-13.16-4.98-18.18 0z"
    />
  ),
  { fill: 'currentColor' },
);
