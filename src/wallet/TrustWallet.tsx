import { createIcon } from '../utils';

// Source: https://trustwallet.com
/** Trust Wallet Square wallet icon (colored). */
export const TrustWalletSquare = /* @__PURE__ */ createIcon(
  'TrustWalletSquare',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#fff"
        d="M0 16.25C0 7.28 7.28 0 16.25 0h31.5C56.72 0 64 7.28 64 16.25v31.5C64 56.72 56.72 64 47.75 64h-31.5C7.28 64 0 56.72 0 47.75z"
      />
      <path
        fill="none"
        stroke="#0a64bc"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4.38"
        d="M32.02 13.44C38.48 18.83 45.88 18.5 48 18.5c-.47 30.67-4 24.59-15.98 33.19-12-8.6-15.5-2.52-15.96-33.2 2.1 0 9.5.34 15.96-5.05z"
      />
    </>
  ),
  {},
);

/** Trust Wallet Circle wallet icon (colored). */
export const TrustWalletCircle = /* @__PURE__ */ createIcon(
  'TrustWalletCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#0a64bc" />
      <path
        fill="none"
        stroke="#fff"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
        d="M32.63 14c6.32 5.28 13.57 4.96 15.65 4.96-.46 30.03-3.91 24.08-15.65 32.5-11.74-8.42-15.18-2.47-15.63-32.5 2.05 0 9.3.32 15.63-4.96z"
      />
    </>
  ),
  {},
);

/** Trust Wallet Square wallet icon (monochrome). */
export const TrustWalletSquareMono = /* @__PURE__ */ createIcon(
  'TrustWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <defs>
        <mask id={`${_id}-twm-a`}>
          <rect width="1024" height="1024" fill="#fff" />
          <path
            fill="none"
            stroke="black"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="70"
            d="M512.3 215c103.32 86.29 221.8 80.97 255.65 80.97C760.55 786.7 704.13 689.39 512.3 827 320.47 689.4 264.4 786.7 257 295.97c33.5 0 151.98 5.32 255.3-80.97z"
          />
        </mask>
      </defs>
      <path
        d="M0 260C0 116.4 116.4 0 260 0h504c143.6 0 260 116.4 260 260v504c0 143.6-116.4 260-260 260H260C116.4 1024 0 907.6 0 764z"
        mask={`url(#${_id}-twm-a)`}
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Trust Wallet Circle wallet icon (monochrome). */
export const TrustWalletCircleMono = /* @__PURE__ */ createIcon(
  'TrustWalletCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <defs>
        <mask id={`${_id}-twm-circle-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="none"
            stroke="black"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M32.63 14c6.32 5.28 13.57 4.96 15.65 4.96-.46 30.03-3.91 24.08-15.65 32.5-11.74-8.42-15.18-2.47-15.63-32.5 2.05 0 9.3.32 15.63-4.96z"
          />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-twm-circle-a)`} />
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Trust Wallet wallet icon (colored). */
export const TrustWallet = TrustWalletSquare;

/** Trust Wallet wallet icon (monochrome). */
export const TrustWalletMono = TrustWalletSquareMono;
