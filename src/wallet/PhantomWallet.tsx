import { createIcon } from '../utils';

// Source: https://phantom.app
// Ghost silhouette path data (shared across Circle variants)
// Original viewBox 0 0 128 128 → scale 0.36, translate(9, 9)
/** Phantom Wallet wallet icon (colored). */
export const PhantomWallet = /* @__PURE__ */ createIcon(
  'PhantomWallet',
  '0 0 128 128',
  (_props, _id) => (
    <>
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
    </>
  ),
  { ids: true },
);

/** Phantom Wallet wallet icon (monochrome). */
export const PhantomWalletMono = /* @__PURE__ */ createIcon(
  'PhantomWalletMono',
  '0 0 128 128',
  () => (
    <path
      fillRule="evenodd"
      d="M0 64a64 64 0 1 0 128 0A64 64 0 1 0 0 64m110.584.914H99.142C99.142 41.765 80.173 23 56.772 23c-23.111 0-41.901 18.306-42.361 41.058C13.936 87.577 36.241 108 60.019 108h2.991c20.963 0 49.06-16.233 53.45-36.013.811-3.646-2.101-7.073-5.875-7.073zm-70.815 1.031c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.559-5.627 5.689-5.627s5.689 2.532 5.689 5.627zm19.753 0c0 3.096-2.559 5.627-5.689 5.627s-5.689-2.533-5.689-5.627v-9.104c0-3.096 2.56-5.627 5.689-5.627s5.689 2.532 5.689 5.627z"
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
  '0 0 128 106',
  () => (
    <path d="M120.471 52.009h-14.332C106.139 23.285 82.379 0 53.068 0 24.12 0 .585 22.715.009 50.947c-.596 29.183 27.342 54.525 57.125 54.525h3.746c26.257 0 61.45-20.143 66.948-44.686 1.016-4.524-2.631-8.777-7.358-8.777zm-88.7 1.28c0 3.841-3.206 6.983-7.125 6.983s-7.125-3.143-7.125-6.983V41.992c0-3.841 3.206-6.983 7.125-6.983s7.125 3.142 7.125 6.983zm24.743 0c0 3.841-3.206 6.983-7.125 6.983s-7.125-3.143-7.125-6.983V41.992c0-3.841 3.207-6.983 7.125-6.983s7.125 3.142 7.125 6.983z" />
  ),
  { fill: 'currentColor' },
);
