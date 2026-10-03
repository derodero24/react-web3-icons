import { createIcon } from '../utils';

// Paths sourced from official raydium.io logo
/** Raydium DEX icon (colored). */
export const Raydium = /* @__PURE__ */ createIcon(
  'Raydium',
  '0 0 40 40',
  (_props, _id) => (
    <>
      <defs>
        <linearGradient
          id={`${_id}-ray-g`}
          x1="4"
          x2="36"
          y1="20.47"
          y2="20.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C200FB" />
          <stop offset=".49" stopColor="#3772FF" />
          <stop offset="1" stopColor="#5AC4BE" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M34.33 15.866V28.75L20 37.021 5.662 28.749V12.198L20 3.918l11.013 6.362 1.662-.96L20 2 4 11.239v18.47l16 9.238 16-9.239v-14.8z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M15.988 28.757H13.59v-8.04h7.992a2.877 2.877 0 0 0 2.633-3.959 2.7 2.7 0 0 0-.627-.916 2.77 2.77 0 0 0-2.006-.839H13.59v-2.446h8a5.32 5.32 0 0 1 5.291 5.291 5.14 5.14 0 0 1-.935 2.997 5.2 5.2 0 0 1-2.302 1.886 9.2 9.2 0 0 1-2.86.432h-4.796z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="M26.825 28.557h-2.797l-2.158-3.764a9.1 9.1 0 0 0 2.502-.511z"
      />
      <path
        fill={`url(#${_id}-ray-g)`}
        d="m32.66 13.189 1.654.919 1.654-.92v-1.941l-1.654-.96-1.655.96z"
      />
    </>
  ),
  { fill: 'none', ids: true },
);

/** Raydium DEX icon (monochrome). */
export const RaydiumMono = /* @__PURE__ */ createIcon(
  'RaydiumMono',
  '0 0 40 40',
  () => (
    <>
      <path d="M34.33 15.866V28.75L20 37.021 5.662 28.749V12.198L20 3.918l11.013 6.362 1.662-.96L20 2 4 11.239v18.47l16 9.238 16-9.239v-14.8z" />
      <path d="M15.988 28.757H13.59v-8.04h7.992a2.877 2.877 0 0 0 2.633-3.959 2.7 2.7 0 0 0-.627-.916 2.77 2.77 0 0 0-2.006-.839H13.59v-2.446h8a5.32 5.32 0 0 1 5.291 5.291 5.14 5.14 0 0 1-.935 2.997 5.2 5.2 0 0 1-2.302 1.886 9.2 9.2 0 0 1-2.86.432h-4.796z" />
      <path d="M26.825 28.557h-2.797l-2.158-3.764a9.1 9.1 0 0 0 2.502-.511z" />
      <path d="m32.66 13.189 1.654.919 1.654-.92v-1.941l-1.654-.96-1.655.96z" />
    </>
  ),
  { fill: 'currentColor' },
);
