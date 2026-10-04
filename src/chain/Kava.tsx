import { createIcon } from '../utils';

// Source: https://kava.io
// Source: https://cdn.prod.website-files.com/61e9c71623b1f0311abcbbbc/622b68fc6c920e4466196240_Kava-Coin.svg (official KAVA coin, linked from https://www.kava.io/branding)
// Circle: the official Kava-Coin.svg (a white K, one rect and one polygon, on a #FF433E disc), shapes unchanged and full-bleed on the 64 grid; CircleMono is that disc in currentColor with the K knocked out (fill-rule=evenodd)
/** Kava chain icon (colored). */
export const Kava = /* @__PURE__ */ createIcon(
  'Kava',
  '0 0 64 64',
  () => (
    <path d="M18.8 60V4h-8.79v56zM43 60 23.2 32 43 4.01h11L34.2 32 54 60z" />
  ),
  { fill: '#FF564F' },
);

/** Kava chain icon (monochrome). */
export const KavaMono = /* @__PURE__ */ createIcon(
  'KavaMono',
  '0 0 64 64',
  () => (
    <path d="M18.8 60V4h-8.79v56zM43 60 23.2 32 43 4.01h11L34.2 32 54 60z" />
  ),
  { fill: 'currentColor' },
);

/** Kava Circle chain icon (colored). */
export const KavaCircle = /* @__PURE__ */ createIcon(
  'KavaCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" />
      <rect width="6.45" height="36.98" x="17.07" y="13.53" fill="#fff" />
      <polygon
        fill="#fff"
        points="41.17,50.48 27.02,32 41.17,13.53 49.25,13.53 35.33,32 49.25,50.48"
      />
    </>
  ),
  { fill: '#FF433E' },
);

/** Kava Circle chain icon (monochrome). */
export const KavaCircleMono = /* @__PURE__ */ createIcon(
  'KavaCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m17.08-18.48h6.45V50.5h-6.46Zm24.1 36.96L27.03 32l14.14-18.48h8.08L35.33 32l13.92 18.48Z"
    />
  ),
  { fill: 'currentColor' },
);
