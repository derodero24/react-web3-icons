import { createIcon } from '../utils';

// Source: https://github.com/mode-network/brandkit (official Mode brand kit, linked from mode.network, accessed 2026-10-09)
// Source: https://github.com/mode-network/brandkit/blob/main/Assets/Logo/Mode%20logo%20primary.svg
// Source: https://github.com/mode-network/brandkit/blob/main/Assets/Logo/Mode%20logo%20black.svg
// Source: https://github.com/mode-network/brandkit/blob/main/Assets/Logo/Token.svg
// Default: the kit's primary logo, Mode logo primary.svg (the M in chartreuse #DFFE00, which the kit's README says is primary because Mode builds in dark mode), path unchanged and placed on the 64 grid. The mode.network header draws a narrower M, so the kit file is cited
// Mono: Mode logo black.svg (the same path in black, the kit's version for light backgrounds) in currentColor
// Circle: the kit's token icon, Token.svg (the M in black on a #DFFE00 disc), shapes unchanged and placed on the 64 grid as a full-bleed container; it is the light-background option for the pale default. CircleMono is the disc in currentColor with the M knocked out (fill-rule=evenodd)
/** Mode chain icon (colored). */
export const Mode = /* @__PURE__ */ createIcon(
  'Mode',
  '0 0 64 64',
  () => (
    <path d="M59.94 56.77H49.02v-24.7L53.4 18l-3.1-1.1-14.16 39.87h-8.31L13.65 16.89l-3.1 1.1 4.38 14.09v24.7H4V7.22h16.26l10.08 28.36v8.34h3.3v-8.34L43.73 7.22H60v49.55z" />
  ),
  { fill: '#DFFE00' },
);

/** Mode chain icon (monochrome). */
export const ModeMono = /* @__PURE__ */ createIcon(
  'ModeMono',
  '0 0 64 64',
  () => (
    <path d="M59.94 56.77H49.02v-24.7L53.4 18l-3.1-1.1-14.16 39.87h-8.31L13.65 16.89l-3.1 1.1 4.38 14.09v24.7H4V7.22h16.26l10.08 28.36v8.34h3.3v-8.34L43.73 7.22H60v49.55z" />
  ),
  { fill: 'currentColor' },
);

/** Mode Circle chain icon (colored). */
export const ModeCircle = /* @__PURE__ */ createIcon(
  'ModeCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.25)">
      <circle cx="128" cy="128" r="128" fill="#DFFE00" />
      <path d="M203.88 195.4h-29.65v-67.29l11.87-38.38-8.4-2.99-38.48 108.66h-22.55L78.19 86.74l-8.41 3 11.87 38.37v67.29H52v-135h44.14l27.39 77.29v22.69h8.94v-22.7l27.39-77.28H204v135z" />
    </g>
  ),
  {},
);

/** Mode Circle chain icon (monochrome). */
export const ModeCircleMono = /* @__PURE__ */ createIcon(
  'ModeCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M0 32a32 32 0 1 0 64 0 32 32 0 1 0-64 0m50.97 16.85h-7.41V32.03l2.96-9.6-2.1-.74-9.62 27.16h-5.63l-9.62-27.17-2.1.75 2.96 9.6v16.82H13V15.1h11.04l6.84 19.32v5.67h2.24v-5.67l6.85-19.32H51v33.75z"
    />
  ),
  { fill: 'currentColor' },
);
