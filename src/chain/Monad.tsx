import { createIcon } from '../utils';

// Source: https://www.monad.xyz/brand-page-assets/Logomark.svg (official brand & media kit, monad.xyz/brand-and-media-kit)
// Source: https://www.monad.xyz/brand-page-assets/Token.svg (official MON token, brand & media kit)
// Circle: the official MON Token.svg (the white mark on a #6E54FF disc), paths unchanged and full-bleed on the 64 grid. Its drop shadow (dy 15, blur 7.5, 12.5% black, at the token's 480 scale) is kept: it is visible under the mark at 128 and 48 px. The no-op full-viewBox clip-path is left out
// CircleMono: the token's disc in currentColor with the mark knocked out (fill-rule=evenodd), without the shadow
/** Monad chain icon (colored). */
export const Monad = /* @__PURE__ */ createIcon(
  'Monad',
  '0 0 64 64',
  () => (
    <path
      fill="#6E54FF"
      d="M32 4C24.02 4 4.37 23.91 4.37 32S24.02 59.99 32 59.99s27.62-19.91 27.62-28S39.97 4 32 4m-4.3 44c-3.37-.93-12.42-16.96-11.5-20.37.92-3.4 16.74-12.57 20.1-11.64s12.4 16.96 11.5 20.37S31.04 48.93 27.7 48"
    />
  ),
  { fill: 'none' },
);

/** Monad chain icon (monochrome). */
export const MonadMono = /* @__PURE__ */ createIcon(
  'MonadMono',
  '0 0 64 64',
  () => (
    <path d="M32 4C24.02 4 4.37 23.91 4.37 32S24.02 59.99 32 59.99s27.62-19.91 27.62-28S39.97 4 32 4m-4.3 44c-3.37-.93-12.42-16.96-11.5-20.37.92-3.4 16.74-12.57 20.1-11.64s12.4 16.96 11.5 20.37S31.04 48.93 27.7 48" />
  ),
  { fill: 'currentColor' },
);

/** Monad Circle chain icon (colored). */
export const MonadCircle = /* @__PURE__ */ createIcon(
  'MonadCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <path d="M0 32c0 17.67 14.33 32 32 32s32-14.33 32-32S49.67 0 32 0 0 14.33 0 32" />
      <g filter={`url(#${_id}-a)`}>
        <path
          fill="#fff"
          d="M32.02 12C26.24 12 12 26.22 12 32s14.24 20 20.02 20 20.01-14.22 20.01-20S37.8 12 32.02 12M28.9 43.43c-2.44-.66-9-12.11-8.33-14.55.67-2.43 12.13-8.98 14.57-8.32s8.99 12.12 8.32 14.56c-.66 2.43-12.12 8.98-14.56 8.32"
        />
      </g>
      <defs>
        <filter
          id={`${_id}-a`}
          width="44.03"
          height="44"
          x="10"
          y="12"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.125 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </>
  ),
  { fill: '#6E54FF', ids: true },
);

/** Monad Circle chain icon (monochrome). */
export const MonadCircleMono = /* @__PURE__ */ createIcon(
  'MonadCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32c0 17.67 14.33 32 32 32s32-14.33 32-32S49.67 0 32 0 0 14.33 0 32m32.02-20C26.24 12 12 26.22 12 32s14.24 20 20.02 20 20.02-14.22 20.02-20S37.8 12 32.02 12M28.9 43.44c-2.44-.67-9-12.12-8.33-14.56.67-2.43 12.13-8.98 14.57-8.32s8.99 12.12 8.33 14.56c-.67 2.43-12.13 8.98-14.57 8.32"
    />
  ),
  { fill: 'currentColor' },
);
