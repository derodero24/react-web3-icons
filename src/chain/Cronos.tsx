import { createIcon } from '../utils';

// Source: https://cronos.com/favicon.svg (official site icon: the black Cronos C on a #4CDBFF square)
// Source: https://cronos.com/brand (official brand kit, cronos-brand-kit.zip: cronos/cronos-app-icon.svg and cronos/cronos-wordmark-dark.svg)
// Colored: the official cronos.com/favicon.svg, paths unchanged (the 512-unit #4CDBFF square and the #000 C with its translate(94.330 65.587) scale(4.071244) baked in), scaled by 0.125 to fill the 64 grid as a container. The C is the first letter of the brand kit's Cronos wordmark (the same path) and the square is the kit's app-icon tile (cronos-app-icon.svg: the full black wordmark on #4CDBFF); the kit's app icon itself is not used because its wordmark is illegible at icon sizes
// Mono: the square in currentColor with the C knocked out (one evenodd path)
// It replaces the re-export of the legacy Cro artwork (the old Crypto.com lion shield from @web3icons); the coin Cro now re-exports this unit
/** Cronos chain icon (colored). */
export const Cronos = /* @__PURE__ */ createIcon(
  'Cronos',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#4CDBFF" />
      <path d="M35.98 45.7c-7.87 0-13.34-5.61-13.34-13.7s5.47-13.7 13.34-13.7c3.8 0 7.12 1.14 9.68 3.38.75.66 1.91.54 2.48-.28l3.77-5.4c.48-.68.37-1.62-.26-2.17-4.18-3.62-9.73-5.63-15.67-5.63-13.73 0-24.19 10.38-24.19 23.8s10.46 23.8 24.19 23.8c5.87 0 11.36-1.96 15.52-5.5.64-.54.75-1.49.27-2.17L48 42.73a1.66 1.66 0 0 0-2.46-.3c-2.55 2.17-5.83 3.28-9.57 3.28" />
    </>
  ),
  {},
);

/** Cronos chain icon (monochrome). */
export const CronosMono = /* @__PURE__ */ createIcon(
  'CronosMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 0h64v64H0zm35.98 45.7c-7.87 0-13.34-5.61-13.34-13.7s5.47-13.7 13.34-13.7c3.8 0 7.12 1.14 9.68 3.38.75.66 1.91.54 2.48-.28l3.77-5.4c.48-.68.37-1.62-.26-2.17-4.18-3.62-9.73-5.63-15.67-5.63-13.73 0-24.19 10.38-24.19 23.8s10.46 23.8 24.19 23.8c5.87 0 11.36-1.96 15.52-5.5.64-.54.75-1.49.27-2.17L48 42.73a1.66 1.66 0 0 0-2.46-.3c-2.55 2.17-5.83 3.28-9.57 3.28"
    />
  ),
  { fill: 'currentColor' },
);
