import { createIcon } from '../utils';

// Source: https://github.com/rainbow-me/rainbowkit/blob/03360ee924cfa6af13ff1d623b356bf5a170348e/packages/rainbowkit/src/wallets/walletConnectors/rainbowWallet/rainbowWallet.svg (official Rainbow repository, the wallet's app icon)
// Source: https://www.figma.com/community/file/1139300796265858893/rainbow-brand-assets (official brand assets, linked from rainbow.me)
// Arc paths from viewBox 20 20 80 80 → scale 0.575, translate(-2.5, -2.5)
/** Extra props of the Rainbow icons (on top of `IconProps`). */
export interface RainbowProps {
  /** Render the gradient tile behind the arcs. Defaults to `true` for `Rainbow` and `false` for `RainbowSymbol`. */
  withBackground?: boolean | undefined;
}

/** The artwork `withBackground` switches between. */
const withBackgroundArtwork = (withBackground: boolean, _id: string) =>
  withBackground ? (
    <g transform="scale(.53333)">
      <path fill={`url(#${_id}-rbw-a)`} d="M0 0h120v120H0z" />
      <path
        fill={`url(#${_id}-rbw-b)`}
        d="M20 38h6c30.93 0 56 25.07 56 56v6h12a6 6 0 0 0 6-6c0-40.87-33.13-74-74-74a6 6 0 0 0-6 6z"
      />
      <path fill={`url(#${_id}-rbw-c)`} d="M84 94h16a6 6 0 0 1-6 6H84z" />
      <path fill={`url(#${_id}-rbw-d)`} d="M26 20v16h-6V26a6 6 0 0 1 6-6" />
      <path
        fill={`url(#${_id}-rbw-e)`}
        d="M20 36h6c32.03 0 58 25.97 58 58v6H66v-6c0-22.1-17.9-40-40-40h-6z"
      />
      <path fill={`url(#${_id}-rbw-f)`} d="M68 94h16v6H68z" />
      <path fill={`url(#${_id}-rbw-g)`} d="M20 52V36h6v16z" />
      <path
        fill={`url(#${_id}-rbw-h)`}
        d="M20 62a6 6 0 0 0 6 6c14.36 0 26 11.64 26 26a6 6 0 0 0 6 6h10v-6c0-23.2-18.8-42-42-42h-6z"
      />
      <path fill={`url(#${_id}-rbw-i)`} d="M52 94h16v6H58a6 6 0 0 1-6-6" />
      <path fill={`url(#${_id}-rbw-j)`} d="M26 68a6 6 0 0 1-6-6V52h6z" />
      <defs>
        <linearGradient
          id={`${_id}-rbw-a`}
          x1="60"
          x2="60"
          y1="0"
          y2="120"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001e59" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-c`}
          x1="83"
          x2="100"
          y1="97"
          y2="97"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-d`}
          x1="23"
          x2="23"
          y1="20"
          y2="37"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-f`}
          x1="68"
          x2="84"
          y1="97"
          y2="97"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-g`}
          x1="23"
          x2="23"
          y1="52"
          y2="36"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient id={`${_id}-rbw-k`} gradientUnits="userSpaceOnUse" />
        <radialGradient
          id={`${_id}-rbw-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -74 74 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -58 58 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".72" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -42 42 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".59" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17 0 0 45.3333 51 97)"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -17 322.37 0 23 69)"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
      </defs>
    </g>
  ) : (
    <g transform="matrix(.7 0 0 .7 -10 -10)">
      <path
        fill={`url(#${_id}-rbw-b)`}
        d="M20 38h6c30.93 0 56 25.07 56 56v6h12a6 6 0 0 0 6-6c0-40.87-33.13-74-74-74a6 6 0 0 0-6 6z"
      />
      <path fill={`url(#${_id}-rbw-c)`} d="M84 94h16a6 6 0 0 1-6 6H84z" />
      <path fill={`url(#${_id}-rbw-d)`} d="M26 20v16h-6V26a6 6 0 0 1 6-6" />
      <path
        fill={`url(#${_id}-rbw-e)`}
        d="M20 36h6c32.03 0 58 25.97 58 58v6H66v-6c0-22.1-17.9-40-40-40h-6z"
      />
      <path fill={`url(#${_id}-rbw-f)`} d="M68 94h16v6H68z" />
      <path fill={`url(#${_id}-rbw-g)`} d="M20 52V36h6v16z" />
      <path
        fill={`url(#${_id}-rbw-h)`}
        d="M20 62a6 6 0 0 0 6 6c14.36 0 26 11.64 26 26a6 6 0 0 0 6 6h10v-6c0-23.2-18.8-42-42-42h-6z"
      />
      <path fill={`url(#${_id}-rbw-i)`} d="M52 94h16v6H58a6 6 0 0 1-6-6" />
      <path fill={`url(#${_id}-rbw-j)`} d="M26 68a6 6 0 0 1-6-6V52h6z" />
      <defs>
        <radialGradient
          id={`${_id}-rbw-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -74 74 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -58 58 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".72" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -42 42 0 26 94)"
          href={`#${_id}-rbw-k`}
        >
          <stop offset=".59" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17 0 0 45.3333 51 97)"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbw-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -17 322.37 0 23 69)"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbw-c`}
          x1="83"
          x2="100"
          y1="97"
          y2="97"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-d`}
          x1="23"
          x2="23"
          y1="20"
          y2="37"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-f`}
          x1="68"
          x2="84"
          y1="97"
          y2="97"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbw-g`}
          x1="23"
          x2="23"
          y1="52"
          y2="36"
          href={`#${_id}-rbw-k`}
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient id={`${_id}-rbw-k`} gradientUnits="userSpaceOnUse" />
      </defs>
    </g>
  );

/** Rainbow wallet icon (colored). */
export const Rainbow = /* @__PURE__ */ createIcon<RainbowProps>(
  'Rainbow',
  '0 0 64 64',
  ({ withBackground = true }, _id) =>
    withBackgroundArtwork(withBackground, _id),
  { ids: true, props: ['withBackground'] },
);

/** Rainbow Symbol wallet icon (colored). */
export const RainbowSymbol = /* @__PURE__ */ createIcon<RainbowProps>(
  'RainbowSymbol',
  '0 0 64 64',
  ({ withBackground = false }, _id) =>
    withBackgroundArtwork(withBackground, _id),
  { ids: true, props: ['withBackground'] },
);

/** Rainbow Circle wallet icon (colored). */
export const RainbowCircle = /* @__PURE__ */ createIcon(
  'RainbowCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" fill={`url(#${_id}-rbwc-bg)`} />
      <g>
        <path
          fill={`url(#${_id}-rbwc-b)`}
          d="M20 38h6c30.93 0 56 25.07 56 56v6h12a6 6 0 0 0 6-6c0-40.87-33.13-74-74-74a6 6 0 0 0-6 6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-c)`}
          d="M84 94h16a6 6 0 0 1-6 6H84z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-d)`}
          d="M26 20v16h-6V26a6 6 0 0 1 6-6"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-e)`}
          d="M20 36h6c32.03 0 58 25.97 58 58v6H66v-6c0-22.1-17.9-40-40-40h-6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-f)`}
          d="M68 94h16v6H68z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-g)`}
          d="M20 52V36h6v16z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-h)`}
          d="M20 62a6 6 0 0 0 6 6c14.36 0 26 11.64 26 26a6 6 0 0 0 6 6h10v-6c0-23.2-18.8-42-42-42h-6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-i)`}
          d="M52 94h16v6H58a6 6 0 0 1-6-6"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwc-j)`}
          d="M26 68a6 6 0 0 1-6-6V52h6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
      </g>
      <defs>
        <radialGradient
          id={`${_id}-rbwc-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -74 74 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -58 58 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".72" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -42 42 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".59" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17 0 0 45.3333 51 97)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwc-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -17 322.37 0 23 69)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwc-bg`}
          x1="32"
          x2="32"
          y1="0"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001e59" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-c`}
          x1="83"
          x2="100"
          y1="97"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-d`}
          x1="23"
          x2="23"
          y1="20"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-f`}
          x1="68"
          x2="84"
          y1="97"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwc-g`}
          x1="23"
          x2="23"
          y1="52"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Rainbow Circle wallet icon (monochrome). */
export const RainbowCircleMono = /* @__PURE__ */ createIcon(
  'RainbowCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32C0 14.33 14.33 0 32 0s32 14.33 32 32-14.33 32-32 32S0 49.67 0 32M12.45 9A3.45 3.45 0 0 0 9 12.45v4.95h3.45c18.86 0 34.15 15.29 34.15 34.15V55h4.95c1.9 0 3.45-1.54 3.45-3.45C55 28.05 35.95 9 12.45 9M35.8 55v-3.45c0-12.9-10.45-23.35-23.35-23.35H9v4.95c0 1.9 1.54 3.45 3.45 3.45 8.26 0 14.95 6.7 14.95 14.95 0 1.9 1.54 3.45 3.45 3.45zM12.45 19H9v7.6h3.45c13.78 0 24.95 11.17 24.95 24.95V55H45v-3.45C45 33.57 30.43 19 12.45 19"
    />
  ),
  { fill: 'currentColor' },
);

/** Rainbow Square wallet icon (colored). */
export const RainbowSquare = /* @__PURE__ */ createIcon(
  'RainbowSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" fill={`url(#${_id}-rbwsq-bg)`} rx="12.8" />
      <g>
        <path
          fill={`url(#${_id}-rbwsq-b)`}
          d="M20 38h6c30.93 0 56 25.07 56 56v6h12a6 6 0 0 0 6-6c0-40.87-33.13-74-74-74a6 6 0 0 0-6 6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-c)`}
          d="M84 94h16a6 6 0 0 1-6 6H84z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-d)`}
          d="M26 20v16h-6V26a6 6 0 0 1 6-6"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-e)`}
          d="M20 36h6c32.03 0 58 25.97 58 58v6H66v-6c0-22.1-17.9-40-40-40h-6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-f)`}
          d="M68 94h16v6H68z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-g)`}
          d="M20 52V36h6v16z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-h)`}
          d="M20 62a6 6 0 0 0 6 6c14.36 0 26 11.64 26 26a6 6 0 0 0 6 6h10v-6c0-23.2-18.8-42-42-42h-6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-i)`}
          d="M52 94h16v6H58a6 6 0 0 1-6-6"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
        <path
          fill={`url(#${_id}-rbwsq-j)`}
          d="M26 68a6 6 0 0 1-6-6V52h6z"
          transform="translate(-2.5 -2.5)scale(.575)"
        />
      </g>
      <defs>
        <radialGradient
          id={`${_id}-rbwsq-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -74 74 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".77" stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -58 58 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".72" stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -42 42 0 26 94)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".59" stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(17 0 0 45.3333 51 97)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <radialGradient
          id={`${_id}-rbwsq-j`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 -17 322.37 0 23 69)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0af" />
          <stop offset="1" stopColor="#01da40" />
        </radialGradient>
        <linearGradient
          id={`${_id}-rbwsq-bg`}
          x1="32"
          x2="32"
          y1="0"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001e59" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-c`}
          x1="83"
          x2="100"
          y1="97"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff4000" />
          <stop offset="1" stopColor="#8754c9" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-d`}
          x1="23"
          x2="23"
          y1="20"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8754c9" />
          <stop offset="1" stopColor="#ff4000" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-f`}
          x1="68"
          x2="84"
          y1="97"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
        <linearGradient
          id={`${_id}-rbwsq-g`}
          x1="23"
          x2="23"
          y1="52"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff700" />
          <stop offset="1" stopColor="#ff9901" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Rainbow Square wallet icon (monochrome). */
export const RainbowSquareMono = /* @__PURE__ */ createIcon(
  'RainbowSquareMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.8 64C5.73 64 0 58.27 0 51.2V12.8C0 5.73 5.73 0 12.8 0h38.4C58.27 0 64 5.73 64 12.8v38.4C64 58.27 58.27 64 51.2 64zm-.35-55A3.45 3.45 0 0 0 9 12.45v4.95h3.45c18.86 0 34.15 15.29 34.15 34.15V55h4.95c1.9 0 3.45-1.54 3.45-3.45C55 28.05 35.95 9 12.45 9M35.8 55v-3.45c0-12.9-10.45-23.35-23.35-23.35H9v4.95c0 1.9 1.54 3.45 3.45 3.45 8.26 0 14.95 6.7 14.95 14.95 0 1.9 1.54 3.45 3.45 3.45zM12.45 19H9v7.6h3.45c13.78 0 24.95 11.17 24.95 24.95V55H45v-3.45C45 33.57 30.43 19 12.45 19"
    />
  ),
  { fill: 'currentColor' },
);

/** Rainbow wallet icon (monochrome). */
export const RainbowMono = /* @__PURE__ */ createIcon(
  'RainbowMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 64V0h64v64zm13.87-53.33a3.2 3.2 0 0 0-3.2 3.2v4.53h3.2c17.52 0 31.73 14.2 31.73 31.73v3.2h4.53a3.2 3.2 0 0 0 3.2-3.2c0-21.8-17.67-39.46-39.46-39.46m21.6 42.66v-3.2c0-11.93-9.67-21.6-21.6-21.6h-3.2v4.54a3.2 3.2 0 0 0 3.2 3.2c7.66 0 13.86 6.2 13.86 13.86a3.2 3.2 0 0 0 3.2 3.2zM13.87 20h-3.2v6.93h3.2c12.81 0 23.2 10.39 23.2 23.2v3.2H44v-3.2C44 33.5 30.5 20 13.87 20"
    />
  ),
  { fill: 'currentColor' },
);

/** Rainbow Symbol wallet icon (monochrome). */
export const RainbowSymbolMono = /* @__PURE__ */ createIcon(
  'RainbowSymbolMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M60 55.8a4.2 4.2 0 0 1-4.2 4.2h-6.2v-4.2c0-22.86-18.54-41.4-41.4-41.4H4V8.2A4.2 4.2 0 0 1 8.2 4C36.8 4 60 27.2 60 55.8M30.6 60a4.2 4.2 0 0 1-4.2-4.2c0-10.05-8.15-18.2-18.2-18.2A4.2 4.2 0 0 1 4 33.4v-6.2h4.2C24 27.2 36.8 40 36.8 55.8V60zM48 55.8V60h-9.6v-4.2c0-16.68-13.52-30.2-30.2-30.2H4V16h4.2C30.18 16 48 33.82 48 55.8"
    />
  ),
  { fill: 'currentColor' },
);
