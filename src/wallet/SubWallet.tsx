import { createIcon } from '../utils';

// Source: https://subwallet.app
/** Sub Wallet wallet icon (colored). */
export const SubWallet = /* @__PURE__ */ createIcon(
  'SubWallet',
  '0 0 66 100',
  _id => (
    <>
      <path
        fill={`url(#${_id}-a)`}
        d="M65.934 36.333V24.146L11.75 0 0 5.182v42.711l40.667 18.052-21.902 9.625V65.945l-9.24-4.157L0 65.945v29.044L11.236 100l54.698-24.374V57.346L18.138 36.105V25.057l36.617 16.287 11.18-4.961z"
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
    </>
  ),
);

/** Sub Wallet wallet icon (monochrome). */
export const SubWalletMono = /* @__PURE__ */ createIcon(
  'SubWalletMono',
  '0 0 66 100',
  () => (
    <path d="M65.934 36.333V24.146L11.75 0 0 5.182v42.711l40.667 18.052-21.902 9.625V65.945l-9.24-4.157L0 65.945v29.044L11.236 100l54.698-24.374V57.346L18.138 36.105V25.057l36.617 16.287 11.18-4.961z" />
  ),
  'currentColor',
);
