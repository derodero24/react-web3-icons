import { createIcon } from '../utils';

// Source: https://www.pendle.finance/images/logos/blue-light.svg
// Source: https://www.pendle.finance/images/logos/no-glow.svg
// Colored: the official blue-light.svg (circle #DEDEDE, ball #1E4480, stick #152E51)
// Mono: a binary reading of the official single-colour no-glow.svg (which draws the circle at 50% opacity): the circle in ink with the stick knocked out of it, and the ball in ink, parted from the circle by a 1.2-unit gap so the overlap stays readable; same geometry as the colored mark
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
    <path
      fillRule="evenodd"
      d="M9.6 26.4c0-8.18 4.4-15.35 10.97-19.25v27.06c-3.03.3-5.76 1.6-7.87 3.57A22.3 22.3 0 0 1 9.6 26.4M32 4.03c12.36 0 22.38 10.02 22.38 22.39 0 11.2-8.22 20.48-18.96 22.13q.03-.44.03-.88c0-7-5.32-12.75-12.14-13.45V5.77A22 22 0 0 1 32 4.02M9.6 47.66c0-6.8 5.52-12.32 12.33-12.32 6.8 0 12.32 5.52 12.32 12.32s-5.52 12.32-12.32 12.32S9.6 54.47 9.6 47.66"
    />
  ),
  { fill: 'currentColor' },
);
