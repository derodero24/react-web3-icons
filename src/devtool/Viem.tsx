import { createIcon } from '../utils';

// Source: https://github.com/wevm/viem/blob/main/site/public/logo-light-hug.svg
/** Viem devtool icon (colored). */
export const Viem = /* @__PURE__ */ createIcon(
  'Viem',
  '0 70 162 152',
  () => (
    <path d="m83.3 220.4 52.36-123.42c7.14-17.34 9.86-19.04 24.48-19.04V70.8H107.1v7.14c13.6 0 20.06.68 20.06 7.82 0 2.72-.68 6.12-2.72 11.22l-30.26 75.48-32.64-76.5c-1.7-4.76-2.72-8.16-2.72-10.54 0-6.8 6.46-7.48 18.02-7.48V70.8H1.02v7.14c13.94 0 15.98 2.72 22.78 17.68L81.26 220.4z" />
  ),
  '#1E1E20',
);

/** Viem devtool icon (monochrome). */
export const ViemMono = /* @__PURE__ */ createIcon(
  'ViemMono',
  '0 70 162 152',
  () => (
    <path d="m83.3 220.4 52.36-123.42c7.14-17.34 9.86-19.04 24.48-19.04V70.8H107.1v7.14c13.6 0 20.06.68 20.06 7.82 0 2.72-.68 6.12-2.72 11.22l-30.26 75.48-32.64-76.5c-1.7-4.76-2.72-8.16-2.72-10.54 0-6.8 6.46-7.48 18.02-7.48V70.8H1.02v7.14c13.94 0 15.98 2.72 22.78 17.68L81.26 220.4z" />
  ),
  'currentColor',
);
