import { createIcon } from '../utils';

// Source: https://xrpl.org/assets/xrp-symbol-black.8ecaf7670b5ebd82b8283c9eae4388cff60ec37c3a57351436b36eeeee131dd8.c92cfbea.svg (official XRP Ledger site, xrpl.org)
// Colored: the official xrp-symbol-black.svg unchanged (one evenodd path in #141414), placed on the 64 grid
// Mono: the same path in currentColor
// Circle / CircleMono: legacy artwork of unidentified origin (the mark in a disc), not an official XRP asset; kept until #815 decides its fate
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
      <path
        fill="#23292f"
        d="M32 64c15.27 0 28.4-10.78 31.39-25.76S58.35 8.28 44.25 2.44 13.87 1.53 5.39 14.22s-6.81 29.61 3.98 40.4A32 32 0 0 0 32 64"
      />
      <path
        fill="#fff"
        d="M43.7 18.37h4.82l-10 9.98a9.27 9.27 0 0 1-13.11 0l-9.98-9.98h4.8l7.6 7.58a5.85 5.85 0 0 0 8.3 0zM20.22 46.14h-4.78l10.04-10.05a9.27 9.27 0 0 1 13.1 0l10.07 10.05h-4.8l-7.66-7.65a5.87 5.87 0 0 0-8.3 0z"
      />
    </>
  ),
  {},
);

/** Xrp Circle coin icon (monochrome). */
export const XrpCircleMono = /* @__PURE__ */ createIcon(
  'XrpCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0909)">
      <path
        d="M352 704c167.93 0 312.48-118.62 345.24-283.32S641.86 91.06 486.7 26.8s-334.08-10-427.38 129.64-74.97 325.71 43.77 444.46A352 352 0 0 0 352 704"
        mask={`url(#${_id}-xrpm2-a)`}
      />
      <defs>
        <mask id={`${_id}-xrpm2-a`}>
          <rect width="704" height="704" fill="#fff" />
          <path
            fill="#000"
            d="M480.79 202.09h52.93L423.66 311.9c-39.83 39.8-104.37 39.8-144.2 0L169.71 202.09h52.87l83.6 83.41c25.23 25.2 66.1 25.2 91.33 0zM222.33 507.51h-52.62L280.15 397c39.83-39.8 104.37-39.8 144.2 0L535 507.51h-52.82L398 423.41c-25.23-25.2-66.1-25.2-91.33 0z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
