import { createIcon } from '../utils';

// Source: https://hardhat.org
/** Hardhat devtool icon (colored). */
export const Hardhat = /* @__PURE__ */ createIcon(
  'Hardhat',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-169.18 -177.28)scale(1.12269)">
      <defs>
        <linearGradient
          id={`${_id}-hhl-a`}
          x1="10.56"
          x2="10.56"
          y1="30.51"
          y2="6.19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#edcf00" />
          <stop offset=".33" stopColor="#f0d500" />
          <stop offset=".77" stopColor="#f9e500" />
          <stop offset="1" stopColor="#fff100" />
        </linearGradient>
        <linearGradient
          id={`${_id}-hhl-b`}
          x1="46.09"
          x2="46.09"
          y1="30.69"
          y2="13.09"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#edcf00" />
          <stop offset=".59" stopColor="#f7e100" />
          <stop offset="1" stopColor="#fff100" />
        </linearGradient>
        <radialGradient
          id={`${_id}-hhl-c`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(18.5398 0 0 18.4136 3.7 47.13)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff100" />
          <stop offset=".23" stopColor="#f9e500" />
          <stop offset=".67" stopColor="#f0d500" />
          <stop offset="1" stopColor="#edcf00" />
        </radialGradient>
      </defs>
      <path
        fill="#fff100"
        d="M204.13 200v-2.42c0-.45-.76-.88-2.12-1.27l.03-3.01a22.5 22.5 0 0 0-4.12-12.98c-2.7-3.8-6.5-6.7-10.89-8.29l-.1-.6a2 2 0 0 0-.4-.87q-.34-.38-.82-.52a23 23 0 0 0-12.92 0q-.49.14-.82.52c-.33.38-.36.54-.41.87l-.1.56a23 23 0 0 0-10.96 8.28 22.5 22.5 0 0 0-4.16 13.03v3.02c-1.34.39-2.08.81-2.08 1.26V200a.6.6 0 0 0 .09.4 6 6 0 0 1 2.24-1 44 44 0 0 1 6.3-1.05 4.3 4.3 0 0 1 3.31 1.06 9 9 0 0 0 6.01 2.3h13.96c2.22 0 4.37-.82 6.01-2.3.9-.82 2.1-1.2 3.31-1.08q3.19.3 6.3 1.05a5 5 0 0 1 2.13.92l.11.1a.6.6 0 0 0 .1-.4"
      />
      <g>
        <path
          fill={`url(#${_id}-hhl-a)`}
          d="m12.89 29.1-.03-1.68c0-8.42 2-15.96 5.26-21.23a23 23 0 0 0-10.96 8.28A22.5 22.5 0 0 0 3 27.49v3.02a56 56 0 0 1 9.89-1.42"
          transform="translate(153.34 165.8)"
        />
        <path
          fill={`url(#${_id}-hhl-b)`}
          d="M48.7 27.49a22.4 22.4 0 0 0-5.22-14.4 47 47 0 0 1 2.16 14.33q0 1.23-.06 2.43a29 29 0 0 1 3.08.65z"
          transform="translate(153.34 165.8)"
        />
        <path
          fill={`url(#${_id}-hhl-c)`}
          d="M48.45 33.58q-3.12-.75-6.3-1.05a4.3 4.3 0 0 0-3.31 1.06 9 9 0 0 1-6.01 2.31H18.87a9 9 0 0 1-6-2.3 4.3 4.3 0 0 0-3.31-1.08 44 44 0 0 0-6.3 1.05A6 6 0 0 0 1 34.58c1.06 1.61 11.78 3.3 24.84 3.3s23.79-1.7 24.85-3.3l-.11-.1a5.5 5.5 0 0 0-2.14-.9"
          transform="translate(153.34 165.8)"
        />
      </g>
      <path fill="#0a0a0a" d="m179.2 176.22-5.35 9.03 5.34 3.29z" />
      <path
        fill="#4b4d4d"
        d="M179.2 176.23v12.3l5.34-3.28zm0 14.09v4.29l5.34-7.58z"
      />
      <path fill="#0a0a0a" d="m179.2 190.32-5.35-3.29 5.34 7.58z" />
    </g>
  ),
  { ids: true },
);

/** Hardhat devtool icon (monochrome). */
export const HardhatMono = /* @__PURE__ */ createIcon(
  'HardhatMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-169.18 -177.28)scale(1.12269)">
      <defs>
        <mask id={`${_id}-hhlm-a`} fill="#000">
          <path fill="#fff" d="M154.25 169.12h49.88v34.57h-49.88z" />
          <path d="m179.2 176.22-5.35 9.03 5.34 3.29z" />
          <path d="M179.2 176.23v12.3l5.34-3.28zm0 14.09v4.29l5.34-7.58z" />
          <path d="m179.2 190.32-5.35-3.29 5.34 7.58z" />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${_id}-hhlm-a)`}>
        <path d="M204.13 200v-2.42c0-.45-.76-.88-2.12-1.27l.03-3.01a22.5 22.5 0 0 0-4.12-12.98c-2.7-3.8-6.5-6.7-10.89-8.29l-.1-.6a2 2 0 0 0-.4-.87q-.34-.38-.82-.52a23 23 0 0 0-12.92 0q-.49.14-.82.52c-.33.38-.36.54-.41.87l-.1.56a23 23 0 0 0-10.96 8.28 22.5 22.5 0 0 0-4.16 13.03v3.02c-1.34.39-2.08.81-2.08 1.26V200a.6.6 0 0 0 .09.4 6 6 0 0 1 2.24-1 44 44 0 0 1 6.3-1.05 4.3 4.3 0 0 1 3.31 1.06 9 9 0 0 0 6.01 2.3h13.96c2.22 0 4.37-.82 6.01-2.3.9-.82 2.1-1.2 3.31-1.08q3.19.3 6.3 1.05a5 5 0 0 1 2.13.92l.11.1a.6.6 0 0 0 .1-.4" />
        <path d="m166.24 194.9-.03-1.67c0-8.42 1.99-15.96 5.26-21.23a23 23 0 0 0-10.96 8.28 22.5 22.5 0 0 0-4.16 13.02v3.02a56 56 0 0 1 9.89-1.42m35.8-1.6a22.4 22.4 0 0 0-5.21-14.4 47 47 0 0 1 2.16 14.33q0 1.23-.06 2.43a29 29 0 0 1 3.07.65zm-.25 6.08q-3.11-.75-6.3-1.04a4.3 4.3 0 0 0-3.3 1.06 9 9 0 0 1-6.02 2.31h-13.95a9 9 0 0 1-6.01-2.3 4.3 4.3 0 0 0-3.3-1.08 44 44 0 0 0-6.31 1.05 6 6 0 0 0-2.25 1.01c1.06 1.6 11.78 3.3 24.85 3.3s23.78-1.7 24.84-3.3q-.06-.04-.1-.1a5.5 5.5 0 0 0-2.15-.9" />
      </g>
    </g>
  ),
  { ids: true },
);
