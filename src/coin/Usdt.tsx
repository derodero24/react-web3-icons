import { createIcon } from '../utils';

// Source: https://tether.to/en/ (official site: the Tether mark of the header logo, inline SVG)
// Source: https://tether.to/files/logos.zip (official logo kit: logoCircle.svg)
// Colored: the mark (first path, #009393, evenodd) of the official header lockup served inline on tether.to (viewBox 0 0 184 41), path unchanged without the wordmark, placed on the 64 grid; tether.to/apple-touch-icon.png uses the same #009393
// Mono: the same path in currentColor
// Circle / CircleMono: the official token icon logoCircle.svg from Tether's logo kit (tether.to/files/logos.zip; also served at tether.to/images/logoCircle.svg): the white mark on a #009393 disc, paths unchanged and filling the 64 grid. It replaces a legacy #26A17B composite. CircleMono is the disc in currentColor with the mark knocked out (one evenodd path)
/** Usdt coin icon (colored). */
export const Usdt = /* @__PURE__ */ createIcon(
  'Usdt',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M16.21 8.89h32.24c.77 0 1.48.41 1.87 1.08L59.7 26.3c.49.85.34 1.92-.35 2.6L33.5 54.5c-.84.83-2.18.83-3.02 0L4.66 28.95c-.71-.7-.85-1.8-.32-2.65L14.38 9.9a2.2 2.2 0 0 1 1.82-1m28.08 7.3v4.58H35.1v3.18c6.46.34 11.3 1.74 11.33 3.41v3.49c-.04 1.67-4.87 3.07-11.33 3.4v7.81H29v-7.8c-6.44-.34-11.28-1.74-11.32-3.41v-3.49c.04-1.67 4.88-3.07 11.33-3.4v-3.19h-9.19V16.2zM32.06 31.86c6.88 0 12.63-1.18 14.04-2.76-1.2-1.33-5.51-2.38-11-2.67v3.33a58 58 0 0 1-6.1 0v-3.33c-5.48.29-9.8 1.34-10.99 2.67 1.4 1.58 7.16 2.76 14.05 2.76"
    />
  ),
  { fill: '#009393' },
);

/** Usdt coin icon (monochrome). */
export const UsdtMono = /* @__PURE__ */ createIcon(
  'UsdtMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M16.21 8.89h32.24c.77 0 1.48.41 1.87 1.08L59.7 26.3c.49.85.34 1.92-.35 2.6L33.5 54.5c-.84.83-2.18.83-3.02 0L4.66 28.95c-.71-.7-.85-1.8-.32-2.65L14.38 9.9a2.2 2.2 0 0 1 1.82-1m28.08 7.3v4.58H35.1v3.18c6.46.34 11.3 1.74 11.33 3.41v3.49c-.04 1.67-4.87 3.07-11.33 3.4v7.81H29v-7.8c-6.44-.34-11.28-1.74-11.32-3.41v-3.49c.04-1.67 4.88-3.07 11.33-3.4v-3.19h-9.19V16.2zM32.06 31.86c6.88 0 12.63-1.18 14.04-2.76-1.2-1.33-5.51-2.38-11-2.67v3.33a58 58 0 0 1-6.1 0v-3.33c-5.48.29-9.8 1.34-10.99 2.67 1.4 1.58 7.16 2.76 14.05 2.76"
    />
  ),
  { fill: 'currentColor' },
);

/** Usdt Circle coin icon (colored). */
export const UsdtCircle = /* @__PURE__ */ createIcon(
  'UsdtCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.08)">
      <circle cx="400" cy="400" r="400" fill="#009393" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M400.49 428.59c68.79 0 126.28-11.63 140.33-27.17-11.93-13.18-55.08-23.56-109.88-26.4v32.83c-9.81.51-20.01.76-30.46.76s-20.65-.25-30.48-.76v-32.83c-54.78 2.84-97.95 13.22-109.88 26.4 14.07 15.54 71.57 27.17 140.36 27.17Zm122.22-154.53v45.21h-91.77v31.35c64.46 3.35 112.83 17.13 113.19 33.62v34.38c-.36 16.49-48.73 30.24-113.19 33.6v76.94h-60.93v-76.94c-64.46-3.35-112.81-17.11-113.17-33.6v-34.38c.36-16.49 48.71-30.27 113.17-33.62v-31.35h-91.77v-45.21h244.48Zm-280.56-71.95h322.16c7.7 0 14.79 4.05 18.63 10.63l93.85 161.16a21.04 21.04 0 0 1-3.52 25.68L414.93 651.76c-8.38 8.17-21.84 8.17-30.2 0L126.71 399.92c-7.09-6.94-8.43-17.79-3.2-26.19l100.33-161.49c3.91-6.28 10.85-10.12 18.32-10.12Z"
      />
    </g>
  ),
  {},
);

/** Usdt Circle coin icon (monochrome). */
export const UsdtCircleMono = /* @__PURE__ */ createIcon(
  'UsdtCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m32.04 2.29c5.5 0 10.1-.93 11.23-2.18-.96-1.05-4.41-1.88-8.8-2.1v2.62q-1.18.06-2.43.06c-1.25 0-1.65-.02-2.44-.06V30c-4.38.23-7.84 1.06-8.79 2.11 1.13 1.25 5.73 2.18 11.23 2.18m9.78-12.37v3.62h-7.34v2.51c5.15.27 9.02 1.37 9.05 2.69v2.75c-.03 1.32-3.9 2.42-9.05 2.69v6.15H29.6v-6.15c-5.16-.27-9.02-1.37-9.05-2.69v-2.75c.03-1.32 3.9-2.42 9.05-2.69v-2.5h-7.34v-3.63zm-22.45-5.75h25.77c.62 0 1.19.32 1.5.85l7.5 12.9c.4.66.28 1.5-.28 2.05L33.2 52.14c-.67.65-1.74.65-2.41 0L10.14 32a1.7 1.7 0 0 1-.26-2.1l8.03-12.91c.31-.5.87-.81 1.46-.81"
    />
  ),
  { fill: 'currentColor' },
);
