import { createIcon } from '../utils';

// Source: https://yoroi-wallet.com
/** Yoroi Wallet wallet icon (colored). */
export const YoroiWallet = /* @__PURE__ */ createIcon(
  'YoroiWallet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(.26 0 0 .26 4 7.66)">
      <defs>
        <linearGradient
          id={`${_id}-yrw-a`}
          x1="27.39"
          x2="187.84"
          y1="132.9"
          y2="-27.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a44b7" />
          <stop offset="1" stopColor="#4760ff" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-yrw-a)`}
        d="m166.41 146.46-17.07 11.85-125.7-86.86q.01-.26-.05-.51V47.77zm-35.08-112.1-22.84 15.5a2.05 2.05 0 0 1-2.76 0l-28.2-19.48Q62.71 20.09 47.91 9.74L33.9 0H0l4.77 3.35 26.57 18.42 26.27 18.28 24.71 17.21 23.51 16.24a1.7 1.7 0 0 0 2.31 0l19-12.92q23.48-16.09 46.92-32.23L208.22 5l7.17-5h-34q-25.04 17.17-50.06 34.36M23.77 105.54l-.18.45v22.75a1 1 0 0 0 .12.5l83.9 58h.08l17.07-11.84zm167.61-57.72L128.94 91a6 6 0 0 0 .66.74q7.92 5.61 15.85 11.17a1 1 0 0 0 .57.1l45.21-31.3a2 2 0 0 0 .15-.42zm.05 58.63-20.85 14.41 16.22 11.5 4.63-3.21z"
      />
    </g>
  ),
  { ids: true },
);

/** Yoroi Wallet wallet icon (monochrome). */
export const YoroiWalletMono = /* @__PURE__ */ createIcon(
  'YoroiWalletMono',
  '0 0 64 64',
  () => (
    <path d="m47.27 45.74-4.44 3.08-32.68-22.58q0-.08-.02-.14v-6.02zm-9.13-29.15-5.93 4.03a.53.53 0 0 1-.72 0l-7.33-5.06-7.7-5.37-3.65-2.53H4l1.24.87 6.9 4.79 6.84 4.75 6.42 4.48 6.12 4.22a.45.45 0 0 0 .6 0l4.94-3.36 12.2-8.38 8.88-6.07L60 7.66h-8.84zM10.18 35.1l-.05.13v5.91l.03.13 21.82 15.08H32l4.44-3.08zm43.58-15L37.52 31.32l.18.2 4.12 2.9a.2.2 0 0 0 .14.02l11.76-8.14.04-.1zm.01 15.25-5.42 3.74 4.22 3 1.2-.84z" />
  ),
  { fill: 'currentColor' },
);
