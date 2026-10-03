import { createIcon } from '../utils';

// Source: https://getmonero.org
/** Xmr coin icon (colored). */
export const Xmr = /* @__PURE__ */ createIcon(
  'Xmr',
  '0 0 64 64',
  () => (
    <g transform="scale(2)">
      <circle cx="16" cy="16" r="16" fill="#F60" />
      <path
        fill="#FFF"
        d="M15.97 5.24c5.99 0 10.83 4.84 10.83 10.82a11 11 0 0 1-.56 3.43H23v-9.1l-7.04 7.05-7.04-7.04v9.1H5.7a11 11 0 0 1-.55-3.44c0-5.98 4.84-10.82 10.82-10.82m-1.61 13.78L16 20.64l1.61-1.62 3.05-3.08v5.72h4.55a10.8 10.8 0 0 1-9.24 5.2c-3.9 0-7.33-2.09-9.24-5.2h4.55v-5.72z"
      />
    </g>
  ),
  {},
);

/** Xmr coin icon (monochrome). */
export const XmrMono = /* @__PURE__ */ createIcon(
  'XmrMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m31.94-21.53c11.97 0 21.65 9.68 21.65 21.65a22 22 0 0 1-1.12 6.86h-6.45V20.8L31.94 34.87 17.86 20.8V39h-6.45a22 22 0 0 1-1.12-6.87c0-11.97 9.68-21.65 21.65-21.65zm-3.22 27.57L32 41.27l3.23-3.23 6.1-6.16v11.44h9.1a21.6 21.6 0 0 1-18.49 10.39c-7.8 0-14.67-4.17-18.48-10.39h9.1V31.88z"
    />
  ),
  { fill: 'currentColor' },
);
