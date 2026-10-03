import { createIcon } from '../utils';

// Source: https://vechain.org
/** Vet coin icon (colored). */
export const Vet = /* @__PURE__ */ createIcon(
  'Vet',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <path
        fill={`url(#${_id}-a)`}
        d="M21 3.84h-1.6c-.4 0-.76.23-.93.58l-4.22 8.74-1.13 2.33-1.13 2.34L6.37 6.18h1.6c.4 0 .76.22.93.58l3.67 7.55 1.13-2.33-2.97-6.1a3.6 3.6 0 0 0-3.25-2.04H3l1.13 2.34 6.75 13.98h2.24z"
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
    <path d="M60 6.63h-5.01c-1.23 0-2.33.7-2.87 1.8L39 35.63l-.02-.02-3.5 7.25v.03l-3.5 7.25L14.51 13.9h4.98c1.23 0 2.35.7 2.87 1.8L33.8 39.2l3.5-7.24-9.23-18.98a11.2 11.2 0 0 0-10.1-6.34H4l3.5 7.26 21 43.48h6.99z" />
  ),
  { fill: 'currentColor' },
);
