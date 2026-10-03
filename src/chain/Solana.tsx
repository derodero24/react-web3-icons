import { createIcon } from '../utils';

// Source: https://solana.com
// Shared Solana bar path data
// Circle variant: scale 0.1, translate(12.1, 16.4)
// Gradient coordinates pre-computed for 64×64 viewBox
/** Solana chain icon (colored). */
export const Solana = /* @__PURE__ */ createIcon(
  'Solana',
  '-0.02 0 397.74 311.7',
  (_props, _id) => (
    <>
      <linearGradient
        id={`${_id}-sln-a`}
        x1="360.88"
        x2="141.21"
        y1="-37.45"
        y2="383.29"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <path
        fill={`url(#${_id}-sln-a)`}
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
      />
      <linearGradient
        id={`${_id}-sln-b`}
        x1="264.83"
        x2="45.16"
        y1="-87.6"
        y2="333.15"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <path
        fill={`url(#${_id}-sln-b)`}
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
      />
      <linearGradient
        id={`${_id}-sln-c`}
        x1="312.55"
        x2="92.88"
        y1="-62.69"
        y2="358.06"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <path
        fill={`url(#${_id}-sln-c)`}
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"
      />
    </>
  ),
  { ids: true },
);

/** Solana Circle chain icon (colored). */
export const SolanaCircle = /* @__PURE__ */ createIcon(
  'SolanaCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" />
      <defs>
        <linearGradient
          id={`${_id}-slnc-a`}
          x1="48.19"
          x2="26.22"
          y1="12.65"
          y2="54.73"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-slnc-b`}
          x1="38.58"
          x2="16.62"
          y1="7.64"
          y2="49.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-slnc-c`}
          x1="43.35"
          x2="21.39"
          y1="10.13"
          y2="52.21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill={`url(#${_id}-slnc-a)`}
          d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
        <path
          fill={`url(#${_id}-slnc-b)`}
          d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
        <path
          fill={`url(#${_id}-slnc-c)`}
          d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
      </g>
    </>
  ),
  { ids: true },
);

/** Solana Square chain icon (colored). */
export const SolanaSquare = /* @__PURE__ */ createIcon(
  'SolanaSquare',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" rx="12.8" />
      <defs>
        <linearGradient
          id={`${_id}-slns-a`}
          x1="48.19"
          x2="26.22"
          y1="12.65"
          y2="54.73"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-slns-b`}
          x1="38.58"
          x2="16.62"
          y1="7.64"
          y2="49.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-slns-c`}
          x1="43.35"
          x2="21.39"
          y1="10.13"
          y2="52.21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill={`url(#${_id}-slns-a)`}
          d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
        <path
          fill={`url(#${_id}-slns-b)`}
          d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
        <path
          fill={`url(#${_id}-slns-c)`}
          d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"
          transform="matrix(.1 0 0 .1 12.1 16.4)"
        />
      </g>
    </>
  ),
  { ids: true },
);

/** Solana Square chain icon (monochrome). */
export const SolanaSquareMono = /* @__PURE__ */ createIcon(
  'SolanaSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-solsm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-solsm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M18.56 40.19c.24-.24.57-.38.92-.38h31.74c.58 0 .87.7.46 1.11l-6.27 6.27c-.24.24-.57.38-.92.38H12.75a.65.65 0 0 1-.46-1.11z" />
            <path d="M18.56 16.78c.25-.24.58-.38.92-.38h31.74c.58 0 .87.7.46 1.11l-6.27 6.27c-.24.24-.57.38-.92.38H12.75a.65.65 0 0 1-.46-1.11z" />
            <path d="M45.41 28.41c-.24-.24-.57-.38-.92-.38H12.75c-.58 0-.87.7-.46 1.11l6.27 6.27c.24.24.57.38.92.38h31.74c.58 0 .87-.7.46-1.11z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Solana Circle chain icon (monochrome). */
export const SolanaCircleMono = /* @__PURE__ */ createIcon(
  'SolanaCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-solcm-a)`} />
      <defs>
        <mask id={`${_id}-solcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M18.56 40.19c.24-.24.57-.38.92-.38h31.74c.58 0 .87.7.46 1.11l-6.27 6.27c-.24.24-.57.38-.92.38H12.75a.65.65 0 0 1-.46-1.11z" />
            <path d="M18.56 16.78c.25-.24.58-.38.92-.38h31.74c.58 0 .87.7.46 1.11l-6.27 6.27c-.24.24-.57.38-.92.38H12.75a.65.65 0 0 1-.46-1.11z" />
            <path d="M45.41 28.41c-.24-.24-.57-.38-.92-.38H12.75c-.58 0-.87.7-.46 1.11l6.27 6.27c.24.24.57.38.92.38h31.74c.58 0 .87-.7.46-1.11z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Solana chain icon (monochrome). */
export const SolanaMono = /* @__PURE__ */ createIcon(
  'SolanaMono',
  '-0.02 0 397.74 311.7',
  () => (
    <>
      <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
      <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1z" />
      <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z" />
    </>
  ),
  { fill: 'currentColor' },
);
