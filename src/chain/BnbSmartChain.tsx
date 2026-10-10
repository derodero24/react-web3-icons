import { createIcon } from '../utils';

// Source: https://static.bnbchain.org/home-ui/static/images/brand-guidelines/BNBChain-Logo.zip (official BNB Chain brand kit at https://www.bnbchain.org/en/brand-guidelines, files BNB Chain - Logo/SVG/BNB Chain_Symbol_Yellow.svg and BNB Chain_Symbol_White.svg; the brand-guidelines page serves the same files)
// Source: https://www.bnbchain.org/images/brand-guidelines/svg/BNB%20Chain_Symbol_Yellow.svg
// Source: https://www.bnbchain.org/images/brand-guidelines/svg/BNB%20Chain_Symbol_White.svg
// Colored: the official BNB Chain_Symbol_Yellow.svg unchanged (one #F0B90B path), placed on the 64 grid; the coin Bnb re-exports these components
// Mono: the same path in currentColor
// Circle / Square: the brand kit has no container version, so these follow the repository container convention: the official symbol in white (BNB Chain_Symbol_White.svg has the same path; the brand guidelines list #F0B90B and #FFFFFF as brand colours) on a #F0B90B disc (r 32) or rounded square (rx 12.8). The 96-unit symbol is placed at translate(8.9316 9) scale(0.479167): 46 units tall (about 72% of the container) and centred
// CircleMono / SquareMono: the container in currentColor with the same symbol knocked out through a mask
// Replaces an older redraw of the mark in every variant (sourced only as https://bnbchain.org), whose proportions and chevron arms differed slightly from the kit symbol (#836)
/** Bnb Smart Chain chain icon (colored). */
export const BnbSmartChain = /* @__PURE__ */ createIcon(
  'BnbSmartChain',
  '0 0 64 64',
  () => (
    <path d="M17.27 12.58 32 4l14.74 8.58-5.42 3.17L32 10.34l-9.32 5.4zM46.74 23.4l-5.42-3.17-9.32 5.4-9.32-5.4-5.41 3.17v6.33l9.31 5.41v10.82L32 49.13l5.42-3.17V35.14l9.32-5.4zm0 17.15v-6.34l-5.42 3.17v6.34zm3.84 2.24-9.31 5.4v6.35L56 45.96V28.8l-5.42 3.17zm-5.41-24.8 5.41 3.17v6.33L56 24.32V18l-5.42-3.17zm-18.59 32.5v6.34L32 60l5.42-3.17V50.5L32 53.66zm-9.31-9.94 5.41 3.17v-6.34l-5.41-3.17zm9.31-22.56L32 21.16l5.42-3.17L32 14.82zm-13.16 3.17 5.42-3.17-5.42-3.17L8 17.99v6.33l5.42 3.17zm0 10.81L8 28.8v17.16l14.74 8.58V48.2l-9.32-5.41z" />
  ),
  { fill: '#f0b90b' },
);

/** Bnb Smart Chain chain icon (monochrome). */
export const BnbSmartChainMono = /* @__PURE__ */ createIcon(
  'BnbSmartChainMono',
  '0 0 64 64',
  () => (
    <path d="M17.27 12.58 32 4l14.74 8.58-5.42 3.17L32 10.34l-9.32 5.4zM46.74 23.4l-5.42-3.17-9.32 5.4-9.32-5.4-5.41 3.17v6.33l9.31 5.41v10.82L32 49.13l5.42-3.17V35.14l9.32-5.4zm0 17.15v-6.34l-5.42 3.17v6.34zm3.84 2.24-9.31 5.4v6.35L56 45.96V28.8l-5.42 3.17zm-5.41-24.8 5.41 3.17v6.33L56 24.32V18l-5.42-3.17zm-18.59 32.5v6.34L32 60l5.42-3.17V50.5L32 53.66zm-9.31-9.94 5.41 3.17v-6.34l-5.41-3.17zm9.31-22.56L32 21.16l5.42-3.17L32 14.82zm-13.16 3.17 5.42-3.17-5.42-3.17L8 17.99v6.33l5.42 3.17zm0 10.81L8 28.8v17.16l14.74 8.58V48.2l-9.32-5.41z" />
  ),
  { fill: 'currentColor' },
);

/** Bnb Smart Chain Circle chain icon (colored). */
export const BnbSmartChainCircle = /* @__PURE__ */ createIcon(
  'BnbSmartChainCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#f0b90b" />
      <path
        fill="#fff"
        d="M19.9 16.05 32 9l12.1 7.05-4.45 2.6L32 14.2l-7.65 4.44zm24.2 8.88-4.45-2.6L32 26.77l-7.65-4.44-4.45 2.6v5.2l7.65 4.45v8.89l4.45 2.6 4.45-2.6v-8.89l7.65-4.44zm0 14.1v-5.21l-4.45 2.6v5.2zm3.16 1.83-7.65 4.45v5.2l12.1-7.04v-14.1l-4.45 2.6zM42.81 20.5l4.45 2.6v5.2l4.45-2.6v-5.2l-4.45-2.6zM27.55 47.2v5.2L32 55l4.45-2.6v-5.2L32 49.8zm-7.65-8.17 4.45 2.6v-5.2l-4.45-2.6zm7.65-18.53L32 23.1l4.45-2.6L32 17.9zm-10.81 2.6 4.45-2.6-4.45-2.6-4.45 2.6v5.2l4.45 2.6zm0 8.89-4.45-2.6v14.09l12.1 7.04v-5.2l-7.65-4.45z"
      />
    </>
  ),
  {},
);

/** Bnb Smart Chain Square chain icon (colored). */
export const BnbSmartChainSquare = /* @__PURE__ */ createIcon(
  'BnbSmartChainSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#f0b90b" rx="12.8" />
      <path
        fill="#fff"
        d="M19.9 16.05 32 9l12.1 7.05-4.45 2.6L32 14.2l-7.65 4.44zm24.2 8.88-4.45-2.6L32 26.77l-7.65-4.44-4.45 2.6v5.2l7.65 4.45v8.89l4.45 2.6 4.45-2.6v-8.89l7.65-4.44zm0 14.1v-5.21l-4.45 2.6v5.2zm3.16 1.83-7.65 4.45v5.2l12.1-7.04v-14.1l-4.45 2.6zM42.81 20.5l4.45 2.6v5.2l4.45-2.6v-5.2l-4.45-2.6zM27.55 47.2v5.2L32 55l4.45-2.6v-5.2L32 49.8zm-7.65-8.17 4.45 2.6v-5.2l-4.45-2.6zm7.65-18.53L32 23.1l4.45-2.6L32 17.9zm-10.81 2.6 4.45-2.6-4.45-2.6-4.45 2.6v5.2l4.45 2.6zm0 8.89-4.45-2.6v14.09l12.1 7.04v-5.2l-7.65-4.45z"
      />
    </>
  ),
  {},
);

/** Bnb Smart Chain Square chain icon (monochrome). */
export const BnbSmartChainSquareMono = /* @__PURE__ */ createIcon(
  'BnbSmartChainSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-bnbs-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-bnbs-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M19.9 16.05 32 9l12.1 7.05-4.45 2.6L32 14.2l-7.65 4.44zm24.2 8.88-4.45-2.6L32 26.77l-7.65-4.44-4.45 2.6v5.2l7.65 4.45v8.89l4.45 2.6 4.45-2.6v-8.89l7.65-4.44zm0 14.1v-5.21l-4.45 2.6v5.2zm3.16 1.83-7.65 4.45v5.2l12.1-7.04v-14.1l-4.45 2.6zM42.81 20.5l4.45 2.6v5.2l4.45-2.6v-5.2l-4.45-2.6zM27.55 47.2v5.2L32 55l4.45-2.6v-5.2L32 49.8zm-7.65-8.17 4.45 2.6v-5.2l-4.45-2.6zm7.65-18.53L32 23.1l4.45-2.6L32 17.9zm-10.81 2.6 4.45-2.6-4.45-2.6-4.45 2.6v5.2l4.45 2.6zm0 8.89-4.45-2.6v14.09l12.1 7.04v-5.2l-7.65-4.45z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Bnb Smart Chain Circle chain icon (monochrome). */
export const BnbSmartChainCircleMono = /* @__PURE__ */ createIcon(
  'BnbSmartChainCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-bnbc-a)`} />
      <defs>
        <mask id={`${_id}-bnbc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M19.9 16.05 32 9l12.1 7.05-4.45 2.6L32 14.2l-7.65 4.44zm24.2 8.88-4.45-2.6L32 26.77l-7.65-4.44-4.45 2.6v5.2l7.65 4.45v8.89l4.45 2.6 4.45-2.6v-8.89l7.65-4.44zm0 14.1v-5.21l-4.45 2.6v5.2zm3.16 1.83-7.65 4.45v5.2l12.1-7.04v-14.1l-4.45 2.6zM42.81 20.5l4.45 2.6v5.2l4.45-2.6v-5.2l-4.45-2.6zM27.55 47.2v5.2L32 55l4.45-2.6v-5.2L32 49.8zm-7.65-8.17 4.45 2.6v-5.2l-4.45-2.6zm7.65-18.53L32 23.1l4.45-2.6L32 17.9zm-10.81 2.6 4.45-2.6-4.45-2.6-4.45 2.6v5.2l4.45 2.6zm0 8.89-4.45-2.6v14.09l12.1 7.04v-5.2l-7.65-4.45z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
