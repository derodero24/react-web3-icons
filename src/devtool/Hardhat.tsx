import { createIcon } from '../utils';

// Source: https://hardhat.org/images/hardhat-logo.svg
// Colored: the helmet cropped from the official hardhat-logo.svg (its eight helmet and diamond paths and their gradients, copied unchanged; the wordmark is dropped): yellow helmet, ETH diamond facets black and #6C6F74
// Mono: the four helmet paths in currentColor with the diamond facets knocked out
/** Hardhat devtool icon (colored). */
export const Hardhat = /* @__PURE__ */ createIcon(
  'Hardhat',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 11.8)scale(1.12219)">
      <defs>
        <linearGradient
          id={`${_id}-hhl-a`}
          x1="9.65"
          x2="9.65"
          y1="27.92"
          y2="3.59"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EDCF00" />
          <stop offset=".33" stopColor="#F0D500" />
          <stop offset=".77" stopColor="#F9E500" />
          <stop offset="1" stopColor="#FFF100" />
        </linearGradient>
        <linearGradient
          id={`${_id}-hhl-b`}
          x1="45.18"
          x2="45.18"
          y1="28.09"
          y2="10.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EDCF00" />
          <stop offset=".59" stopColor="#F7E100" />
          <stop offset="1" stopColor="#FFF100" />
        </linearGradient>
        <radialGradient
          id={`${_id}-hhl-c`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(18.5398 0 0 18.4136 2.8 44.54)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF100" />
          <stop offset=".23" stopColor="#F9E500" />
          <stop offset=".67" stopColor="#F0D500" />
          <stop offset="1" stopColor="#EDCF00" />
        </radialGradient>
      </defs>
      <path
        fill="#FFF100"
        d="M49.88 31.6v-2.43c0-.45-.76-.88-2.12-1.27l.03-3a22.5 22.5 0 0 0-4.12-12.98 23 23 0 0 0-10.89-8.3l-.1-.6q-.08-.49-.4-.87-.34-.38-.82-.52a23 23 0 0 0-12.92 0q-.48.15-.82.52-.33.38-.41.87l-.1.56a23 23 0 0 0-10.96 8.29A22.5 22.5 0 0 0 2.1 24.89v3.03c-1.34.38-2.08.8-2.08 1.25v2.42A.6.6 0 0 0 .1 32q1.02-.75 2.25-1.01 3.11-.75 6.3-1.05a4.3 4.3 0 0 1 3.3 1.06 9 9 0 0 0 6 2.31h13.97c2.23 0 4.37-.83 6.01-2.31q.67-.6 1.54-.9a4 4 0 0 1 1.77-.17q3.19.3 6.3 1.04 1.17.23 2.13.92l.11.1a.6.6 0 0 0 .1-.4"
      />
      <path
        fill={`url(#${_id}-hhl-a)`}
        d="m11.98 26.5-.03-1.68c.01-8.41 2-15.96 5.27-21.23a23 23 0 0 0-10.97 8.28A22.5 22.5 0 0 0 2.1 24.89v3.03A56 56 0 0 1 12 26.5"
      />
      <path
        fill={`url(#${_id}-hhl-b)`}
        d="M47.79 24.89c0-5.25-1.84-10.35-5.21-14.4a47 47 0 0 1 2.16 14.33q0 1.23-.06 2.43 1.55.24 3.07.65z"
      />
      <path
        fill={`url(#${_id}-hhl-c)`}
        d="M47.54 30.98q-3.11-.75-6.3-1.05a4.3 4.3 0 0 0-3.3 1.06 9 9 0 0 1-6.02 2.32H17.96a9 9 0 0 1-6-2.31q-.67-.6-1.54-.9a4 4 0 0 0-1.77-.18q-3.19.3-6.3 1.05-1.24.27-2.25 1.01c1.06 1.61 11.78 3.3 24.85 3.3 13.06 0 23.78-1.7 24.84-3.3q-.06-.04-.1-.1a5.5 5.5 0 0 0-2.15-.9"
      />
      <path fill="black" d="m24.94 7.82-5.35 9.02 5.35 3.29z" />
      <path fill="#6C6F74" d="M24.94 7.82v12.3l5.35-3.28z" />
      <path fill="#6C6F74" d="M24.94 21.91v4.3l5.35-7.6z" />
      <path fill="black" d="m24.94 21.91-5.34-3.28 5.34 7.58z" />
    </g>
  ),
  { ids: true },
);

/** Hardhat devtool icon (monochrome). */
export const HardhatMono = /* @__PURE__ */ createIcon(
  'HardhatMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 11.8)scale(1.12219)">
      <defs>
        <mask id={`${_id}-hhlm-a`} fill="#000">
          <path fill="#fff" d="M0 0h50v36H0z" />
          <path d="m24.94 7.82-5.35 9.02 5.35 3.29z" />
          <path d="M24.94 7.82v12.3l5.35-3.28z" />
          <path d="M24.94 21.91v4.3l5.35-7.6z" />
          <path d="m24.94 21.91-5.34-3.28 5.34 7.58z" />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${_id}-hhlm-a)`}>
        <path d="M49.88 31.6v-2.43c0-.45-.76-.88-2.12-1.27l.03-3a22.5 22.5 0 0 0-4.12-12.98 23 23 0 0 0-10.89-8.3l-.1-.6q-.08-.49-.4-.87-.34-.38-.82-.52a23 23 0 0 0-12.92 0q-.48.15-.82.52-.33.38-.41.87l-.1.56a23 23 0 0 0-10.96 8.29A22.5 22.5 0 0 0 2.1 24.89v3.03c-1.34.38-2.08.8-2.08 1.25v2.42A.6.6 0 0 0 .1 32q1.02-.75 2.25-1.01 3.11-.75 6.3-1.05a4.3 4.3 0 0 1 3.3 1.06 9 9 0 0 0 6 2.31h13.97c2.23 0 4.37-.83 6.01-2.31q.67-.6 1.54-.9a4 4 0 0 1 1.77-.17q3.19.3 6.3 1.04 1.17.23 2.13.92l.11.1a.6.6 0 0 0 .1-.4" />
        <path d="m11.98 26.5-.03-1.68c.01-8.41 2-15.96 5.27-21.23a23 23 0 0 0-10.97 8.28A22.5 22.5 0 0 0 2.1 24.89v3.03A56 56 0 0 1 12 26.5" />
        <path d="M47.79 24.89c0-5.25-1.84-10.35-5.21-14.4a47 47 0 0 1 2.16 14.33q0 1.23-.06 2.43 1.55.24 3.07.65z" />
        <path d="M47.54 30.98q-3.11-.75-6.3-1.05a4.3 4.3 0 0 0-3.3 1.06 9 9 0 0 1-6.02 2.32H17.96a9 9 0 0 1-6-2.31q-.67-.6-1.54-.9a4 4 0 0 0-1.77-.18q-3.19.3-6.3 1.05-1.24.27-2.25 1.01c1.06 1.61 11.78 3.3 24.85 3.3 13.06 0 23.78-1.7 24.84-3.3q-.06-.04-.1-.1a5.5 5.5 0 0 0-2.15-.9" />
      </g>
    </g>
  ),
  { ids: true },
);
