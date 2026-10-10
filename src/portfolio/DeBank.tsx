import { createIcon } from '../utils';

// Source: https://debank.com
// No official vector found (checked 2026-10-10): debank.com/manifest.json lists only the PNG icons 192.png and 512.png, and /favicon.svg returns 404. The artwork matches the site's app icon https://debank.com/192.png (alpha IoU 0.99 with both fitted to the mark's box; on white both render #FF6238, #FE9A7F and #DF876F), so it is unchanged
// Mono: the B and the front arc in one ink, parted by a 1.2-unit knock-out gap along the arc; no official one-colour asset was found
/** De Bank portfolio icon (colored). */
export const DeBank = /* @__PURE__ */ createIcon(
  'DeBank',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#fe815f"
        d="M56.63 43.2C56.63 52.48 49 60 39.58 60H7.37V48.8h32.2c3.15 0 5.7-2.5 5.7-5.6s-2.55-5.6-5.7-5.6H28.22V26.4h11.37c3.14 0 5.68-2.5 5.68-5.6s-2.54-5.6-5.68-5.6H7.37V4h32.2C49 4 56.64 11.52 56.64 20.8c0 4.3-1.64 8.23-4.34 11.2a16.6 16.6 0 0 1 4.34 11.2"
        opacity=".8"
      />
      <path
        d="M7.37 48.8h27.66C29.16 55.6 19.8 60 9.26 60q-.95 0-1.89-.05zm33.46-11.2H30.11V26.4h10.72q.64 2.71.64 5.6c0 2.89-.22 3.79-.64 5.6m-5.8-22.4H7.37V4.05Q8.3 4 9.27 4C19.8 4 29.15 8.4 35.02 15.2"
        opacity=".12"
      />
      <path
        fill="#ff6238"
        d="M7.37 4c15.7 0 28.42 12.54 28.42 28S23.07 60 7.37 60V48.8c9.42 0 17.05-7.52 17.05-16.8S16.8 15.2 7.37 15.2z"
      />
    </>
  ),
  {},
);

/** De Bank portfolio icon (monochrome). */
export const DeBankMono = /* @__PURE__ */ createIcon(
  'DeBankMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M56.63 43.2C56.63 52.48 49 60 39.58 60H15.65c4.85-1.4 9.23-3.97 12.66-7.35q1.8-1.77 3.27-3.85h7.99c3.15 0 5.7-2.5 5.7-5.6s-2.55-5.6-5.7-5.6h-3.14Q37 34.86 37 32q-.01-2.86-.56-5.6h3.16c3.14 0 5.68-2.5 5.68-5.6s-2.54-5.6-5.68-5.6h-8a29 29 0 0 0-3.28-3.85C24.88 7.97 20.51 5.4 15.65 4h23.92C49 4 56.64 11.52 56.64 20.8c0 4.3-1.64 8.23-4.34 11.2a16.6 16.6 0 0 1 4.34 11.2zM7.37 4c15.7 0 28.42 12.54 28.42 28S23.07 60 7.37 60V48.8c9.42 0 17.05-7.52 17.05-16.8S16.8 15.2 7.37 15.2z"
    />
  ),
  { fill: 'currentColor' },
);
