import { createIcon } from '../utils';

// Source: https://github.com/MystenLabs/walrus/blob/28728a5c6a326c860b108441ee094d65b867cb4d/docs/site/static/img/logo.svg (official Walrus docs logo, Mysten Labs repo)
// Source: https://www.walrus.xyz (official site: the same W opens the header wordmark)
// Default: the single path of MystenLabs/walrus docs/site/static/img/logo.svg (the Walrus W symbol, no fill, i.e. black). walrus.xyz serves the walrus wordmark in currentColor and has no brand kit page; its favicons are raster only. The docs favicon (docs/site/static/img/favicon.png, raster) shows the same W, white on black.
// Mono: the same path in currentColor.
/** Walrus storage icon (colored). */
export const Walrus = /* @__PURE__ */ createIcon(
  'Walrus',
  '0 0 64 64',
  () => (
    <path d="m24.1 42.03 2.57-28.43h10.66l2.58 28.43 1.45.28c1.38-3.24 5.21-14.66 6.16-28.7H60L50.38 50.4h-15.1L32.74 32h-1.48l-2.54 18.4h-15.1L4 13.6h12.48c.95 14.05 4.78 25.47 6.16 28.71z" />
  ),
  { fill: '#000' },
);

/** Walrus storage icon (monochrome). */
export const WalrusMono = /* @__PURE__ */ createIcon(
  'WalrusMono',
  '0 0 64 64',
  () => (
    <path d="m24.1 42.03 2.57-28.43h10.66l2.58 28.43 1.45.28c1.38-3.24 5.21-14.66 6.16-28.7H60L50.38 50.4h-15.1L32.74 32h-1.48l-2.54 18.4h-15.1L4 13.6h12.48c.95 14.05 4.78 25.47 6.16 28.71z" />
  ),
  { fill: 'currentColor' },
);
