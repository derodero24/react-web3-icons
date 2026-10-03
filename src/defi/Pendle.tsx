import { createIcon } from '../utils';

// Source: https://www.pendle.finance/images/logos/blue-light.svg
// Source: https://www.pendle.finance/images/logos/no-glow.svg
// Colored: the official blue-light.svg (circle #DEDEDE, ball #1E4480, stick #152E51)
// Mono: follows the official single-colour no-glow.svg, where the circle is drawn at 50% opacity under the full-strength ball and stick; same geometry as the colored mark
/** Pendle DeFi icon (colored). */
export const Pendle = /* @__PURE__ */ createIcon(
  'Pendle',
  '0 0 64 64',
  () => (
    <g transform="translate(-7.96 -8.62)scale(1.33183)">
      <circle cx="30" cy="26.3" r="16.81" fill="#DEDEDE" />
      <circle cx="22.44" cy="42.26" r="9.25" fill="#1E4480" />
      <path
        fill="#152E51"
        d="M23.48 33.08c4.62.51 8.2 4.43 8.2 9.18q0 .38-.03.77-.82.08-1.65.08c-5.84 0-10.98-2.98-13.99-7.5a9.2 9.2 0 0 1 5.41-2.54V11.84q1-.6 2.06-1.04z"
      />
    </g>
  ),
  { fill: 'none' },
);

/** Pendle DeFi icon (monochrome). */
export const PendleMono = /* @__PURE__ */ createIcon(
  'PendleMono',
  '0 0 64 64',
  () => (
    <g transform="translate(-7.96 -8.62)scale(1.33183)">
      <circle cx="30" cy="26.3" r="16.81" fillOpacity=".5" />
      <circle cx="22.44" cy="42.26" r="9.25" />
      <path d="M23.48 33.08c4.62.51 8.2 4.43 8.2 9.18q0 .38-.03.77-.82.08-1.65.08c-5.84 0-10.98-2.98-13.99-7.5a9.2 9.2 0 0 1 5.41-2.54V11.84q1-.6 2.06-1.04z" />
    </g>
  ),
  { fill: 'currentColor' },
);
