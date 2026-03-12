import { createIcon } from '../utils';

// Source: https://solana.com
// Shared Solana bar path data
const SOL_BAR_A =
  'M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z';
const SOL_BAR_B =
  'M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z';
const SOL_BAR_C =
  'M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z';

export const Solana = createIcon('Solana', '-0.02 0 397.74 311.7', _id => (
  <>
    <linearGradient
      id={`${_id}-sln-a`}
      gradientUnits="userSpaceOnUse"
      x1="360.879"
      y1="-37.455"
      x2="141.213"
      y2="383.294"
    >
      <stop offset="0" stopColor="#00ffa3" />
      <stop offset="1" stopColor="#dc1fff" />
    </linearGradient>
    <path d={SOL_BAR_A} fill={`url(#${_id}-sln-a)`} />
    <linearGradient
      id={`${_id}-sln-b`}
      gradientUnits="userSpaceOnUse"
      x1="264.829"
      y1="-87.601"
      x2="45.163"
      y2="333.148"
    >
      <stop offset="0" stopColor="#00ffa3" />
      <stop offset="1" stopColor="#dc1fff" />
    </linearGradient>
    <path d={SOL_BAR_B} fill={`url(#${_id}-sln-b)`} />
    <linearGradient
      id={`${_id}-sln-c`}
      gradientUnits="userSpaceOnUse"
      x1="312.548"
      y1="-62.688"
      x2="92.882"
      y2="358.061"
    >
      <stop offset="0" stopColor="#00ffa3" />
      <stop offset="1" stopColor="#dc1fff" />
    </linearGradient>
    <path d={SOL_BAR_C} fill={`url(#${_id}-sln-c)`} />
  </>
));

// Circle variant: scale 0.1, translate(12.1, 16.4)
// Gradient coordinates pre-computed for 64×64 viewBox
const SOL_CIRCLE_TX = 'translate(12.1 16.4) scale(0.1)';

export const SolanaCircle = createIcon('SolanaCircle', '0 0 64 64', _id => (
  <>
    <circle cx="32" cy="32" r="32" fill="#000" />
    <defs>
      <linearGradient
        id={`${_id}-slnc-a`}
        gradientUnits="userSpaceOnUse"
        x1="48.19"
        y1="12.65"
        x2="26.22"
        y2="54.73"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id={`${_id}-slnc-b`}
        gradientUnits="userSpaceOnUse"
        x1="38.58"
        y1="7.64"
        x2="16.62"
        y2="49.71"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id={`${_id}-slnc-c`}
        gradientUnits="userSpaceOnUse"
        x1="43.35"
        y1="10.13"
        x2="21.39"
        y2="52.21"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
    </defs>
    <g transform={SOL_CIRCLE_TX}>
      <path d={SOL_BAR_A} fill={`url(#${_id}-slnc-a)`} />
      <path d={SOL_BAR_B} fill={`url(#${_id}-slnc-b)`} />
      <path d={SOL_BAR_C} fill={`url(#${_id}-slnc-c)`} />
    </g>
  </>
));

export const SolanaSquare = createIcon('SolanaSquare', '0 0 64 64', _id => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#000" />
    <defs>
      <linearGradient
        id={`${_id}-slns-a`}
        gradientUnits="userSpaceOnUse"
        x1="48.19"
        y1="12.65"
        x2="26.22"
        y2="54.73"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id={`${_id}-slns-b`}
        gradientUnits="userSpaceOnUse"
        x1="38.58"
        y1="7.64"
        x2="16.62"
        y2="49.71"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient
        id={`${_id}-slns-c`}
        gradientUnits="userSpaceOnUse"
        x1="43.35"
        y1="10.13"
        x2="21.39"
        y2="52.21"
      >
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
    </defs>
    <g transform={SOL_CIRCLE_TX}>
      <path d={SOL_BAR_A} fill={`url(#${_id}-slns-a)`} />
      <path d={SOL_BAR_B} fill={`url(#${_id}-slns-b)`} />
      <path d={SOL_BAR_C} fill={`url(#${_id}-slns-c)`} />
    </g>
  </>
));

export const SolanaSquareMono = createIcon(
  'SolanaSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-solsm-a)`} />
      <defs>
        <mask id={`${_id}-solsm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={SOL_CIRCLE_TX} fill="#000">
            <path d={SOL_BAR_A} />
            <path d={SOL_BAR_B} />
            <path d={SOL_BAR_C} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const SolanaCircleMono = createIcon(
  'SolanaCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-solcm-a)`} />
      <defs>
        <mask id={`${_id}-solcm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={SOL_CIRCLE_TX} fill="#000">
            <path d={SOL_BAR_A} />
            <path d={SOL_BAR_B} />
            <path d={SOL_BAR_C} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const SolanaMono = createIcon(
  'SolanaMono',
  '-0.02 0 397.74 311.7',
  () => (
    <>
      <path d={SOL_BAR_A} />
      <path d={SOL_BAR_B} />
      <path d={SOL_BAR_C} />
    </>
  ),
  'currentColor',
);
