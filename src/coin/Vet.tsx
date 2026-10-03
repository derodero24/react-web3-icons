import { createIcon } from '../utils';

// Source: https://vechain.org
/** Vet coin icon (colored). */
export const Vet = /* @__PURE__ */ createIcon(
  'Vet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.322 -5.322)scale(3.11017)">
      <path
        fill={`url(#${_id}-a)`}
        d="M21 3.844h-1.609c-.394 0-.748.225-.922.58l-4.219 8.74-.006-.005-1.125 2.328v.012l-1.125 2.329-5.619-11.65h1.603c.394 0 .754.225.923.58l3.673 7.554 1.125-2.329-2.965-6.103a3.61 3.61 0 0 0-3.25-2.036H3l1.125 2.334 6.75 13.978h2.25z"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x1="3"
          x2="20.05"
          y1="20.59"
          y2="1.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#582974" />
          <stop offset=".15" stopColor="#4163AD" />
          <stop offset=".47" stopColor="#22B2F9" />
          <stop offset=".74" stopColor="#54B1B6" />
          <stop offset="1" stopColor="#86E931" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Vet coin icon (monochrome). */
export const VetMono = /* @__PURE__ */ createIcon(
  'VetMono',
  '0 0 64 64',
  () => (
    <path d="M59.992 6.633h-5.005c-1.225 0-2.326.7-2.867 1.804L38.998 35.62l-.019-.015-3.499 7.24v.038l-3.499 7.243-17.476-36.233h4.986c1.225 0 2.345.7 2.87 1.804L33.786 39.19l3.5-7.244-9.222-18.981a11.23 11.23 0 0 0-10.108-6.333H4.009l3.498 7.26 20.994 43.474H35.5z" />
  ),
  { fill: 'currentColor' },
);
