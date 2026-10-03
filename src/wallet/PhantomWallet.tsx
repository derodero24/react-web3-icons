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
        d="M110.584 64.914H99.142C99.142 41.765 80.173 23 56.772 23c-23.111 0-41.901 18.306-42.361 41.058C13.936 87.577 36.241 108 60.019 108h2.991c20.963 0 49.06-16.233 53.45-36.013.811-3.646-2.101-7.073-5.875-7.073zm-70.815 1.031c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.559-5.627 5.689-5.627s5.689 2.532 5.689 5.627zm19.753 0c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.56-5.627 5.689-5.627s5.689 2.532 5.689 5.627z"
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
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m55.292.457h-5.721c0-11.574-9.484-20.957-21.185-20.957-11.555 0-20.95 9.153-21.18 20.529C6.968 43.789 18.12 54 30.01 54h1.495c10.482 0 24.53-8.116 26.725-18.006.406-1.824-1.05-3.537-2.937-3.537zm-35.407.516c0 1.548-1.28 2.813-2.845 2.813s-2.844-1.266-2.844-2.813V28.42c0-1.548 1.279-2.814 2.844-2.814s2.845 1.266 2.845 2.814zm9.876 0c0 1.548-1.28 2.813-2.844 2.813s-2.845-1.266-2.845-2.813V28.42c0-1.548 1.28-2.814 2.845-2.814s2.844 1.266 2.844 2.814z"
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
        d="M48.81 32.369h-4.119c0-8.334-6.829-15.089-15.253-15.089-8.32 0-15.084 6.59-15.25 14.78-.171 8.468 7.859 15.82 16.419 15.82h1.077c7.546 0 17.661-5.844 19.242-12.965.292-1.312-.757-2.546-2.115-2.546zm-25.493.371c0 1.115-.921 2.026-2.048 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026zm7.11 0c0 1.115-.92 2.026-2.047 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026z"
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
            d="M48.81 32.369h-4.119c0-8.334-6.829-15.089-15.253-15.089-8.32 0-15.084 6.59-15.25 14.78-.171 8.468 7.859 15.82 16.419 15.82h1.077c7.546 0 17.661-5.844 19.242-12.965.292-1.312-.757-2.546-2.115-2.546zm-25.493.371c0 1.115-.921 2.026-2.048 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026zm7.11 0c0 1.115-.92 2.026-2.047 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026z"
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
        d="M48.81 32.369h-4.119c0-8.334-6.829-15.089-15.253-15.089-8.32 0-15.084 6.59-15.25 14.78-.171 8.468 7.859 15.82 16.419 15.82h1.077c7.546 0 17.661-5.844 19.242-12.965.292-1.312-.757-2.546-2.115-2.546zm-25.493.371c0 1.115-.921 2.026-2.048 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026zm7.11 0c0 1.115-.92 2.026-2.047 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026z"
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
            d="M48.81 32.369h-4.119c0-8.334-6.829-15.089-15.253-15.089-8.32 0-15.084 6.59-15.25 14.78-.171 8.468 7.859 15.82 16.419 15.82h1.077c7.546 0 17.661-5.844 19.242-12.965.292-1.312-.757-2.546-2.115-2.546zm-25.493.371c0 1.115-.921 2.026-2.048 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026zm7.11 0c0 1.115-.92 2.026-2.047 2.026s-2.048-.912-2.048-2.026v-3.277c0-1.115.921-2.026 2.048-2.026s2.048.912 2.048 2.026z"
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
    <path d="M56.706 31.676h-6.27c0-12.567-10.395-22.754-23.219-22.754-12.664 0-22.961 9.938-23.213 22.29-.26 12.767 11.962 23.854 24.992 23.854h1.639c11.487 0 26.884-8.813 29.29-19.55.444-1.98-1.151-3.84-3.22-3.84zm-38.806.56c0 1.68-1.403 3.055-3.117 3.055s-3.118-1.375-3.118-3.055v-4.942c0-1.68 1.403-3.056 3.118-3.056s3.117 1.375 3.117 3.055zm10.825 0c0 1.68-1.403 3.055-3.117 3.055s-3.117-1.375-3.117-3.055v-4.942c0-1.68 1.403-3.056 3.117-3.056s3.117 1.375 3.117 3.055z" />
  ),
  { fill: 'currentColor' },
);
