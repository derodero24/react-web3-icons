import { createIcon } from '../utils';

// Source: https://github.com/raydium-io/raydium-ui-v3-public/blob/045a2a942711440b85e091ac313378a1e534f102/src/icons/RaydiumLogo.tsx (official Raydium UI repository, inline SVG symbol)
// Source: https://raydium.io/favicon.ico (official favicon, byte-identical to the repository's public/favicon.ico)
// Source: https://docs.raydium.io/resources/brand-kit (official brand kit, links the github.com/raydium-io organisation)
// Default: the four paths and the gradient of RaydiumLogo.tsx (40x40 viewBox) copied unchanged: x1 35.9717 y1 11.2489 -> x2 2.04291 y2 24.817, stops #C200FB / 0.489658 #3772FF / #5AC4BE (teal at the bottom-left to purple at the top-right); its four identical gradients share one id here. Placed on the 64 grid. The repository is the source of the live site: its public/favicon.ico is byte-identical to raydium.io/favicon.ico
// Mono: the same four paths in currentColor
// The brand kit's raydium-r.png is raster only and its gradient differs slightly; RaydiumLogoOutline.tsx in the same folder uses the older #7748FC -> #39D0D8 palette and is not used
/** Raydium DEX icon (colored). */
export const Raydium = /* @__PURE__ */ createIcon(
  'Raydium',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(1.7 .99)scale(1.51497)">
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M34.33 15.87v12.88L20 37.02 5.66 28.75V12.2L20 3.92l11.01 6.36 1.67-.96L20 2 4 11.24V29.7l16 9.24 16-9.24V14.9z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M15.99 28.76h-2.4v-8.04h8a2.88 2.88 0 0 0 2.63-3.96 3 3 0 0 0-.63-.92 2.8 2.8 0 0 0-2-.84h-8v-2.44h8a5.3 5.3 0 0 1 5.3 5.29c0 1.07-.33 2.12-.94 3a5 5 0 0 1-2.3 1.88q-1.4.45-2.87.43h-4.8z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M26.83 28.56h-2.8l-2.16-3.77a9 9 0 0 0 2.5-.5z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="m32.66 13.19 1.65.92 1.66-.92v-1.94l-1.66-.96-1.65.96z"
      />
      <defs>
        <linearGradient
          id={`${_id}-ray-g`}
          x1="35.97"
          x2="2.04"
          y1="11.25"
          y2="24.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C200FB" />
          <stop offset=".49" stopColor="#3772FF" />
          <stop offset="1" stopColor="#5AC4BE" />
        </linearGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Raydium DEX icon (monochrome). */
export const RaydiumMono = /* @__PURE__ */ createIcon(
  'RaydiumMono',
  '0 0 64 64',
  () => (
    <g>
      <path d="M53.71 25.03v19.5L32 57.09 10.28 44.55V19.47L32 6.93l16.68 9.64 2.52-1.46L32 4.02l-24.24 14v27.97L32 60l24.24-14V23.57z" />
      <path d="M25.92 44.55H22.3V32.38h12.1a4.36 4.36 0 0 0 4.3-4.36A4.2 4.2 0 0 0 37.43 25a4.2 4.2 0 0 0-3.03-1.28H22.29v-3.69H34.4a8.05 8.05 0 0 1 8.02 8.01A8 8 0 0 1 41 32.58a8 8 0 0 1-3.48 2.85q-2.11.66-4.34.65h-7.26z" />
      <path d="M42.34 44.26H38.1l-3.26-5.72q1.96-.11 3.79-.77z" />
      <path d="m51.17 20.97 2.51 1.4 2.51-1.4v-2.94l-2.5-1.45-2.52 1.44z" />
    </g>
  ),
  { fill: 'currentColor' },
);
