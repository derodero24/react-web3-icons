import { createIcon } from '../utils';

// Source: cryptologos.cc — LTC logo SVG (legacy third-party artwork)
// Legacy artwork: the paths come from cryptologos.cc, not from an official Litecoin file; the geometry matches the symbol litecoin.org serves (https://litecoin.org/assets/ltc-DIEMRQHk.svg, drawn there in black), but the #345D9D colour is not confirmed by an official source (litecoin.com/en/brand was not reachable)
/** Ltc coin icon (colored). */
export const Ltc = /* @__PURE__ */ createIcon(
  'Ltc',
  '0 0 64 64',
  () => (
    <g transform="scale(.77482)">
      <circle cx="41.3" cy="41.3" r="36.83" fill="#fff" />
      <path
        fill="#345d9d"
        d="M41.3 0a41.3 41.3 0 1 0 41.3 41.3A41.2 41.2 0 0 0 41.54 0Zm.7 42.7-4.3 14.5h23a1.16 1.16 0 0 1 1.2 1.12v.38l-2 6.9a1.5 1.5 0 0 1-1.5 1.1H23.2l5.9-20.1-6.6 2L24 44l6.6-2 8.3-28.2a1.5 1.5 0 0 1 1.5-1.1h8.9a1.16 1.16 0 0 1 1.2 1.12v.38l-7 23.8 6.6-2-1.4 4.8Z"
      />
    </g>
  ),
  {},
);

/** Ltc coin icon (monochrome). */
export const LtcMono = /* @__PURE__ */ createIcon(
  'LtcMono',
  '0 0 64 64',
  () => (
    <path d="M32 0a32 32 0 1 0 32 32A31.9 31.9 0 0 0 32.19 0Zm.54 33.08-3.33 11.24h17.82a.9.9 0 0 1 .93.87v.3l-1.55 5.34a1.15 1.15 0 0 1-1.16.85H17.98l4.57-15.57-5.12 1.55 1.17-3.57 5.1-1.55 6.44-21.85a1.2 1.2 0 0 1 1.16-.85h6.9a.9.9 0 0 1 .93.87v.3L33.7 29.43l5.12-1.55-1.09 3.72Z" />
  ),
  { fill: 'currentColor' },
);
