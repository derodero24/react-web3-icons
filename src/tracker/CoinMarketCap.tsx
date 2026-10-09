import { createIcon } from '../utils';

// Source: https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_1.svg (the official logo file the coinmarketcap.com theme loads; mark and wordmark in #17181B)
// Source: https://coinmarketcap.com (site header logo: inline <svg class="cmc-logo-img" fill="var(--text-color)">, #000 by day and #fff at night; site palette --theme-color #3861fb and --c-color-blue #3861FB)
// Source: https://s2.coinmarketcap.com/v1/portal/_next/static/chunks/pages/_app-*.js (loaded by https://coinmarketcap.com/api/: an inline 40×40 icon component, a #3861FB disc with the mark in white; accessed 2026-10-09 as _app-d52946da21f837f0.js)
// CoinMarketCap: the mark of coinmarketcap_1.svg (path unchanged, placed on the 64 grid) in that file's #17181B. The previous #3861FB default appeared in no official vector of the bare mark
// CoinMarketCapMono: the same path in currentColor
// CoinMarketCapCircle: the disc component of the coinmarketcap.com/api/ page (circle r=20 in #3861FB, the mark in white), copied unchanged and placed on the 64 grid; CoinMarketCapCircleMono is the disc in currentColor with the mark knocked out (mask)
// brandColor: the bare mark is only ever drawn in #17181B, #000 or white, so the manifest uses the site's brand blue #3861FB (--theme-color, --c-color-blue and --c-color-official in the coinmarketcap.com stylesheets; also the app-icon background)
// CoinMarketCap has no press or brand kit (/press/, /brand/, /brand-assets/, /media-kit/ and /press-kit/ return 404, accessed 2026-10-09)
/** Coin Market Cap tracker icon (colored). */
export const CoinMarketCap = /* @__PURE__ */ createIcon(
  'CoinMarketCap',
  '0 0 64 64',
  () => (
    <path d="M52.4 37.47c-.98.61-2.13.69-3 .2-1.11-.63-1.72-2.1-1.72-4.14v-6.1c0-2.96-1.17-5.06-3.12-5.63-3.3-.96-5.8 3.09-6.73 4.6L32 35.86V24.3q-.1-3.99-2.56-4.72c-1.09-.32-2.71-.2-4.29 2.22L12.1 42.77A23 23 0 0 1 9.44 32C9.44 19.37 19.56 9.1 32 9.1S54.57 19.36 54.57 32v.13c.12 2.44-.67 4.39-2.17 5.34M59.58 32v-.12C59.51 16.49 47.17 4 32 4 16.8 4 4.42 16.56 4.42 32S16.8 60 32 60c6.98 0 13.64-2.65 18.75-7.46a2.57 2.57 0 0 0 .14-3.6 2.5 2.5 0 0 0-3.54-.14A22.3 22.3 0 0 1 32 54.91c-6.66 0-12.65-2.95-16.79-7.62L27 28.38v8.71c0 4.2 1.62 5.54 2.99 5.94s3.44.13 5.63-3.42l6.48-10.5.57-.89v5.31c0 3.91 1.57 7.05 4.3 8.59 2.47 1.39 5.56 1.26 8.09-.33 3.06-1.93 4.7-5.5 4.53-9.79" />
  ),
  { fill: '#17181B' },
);

/** Coin Market Cap tracker icon (monochrome). */
export const CoinMarketCapMono = /* @__PURE__ */ createIcon(
  'CoinMarketCapMono',
  '0 0 64 64',
  () => (
    <path d="M52.4 37.47c-.98.61-2.13.69-3 .2-1.11-.63-1.72-2.1-1.72-4.14v-6.1c0-2.96-1.17-5.06-3.12-5.63-3.3-.96-5.8 3.09-6.73 4.6L32 35.86V24.3q-.1-3.99-2.56-4.72c-1.09-.32-2.71-.2-4.29 2.22L12.1 42.77A23 23 0 0 1 9.44 32C9.44 19.37 19.56 9.1 32 9.1S54.57 19.36 54.57 32v.13c.12 2.44-.67 4.39-2.17 5.34M59.58 32v-.12C59.51 16.49 47.17 4 32 4 16.8 4 4.42 16.56 4.42 32S16.8 60 32 60c6.98 0 13.64-2.65 18.75-7.46a2.57 2.57 0 0 0 .14-3.6 2.5 2.5 0 0 0-3.54-.14A22.3 22.3 0 0 1 32 54.91c-6.66 0-12.65-2.95-16.79-7.62L27 28.38v8.71c0 4.2 1.62 5.54 2.99 5.94s3.44.13 5.63-3.42l6.48-10.5.57-.89v5.31c0 3.91 1.57 7.05 4.3 8.59 2.47 1.39 5.56 1.26 8.09-.33 3.06-1.93 4.7-5.5 4.53-9.79" />
  ),
  { fill: 'currentColor' },
);

/** Coin Market Cap Circle tracker icon (colored). */
export const CoinMarketCapCircle = /* @__PURE__ */ createIcon(
  'CoinMarketCapCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(1.6)">
      <circle cx="20" cy="20" r="20" fill="#3861FB" />
      <path
        fill="white"
        d="M27.4 21.95c-.36.22-.78.25-1.1.07-.4-.22-.62-.75-.62-1.47v-2.19c0-1.05-.42-1.8-1.13-2-1.2-.35-2.1 1.1-2.44 1.64L20 21.38v-4.13q-.05-1.43-.93-1.69c-.4-.11-.98-.07-1.56.8l-4.73 7.49a8 8 0 0 1-.96-3.85c0-4.51 3.67-8.18 8.18-8.18s8.18 3.67 8.18 8.18v.04c.04.88-.25 1.57-.79 1.91M30 20v-.04c-.03-5.5-4.5-9.96-10-9.96s-10 4.49-10 10 4.49 10 10 10c2.53 0 4.94-.95 6.8-2.67A.9.9 0 1 0 25.56 26 8.2 8.2 0 0 1 20 28.18a8.2 8.2 0 0 1-6.09-2.72l4.27-6.76v3.12c0 1.5.59 1.98 1.08 2.12s1.25.04 2.04-1.22l2.35-3.76.21-.31v1.9c0 1.4.57 2.51 1.56 3.06.9.5 2.02.45 2.93-.11 1.11-.7 1.7-1.97 1.65-3.5"
      />
    </g>
  ),
  {},
);

/** Coin Market Cap Circle tracker icon (monochrome). */
export const CoinMarketCapCircleMono = /* @__PURE__ */ createIcon(
  'CoinMarketCapCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <circle cx="20" cy="20" r="20" mask={`url(#${_id}-cmc-cm-a)`} />
      <defs>
        <mask id={`${_id}-cmc-cm-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            fill="#000"
            d="M27.4 21.95c-.36.22-.78.25-1.1.07-.4-.22-.62-.75-.62-1.47v-2.19c0-1.05-.42-1.8-1.13-2-1.2-.35-2.1 1.1-2.44 1.64L20 21.38v-4.13q-.05-1.43-.93-1.69c-.4-.11-.98-.07-1.56.8l-4.73 7.49a8 8 0 0 1-.96-3.85c0-4.51 3.67-8.18 8.18-8.18s8.18 3.67 8.18 8.18v.04c.04.88-.25 1.57-.79 1.91M30 20v-.04c-.03-5.5-4.5-9.96-10-9.96s-10 4.49-10 10 4.49 10 10 10c2.53 0 4.94-.95 6.8-2.67A.9.9 0 1 0 25.56 26 8.2 8.2 0 0 1 20 28.18a8.2 8.2 0 0 1-6.09-2.72l4.27-6.76v3.12c0 1.5.59 1.98 1.08 2.12s1.25.04 2.04-1.22l2.35-3.76.21-.31v1.9c0 1.4.57 2.51 1.56 3.06.9.5 2.02.45 2.93-.11 1.11-.7 1.7-1.97 1.65-3.5"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
