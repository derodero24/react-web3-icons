import { createIcon } from '../utils';

// Source: https://github.com/Koniverse/Koni-Branding-Kit/blob/main/02.SubWallet/04.Icon/01.SVG/Style%3DGradient.svg (official brand kit, linked as "Download now" from https://www.subwallet.app/brandingkit.html)
// Colored: the kit Icon Style=Gradient.svg unchanged (#61FEC0 to #0425FE diagonal gradient), placed on the 64 grid; it replaces a horizontal #004BFF to #4CEAAC gradient on a slightly different S
// Mono: the same path in currentColor, the shape of the kit Style=Black.svg one-colour icon
/** Sub Wallet wallet icon (colored). */
export const SubWallet = /* @__PURE__ */ createIcon(
  'SubWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(13.48 4)scale(.5611)">
      <path
        fill={`url(#${_id}-sw-a)`}
        d="M66 36.1V22.2L11 0 0 5.6v43.1l41.8 16.7-22.2 9.5v-7.3L9.4 63.4 0 67.8v26.4l11 5.6 55-25V57L16.8 37.1V24.9l39.6 15.9z"
      />
      <defs>
        <linearGradient
          id={`${_id}-sw-a`}
          x1="0"
          x2="90.97"
          y1="0"
          y2="59.02"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".21" stopColor="#61FEC0" />
          <stop offset=".92" stopColor="#0425FE" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Sub Wallet wallet icon (monochrome). */
export const SubWalletMono = /* @__PURE__ */ createIcon(
  'SubWalletMono',
  '0 0 64 64',
  () => (
    <path d="M50.52 24.26v-7.8L19.66 4l-6.18 3.14v24.19l23.46 9.37-12.46 5.33v-4.1l-5.72-2.36-5.28 2.47v14.82L19.66 60l30.86-14.03v-9.99L22.9 24.82v-6.85l22.22 8.92z" />
  ),
  { fill: 'currentColor' },
);
