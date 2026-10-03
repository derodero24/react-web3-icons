import { createIcon } from '../utils';

// Source: https://github.com/enkryptcom/enKrypt/blob/main/packages/extension/src/ui/action/icons/common/logo.vue (official Enkrypt extension repository, inline SVG logo)
// Colored: the E symbol path and its #C549FF to #704BFF radial gradient copied unchanged out of the official extension logo (the #684CFF wordmark is left out), placed on the 64 grid; the previous artwork was the same E flattened to #C54AFF
// Mono: the same E path in currentColor
/** Enkrypt wallet icon (colored). */
export const Enkrypt = /* @__PURE__ */ createIcon(
  'Enkrypt',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 .02)scale(3.55346)">
      <path
        fill={`url(#${_id}-enk-a)`}
        fillRule="evenodd"
        d="M0 4.16a3.03 3.03 0 0 1 3.03-3.03h12.72v2.32c0 1.2-.98 2.18-2.18 2.18H7.6a3.03 3.03 0 0 0-3.03 3.03v.77a3.03 3.03 0 0 0 3.03 3.03h5.98c1.2 0 2.18.98 2.18 2.18v2.24H3.03A3.03 3.03 0 0 1 0 13.84zM7.72 6.9h6.14a1.9 1.9 0 0 1 1.89 1.9v.5a1.9 1.9 0 0 1-1.9 1.9H7.73a1.9 1.9 0 0 1-1.9-1.9v-.5c0-1.06.86-1.9 1.9-1.9"
      />
      <defs>
        <radialGradient
          id={`${_id}-enk-a`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(55.38 -.44 .76)scale(22.3151 89.168)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".05" stopColor="#C549FF" />
          <stop offset=".82" stopColor="#704BFF" />
        </radialGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Enkrypt wallet icon (monochrome). */
export const EnkryptMono = /* @__PURE__ */ createIcon(
  'EnkryptMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M4 14.79C4 8.84 8.84 4.02 14.77 4.02h45.2v8.26a7.74 7.74 0 0 1-7.74 7.74H30.98c-5.95 0-10.77 4.82-10.77 10.77v2.74c0 5.95 4.82 10.77 10.77 10.77h21.25a7.74 7.74 0 0 1 7.74 7.74v7.94h-45.2c-5.94 0-10.76-4.82-10.76-10.77zm27.45 9.73h21.8a6.73 6.73 0 0 1 6.72 6.74v1.8a6.73 6.73 0 0 1-6.73 6.74h-21.8a6.73 6.73 0 0 1-6.73-6.73v-1.81a6.73 6.73 0 0 1 6.74-6.74"
    />
  ),
  { fill: 'currentColor' },
);
