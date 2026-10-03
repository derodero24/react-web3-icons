import { createIcon } from '../utils';

// Source: https://repository.sonic.soniclabs.com/validator/sonic.svg (official asset host, referenced from docs.soniclabs.com validator-node docs)
// Lookup keys: chain ID 250 and slug fantom resolve to Sonic, not to the deprecated Fantom export, because Fantom Opera was succeeded by Sonic (FTM upgraded 1:1 to S; issue #787).
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
