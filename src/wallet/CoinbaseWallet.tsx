import { createIcon } from '../utils';

// Source: https://wallet.coinbase.com
// Coinbase "C" symbol paths (white circle + blue inner rect) shared across variants
// Original viewBox 0 0 2500 2500 → scale 0.0256 (64/2500)
/** Coinbase Wallet wallet icon (colored). */
export const CoinbaseWallet = /* @__PURE__ */ createIcon(
  'CoinbaseWallet',
  '0 0 2500 2500',
  () => (
    <>
      <path
        fill="#0052ff"
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0"
      />
      <path
        fill="#fff"
        d="M1250 362.1c490.4 0 887.9 397.5 887.9 887.9s-397.5 887.9-887.9 887.9-887.9-397.5-887.9-887.9S759.6 362.1 1250 362.1"
      />
      <path
        fill="#0052ff"
        d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70"
      />
    </>
  ),
  {},
);

/** Coinbase Wallet Circle wallet icon (colored). */
export const CoinbaseWalletCircle = /* @__PURE__ */ createIcon(
  'CoinbaseWalletCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#0052ff" />
      <path
        fill="#fff"
        d="M32 9.27c12.554 0 22.73 10.176 22.73 22.73S44.554 54.73 32 54.73 9.27 44.554 9.27 32 19.446 9.27 32 9.27"
      />
      <path
        fill="#0052ff"
        d="M26.401 24.735h11.195c.922 0 1.667.804 1.667 1.792V37.47c0 .99-.748 1.792-1.667 1.792H26.401c-.921 0-1.666-.804-1.666-1.792V26.527c0-.988.747-1.792 1.666-1.792"
      />
    </>
  ),
  {},
);

/** Coinbase Wallet Circle wallet icon (monochrome). */
export const CoinbaseWalletCircleMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-cbcm-a)`} />
      <defs>
        <mask id={`${_id}-cbcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M32 9.27c12.554 0 22.73 10.176 22.73 22.73S44.554 54.73 32 54.73 9.27 44.554 9.27 32 19.446 9.27 32 9.27"
          />
        </mask>
      </defs>
      <path d="M26.401 24.735h11.195c.922 0 1.667.804 1.667 1.792V37.47c0 .99-.748 1.792-1.667 1.792H26.401c-.921 0-1.666-.804-1.666-1.792V26.527c0-.988.747-1.792 1.666-1.792" />
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinbase Wallet Square wallet icon (colored). */
export const CoinbaseWalletSquare = /* @__PURE__ */ createIcon(
  'CoinbaseWalletSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#0052ff" rx="12.8" />
      <path
        fill="#fff"
        d="M32 9.27c12.554 0 22.73 10.176 22.73 22.73S44.554 54.73 32 54.73 9.27 44.554 9.27 32 19.446 9.27 32 9.27"
      />
      <path
        fill="#0052ff"
        d="M26.401 24.735h11.195c.922 0 1.667.804 1.667 1.792V37.47c0 .99-.748 1.792-1.667 1.792H26.401c-.921 0-1.666-.804-1.666-1.792V26.527c0-.988.747-1.792 1.666-1.792"
      />
    </>
  ),
  {},
);

/** Coinbase Wallet Square wallet icon (monochrome). */
export const CoinbaseWalletSquareMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-cbsqm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-cbsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M32 9.27c12.554 0 22.73 10.176 22.73 22.73S44.554 54.73 32 54.73 9.27 44.554 9.27 32 19.446 9.27 32 9.27"
          />
        </mask>
      </defs>
      <path d="M26.401 24.735h11.195c.922 0 1.667.804 1.667 1.792V37.47c0 .99-.748 1.792-1.667 1.792H26.401c-.921 0-1.666-.804-1.666-1.792V26.527c0-.988.747-1.792 1.666-1.792" />
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Coinbase Wallet wallet icon (monochrome). */
export const CoinbaseWalletMono = /* @__PURE__ */ createIcon(
  'CoinbaseWalletMono',
  '0 0 2500 2500',
  (_props, _id) => (
    <>
      <defs>
        <mask id={`${_id}-cbwm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M1250 362.1c490.4 0 887.9 397.5 887.9 887.9s-397.5 887.9-887.9 887.9-887.9-397.5-887.9-887.9S759.6 362.1 1250 362.1"
          />
        </mask>
      </defs>
      <path
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0"
        mask={`url(#${_id}-cbwm-a)`}
      />
      <path d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70" />
    </>
  ),
  { fill: 'currentColor', ids: true },
);
