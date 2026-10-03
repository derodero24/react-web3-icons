import { createIcon } from '../utils';

// Source: https://github.com/wevm/viem/blob/main/site/public/logo-light-hug.svg
/** Viem devtool icon (colored). */
export const Viem = /* @__PURE__ */ createIcon(
  'Viem',
  '0 0 64 64',
  () => (
    <path d="m32.96 58.3 18.42-43.4c2.5-6.1 3.46-6.7 8.6-6.7V5.7H41.33v2.5c4.78 0 7.06.24 7.06 2.75 0 .96-.24 2.16-.96 3.95L36.79 41.44 25.3 14.54c-.6-1.67-.96-2.87-.96-3.7 0-2.4 2.27-2.64 6.34-2.64V5.7H4.03v2.5c4.9 0 5.62.96 8 6.22L32.25 58.3z" />
  ),
  { fill: '#1E1E20' },
);

/** Viem devtool icon (monochrome). */
export const ViemMono = /* @__PURE__ */ createIcon(
  'ViemMono',
  '0 0 64 64',
  () => (
    <path d="m32.96 58.3 18.42-43.4c2.5-6.1 3.46-6.7 8.6-6.7V5.7H41.33v2.5c4.78 0 7.06.24 7.06 2.75 0 .96-.24 2.16-.96 3.95L36.79 41.44 25.3 14.54c-.6-1.67-.96-2.87-.96-3.7 0-2.4 2.27-2.64 6.34-2.64V5.7H4.03v2.5c4.9 0 5.62.96 8 6.22L32.25 58.3z" />
  ),
  { fill: 'currentColor' },
);
