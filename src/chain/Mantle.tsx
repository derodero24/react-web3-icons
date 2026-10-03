import { createIcon } from '../utils';

// Source: https://www.mantle.xyz (Brand Assets, accessed 2026-10-03)
// Source: https://drive.google.com/drive/folders/1Dmd7-6mmpgGjKREqy-1uIi6fxFF-PZVB (Mantle brand kit: MNT_Logo_Variation/MoMNTum_BrandMark-SVG/MNT-Official-BrandMark.svg)
// Default: the official MoMNTum brandmark MNT-Official-BrandMark.svg (16 bars, each a vertical white -> #00FF93 gradient), paths and gradients unchanged (ids renamed mnt-0 … mnt-15, stop offset .819595 rounded to .82). It replaces the older black disc with white bars, which the current kit no longer ships; the kit shows the brandmark without a container (its MNT_Token_Logo, the mark on an Obsidian Green #092C24 square, is PNG-only)
// Mono: the same 16 paths in currentColor, the geometry of the kit's single-colour brandmarks (MNT-Official-BrandMark-Black/-White/-ObsidianGreen/-Mint.svg); the bars do not touch, so no seams are needed
// The brandmark is drawn for dark backgrounds and mostly fades on white; MantleMono with color="#092C24" is the official Obsidian Green brandmark (see the exemption in test/legibility.test.ts)
/** Mantle chain icon (colored). */
export const Mantle = /* @__PURE__ */ createIcon(
  'Mantle',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(.07 0 0 .07 4 4)">
      <path
        fill={`url(#${_id}-mnt-0)`}
        d="m164.65 280.52-121.3-61.76a399 399 0 0 0-24 58.1l129.52 41.88a262 262 0 0 1 15.79-38.2z"
      />
      <path
        fill={`url(#${_id}-mnt-1)`}
        d="m267.7 171.68 67.19 115.76a129 129 0 0 1 31.24-13l-34.78-129.27c8.85-2.37 17.85-4.34 26.89-5.77L336.87 4.95a400 400 0 0 0-61.05 14.7L317.37 147a266 266 0 0 0-38.48 16L217.8 43.8a401 401 0 0 0-53.41 32.9l80.25 109.95c7.4-5.39 15.12-10.38 23.04-14.99z"
      />
      <path
        fill={`url(#${_id}-mnt-2)`}
        d="m628.24 267.57-115.72 67.26a129 129 0 0 1 13.02 31.22L654.8 331.2c2.38 8.85 4.34 17.83 5.78 26.87L795 336.67a399 399 0 0 0-14.75-61.07l-127.32 41.63a265 265 0 0 0-16.03-38.47l119.17-61.15a402 402 0 0 0-32.92-53.39l-109.92 80.3c5.4 7.4 10.39 15.11 15 23.04z"
      />
      <path
        fill={`url(#${_id}-mnt-3)`}
        d="M581.05 43.24a400 400 0 0 0-58.1-23.97l-41.8 129.55a263 263 0 0 1 38.22 15.77z"
      />
      <path
        fill={`url(#${_id}-mnt-4)`}
        d="m532.72 169.3-67.96 117.94a131 131 0 0 1 26.99 20.66l190.6-191.25a403 403 0 0 0-47.74-40.67l-78.6 108.42a268 268 0 0 0-23.28-15.11z"
      />
      <path
        fill={`url(#${_id}-mnt-5)`}
        d="m169.38 267.15 117.91 68.03a131 131 0 0 1 20.69-27L116.8 117.52a403 403 0 0 0-40.69 47.72l108.38 78.66a267 267 0 0 0-15.12 23.26"
      />
      <path
        fill={`url(#${_id}-mnt-6)`}
        d="M441.27 137.1 461.83 4.76A404 404 0 0 0 400 0h-.31v270.02h.3c11.4 0 22.65 1.45 33.49 4.33l34.91-131.58q-13.4-3.54-27.12-5.67"
      />
      <path
        fill={`url(#${_id}-mnt-7)`}
        d="m274.36 366.47-131.55-35.01a263 263 0 0 0-5.7 27.13L4.8 337.96A404 404 0 0 0 0 400.01h270.02c0-11.4 1.46-22.7 4.35-33.54z"
      />
      <path
        fill={`url(#${_id}-mnt-8)`}
        d="m635.35 519.48 121.3 61.76a399 399 0 0 0 24-58.1l-129.52-41.87a262 262 0 0 1-15.79 38.2z"
      />
      <path
        fill={`url(#${_id}-mnt-9)`}
        d="m532.3 628.32-67.18-115.77a129 129 0 0 1-31.24 13l34.77 129.27c-8.86 2.38-17.84 4.34-26.88 5.77l21.35 134.44a400 400 0 0 0 61.05-14.7l-41.54-127.35a265 265 0 0 0 38.48-16l61.07 119.2a401 401 0 0 0 53.42-32.9l-80.26-109.95c-7.39 5.38-15.12 10.38-23.03 14.99"
      />
      <path
        fill={`url(#${_id}-mnt-10)`}
        d="m171.76 532.43 115.74-67.25a129 129 0 0 1-13.03-31.22L145.22 468.8c-2.38-8.86-4.35-17.84-5.78-26.87L4.99 463.33a400 400 0 0 0 14.75 61.07l127.32-41.63a265 265 0 0 0 16.03 38.47L43.92 582.39a402 402 0 0 0 32.92 53.4l109.93-80.31c-5.4-7.4-10.4-15.11-15-23.04z"
      />
      <path
        fill={`url(#${_id}-mnt-11)`}
        d="M218.95 756.76a400 400 0 0 0 58.1 23.97l41.8-129.55a263 263 0 0 1-38.22-15.76l-61.68 121.35"
      />
      <path
        fill={`url(#${_id}-mnt-12)`}
        d="m267.28 630.7 67.96-117.94a131 131 0 0 1-26.99-20.65l-190.6 191.25a403 403 0 0 0 47.74 40.66L244 615.61a268 268 0 0 0 23.27 15.1z"
      />
      <path
        fill={`url(#${_id}-mnt-13)`}
        d="m630.62 532.85-117.91-68.03a131 131 0 0 1-20.69 27L683.18 682.5a403 403 0 0 0 40.69-47.72l-108.38-78.66a267 267 0 0 0 15.12-23.26z"
      />
      <path
        fill={`url(#${_id}-mnt-14)`}
        d="m366.52 525.65-34.91 131.58q13.4 3.54 27.13 5.67l-20.56 132.34A404 404 0 0 0 400 800h.31V530h-.3c-11.4 0-22.65-1.46-33.49-4.34"
      />
      <path
        fill={`url(#${_id}-mnt-15)`}
        d="M529.99 400c0 11.4-1.47 22.69-4.36 33.54l131.56 35.01a263 263 0 0 0 5.69-27.13l132.33 20.64a404 404 0 0 0 4.8-62.05z"
      />
      <defs>
        <linearGradient
          id={`${_id}-mnt-0`}
          x1="92"
          x2="92"
          y1="195.97"
          y2="449.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-1`}
          x1="265.26"
          x2="265.26"
          y1="-59.44"
          y2="656.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-2`}
          x1="653.76"
          x2="653.76"
          y1="118.22"
          y2="629.6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-3`}
          x1="531.1"
          x2="531.1"
          y1="-13.85"
          y2="354.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-4`}
          x1="573.56"
          x2="573.56"
          y1="23.12"
          y2="610.76"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-5`}
          x1="192.05"
          x2="192.05"
          y1="67.9"
          y2="619.43"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-6`}
          x1="434.04"
          x2="434.04"
          y1="-62.54"
          y2="632.62"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-7`}
          x1="137.19"
          x2="137.19"
          y1="315.84"
          y2="489.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-8`}
          x1="708"
          x2="708"
          y1="458.48"
          y2="711.81"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-9`}
          x1="534.74"
          x2="534.74"
          y1="448.16"
          y2="1163.92"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-10`}
          x1="146.25"
          x2="146.25"
          y1="387.96"
          y2="899.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-11`}
          x1="268.9"
          x2="268.9"
          y1="602.29"
          y2="970.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-12`}
          x1="226.45"
          x2="226.45"
          y1="439.24"
          y2="1026.88"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-13`}
          x1="607.94"
          x2="607.94"
          y1="415.2"
          y2="966.76"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-14`}
          x1="365.96"
          x2="365.96"
          y1="463.12"
          y2="1158.27"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
        <linearGradient
          id={`${_id}-mnt-15`}
          x1="662.82"
          x2="662.82"
          y1="384.38"
          y2="558.07"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#fff" />
          <stop offset=".82" stopColor="#00FF93" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Mantle chain icon (monochrome). */
export const MantleMono = /* @__PURE__ */ createIcon(
  'MantleMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m15.53 23.64-8.5-4.33a28 28 0 0 0-1.68 4.07l9.07 2.93q.45-1.37 1.1-2.67" />
      <path d="m22.74 16.02 4.7 8.1q1.04-.6 2.19-.9l-2.44-9.06q.93-.25 1.89-.4l-1.5-9.41q-2.18.34-4.27 1.03l2.9 8.91q-1.38.46-2.69 1.12l-4.27-8.34q-1.96 1-3.74 2.3l5.62 7.7q.77-.57 1.6-1.05" />
      <path d="m47.98 22.73-8.1 4.7q.6 1.05.9 2.2l9.06-2.45q.24.93.4 1.89l9.41-1.5a28 28 0 0 0-1.03-4.28l-8.91 2.92q-.45-1.4-1.13-2.7l8.35-4.28a28 28 0 0 0-2.3-3.73l-7.7 5.62q.55.77 1.05 1.6" />
      <path d="M44.67 7.03a28 28 0 0 0-4.06-1.68l-2.93 9.07q1.38.45 2.68 1.1z" />
      <path d="m41.29 15.85-4.76 8.26q1.05.6 1.9 1.44l13.33-13.38a28 28 0 0 0-3.34-2.85l-5.5 7.59q-.79-.57-1.63-1.06" />
      <path d="m15.86 22.7 8.25 4.76q.6-1.04 1.45-1.89L12.18 12.23a28 28 0 0 0-2.85 3.34l7.58 5.5q-.57.8-1.05 1.63" />
      <path d="m34.89 13.6 1.44-9.27A28 28 0 0 0 32 4h-.02v18.9H32q1.2 0 2.34.3L36.8 14q-.94-.25-1.9-.4" />
      <path d="M23.2 29.65 14 27.2q-.25.94-.4 1.9l-9.26-1.44A28 28 0 0 0 4 32h18.9q0-1.2.3-2.35" />
      <path d="m48.47 40.36 8.5 4.33a28 28 0 0 0 1.68-4.07l-9.07-2.93q-.45 1.38-1.1 2.67" />
      <path d="m41.26 47.98-4.7-8.1q-1.03.6-2.19.9l2.44 9.06q-.93.24-1.89.4l1.5 9.41q2.18-.34 4.27-1.03l-2.9-8.91q1.38-.45 2.69-1.12l4.27 8.34q1.96-1 3.74-2.3l-5.62-7.7q-.77.57-1.6 1.05" />
      <path d="m16.02 41.27 8.1-4.7q-.6-1.05-.9-2.2l-9.05 2.45q-.25-.93-.41-1.88l-9.41 1.5q.35 2.17 1.03 4.27l8.91-2.92q.45 1.4 1.13 2.7l-8.35 4.28q1.02 1.95 2.3 3.73l7.7-5.62a19 19 0 0 1-1.05-1.6" />
      <path d="M19.33 56.97q1.96 1 4.06 1.68l2.93-9.07q-1.39-.44-2.68-1.1z" />
      <path d="m22.71 48.15 4.76-8.26a9 9 0 0 1-1.9-1.44L12.25 51.83a28 28 0 0 0 3.34 2.85l5.5-7.59q.79.58 1.63 1.06" />
      <path d="m48.14 41.3-8.25-4.76q-.6 1.04-1.45 1.89l13.38 13.34q1.56-1.55 2.85-3.34l-7.59-5.5q.58-.8 1.06-1.63" />
      <path d="M29.66 40.8 27.2 50q.94.25 1.9.4l-1.44 9.27Q29.82 60 32 60h.02V41.1H32q-1.2 0-2.34-.3" />
      <path d="M41.1 32q0 1.2-.3 2.35L50 36.8q.25-.94.4-1.9l9.26 1.44Q60 34.2 60 32z" />
    </>
  ),
  { fill: 'currentColor' },
);
