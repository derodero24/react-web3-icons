import { createIcon } from '../utils';

// Source: https://subwallet.app
/** Sub Wallet wallet icon (colored). */
export const SubWallet = /* @__PURE__ */ createIcon(
  'SubWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(.56 0 0 .56 13.534 4)">
      <path
        fill={`url(#${_id}-a)`}
        d="M65.934 36.333V24.146L11.75 0 0 5.182v42.711l40.667 18.052-21.902 9.625v-9.625l-9.24-4.157L0 65.945v29.044L11.236 100l54.698-24.374v-18.28L18.138 36.105V25.057l36.617 16.287 11.18-4.961z"
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
    <path d="M50.457 24.346v-6.824L20.114 4l-6.58 2.902V30.82l22.774 10.11-12.266 5.39v-5.39l-5.174-2.33-5.334 2.328v16.265L19.826 60l30.631-13.65V36.115L23.691 24.219v-6.187l20.506 9.12 6.26-2.778z" />
  ),
  { fill: 'currentColor' },
);
