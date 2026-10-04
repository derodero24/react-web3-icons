import { createIcon } from '../utils';

// Source: https://repository.sonic.soniclabs.com/validator/sonic.svg (official asset host, referenced from docs.soniclabs.com validator-node docs)
// Source: https://mediakit.soniclabs.com (official Sonic media kit: Token-icons 8.zip, S/S_token.svg)
// Lookup keys: chain ID 250 and slug fantom resolve to Sonic, not to the deprecated Fantom export, because Fantom Opera was succeeded by Sonic (FTM upgraded 1:1 to S; issue #787).
// Circle: the official S token (S_token.svg in the media kit's Token-icons 8.zip: the #F5F5F5 mark on a #141416 disc, drawn as a 200.002x200 rect with rx 100), shapes unchanged and full-bleed on the 64 grid
// CircleMono: the token's disc in currentColor with the mark knocked out (fill-rule=evenodd)
/** Sonic chain icon (colored). */
export const Sonic = /* @__PURE__ */ createIcon(
  'Sonic',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-2.88 -2.88)scale(.38758)">
      <path
        fill={`url(#${_id}-a)`}
        fillRule="evenodd"
        d="M90 7.5c45.53 0 82.5 36.97 82.5 82.5s-36.97 82.5-82.5 82.5S7.5 135.53 7.5 90 44.47 7.5 90 7.5m67.86 90.57c-42.09 6.93-71.15 27.29-93.92 53.61 8 3.18 16.74 4.93 25.9 4.93 35.04 0 63.96-25.58 68.02-58.54M53.88 146.7c12.08-15.36 29.01-28.89 49.34-40.15-20.67 4.7-41.25 16.32-61.07 31.27a69 69 0 0 0 11.73 8.88M21.54 95.8c1 13.38 6.1 24.9 14.07 34.91 17.79-16.57 41.22-28.7 70.2-35.37zm14.13-46.37c-7.9 9.9-12.9 21.24-14.01 34.45l84.07.76c-29.88-7.8-53.23-19.18-70.06-35.21M157.9 82.46C154 49.36 125 23.6 89.85 23.6c-9.14 0-17.86 1.74-25.84 4.9 14.89 21.28 57.16 49.58 93.9 53.95M54.1 33.38a69 69 0 0 0-11.38 8.48c13.22 12.7 32.67 23.77 61.42 32.34C83.28 62.68 67 49 54.1 33.38"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x2="1"
          gradientTransform="rotate(.11 -45847.87 3874.13)scale(164.74032)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fac461" />
          <stop offset=".28" stopColor="#e3570a" />
          <stop offset=".55" stopColor="#7f6562" />
          <stop offset=".73" stopColor="#3b5d88" />
          <stop offset="1" stopColor="#203f55" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Sonic chain icon (monochrome). */
export const SonicMono = /* @__PURE__ */ createIcon(
  'SonicMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 .02C49.65.02 63.98 14.35 63.98 32S49.65 63.98 32 63.98.02 49.65.02 32 14.35.02 32 .02m26.3 35.1C42 37.83 30.73 45.7 21.9 55.92a27 27 0 0 0 10.04 1.9c13.58 0 24.79-9.9 26.36-22.68M18 53.98c4.68-5.96 11.25-11.2 19.12-15.57-8 1.83-15.98 6.33-23.67 12.12A27 27 0 0 0 18 53.98M5.46 34.25c.4 5.18 2.37 9.65 5.46 13.53 6.9-6.42 15.98-11.13 27.2-13.71zm5.48-17.97c-3.06 3.83-5 8.23-5.43 13.35l32.59.3c-11.58-3.03-20.63-7.44-27.16-13.65m47.38 12.8C56.8 16.25 45.56 6.27 31.94 6.27c-3.54 0-6.92.67-10.01 1.9 5.77 8.25 22.15 19.21 36.39 20.9m-40.23-19a27 27 0 0 0-4.41 3.28c5.12 4.93 12.66 9.21 23.8 12.54-8.08-4.47-14.4-9.77-19.4-15.82"
    />
  ),
  { fill: 'currentColor' },
);

/** Sonic Circle chain icon (colored). */
export const SonicCircle = /* @__PURE__ */ createIcon(
  'SonicCircle',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="32" />
      <g fill="#F5F5F5">
        <path d="M37.72 38.8c-10.59 3.17-19.34 7.8-24.82 13.23l-.25.24a29 29 0 0 0 4.79 3.65l.37-.45a71 71 0 0 1 4.77-5.25 70 70 0 0 1 15.14-11.43z" />
        <path d="M4 34.09a28 28 0 0 0 5.83 15.07l.15-.15c3.4-3.34 7.8-6.38 13.14-9.03 4.67-2.32 10.03-4.32 15.8-5.89z" />
        <path d="M25.54 10.82C35 20.25 46.92 26.48 60 28.84 58.42 14.87 46.52 4 32.05 4a28 28 0 0 0-10.79 2.13 69 69 0 0 0 4.28 4.69" />
        <path d="M12.9 11.97c5.48 5.44 14.23 10.06 24.82 13.24a71 71 0 0 1-15.15-11.43 71 71 0 0 1-4.77-5.25l-.37-.45a28 28 0 0 0-4.78 3.65z" />
        <path d="M25.54 53.18a66 66 0 0 0-4.28 4.69A28 28 0 0 0 32.05 60C46.5 60 58.42 49.13 60 35.15c-13.07 2.37-24.99 8.6-34.45 18.02z" />
        <path d="M23.12 24.02c-5.33-2.65-9.75-5.69-13.14-9.03l-.15-.15A27.7 27.7 0 0 0 4 29.9h34.92c-5.77-1.57-11.13-3.56-15.8-5.9z" />
      </g>
    </>
  ),
  { fill: '#141416' },
);

/** Sonic Circle chain icon (monochrome). */
export const SonicCircleMono = /* @__PURE__ */ createIcon(
  'SonicCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 0 1 0 64 32 32 0 0 1 0-64m5.71 38.8c-10.58 3.17-19.33 7.8-24.81 13.23l-.25.24a28 28 0 0 0 4.79 3.65l.37-.45q2.26-2.75 4.77-5.25a70 70 0 0 1 15.14-11.43M4 34.08a28 28 0 0 0 5.83 15.07l.15-.15c3.4-3.34 7.81-6.38 13.14-9.03 4.67-2.32 10.03-4.32 15.81-5.9zm21.54-23.27C35 20.25 46.92 26.48 60 28.84 58.42 14.87 46.5 4 32.05 4c-3.82 0-7.46.76-10.79 2.13q2.04 2.45 4.28 4.7M12.9 11.97c5.48 5.44 14.23 10.06 24.81 13.24a71 71 0 0 1-15.14-11.43 71 71 0 0 1-4.77-5.25l-.37-.45a28 28 0 0 0-4.78 3.65zm12.64 41.2a66 66 0 0 0-4.28 4.7A28 28 0 0 0 32.05 60C46.5 60 58.42 49.13 60 35.15c-13.07 2.37-24.99 8.6-34.46 18.02m-2.42-29.15c-5.33-2.65-9.75-5.69-13.14-9.03l-.15-.15A28 28 0 0 0 4 29.9h34.92c-5.77-1.57-11.13-3.57-15.8-5.9z"
    />
  ),
  { fill: 'currentColor' },
);
