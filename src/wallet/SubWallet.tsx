import { createIcon } from '../utils';

// Source: https://subwallet.app
/** Sub Wallet wallet icon (colored). */
export const SubWallet = /* @__PURE__ */ createIcon(
  'SubWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(.56 0 0 .56 13.53 4)">
      <path
        fill={`url(#${_id}-a)`}
        d="M65.93 36.33V24.15L11.75 0 0 5.18V47.9l40.67 18.06-21.9 9.62v-9.62L9.53 61.8 0 65.94V95l11.24 5 54.7-24.37V57.35L18.13 36.1V25.07l36.62 16.28 11.18-4.96z"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x1="0"
          x2="66"
          y1="50"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#004BFF" />
          <stop offset="1" stopColor="#4CEAAC" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Sub Wallet wallet icon (monochrome). */
export const SubWalletMono = /* @__PURE__ */ createIcon(
  'SubWalletMono',
  '0 0 64 64',
  () => (
    <path d="M50.46 24.35v-6.83L20.1 4l-6.58 2.9v23.92l22.78 10.1-12.27 5.4v-5.4l-5.17-2.32-5.34 2.33v16.26l6.3 2.81 30.63-13.65V36.11l-26.77-11.9v-6.18l20.5 9.12 6.27-2.78z" />
  ),
  { fill: 'currentColor' },
);
