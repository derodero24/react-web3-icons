import { createIcon } from '../utils';

// Source: https://rainbow.me
// Arc paths from viewBox 20 20 80 80 → scale 0.575, translate(-2.5, -2.5)
/** Extra props of the RainbowWallet icons (on top of `IconProps`). */
export interface RainbowWalletProps {
  /** Render the gradient tile behind the arcs. Defaults to `true` for `RainbowWallet` and `false` for `RainbowWalletSymbol`. */
  withBackground?: boolean;
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

/** Rainbow Wallet wallet icon (colored). */
export const RainbowWallet = /* @__PURE__ */ createIcon<RainbowWalletProps>(
  'RainbowWallet',
  '0 0 64 64',
  ({ withBackground = true }, _id) =>
    withBackgroundArtwork(withBackground, _id),
  { ids: true, props: ['withBackground'] },
);

/** Rainbow Wallet Symbol wallet icon (colored). */
export const RainbowWalletSymbol =
  /* @__PURE__ */ createIcon<RainbowWalletProps>(
    'RainbowWalletSymbol',
    '0 0 64 64',
    ({ withBackground = false }, _id) =>
      withBackgroundArtwork(withBackground, _id),
    { ids: true, props: ['withBackground'] },
  );

/** Rainbow Wallet Circle wallet icon (colored). */
export const RainbowWalletCircle = /* @__PURE__ */ createIcon(
  'RainbowWalletCircle',
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

/** Rainbow Wallet Circle wallet icon (monochrome). */
export const RainbowWalletCircleMono = /* @__PURE__ */ createIcon(
  'RainbowWalletCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-rbwcm-a)`} />
      <defs>
        <mask id={`${_id}-rbwcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M9 19.35h3.45c17.78 0 32.2 14.42 32.2 32.2V55h6.9A3.45 3.45 0 0 0 55 51.55C55 28.05 35.95 9 12.45 9A3.45 3.45 0 0 0 9 12.45z" />
            <path d="M45.8 51.55H55A3.45 3.45 0 0 1 51.55 55H45.8z" />
            <path d="M12.45 9v9.2H9v-5.75A3.45 3.45 0 0 1 12.45 9" />
            <path d="M9 18.2h3.45c18.42 0 33.35 14.93 33.35 33.35V55H35.45v-3.45c0-12.7-10.3-23-23-23H9z" />
            <path d="M36.6 51.55h9.2V55h-9.2z" />
            <path d="M9 27.4v-9.2h3.45v9.2z" />
            <path d="M9 33.15a3.45 3.45 0 0 0 3.45 3.45c8.26 0 14.95 6.7 14.95 14.95A3.45 3.45 0 0 0 30.85 55h5.75v-3.45c0-13.34-10.81-24.15-24.15-24.15H9z" />
            <path d="M27.4 51.55h9.2V55h-5.75a3.45 3.45 0 0 1-3.45-3.45" />
            <path d="M12.45 36.6A3.45 3.45 0 0 1 9 33.15V27.4h3.45z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Rainbow Wallet Square wallet icon (colored). */
export const RainbowWalletSquare = /* @__PURE__ */ createIcon(
  'RainbowWalletSquare',
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

/** Rainbow Wallet Square wallet icon (monochrome). */
export const RainbowWalletSquareMono = /* @__PURE__ */ createIcon(
  'RainbowWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-rbwsqm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-rbwsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M9 19.35h3.45c17.78 0 32.2 14.42 32.2 32.2V55h6.9A3.45 3.45 0 0 0 55 51.55C55 28.05 35.95 9 12.45 9A3.45 3.45 0 0 0 9 12.45z" />
            <path d="M45.8 51.55H55A3.45 3.45 0 0 1 51.55 55H45.8z" />
            <path d="M12.45 9v9.2H9v-5.75A3.45 3.45 0 0 1 12.45 9" />
            <path d="M9 18.2h3.45c18.42 0 33.35 14.93 33.35 33.35V55H35.45v-3.45c0-12.7-10.3-23-23-23H9z" />
            <path d="M36.6 51.55h9.2V55h-9.2z" />
            <path d="M9 27.4v-9.2h3.45v9.2z" />
            <path d="M9 33.15a3.45 3.45 0 0 0 3.45 3.45c8.26 0 14.95 6.7 14.95 14.95A3.45 3.45 0 0 0 30.85 55h5.75v-3.45c0-13.34-10.81-24.15-24.15-24.15H9z" />
            <path d="M27.4 51.55h9.2V55h-5.75a3.45 3.45 0 0 1-3.45-3.45" />
            <path d="M12.45 36.6A3.45 3.45 0 0 1 9 33.15V27.4h3.45z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Rainbow Wallet wallet icon (monochrome). */
export const RainbowWalletMono = /* @__PURE__ */ createIcon(
  'RainbowWalletMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.53333)">
      <rect width="120" height="120" mask={`url(#${_id}-rbwm-a)`} />
      <defs>
        <mask id={`${_id}-rbwm-a`}>
          <rect width="120" height="120" fill="#fff" />
          <g fill="#000">
            <path d="M20 38h6c30.93 0 56 25.07 56 56v6h12a6 6 0 0 0 6-6c0-40.87-33.13-74-74-74a6 6 0 0 0-6 6z" />
            <path d="M84 94h16a6 6 0 0 1-6 6H84z" />
            <path d="M26 20v16h-6V26a6 6 0 0 1 6-6" />
            <path d="M20 36h6c32.03 0 58 25.97 58 58v6H66v-6c0-22.1-17.9-40-40-40h-6z" />
            <path d="M68 94h16v6H68z" />
            <path d="M20 52V36h6v16z" />
            <path d="M20 62a6 6 0 0 0 6 6c14.36 0 26 11.64 26 26a6 6 0 0 0 6 6h10v-6c0-23.2-18.8-42-42-42h-6z" />
            <path d="M52 94h16v6H58a6 6 0 0 1-6-6" />
            <path d="M26 68a6 6 0 0 1-6-6V52h6z" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Rainbow Wallet Symbol wallet icon (monochrome). */
export const RainbowWalletSymbolMono = /* @__PURE__ */ createIcon(
  'RainbowWalletSymbolMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M4 16.6h4.2c21.65 0 39.2 17.55 39.2 39.2V60h8.4a4.2 4.2 0 0 0 4.2-4.2C60 27.2 36.8 4 8.2 4A4.2 4.2 0 0 0 4 8.2z" />
      <path d="M48.8 55.8H60a4.2 4.2 0 0 1-4.2 4.2h-7z" />
      <path d="M8.2 4v11.2H4v-7A4.2 4.2 0 0 1 8.2 4" />
      <path d="M4 15.2h4.2c22.42 0 40.6 18.18 40.6 40.6V60H36.2v-4.2c0-15.46-12.54-28-28-28H4z" />
      <path d="M37.6 55.8h11.2V60H37.6z" />
      <path d="M4 26.4V15.2h4.2v11.2z" />
      <path d="M4 33.4a4.2 4.2 0 0 0 4.2 4.2c10.05 0 18.2 8.15 18.2 18.2a4.2 4.2 0 0 0 4.2 4.2h7v-4.2c0-16.24-13.16-29.4-29.4-29.4H4z" />
      <path d="M26.4 55.8h11.2V60h-7a4.2 4.2 0 0 1-4.2-4.2" />
      <path d="M8.2 37.6A4.2 4.2 0 0 1 4 33.4v-7h4.2z" />
    </>
  ),
  { fill: 'currentColor' },
);
