import { createIcon } from '../utils';

// Source: https://static.bnbchain.org/home-ui/static/images/brand-guidelines/BNBChain-Logo.zip (official BNB Chain brand kit at https://www.bnbchain.org/en/brand-guidelines, file BNB Chain - Logo/SVG/BNB Chain_Symbol_Yellow.svg)
// Colored: the official BNB Chain_Symbol_Yellow.svg unchanged (one #F0B90B path), placed on the 64 grid; the brand guidelines name the logomark as 'an expression for the BNB Token' and ask for the yellow logo wherever possible
// Mono: the same path in currentColor
// BnbCircle / BnbCircleMono re-export the BinanceSmartChain circle variants (artwork owned by icons/chain/binance-smart-chain.json)
export {
  BinanceSmartChainCircle as BnbCircle,
  BinanceSmartChainCircleMono as BnbCircleMono,
} from '../chain/BinanceSmartChain';

/** Bnb coin icon (colored). */
export const Bnb = /* @__PURE__ */ createIcon(
  'Bnb',
  '0 0 64 64',
  () => (
    <path d="M17.27 12.58 32 4l14.74 8.58-5.42 3.17L32 10.34l-9.32 5.4zM46.74 23.4l-5.42-3.17-9.32 5.4-9.32-5.4-5.41 3.17v6.33l9.31 5.41v10.82L32 49.13l5.42-3.17V35.14l9.32-5.4zm0 17.15v-6.34l-5.42 3.17v6.34zm3.84 2.24-9.31 5.4v6.35L56 45.96V28.8l-5.42 3.17zm-5.41-24.8 5.41 3.17v6.33L56 24.32V18l-5.42-3.17zm-18.59 32.5v6.34L32 60l5.42-3.17V50.5L32 53.66zm-9.31-9.94 5.41 3.17v-6.34l-5.41-3.17zm9.31-22.56L32 21.16l5.42-3.17L32 14.82zm-13.16 3.17 5.42-3.17-5.42-3.17L8 17.99v6.33l5.42 3.17zm0 10.81L8 28.8v17.16l14.74 8.58V48.2l-9.32-5.41z" />
  ),
  { fill: '#F0B90B' },
);

/** Bnb coin icon (monochrome). */
export const BnbMono = /* @__PURE__ */ createIcon(
  'BnbMono',
  '0 0 64 64',
  () => (
    <path d="M17.27 12.58 32 4l14.74 8.58-5.42 3.17L32 10.34l-9.32 5.4zM46.74 23.4l-5.42-3.17-9.32 5.4-9.32-5.4-5.41 3.17v6.33l9.31 5.41v10.82L32 49.13l5.42-3.17V35.14l9.32-5.4zm0 17.15v-6.34l-5.42 3.17v6.34zm3.84 2.24-9.31 5.4v6.35L56 45.96V28.8l-5.42 3.17zm-5.41-24.8 5.41 3.17v6.33L56 24.32V18l-5.42-3.17zm-18.59 32.5v6.34L32 60l5.42-3.17V50.5L32 53.66zm-9.31-9.94 5.41 3.17v-6.34l-5.41-3.17zm9.31-22.56L32 21.16l5.42-3.17L32 14.82zm-13.16 3.17 5.42-3.17-5.42-3.17L8 17.99v6.33l5.42 3.17zm0 10.81L8 28.8v17.16l14.74 8.58V48.2l-9.32-5.41z" />
  ),
  { fill: 'currentColor' },
);
