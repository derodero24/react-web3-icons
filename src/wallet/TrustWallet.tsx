import { createIcon } from '../utils';

// Source: https://trustwallet.com/icon.svg (official site icon: the standalone two-part shield)
// Source: https://trustwallet.com/press (official press kit, logos.zip: Trust Core Logo, the same two-part shield)
// Default: the two paths of the official icon.svg (#0500FF left half, right half in the official #0000FF/#0094FF/#48FF91/#0038FF/#0500FF gradient), unchanged, placed on the 64 grid (the shield's 42-unit height scaled to 56, centred); the press kit's Trust Core Logo is the same standalone shield, and neither shows a container
// Mono: derived from the default, as the press kit has no one-colour shield (its White/Black options are wordmarks): the shield silhouette in currentColor, each half cut back 0.6 units from the centre line, which leaves a 1.2-unit seam where the two coloured halves meet
// Square and Circle: the shield of icon.svg, unchanged, scaled 0.95238 and translated (13.33 11.71) so it is 40 units tall and centred. No official Circle or Square asset is published; both are plain container compositions: a white circle r=32 / white 64x64 square with rx=12.8 (the repository's Square convention) behind the unchanged coloured shield
// CircleMono / SquareMono: the container in currentColor with the shield silhouette knocked out by a mask, and a 1-unit ink seam on the centre line where the two halves of the colored shield meet
/** Trust Wallet wallet icon (colored). */
export const TrustWallet = /* @__PURE__ */ createIcon(
  'TrustWallet',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <path
        fill="#0500FF"
        d="M7.04 12.09 32 4v56C14.17 52.53 7.04 38.22 7.04 30.13Z"
      />
      <path
        fill={`url(#${_id}-tw-a)`}
        d="M56.96 12.09 32 4v56c17.83-7.47 24.96-21.78 24.96-29.87Z"
      />
      <defs>
        <linearGradient
          id={`${_id}-tw-a`}
          x1="50.33"
          x2="31.58"
          y1=".08"
          y2="59.27"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".02" stopColor="#0000FF" />
          <stop offset=".08" stopColor="#0094FF" />
          <stop offset=".16" stopColor="#48FF91" />
          <stop offset=".42" stopColor="#0094FF" />
          <stop offset=".68" stopColor="#0038FF" />
          <stop offset=".9" stopColor="#0500FF" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Trust Wallet wallet icon (monochrome). */
export const TrustWalletMono = /* @__PURE__ */ createIcon(
  'TrustWalletMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m7.04 12.09 24.36-7.9v55.55C14 52.21 7.04 38.14 7.04 30.14Z" />
      <path d="M56.96 12.09 32.6 4.19v55.55c17.4-7.53 24.36-21.6 24.36-29.6Z" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Trust Wallet Square wallet icon (colored). */
export const TrustWalletSquare = /* @__PURE__ */ createIcon(
  'TrustWalletSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" fill="#fff" rx="12.8" />
      <g>
        <path
          fill="#0500FF"
          d="M14.17 17.78 32 12v40c-12.74-5.33-17.83-15.56-17.83-21.33z"
        />
        <path
          fill={`url(#${_id}-tws-a)`}
          d="M38.33 6.37 19.6.3v42c13.37-5.6 18.72-16.33 18.72-22.4z"
          transform="translate(13.33 11.71)scale(.95238)"
        />
      </g>
      <defs>
        <linearGradient
          id={`${_id}-tws-a`}
          x1="33.35"
          x2="19.29"
          y1="-2.64"
          y2="41.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".02" stopColor="#0000FF" />
          <stop offset=".08" stopColor="#0094FF" />
          <stop offset=".16" stopColor="#48FF91" />
          <stop offset=".42" stopColor="#0094FF" />
          <stop offset=".68" stopColor="#0038FF" />
          <stop offset=".9" stopColor="#0500FF" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Trust Wallet Circle wallet icon (colored). */
export const TrustWalletCircle = /* @__PURE__ */ createIcon(
  'TrustWalletCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" fill="#fff" />
      <g>
        <path
          fill="#0500FF"
          d="M14.17 17.78 32 12v40c-12.74-5.33-17.83-15.56-17.83-21.33z"
        />
        <path
          fill={`url(#${_id}-twc-a)`}
          d="M38.33 6.37 19.6.3v42c13.37-5.6 18.72-16.33 18.72-22.4z"
          transform="translate(13.33 11.71)scale(.95238)"
        />
      </g>
      <defs>
        <linearGradient
          id={`${_id}-twc-a`}
          x1="33.35"
          x2="19.29"
          y1="-2.64"
          y2="41.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".02" stopColor="#0000FF" />
          <stop offset=".08" stopColor="#0094FF" />
          <stop offset=".16" stopColor="#48FF91" />
          <stop offset=".42" stopColor="#0094FF" />
          <stop offset=".68" stopColor="#0038FF" />
          <stop offset=".9" stopColor="#0500FF" />
        </linearGradient>
      </defs>
    </>
  ),
  { ids: true },
);

/** Trust Wallet Square wallet icon (monochrome). */
export const TrustWalletSquareMono = /* @__PURE__ */ createIcon(
  'TrustWalletSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-twsm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-twsm-a`} fill="#000">
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M14.17 17.78 32 12l17.83 5.78v12.89c0 5.77-5.1 16-17.83 21.33-12.74-5.33-17.83-15.56-17.83-21.33Z"
          />
          <path stroke="#fff" d="M32 12v40" />
        </mask>
      </defs>
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
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-twcm-a)`} />
      <defs>
        <mask id={`${_id}-twcm-a`} fill="#000">
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M14.17 17.78 32 12l17.83 5.78v12.89c0 5.77-5.1 16-17.83 21.33-12.74-5.33-17.83-15.56-17.83-21.33Z"
          />
          <path stroke="#fff" d="M32 12v40" />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
