import { createIcon } from '../utils';

// Source: https://base.app/ (official Coinbase Wallet site; inline <svg aria-label="Coinbase Wallet Logo" viewBox="0 0 32 32">, retrieved 2026-10-03)
// Source: https://base.app/static-open-graph/v1/favicon.png (official favicon, the same standalone C-ring)
// Colored: the C-ring path and its #0000FF/#00C3FF/#00FFFF/#FFEE7D linear gradient copied unchanged from the inline 'Coinbase Wallet Logo' SVG on base.app, placed on the 64 grid. The app was renamed Base app in July 2025 and back to Coinbase Wallet on 2026-09-10; the export name is unchanged
// Mono: the same C-ring path in currentColor
// No official Circle or Square asset is published; both are plain container compositions: a white circle r=32 / white 64x64 square with rx=12.8 behind the unchanged gradient ring, scaled 1.25 and translated (12 12) so the ring is 40 units wide
// CircleMono / SquareMono: the container in currentColor with the ring knocked out by a mask
/** Coinbase Wallet wallet icon (colored). */
export const CoinbaseWallet = /* @__PURE__ */ createIcon(
  'CoinbaseWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4.04 4)scale(1.75)">
      <path
        fill={`url(#${_id}-cbw-a)`}
        d="M16 24a8 8 0 0 1-8-8 8 8 0 0 1 8-8c3.96 0 7.25 2.89 7.88 6.67h8.06C31.26 6.45 24.39 0 16 0 7.17 0 0 7.17 0 16s7.17 16 16 16c8.39 0 15.26-6.45 15.94-14.67h-8.06C23.25 21.11 19.96 24 16 24"
      />
      <defs>
        <linearGradient
          id={`${_id}-cbw-a`}
          x1="4.06"
          x2="32.1"
          y1="0"
          y2="28.05"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".03" stopColor="#0000FF" />
          <stop offset=".43" stopColor="#00C3FF" />
          <stop offset=".72" stopColor="#00FFFF" />
          <stop offset="1" stopColor="#FFEE7D" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Coinbase Wallet Circle wallet icon (colored). */
export const CoinbaseWalletCircle = /* @__PURE__ */ createIcon(
  'CoinbaseWalletCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" fill="#fff" />
      <path
        fill={`url(#${_id}-cbwc-a)`}
        d="M16 24a8 8 0 0 1-8-8 8 8 0 0 1 8-8c3.96 0 7.25 2.89 7.88 6.67h8.06C31.26 6.45 24.39 0 16 0 7.17 0 0 7.17 0 16s7.17 16 16 16c8.39 0 15.26-6.45 15.94-14.67h-8.06C23.25 21.11 19.96 24 16 24"
        transform="translate(12 12)scale(1.25)"
      />
      <defs>
        <linearGradient
          id={`${_id}-cbwc-a`}
          x1="4.06"
          x2="32.1"
          y1="0"
          y2="28.05"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".03" stopColor="#0000FF" />
          <stop offset=".43" stopColor="#00C3FF" />
          <stop offset=".72" stopColor="#00FFFF" />
          <stop offset="1" stopColor="#FFEE7D" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Coinbase Wallet Circle wallet icon (monochrome). */
export const CoinbaseWalletCircleMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-cbwcm-a)`} />
      <defs>
        <mask id={`${_id}-cbwcm-a`}>
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M32 42a10 10 0 0 1-10-10 10 10 0 0 1 10-10c4.95 0 9.06 3.6 9.85 8.33h10.08C51.08 20.07 42.48 12 32 12c-11.04 0-20 8.96-20 20s8.96 20 20 20c10.48 0 19.08-8.07 19.93-18.33H41.85C41.05 38.39 36.95 42 32 42"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinbase Wallet Square wallet icon (colored). */
export const CoinbaseWalletSquare = /* @__PURE__ */ createIcon(
  'CoinbaseWalletSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" fill="#fff" rx="12.8" />
      <path
        fill={`url(#${_id}-cbws-a)`}
        d="M16 24a8 8 0 0 1-8-8 8 8 0 0 1 8-8c3.96 0 7.25 2.89 7.88 6.67h8.06C31.26 6.45 24.39 0 16 0 7.17 0 0 7.17 0 16s7.17 16 16 16c8.39 0 15.26-6.45 15.94-14.67h-8.06C23.25 21.11 19.96 24 16 24"
        transform="translate(12 12)scale(1.25)"
      />
      <defs>
        <linearGradient
          id={`${_id}-cbws-a`}
          x1="4.06"
          x2="32.1"
          y1="0"
          y2="28.05"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".03" stopColor="#0000FF" />
          <stop offset=".43" stopColor="#00C3FF" />
          <stop offset=".72" stopColor="#00FFFF" />
          <stop offset="1" stopColor="#FFEE7D" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Coinbase Wallet Square wallet icon (monochrome). */
export const CoinbaseWalletSquareMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-cbwsm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-cbwsm-a`}>
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M32 42a10 10 0 0 1-10-10 10 10 0 0 1 10-10c4.95 0 9.06 3.6 9.85 8.33h10.08C51.08 20.07 42.48 12 32 12c-11.04 0-20 8.96-20 20s8.96 20 20 20c10.48 0 19.08-8.07 19.93-18.33H41.85C41.05 38.39 36.95 42 32 42"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinbase Wallet wallet icon (monochrome). */
export const CoinbaseWalletMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletMono',
  '0 0 64 64',
  () => (
    <path d="M32.04 46c-7.73 0-14-6.26-14-14s6.27-14 14-14c6.93 0 12.68 5.05 13.8 11.67h14.1C58.74 15.29 46.72 4 32.04 4c-15.46 0-28 12.54-28 28s12.54 28 28 28c14.68 0 26.7-11.3 27.9-25.67h-14.1C44.71 40.95 38.96 46 32.03 46" />
  ),
  { fill: 'currentColor' },
);
