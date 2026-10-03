import { createIcon } from '../utils';

// Source: https://raydium.io/favicon.ico (official favicon)
// Source: https://docs.raydium.io/resources/brand-kit (official brand kit)
// Source: https://github.com/raydium-io/raydium-docs-v1/blob/master/logo/raydium-r.png (official symbol raster, the brand kit's master folder)
// Paths sourced from an earlier official raydium.io logo SVG, with its #C200FB / #3772FF / #5AC4BE stops
// Gradient vector: the old file ran the gradient horizontally (purple left, teal right), which matches neither official raster. The official raydium-r.png and favicon.ico run teal at bottom-left through blue to purple at top-right, with the corner dot purple; the axis (x1/y1/x2/y2) was fitted to raydium-r.png's pixels with the same three stops (mean colour error 4/255 against the PNG; checked 2026-10-03)
// No official symbol SVG is reachable today: the brand kit names mark-dark.svg / mark-light.svg, but its master folder (github.com/raydium-io/raydium-docs-v1, /logo/) holds only PNGs
/** Raydium DEX icon (colored). */
export const Raydium = /* @__PURE__ */ createIcon(
  'Raydium',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(1.7 .99)scale(1.51497)">
      <defs>
        <linearGradient
          id={`${_id}-ray-g`}
          x1="35.73"
          x2="4.07"
          y1="11.29"
          y2="29.77"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C200FB" />
          <stop offset=".49" stopColor="#3772FF" />
          <stop offset="1" stopColor="#5AC4BE" />
        </linearGradient>
      </defs>
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
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Raydium DEX icon (monochrome). */
export const RaydiumMono = /* @__PURE__ */ createIcon(
  'RaydiumMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M53.7 25.03v19.51L32 57.08 10.28 44.54V19.47L32 6.93l16.68 9.63 2.52-1.45L32 4.02l-24.24 14V46L32 60l24.24-14V23.57z" />
      <path d="M25.92 44.56H22.3V32.38h12.1a4.36 4.36 0 0 0 4.32-4.35 4.2 4.2 0 0 0-1.27-3.04 4.2 4.2 0 0 0-3.04-1.27H22.29v-3.7h12.12a8.06 8.06 0 0 1 8.02 8A8 8 0 0 1 41 32.58a8 8 0 0 1-3.49 2.86q-2.11.66-4.33.65h-7.27z" />
      <path d="M42.34 44.25H38.1l-3.27-5.7a14 14 0 0 0 3.8-.77z" />
      <path d="m51.18 20.97 2.5 1.4 2.51-1.4v-2.94l-2.5-1.45-2.51 1.45z" />
    </>
  ),
  { fill: 'currentColor' },
);
