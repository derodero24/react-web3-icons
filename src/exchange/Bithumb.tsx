import { createIcon } from '../utils';

// Source: https://www.bithumbcorp.com/ko/promotion/bi.php (official CI·BI page of Bithumb Co., Ltd., accessed 2026-10-24: brand colours and the "로고 패키지 다운로드" logo package)
// Source: https://www.bithumbcorp.com/image/pc/ko/contents/promotion/img_bi_signature.svg (the page's signature-logo specimen, the source of the default symbol's paths and gradients)
// Source: https://www.bithumbcorp.com/bithumb_logo_kr.zip (Bithumb Logo_KR: Primary/Digital/Bithumb_Logo_Primary_KR_RGB.ai, the same symbol, and Secondary/Digital/Bithumb_Logo_Secondary_White_KR_RGB.ai, the one-colour symbol)
// Default: the symbol of the current signature logo, taken from the BI page's img_bi_signature.svg (the first lockup's two symbol paths and their two linear gradients, unchanged): the b and flag in #FF6C00 -> #F25900 -> #DC3700 with the stem in #FF6C00 -> #FF9100, the page's Bithumb Orange Gradient. It is the symbol of Bithumb_Logo_Primary_KR_RGB.ai in the logo package (compared visually). It replaces the previous BI kit's flat #FF8200 b with a #D1350F flag, which the page no longer offers (bithumb_bi_asset.zip and the BI system guide v5.0 now return HTTP 404)
// Mono: the symbol of the package's one-colour secondary logo (Bithumb_Logo_Secondary_White_KR_RGB.ai, converted with pdftocairo, path unchanged) in currentColor: the b with the flag as a separate sliver
// brandColor: the page's primary colour Bithumb Orange #FF6C00 (RGB 255 108 0, PMS 1505 C)
/** Bithumb exchange icon (colored). */
export const Bithumb = /* @__PURE__ */ createIcon(
  'Bithumb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-72.73 -49.59)scale(.25895)">
      <path
        fill={`url(#${_id}-bithumb-a)`}
        d="m337.73 315.63-7.01 24.43c-15.88 55.39 14.12 83.08 51.44 83.08 45.94 0 87.17-27.69 103.06-83.08s-23.17-83.08-55.41-83.08h-16.62l8.04-28.04c3.15-10.99-5.1-21.94-16.54-21.94h-35.82l-14.33 49.98h-23.35l-10.51 36.71c-3.15 10.99 5.1 21.94 16.54 21.94zm88.84 24.43c-4.67 16.29-16.84 24.44-27.6 24.44s-14.28-8.14-9.61-24.44l7-24.43H413c10.75 0 18.25 8.14 13.58 24.43"
      />
      <path
        fill={`url(#${_id}-bithumb-b)`}
        d="M330.72 340.06c-15.88 55.39 14.12 83.08 51.44 83.08l16.82-58.64c-10.75 0-14.28-8.14-9.61-24.44l31.86-111.12c3.15-10.99-5.1-21.94-16.54-21.94h-35.82z"
      />
      <defs>
        <linearGradient
          id={`${_id}-bithumb-a`}
          x1="415.24"
          x2="387.22"
          y1="355.42"
          y2="306.88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6C00" />
          <stop offset=".4" stopColor="#F25900" />
          <stop offset="1" stopColor="#DC3700" />
        </linearGradient>
        <linearGradient
          id={`${_id}-bithumb-b`}
          x1="400.44"
          x2="353.3"
          y1="348.08"
          y2="266.42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6C00" />
          <stop offset="1" stopColor="#FF9100" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Bithumb exchange icon (monochrome). */
export const BithumbMono = /* @__PURE__ */ createIcon(
  'BithumbMono',
  '0 0 64 64',
  () => (
    <path d="m13.02 16.95-2.72 9.51c-.63 2.2.5 4.37 2.4 5.26l4.23-14.77Zm39.9 21.52C48.8 52.82 38.11 60 26.21 60c-9.67 0-17.44-7.17-13.33-21.52l9.89-34.46h9.27c2.97 0 5.1 2.83 4.29 5.68l-8.26 28.78c-1.2 4.22-.3 6.33 2.5 6.33 2.78 0 5.93-2.1 7.14-6.33s-.73-6.33-3.52-6.33h-2.17l4.36-15.19h2.17c8.35 0 18.46 7.18 14.35 21.52" />
  ),
  { fill: 'currentColor' },
);
