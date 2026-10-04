import { createIcon } from '../utils';

// Source: https://blog.bitstamp.net (official Bitstamp by Robinhood site: the B of the app badge, inline SVG .app-qr__icon, painted with --brand-color-dark = --dark-forest-green-900 #003B2F; the header wordmark uses the same #003B2F)
// Source: https://assets.bitstamp.net/static/webapp/images/favicons/apple-touch-icon.98ff879260d2ab4dc269f402e7f6166c74c73200.png (app icon: the white B on a #003B2F tile)
// Colored: the official B path unchanged, #003B2F, placed on the 64 grid; it replaces the 2020 mark (dark B over a #149F49 bar), which the current identity no longer uses
// Circle: no official circular asset exists; the same B in white, scale 0.7 centred (translate 4 4), on a #003B2F disc, following the app icon
// Mono: the B in currentColor; CircleMono knocks the B out of the disc
/** Bitstamp exchange icon (colored). */
export const Bitstamp = /* @__PURE__ */ createIcon(
  'Bitstamp',
  '0 0 64 64',
  () => (
    <path d="M23.23 51.91V35h13.34c5.49 0 9.25 3.4 9.25 8.4s-3.76 8.51-9.25 8.51Zm0-39.83h12.25c5 0 8.59 3.26 8.59 7.83s-3.58 7.76-8.6 7.76H23.24Zm33.5 32.42a14.1 14.1 0 0 0-9.74-13.67 12.9 12.9 0 0 0 7.76-12C54.73 10.1 47.4 4.02 37 4.02H7.28v7.42a8.45 8.45 0 0 1 0 16.9V35a8.45 8.45 0 0 1 0 16.91V60h30.99c10.72 0 18.45-6.33 18.45-15.5" />
  ),
  { fill: '#003B2F' },
);

/** Bitstamp Circle exchange icon (colored). */
export const BitstampCircle = /* @__PURE__ */ createIcon(
  'BitstampCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#003B2F" />
      <path
        fill="#fff"
        d="M25.86 45.94V34.1h9.34c3.84 0 6.47 2.39 6.47 5.89s-2.63 5.95-6.47 5.95Zm0-27.9h8.58c3.5 0 6 2.3 6 5.5s-2.5 5.43-6 5.43h-8.58Zm23.45 22.71a9.9 9.9 0 0 0-6.81-9.57 9 9 0 0 0 5.43-8.4c-.01-6.12-5.15-10.38-12.43-10.38H14.69v5.2a5.91 5.91 0 0 1 0 11.83v4.67a5.91 5.91 0 0 1 0 11.84v5.66h21.7c7.51 0 12.92-4.43 12.92-10.85"
      />
    </>
  ),
  {},
);

/** Bitstamp exchange icon (monochrome). */
export const BitstampMono = /* @__PURE__ */ createIcon(
  'BitstampMono',
  '0 0 64 64',
  () => (
    <path d="M23.23 51.91V35h13.34c5.49 0 9.25 3.4 9.25 8.4s-3.76 8.51-9.25 8.51Zm0-39.83h12.25c5 0 8.59 3.26 8.59 7.83s-3.58 7.76-8.6 7.76H23.24Zm33.5 32.42a14.1 14.1 0 0 0-9.74-13.67 12.9 12.9 0 0 0 7.76-12C54.73 10.1 47.4 4.02 37 4.02H7.28v7.42a8.45 8.45 0 0 1 0 16.9V35a8.45 8.45 0 0 1 0 16.91V60h30.99c10.72 0 18.45-6.33 18.45-15.5" />
  ),
  { fill: 'currentColor' },
);

/** Bitstamp Circle exchange icon (monochrome). */
export const BitstampCircleMono = /* @__PURE__ */ createIcon(
  'BitstampCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-bstmp-a)`} />
      <defs>
        <mask id={`${_id}-bstmp-a`}>
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M25.86 45.94V34.1h9.34c3.84 0 6.47 2.39 6.47 5.89s-2.63 5.95-6.47 5.95Zm0-27.9h8.58c3.5 0 6 2.3 6 5.5s-2.5 5.43-6 5.43h-8.58Zm23.45 22.71a9.9 9.9 0 0 0-6.81-9.57 9 9 0 0 0 5.43-8.4c-.01-6.12-5.15-10.38-12.43-10.38H14.69v5.2a5.91 5.91 0 0 1 0 11.83v4.67a5.91 5.91 0 0 1 0 11.84v5.66h21.7c7.51 0 12.92-4.43 12.92-10.85"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
