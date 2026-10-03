import { createIcon } from '../utils';

// Source: https://z.cash
/** Zec coin icon (colored). */
export const Zec = /* @__PURE__ */ createIcon(
  'Zec',
  '0 0 64 64',
  () => (
    <g transform="scale(2)">
      <circle cx="16" cy="16" r="16" fill="#ECB244" />
      <path
        fill="#FFF"
        d="M15.1 19.85h6.3v3.35h-3.88l.16 2.8h-3.26v-2.77h-3.88c0-1.1-.13-2.19.07-3.21.1-.55.68-1.03 1.03-1.5l3.71-4.59 1.52-1.78h-6.04V8.8h3.59V6h3.13v2.74h3.9c0 1.12.14 2.22-.06 3.24-.1.55-.67 1.03-1.06 1.5l-3.72 4.59a37 37 0 0 1-1.51 1.78"
      />
    </g>
  ),
  {},
);

/** Zec coin icon (monochrome). */
export const ZecMono = /* @__PURE__ */ createIcon(
  'ZecMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m30.2 7.7h12.59v6.7h-7.75c.12 1.9.19 3.69.32 5.6h-6.52v-5.54h-7.76c0-2.19-.25-4.37.13-6.43.2-1.09 1.36-2.05 2.07-3a924 924 0 0 1 7.43-9.17c.97-1.16 1.94-2.25 3.03-3.55H21.66v-6.7h7.18V12h6.26v5.47h7.82c0 2.26.25 4.44-.13 6.5-.2 1.09-1.36 2.05-2.13 3a924 924 0 0 1-7.43 9.17 74 74 0 0 1-3.04 3.55"
    />
  ),
  { fill: 'currentColor' },
);
