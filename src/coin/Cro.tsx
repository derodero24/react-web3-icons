import { createIcon } from '../utils';

// Source: @web3icons/react (MIT) — CRO token SVG (legacy third-party artwork)
// Legacy artwork: paths sourced from @web3icons/react (MIT), the old Crypto.com lion shield in #2E4B9F
// Legacy mark: neither this shield nor the Cronos hexagon-C in #002D74 that crypto.com/us/price/cronos still shows (as a PNG) is in the current identity. The official kit (https://cronos.com/brand, cronos-brand-kit.zip) holds the Cronos wordmarks and app icon, the Cronos Launch / Network lockups and the Ult logos, but no CRO token mark; cronos.com/about-cro shows the CRO coin only as a raster render (rechecked 2026-10-04). Kept, not deprecated: whether to deprecate or replace it is the maintainer's call (#836)
/** Cro coin icon (colored). */
export const Cro = /* @__PURE__ */ createIcon(
  'Cro',
  '0 0 64 64',
  () => (
    <path
      fill="#2E4B9F"
      d="m18.43 6.55-3.4 15.27h33.94l-3.4-15.27zM21.82 32l-7.48-5.08L4.01 33.7l13.81 23.75h5.24l5.55-6.37V48.2l-6.79-6.16zm19.94-6.79H22.9l4 6.79-1.85 8.48h14.56L37.09 32zm.42 6.79 7.47-5.8L60 33.7 46.37 57.45h-5.03l-6-6.42v-2.96l6.84-6.31z"
    />
  ),
  {},
);

/** Cro coin icon (monochrome). */
export const CroMono = /* @__PURE__ */ createIcon(
  'CroMono',
  '0 0 64 64',
  () => (
    <path d="m18.43 6.55-3.4 15.27h33.94l-3.4-15.27zM21.82 32l-7.48-5.08L4.01 33.7l13.81 23.75h5.24l5.55-6.37V48.2l-6.79-6.16zm19.94-6.79H22.9l4 6.79-1.85 8.48h14.56L37.09 32zm.42 6.79 7.47-5.8L60 33.7 46.37 57.45h-5.03l-6-6.42v-2.96l6.84-6.31z" />
  ),
  { fill: 'currentColor' },
);
