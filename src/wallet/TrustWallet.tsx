import { createIcon } from '../utils';

// Source: https://trustwallet.com
/** Trust Wallet Square wallet icon (colored). */
export const TrustWalletSquare = /* @__PURE__ */ createIcon(
  'TrustWalletSquare',
  '0 0 1024 1024',
  () => (
    <>
      <path
        fill="#fff"
        d="M0 260C0 116.406 116.406 0 260 0h504c143.594 0 260 116.406 260 260v504c0 143.594-116.406 260-260 260H260C116.406 1024 0 907.594 0 764z"
      />
      <path
        fill="none"
        stroke="#0a64bc"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="70"
        d="M512.3 215c103.319 86.288 221.801 80.966 255.653 80.966C760.548 786.707 704.128 689.395 512.3 827 320.472 689.395 264.405 786.707 257 295.966c33.499 0 151.981 5.322 255.3-80.966z"
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
        d="M32.627 14c6.324 5.282 13.576 4.956 15.648 4.956-.453 30.038-3.907 24.081-15.648 32.504C20.885 43.037 17.453 48.994 17 18.956c2.05 0 9.303.326 15.627-4.956z"
        stroke="#fff"
        strokeWidth="4"
        strokeMiterlimit="10"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  {},
);

/** Trust Wallet Square wallet icon (monochrome). */
export const TrustWalletSquareMono = /* @__PURE__ */ createIcon(
  'TrustWalletSquareMono',
  '0 0 1024 1024',
  (_props, _id) => (
    <>
      <defs>
        <mask id={`${_id}-twm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="none"
            stroke="black"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="70"
            d="M512.3 215c103.319 86.288 221.801 80.966 255.653 80.966C760.548 786.707 704.128 689.395 512.3 827 320.472 689.395 264.405 786.707 257 295.966c33.499 0 151.981 5.322 255.3-80.966z"
          />
        </mask>
      </defs>
      <path
        d="M0 260C0 116.406 116.406 0 260 0h504c143.594 0 260 116.406 260 260v504c0 143.594-116.406 260-260 260H260C116.406 1024 0 907.594 0 764z"
        mask={`url(#${_id}-twm-a)`}
      />
    </>
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
            d="M32.627 14c6.324 5.282 13.576 4.956 15.648 4.956-.453 30.038-3.907 24.081-15.648 32.504C20.885 43.037 17.453 48.994 17 18.956c2.05 0 9.303.326 15.627-4.956z"
            stroke="black"
            strokeWidth="4"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            fill="none"
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
