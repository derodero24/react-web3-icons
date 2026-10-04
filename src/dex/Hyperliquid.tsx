import { createIcon } from '../utils';

// Source: https://hyperliquid.gitbook.io/hyperliquid-docs/brand-kit (official brand kit: Hyperliquid SVG format.zip, Hyperliquid_Blob_Green.svg and Hyperliquid_Blob_Dark.svg)
// Source: https://app.hyperliquid.xyz/coins/HYPE.svg
// Default: the brand kit's Hyperliquid_Blob_Green.svg unchanged (one #97FCE4 path), placed on the 64 grid. The app's HYPE token icon (app.hyperliquid.xyz/coins/HYPE.svg) is the same blob in the same #97FCE4 (shapes overlap 99.4%). It replaces a third-party redraw from @web3icons/react in #50D2C1, slightly wider than the official blob
// Mono: the same path in currentColor (the kit's Hyperliquid_Blob_Dark.svg has the same geometry)
/** Hyperliquid DEX icon (colored). */
export const Hyperliquid = /* @__PURE__ */ createIcon(
  'Hyperliquid',
  '0 0 64 64',
  () => (
    <path d="M59.99 31.73c0 18.42-11.31 24.34-17.3 19.1-4.9-4.28-6.35-13.36-13.72-14.3-9.34-1.11-10.2 11.31-16.36 11.31-7.2 0-8.57-10.37-8.57-15.77 0-5.48 1.54-12.93 7.62-12.93 7.12 0 7.54 10.7 16.46 10.1 8.82-.6 9-11.73 14.82-16.44 5.05-4.2 17.05.25 17.05 18.93" />
  ),
  { fill: '#97FCE4' },
);

/** Hyperliquid DEX icon (monochrome). */
export const HyperliquidMono = /* @__PURE__ */ createIcon(
  'HyperliquidMono',
  '0 0 64 64',
  () => (
    <path d="M59.99 31.73c0 18.42-11.31 24.34-17.3 19.1-4.9-4.28-6.35-13.36-13.72-14.3-9.34-1.11-10.2 11.31-16.36 11.31-7.2 0-8.57-10.37-8.57-15.77 0-5.48 1.54-12.93 7.62-12.93 7.12 0 7.54 10.7 16.46 10.1 8.82-.6 9-11.73 14.82-16.44 5.05-4.2 17.05.25 17.05 18.93" />
  ),
  { fill: 'currentColor' },
);
