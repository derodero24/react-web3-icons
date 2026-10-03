import { createIcon } from '../utils';

// Source: https://phantom.app
// Ghost silhouette path data (shared across Circle variants)
// Original viewBox 0 0 128 128 → scale 0.36, translate(9, 9)
/** Phantom Wallet wallet icon (colored). */
export const PhantomWallet = /* @__PURE__ */ createIcon(
  'PhantomWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.5)">
      <circle cx="64" cy="64" r="64" fill={`url(#${_id}-phw-a)`} />
      <path
        fill={`url(#${_id}-phw-b)`}
        d="M110.58 64.91H99.14C99.14 41.77 80.17 23 56.77 23c-23.1 0-41.9 18.3-42.36 41.06C13.94 87.58 36.24 108 60.01 108h3c20.96 0 49.06-16.23 53.45-36.01.81-3.65-2.1-7.08-5.87-7.08zm-70.81 1.04c0 3.1-2.56 5.62-5.69 5.62s-5.69-2.53-5.69-5.62v-9.1c0-3.1 2.56-5.64 5.69-5.64s5.69 2.54 5.69 5.63zm19.75 0c0 3.1-2.56 5.62-5.69 5.62s-5.69-2.53-5.69-5.62v-9.1c0-3.1 2.56-5.64 5.7-5.64s5.68 2.54 5.68 5.63z"
      />
      <defs>
        <linearGradient
          id={`${_id}-phw-a`}
          x1="64"
          x2="64"
          y1="0"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534bb1" />
          <stop offset="1" stopColor="#551bf9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-phw-b`}
          x1="65.5"
          x2="65.5"
          y1="23"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".82" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Phantom Wallet wallet icon (monochrome). */
export const PhantomWalletMono = /* @__PURE__ */ createIcon(
  'PhantomWalletMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m55.3.46h-5.73c0-11.58-9.48-20.96-21.18-20.96-11.56 0-20.95 9.15-21.18 20.53C6.97 43.79 18.12 54 30 54h1.5c10.48 0 24.53-8.12 26.72-18 .4-1.83-1.05-3.54-2.94-3.54m-35.42.51c0 1.55-1.27 2.82-2.84 2.82s-2.84-1.27-2.84-2.82v-4.55c0-1.55 1.28-2.81 2.84-2.81s2.84 1.26 2.84 2.81zm9.88 0c0 1.55-1.28 2.82-2.84 2.82s-2.85-1.27-2.85-2.82v-4.55c0-1.55 1.28-2.81 2.85-2.81s2.84 1.26 2.84 2.81z"
    />
  ),
  { fill: 'currentColor' },
);

/** Phantom Wallet Circle wallet icon (colored). */
export const PhantomWalletCircle = /* @__PURE__ */ createIcon(
  'PhantomWalletCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" fill={`url(#${_id}-phc-a)`} />
      <path
        fill="#fff"
        d="M48.81 32.37h-4.12c0-8.33-6.83-15.09-15.25-15.09-8.32 0-15.09 6.59-15.25 14.78-.17 8.47 7.86 15.82 16.42 15.82h1.07c7.55 0 17.67-5.84 19.25-12.96.29-1.32-.76-2.55-2.12-2.55m-25.5.37c0 1.11-.91 2.03-2.04 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02zm7.12 0c0 1.11-.92 2.03-2.05 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02z"
      />
      <defs>
        <linearGradient
          id={`${_id}-phc-a`}
          x1="32"
          x2="32"
          y1="0"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534bb1" />
          <stop offset="1" stopColor="#551bf9" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Phantom Wallet Circle wallet icon (monochrome). */
export const PhantomWalletCircleMono = /* @__PURE__ */ createIcon(
  'PhantomWalletCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-phcm-a)`} />
      <defs>
        <mask id={`${_id}-phcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M48.81 32.37h-4.12c0-8.33-6.83-15.09-15.25-15.09-8.32 0-15.09 6.59-15.25 14.78-.17 8.47 7.86 15.82 16.42 15.82h1.07c7.55 0 17.67-5.84 19.25-12.96.29-1.32-.76-2.55-2.12-2.55m-25.5.37c0 1.11-.91 2.03-2.04 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02zm7.12 0c0 1.11-.92 2.03-2.05 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Phantom Wallet Square wallet icon (colored). */
export const PhantomWalletSquare = /* @__PURE__ */ createIcon(
  'PhantomWalletSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" fill={`url(#${_id}-phsq-a)`} rx="12.8" />
      <path
        fill="#fff"
        d="M48.81 32.37h-4.12c0-8.33-6.83-15.09-15.25-15.09-8.32 0-15.09 6.59-15.25 14.78-.17 8.47 7.86 15.82 16.42 15.82h1.07c7.55 0 17.67-5.84 19.25-12.96.29-1.32-.76-2.55-2.12-2.55m-25.5.37c0 1.11-.91 2.03-2.04 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02zm7.12 0c0 1.11-.92 2.03-2.05 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02z"
      />
      <defs>
        <linearGradient
          id={`${_id}-phsq-a`}
          x1="32"
          x2="32"
          y1="0"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534bb1" />
          <stop offset="1" stopColor="#551bf9" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Phantom Wallet Square wallet icon (monochrome). */
export const PhantomWalletSquareMono = /* @__PURE__ */ createIcon(
  'PhantomWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-phsqm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-phsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            fill="#000"
            d="M48.81 32.37h-4.12c0-8.33-6.83-15.09-15.25-15.09-8.32 0-15.09 6.59-15.25 14.78-.17 8.47 7.86 15.82 16.42 15.82h1.07c7.55 0 17.67-5.84 19.25-12.96.29-1.32-.76-2.55-2.12-2.55m-25.5.37c0 1.11-.91 2.03-2.04 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02zm7.12 0c0 1.11-.92 2.03-2.05 2.03s-2.05-.92-2.05-2.03v-3.28c0-1.11.92-2.02 2.05-2.02s2.05.9 2.05 2.02z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Phantom Wallet Symbol wallet icon (monochrome). */
export const PhantomWalletSymbolMono = /* @__PURE__ */ createIcon(
  'PhantomWalletSymbolMono',
  '0 0 64 64',
  () => (
    <path d="M56.7 31.68h-6.26c0-12.57-10.4-22.76-23.22-22.76-12.67 0-22.96 9.94-23.22 22.3-.26 12.76 11.97 23.85 25 23.85h1.63c11.5 0 26.89-8.82 29.3-19.55.44-1.98-1.16-3.84-3.22-3.84m-38.8.56c0 1.68-1.4 3.05-3.12 3.05s-3.11-1.37-3.11-3.05v-4.95c0-1.68 1.4-3.05 3.11-3.05s3.12 1.37 3.12 3.05zm10.82 0c0 1.68-1.4 3.05-3.11 3.05s-3.12-1.37-3.12-3.05v-4.95c0-1.68 1.4-3.05 3.12-3.05s3.11 1.37 3.11 3.05z" />
  ),
  { fill: 'currentColor' },
);
