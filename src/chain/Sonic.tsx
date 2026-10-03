import { createIcon } from '../utils';

// Source: https://repository.sonic.soniclabs.com/validator/sonic.svg (official asset host, referenced from docs.soniclabs.com validator-node docs)
// Lookup keys: chain ID 250 and slug fantom resolve to Sonic, not to the deprecated Fantom export, because Fantom Opera was succeeded by Sonic (FTM upgraded 1:1 to S; issue #787).
/** Sonic chain icon (colored). */
export const Sonic = /* @__PURE__ */ createIcon(
  'Sonic',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-2.882 -2.882)scale(.38758)">
      <path
        fill={`url(#${_id}-a)`}
        fillRule="evenodd"
        d="M90 7.5c45.533 0 82.5 36.967 82.5 82.5s-36.967 82.5-82.5 82.5S7.5 135.533 7.5 90 44.467 7.5 90 7.5m67.861 90.573c-42.086 6.922-71.149 27.287-93.917 53.61 7.993 3.176 16.74 4.927 25.904 4.927 35.031 0 63.956-25.584 68.013-58.537m-103.98 48.63c12.075-15.367 29.012-28.893 49.34-40.152-20.672 4.701-41.249 16.316-61.074 31.266a68.6 68.6 0 0 0 11.734 8.886M21.535 95.807c1.014 13.37 6.108 24.893 14.076 34.906 17.787-16.574 41.222-28.705 70.191-35.375zm14.138-46.378c-7.899 9.894-12.908 21.244-14.016 34.446l84.073.762C75.854 76.841 52.501 65.46 35.673 49.429m122.23 33.03c-3.914-33.105-32.91-58.849-68.051-58.849-9.142 0-17.867 1.742-25.84 4.901 14.887 21.28 57.159 49.575 93.891 53.948m-103.8-49.075A68.6 68.6 0 0 0 42.73 41.86c13.223 12.708 32.666 23.768 61.418 32.338-20.864-11.522-37.144-25.196-50.045-40.814"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x2="1"
          gradientTransform="rotate(.112 -45847.869 3874.135)scale(164.74032)"
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
      d="M32 .025C49.648.025 63.975 14.352 63.975 32S49.648 63.975 32 63.975.025 49.648.025 32 14.352.025 32 .025m26.302 35.104c-16.312 2.683-27.576 10.576-36.4 20.778a27.1 27.1 0 0 0 10.04 1.91c13.576 0 24.787-9.916 26.36-22.688m-40.3 18.848c4.68-5.956 11.244-11.198 19.122-15.562-8.012 1.822-15.987 6.324-23.67 12.118A26.6 26.6 0 0 0 18 53.977M5.465 34.251c.393 5.182 2.367 9.648 5.455 13.529 6.894-6.424 15.977-11.126 27.205-13.711zm5.48-17.975c-3.062 3.834-5.004 8.233-5.433 13.35l32.585.296c-11.58-3.022-20.63-7.433-27.153-13.646m47.374 12.801C56.8 16.247 45.563 6.27 31.943 6.27a27.1 27.1 0 0 0-10.015 1.9c5.77 8.247 22.153 19.213 36.39 20.908m-40.23-19.02a26.6 26.6 0 0 0-4.409 3.285c5.125 4.925 12.66 9.212 23.805 12.534-8.087-4.466-14.397-9.766-19.397-15.82"
    />
  ),
  { fill: 'currentColor' },
);
