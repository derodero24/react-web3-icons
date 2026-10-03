import { createIcon } from '../utils';

// Source: https://bnbchain.org
// BNB diamond mark scaled to fit in a 64x64 circle (~72% fill).
// Original viewBox 166.6 0 2166.7 2499.9 -> scale 0.0184, translate(9, 9)
/** Binance Smart Chain chain icon (colored). */
export const BinanceSmartChain = /* @__PURE__ */ createIcon(
  'BinanceSmartChain',
  '0 0 64 64',
  () => (
    <path d="M17.07 12.63 32 4l14.94 8.63-5.6 3.04L32 10.3l-9.57 5.37zM46.7 23.37l-5.37-3.04L32 25.7l-9.57-5.37-5.36 3.04v6.3l9.33 5.37V46l5.37 3.27L37.14 46V35.27l9.33-5.37v-6.53zm0 17.26v-6.3l-5.36 3.27v6.07zm3.97 2.1-9.34 5.37v6.3l14.94-8.63V28.5l-5.6 3.5zM45.3 18l5.37 3.27v6.3l5.37-3.27V18l-5.37-3.27zM26.4 50.43v6.3L31.77 60l5.37-3.27v-6.3l-5.37 3.27zm-9.33-9.8 5.36 3.04v-6.3l-5.36-3.27zM26.4 18l5.37 3.27 5.6-3.27L32 14.73zm-13.3 3.27L18.7 18l-5.6-3.27L7.73 18v6.3l5.37 3.27zm0 10.73-5.37-3.27V46l14.94 8.63v-6.3l-9.34-5.36V32z" />
  ),
  { fill: '#f0b90b' },
);

/** Binance Smart Chain chain icon (monochrome). */
export const BinanceSmartChainMono = /* @__PURE__ */ createIcon(
  'BinanceSmartChainMono',
  '0 0 64 64',
  () => (
    <path d="M17.07 12.63 32 4l14.94 8.63-5.6 3.04L32 10.3l-9.57 5.37zM46.7 23.37l-5.37-3.04L32 25.7l-9.57-5.37-5.36 3.04v6.3l9.33 5.37V46l5.37 3.27L37.14 46V35.27l9.33-5.37v-6.53zm0 17.26v-6.3l-5.36 3.27v6.07zm3.97 2.1-9.34 5.37v6.3l14.94-8.63V28.5l-5.6 3.5zM45.3 18l5.37 3.27v6.3l5.37-3.27V18l-5.37-3.27zM26.4 50.43v6.3L31.77 60l5.37-3.27v-6.3l-5.37 3.27zm-9.33-9.8 5.36 3.04v-6.3l-5.36-3.27zM26.4 18l5.37 3.27 5.6-3.27L32 14.73zm-13.3 3.27L18.7 18l-5.6-3.27L7.73 18v6.3l5.37 3.27zm0 10.73-5.37-3.27V46l14.94 8.63v-6.3l-9.34-5.36V32z" />
  ),
  { fill: 'currentColor' },
);

/** Binance Smart Chain Circle chain icon (colored). */
export const BinanceSmartChainCircle = /* @__PURE__ */ createIcon(
  'BinanceSmartChainCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#f0b90b" />
      <path
        fill="#fff"
        d="M19.73 16.1 32 9l12.27 7.1-4.6 2.48-7.67-4.4-7.86 4.4zm24.34 8.8-4.4-2.48-7.67 4.4-7.86-4.4-4.4 2.49v5.17l7.66 4.41v9.01l4.4 2.68 4.42-2.68v-8.82l7.66-4.4V24.9zm0 14.2v-5.18l-4.4 2.68v4.98zm3.26 1.72-7.66 4.4v5.18l12.26-7.1V29.14L47.33 32zm-4.4-20.32 4.4 2.68v5.18l4.41-2.68V20.5l-4.4-2.68zM27.4 47.14v5.18L31.8 55l4.42-2.68v-5.18l-4.41 2.68zm-7.67-8.05 4.41 2.5V36.4l-4.4-2.68zM27.4 20.5l4.4 2.68 4.6-2.68-4.4-2.68zm-10.93 2.68 4.6-2.68-4.6-2.68-4.4 2.68v5.17l4.4 2.69zm0 8.82-4.4-2.68V43.5l12.26 7.1v-5.18L16.67 41v-9z"
      />
    </>
  ),
  {},
);

/** Binance Smart Chain Square chain icon (colored). */
export const BinanceSmartChainSquare = /* @__PURE__ */ createIcon(
  'BinanceSmartChainSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#f0b90b" rx="12.8" />
      <path
        fill="#fff"
        d="M19.73 16.1 32 9l12.27 7.1-4.6 2.48-7.67-4.4-7.86 4.4zm24.34 8.8-4.4-2.48-7.67 4.4-7.86-4.4-4.4 2.49v5.17l7.66 4.41v9.01l4.4 2.68 4.42-2.68v-8.82l7.66-4.4V24.9zm0 14.2v-5.18l-4.4 2.68v4.98zm3.26 1.72-7.66 4.4v5.18l12.26-7.1V29.14L47.33 32zm-4.4-20.32 4.4 2.68v5.18l4.41-2.68V20.5l-4.4-2.68zM27.4 47.14v5.18L31.8 55l4.42-2.68v-5.18l-4.41 2.68zm-7.67-8.05 4.41 2.5V36.4l-4.4-2.68zM27.4 20.5l4.4 2.68 4.6-2.68-4.4-2.68zm-10.93 2.68 4.6-2.68-4.6-2.68-4.4 2.68v5.17l4.4 2.69zm0 8.82-4.4-2.68V43.5l12.26 7.1v-5.18L16.67 41v-9z"
      />
    </>
  ),
  {},
);

/** Binance Smart Chain Square chain icon (monochrome). */
export const BinanceSmartChainSquareMono = /* @__PURE__ */ createIcon(
  'BinanceSmartChainSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-bnbs-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-bnbs-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M19.73 16.1 32 9l12.27 7.1-4.6 2.48-7.67-4.4-7.86 4.4zm24.34 8.8-4.4-2.48-7.67 4.4-7.86-4.4-4.4 2.49v5.17l7.66 4.41v9.01l4.4 2.68 4.42-2.68v-8.82l7.66-4.4V24.9zm0 14.2v-5.18l-4.4 2.68v4.98zm3.26 1.72-7.66 4.4v5.18l12.26-7.1V29.14L47.33 32zm-4.4-20.32 4.4 2.68v5.18l4.41-2.68V20.5l-4.4-2.68zM27.4 47.14v5.18L31.8 55l4.42-2.68v-5.18l-4.41 2.68zm-7.67-8.05 4.41 2.5V36.4l-4.4-2.68zM27.4 20.5l4.4 2.68 4.6-2.68-4.4-2.68zm-10.93 2.68 4.6-2.68-4.6-2.68-4.4 2.68v5.17l4.4 2.69zm0 8.82-4.4-2.68V43.5l12.26 7.1v-5.18L16.67 41v-9z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Binance Smart Chain Circle chain icon (monochrome). */
export const BinanceSmartChainCircleMono = /* @__PURE__ */ createIcon(
  'BinanceSmartChainCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-bnbc-a)`} />
      <defs>
        <mask id={`${_id}-bnbc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M19.73 16.1 32 9l12.27 7.1-4.6 2.48-7.67-4.4-7.86 4.4zm24.34 8.8-4.4-2.48-7.67 4.4-7.86-4.4-4.4 2.49v5.17l7.66 4.41v9.01l4.4 2.68 4.42-2.68v-8.82l7.66-4.4V24.9zm0 14.2v-5.18l-4.4 2.68v4.98zm3.26 1.72-7.66 4.4v5.18l12.26-7.1V29.14L47.33 32zm-4.4-20.32 4.4 2.68v5.18l4.41-2.68V20.5l-4.4-2.68zM27.4 47.14v5.18L31.8 55l4.42-2.68v-5.18l-4.41 2.68zm-7.67-8.05 4.41 2.5V36.4l-4.4-2.68zM27.4 20.5l4.4 2.68 4.6-2.68-4.4-2.68zm-10.93 2.68 4.6-2.68-4.6-2.68-4.4 2.68v5.17l4.4 2.69zm0 8.82-4.4-2.68V43.5l12.26 7.1v-5.18L16.67 41v-9z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
