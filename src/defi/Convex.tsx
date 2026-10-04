import { createIcon } from '../utils';

// Source: https://www.convexfinance.com/logos/convex-color.svg
// Source: https://www.convexfinance.com/logos/convex-white.svg
// Convex Finance stepped "C" bracket mark, cropped from the official light-background lockup convex-color.svg (the C and its accent pixels, copied unchanged; the wordmark is dropped)
// Colored: the #3A3A3A C with the #1682FE / #60D8A4 / #F4BB3B / #FF5A5A accent pixels; the old solid #FF5C29 appears in no official asset
// Mono: the C alone in currentColor, as in the official one-colour lockup convex-white.svg, which draws the C without the accent pixels
/** Convex DeFi icon (colored). */
export const Convex = /* @__PURE__ */ createIcon(
  'Convex',
  '0 0 64 64',
  () => (
    <g transform="translate(7.63 3.5)scale(1.88319)">
      <path
        fill="#3A3A3A"
        d="M25.87 12.16V6.22h-3V3.24H16.9V.27h-5.98v2.97H4.94v2.98h-3v17.83h3v2.98h5.98V30h5.98v-2.97h5.98v-2.98h3v-5.94h-6v2.97H16.9v2.97h-5.98v-2.97h-3V9.2h3V6.22h5.98v2.97h2.99v2.97z"
      />
      <rect width="2.08" height="3.12" x="14.95" y="6.07" fill="#1682FE" />
      <rect width="2.08" height="3.12" x="8.97" y=".27" fill="#1682FE" />
      <rect width="2.08" height="3.12" x="2.99" y="3.24" fill="#60D8A4" />
      <rect width="2.1" height="8.92" y="15.14" fill="#F4BB3B" />
      <rect width="2.1" height="8.92" y="6.22" fill="#60D8A4" />
      <rect width="2.08" height="3.12" x="17.94" y="9.04" fill="#1682FE" />
      <rect width="2.08" height="3.12" x="17.94" y="18.11" fill="#FF5A5A" />
      <rect width="2.08" height="3.12" x="14.95" y="21.08" fill="#FF5A5A" />
      <rect width="2.08" height="3.12" x="8.97" y="26.88" fill="#FF5A5A" />
      <rect width="2.08" height="3.12" x="2.99" y="23.91" fill="#F4BB3B" />
      <path
        fill="#3A3A3A"
        d="M25.87 12.16V6.22h-3V3.24H16.9V.27h-5.98v2.97H4.94v2.98h-3v17.83h3v2.98h5.98V30h5.98v-2.97h5.98v-2.98h3v-5.94h-6v2.97H16.9v2.97h-5.98v-2.97h-3V9.2h3V6.22h5.98v2.97h2.99v2.97z"
      />
    </g>
  ),
  {},
);

/** Convex DeFi icon (monochrome). */
export const ConvexMono = /* @__PURE__ */ createIcon(
  'ConvexMono',
  '0 0 64 64',
  () => (
    <path d="M56.35 26.4V15.21H50.7v-5.6H39.46V4H28.19v5.6H16.93v5.6h-5.65v33.6h5.65v5.61H28.2V60h11.27v-5.6h11.26v-5.6h5.65V37.6h-11.3v5.6h-5.61v5.6H28.19v-5.6h-5.65V20.83h5.65V15.2h11.27v5.6h5.63v5.59z" />
  ),
  { fill: 'currentColor' },
);
