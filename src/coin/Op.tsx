import { createIcon } from '../utils';

// Source: https://optimism.io/brand (official brand assets, accessed 2026-10-03; the "OP Token" card)
// Source: https://optimism.io/files/5a7eaedf4e0c96529342e556b52cb05da12d9f23.zip (Optimism - Brand Kit.zip: Token/SVG/Token.svg)
// Default: the official OP token mark, Token.svg from the Optimism brand kit (the same file as the brand page's "OP Token" download): the letters OP in #FAFAF9 on a #FF0421 (Optimism Red) disc, paths unchanged and placed full-bleed as a disc container. The brand page reserves this mark for the token and for avatars; the Optimism chain (OP Mainnet) uses its own symbol, see icons/chain/optimism.json
// Mono: the disc in currentColor with the letters knocked out as one evenodd path; the counters of the O and the P stay ink
// OpCircle and OpCircleMono: the mark is already a disc, so they are aliases of Op and OpMono, kept from when this unit re-exported OptimismCircle
/** Op coin icon (colored). */
export const Op = /* @__PURE__ */ createIcon(
  'Op',
  '0 0 64 64',
  () => (
    <g transform="scale(.06172)">
      <circle cx="518.5" cy="518.5" r="518.5" fill="#FF0421" />
      <path
        fill="#FAFAF9"
        d="M761.8 365.28H576.3L532.64 674.9h88.81l10.55-75h101c91.25 0 136.72-36.58 147.02-114.89 10.61-80.73-27.58-119.73-118.22-119.73m28.2 114.3c-3.64 33.25-22.74 47.76-60.93 47.76H642.2l12.6-89.5h90.93c34.56 0 47.6 11.8 44.26 41.73"
      />
      <path
        fill="#FAFAF9"
        d="M357.42 358.03c-120.94 0-184.3 50.8-199.15 159.64-15.16 111.27 36.98 164.48 160.96 164.48s184-50.8 198.85-159.64c15.16-111.27-36.67-164.48-160.66-164.48m70.33 159.64c-8.19 61.38-39.1 88.9-103.67 88.9-60.62 0-83.35-24.2-75.48-84.06 8.19-61.68 39.71-88.9 103.67-88.9s83.36 24.5 75.48 84.06"
      />
    </g>
  ),
  {},
);

/** Op coin icon (monochrome). */
export const OpMono = /* @__PURE__ */ createIcon(
  'OpMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m47.02-9.46H35.57l-2.7 19.11h5.48l.65-4.63h6.24c5.63 0 8.44-2.25 9.07-7.09.66-4.98-1.7-7.39-7.3-7.39m1.74 7.06c-.23 2.05-1.4 2.95-3.76 2.95h-5.36l.77-5.53h5.61c2.14 0 2.94.73 2.74 2.58m-26.7-7.5c-7.47 0-11.38 3.13-12.3 9.85-.93 6.87 2.29 10.15 9.94 10.15s11.36-3.13 12.27-9.85c.94-6.87-2.26-10.15-9.91-10.15m4.34 9.85c-.5 3.79-2.41 5.49-6.4 5.49-3.74 0-5.14-1.5-4.66-5.2.5-3.8 2.45-5.48 6.4-5.48s5.15 1.51 4.66 5.19"
    />
  ),
  { fill: 'currentColor' },
);

/** Op Circle coin icon (colored). */
export const OpCircle = Op;

/** Op Circle coin icon (monochrome). */
export const OpCircleMono = OpMono;
