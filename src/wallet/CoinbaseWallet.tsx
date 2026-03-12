import { createIcon } from '../utils';

/** Coinbase Wallet wallet icon (colored). */
export const CoinbaseWallet = createIcon(
  'CoinbaseWallet',
  '0 0 2500 2500',
  () => (
    <>
      <path
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0z"
        fill="#0052ff"
      />
      <path
        d="M1250 362.1h0c490.4 0 887.9 397.5 887.9 887.9h0c0 490.4-397.5 887.9-887.9 887.9h0c-490.4 0-887.9-397.5-887.9-887.9h0c0-490.4 397.5-887.9 887.9-887.9z"
        fill="#fff"
      />
      <path
        d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70z"
        fill="#0052ff"
      />
    </>
  ),
);

// Coinbase "C" symbol paths (white circle + blue inner rect) shared across variants
const CB_WHITE_CIRCLE =
  'M1250 362.1c490.4 0 887.9 397.5 887.9 887.9 0 490.4-397.5 887.9-887.9 887.9-490.4 0-887.9-397.5-887.9-887.9 0-490.4 397.5-887.9 887.9-887.9z';
const CB_INNER_RECT =
  'M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70z';

// Original viewBox 0 0 2500 2500 → scale 0.0256 (64/2500)
const CB_CIRCLE_TX = 'translate(0 0) scale(0.0256)';

/** Coinbase Wallet Circle wallet icon (colored). */
export const CoinbaseWalletCircle = createIcon(
  'CoinbaseWalletCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#0052ff" />
      <path d={CB_WHITE_CIRCLE} transform={CB_CIRCLE_TX} fill="#fff" />
      <path d={CB_INNER_RECT} transform={CB_CIRCLE_TX} fill="#0052ff" />
    </>
  ),
);

/** Coinbase Wallet Circle wallet icon (monochrome). */
export const CoinbaseWalletCircleMono = createIcon(
  'CoinbaseWalletCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-cbcm-a)`} />
      <defs>
        <mask id={`${_id}-cbcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={CB_WHITE_CIRCLE} transform={CB_CIRCLE_TX} fill="#000" />
        </mask>
      </defs>
      <path d={CB_INNER_RECT} transform={CB_CIRCLE_TX} />
    </>
  ),
  'currentColor',
);

/** Coinbase Wallet Square wallet icon (colored). */
export const CoinbaseWalletSquare = createIcon(
  'CoinbaseWalletSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="12.8" fill="#0052ff" />
      <path d={CB_WHITE_CIRCLE} transform={CB_CIRCLE_TX} fill="#fff" />
      <path d={CB_INNER_RECT} transform={CB_CIRCLE_TX} fill="#0052ff" />
    </>
  ),
);

/** Coinbase Wallet Square wallet icon (monochrome). */
export const CoinbaseWalletSquareMono = createIcon(
  'CoinbaseWalletSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-cbsqm-a)`} />
      <defs>
        <mask id={`${_id}-cbsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={CB_WHITE_CIRCLE} transform={CB_CIRCLE_TX} fill="#000" />
        </mask>
      </defs>
      <path d={CB_INNER_RECT} transform={CB_CIRCLE_TX} />
    </>
  ),
  'currentColor',
);

/** Coinbase Wallet wallet icon (monochrome). */
export const CoinbaseWalletMono = createIcon(
  'CoinbaseWalletMono',
  '0 0 2500 2500',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-cbwm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M1250 362.1h0c490.4 0 887.9 397.5 887.9 887.9h0c0 490.4-397.5 887.9-887.9 887.9h0c-490.4 0-887.9-397.5-887.9-887.9h0c0-490.4 397.5-887.9 887.9-887.9z"
            fill="#000"
          />
        </mask>
      </defs>
      <path
        d="M520.7 0h1458.5C2266.9 0 2500 250.8 2500 560.2v1379.6c0 309.4-233.1 560.2-520.7 560.2H520.7C233.1 2500 0 2249.2 0 1939.8V560.2C0 250.8 233.1 0 520.7 0z"
        mask={`url(#${_id}-cbwm-a)`}
      />
      <path d="M1031.3 966.2h437.3c36 0 65.1 31.4 65.1 70v427.5c0 38.7-29.2 70-65.1 70h-437.3c-36 0-65.1-31.4-65.1-70v-427.5c0-38.6 29.2-70 65.1-70z" />
    </>
  ),
  'currentColor',
);
