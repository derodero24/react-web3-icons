import { createIcon } from '../utils';

// Source: https://tether.to/en/ (official site: the Tether mark of the header logo, inline SVG)
// Colored: the mark (first path, #009393, evenodd) of the official header lockup served inline on tether.to (viewBox 0 0 184 41), path unchanged without the wordmark, placed on the 64 grid; tether.to/apple-touch-icon.png uses the same #009393
// Mono: the same path in currentColor
// Circle / CircleMono: legacy composite (legacy #26A17B disc with the mark in white), not an official Tether asset; kept until #815 decides its fate
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
    <>
      <circle cx="32" cy="32" r="32" fill="#26A17B" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M19.1 13.96h26.52c.63 0 1.21.33 1.53.86l7.72 13.02a1.7 1.7 0 0 1-.29 2.07L33.32 50.28a1.8 1.8 0 0 1-2.48 0L9.61 29.94a1.7 1.7 0 0 1-.26-2.12l8.25-13.04c.32-.51.9-.82 1.5-.82m23.1 5.81v3.65h-7.56v2.54c5.3.27 9.29 1.38 9.31 2.71v2.78c-.02 1.33-4 2.44-9.3 2.71v6.22h-5.02v-6.22c-5.3-.27-9.28-1.38-9.31-2.71v-2.78c.03-1.33 4-2.44 9.3-2.71v-2.54h-7.54v-3.65zM32.13 32.26c5.66 0 10.39-.94 11.54-2.2-.98-1.06-4.53-1.9-9.04-2.13v2.65a49 49 0 0 1-2.5.06q-1.3 0-2.51-.06v-2.65c-4.5.23-8.06 1.07-9.04 2.13 1.16 1.26 5.89 2.2 11.55 2.2"
      />
    </>
  ),
  {},
);

/** Usdt Circle coin icon (monochrome). */
export const UsdtCircleMono = /* @__PURE__ */ createIcon(
  'UsdtCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-usdtc-a)`} />
      <defs>
        <mask id={`${_id}-usdtc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M19.1 13.96h26.52c.63 0 1.21.33 1.53.86l7.72 13.02a1.7 1.7 0 0 1-.29 2.07L33.32 50.28a1.8 1.8 0 0 1-2.48 0L9.61 29.94a1.7 1.7 0 0 1-.26-2.12l8.25-13.04c.32-.51.9-.82 1.5-.82m23.1 5.81v3.65h-7.56v2.54c5.3.27 9.29 1.38 9.31 2.71v2.78c-.02 1.33-4 2.44-9.3 2.71v6.22h-5.02v-6.22c-5.3-.27-9.28-1.38-9.31-2.71v-2.78c.03-1.33 4-2.44 9.3-2.71v-2.54h-7.54v-3.65zM32.13 32.26c5.66 0 10.39-.94 11.54-2.2-.98-1.06-4.53-1.9-9.04-2.13v2.65a49 49 0 0 1-2.5.06q-1.3 0-2.51-.06v-2.65c-4.5.23-8.06 1.07-9.04 2.13 1.16 1.26 5.89 2.2 11.55 2.2"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
