import { createIcon } from '../utils';

// Source: https://zerion.io
/** Zerion Circle wallet icon (colored). */
export const ZerionCircle = /* @__PURE__ */ createIcon(
  'ZerionCircle',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <rect width="1024" height="1024" fill={`url(#${_id}-zr-a)`} rx="512" />
      <path
        fill="#fff"
        d="M258.64 288c-15.35 0-21.27 18.99-8.38 26.92l322.32 194.35c8.04 4.95 18.76 3 24.29-4.43L738.59 318.8c9.63-12.92-.1-30.79-16.78-30.79zm506.61 448c15.35 0 21.42-19.09 8.54-27.02L451.37 514.65c-8.03-4.94-18.49-2.74-24.02 4.68l-142 186.01c-9.63 12.93.41 30.66 17.09 30.66z"
      />
      <defs>
        <linearGradient
          id={`${_id}-zr-a`}
          x1="0"
          x2="1209.97"
          y1="0"
          y2="704.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2962ef" />
          <stop offset="1" stopColor="#255ce5" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Zerion Square wallet icon (colored). */
export const ZerionSquare = /* @__PURE__ */ createIcon(
  'ZerionSquare',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#16161a"
        d="M0 17.2c0-5.98 0-8.97 1.16-11.25 1.02-2 2.65-3.64 4.66-4.66C8.1.13 11.09.13 17.06.13h29.86c5.97 0 8.96 0 11.24 1.16 2 1.02 3.64 2.65 4.66 4.66C64 8.23 64 11.22 64 17.2v29.63c0 5.97 0 8.96-1.17 11.24-1.02 2-2.65 3.64-4.66 4.66-2.28 1.17-5.27 1.17-11.24 1.17H17.06c-5.97 0-8.96 0-11.24-1.17-2-1.02-3.64-2.65-4.66-4.66C-.01 55.78-.01 52.8-.01 46.82z"
      />
      <path
        fill="#fff"
        d="M13.87 16.07c-1.1 0-1.52 1.35-.6 1.91L36.3 31.81a1.3 1.3 0 0 0 1.73-.31l10.12-13.24c.69-.92 0-2.2-1.2-2.2zm36.19 31.88c1.1 0 1.53-1.36.6-1.92L27.65 32.2a1.3 1.3 0 0 0-1.72.33L15.78 45.77c-.69.92.03 2.18 1.22 2.18z"
      />
    </>
  ),
  {},
);

/** Zerion Circle wallet icon (monochrome). */
export const ZerionCircleMono = /* @__PURE__ */ createIcon(
  'ZerionCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.0625)">
      <defs>
        <mask id={`${_id}-zr-circle-a`}>
          <rect width="1024" height="1024" fill="#fff" />
          <path
            fill="#000"
            d="M258.64 288c-15.35 0-21.27 18.99-8.38 26.92l322.32 194.35c8.04 4.95 18.76 3 24.29-4.43L738.59 318.8c9.63-12.92-.1-30.79-16.78-30.79zm506.61 448c15.35 0 21.42-19.09 8.54-27.02L451.37 514.65c-8.03-4.94-18.49-2.74-24.02 4.68l-142 186.01c-9.63 12.93.41 30.66 17.09 30.66z"
          />
        </mask>
      </defs>
      <rect
        width="1024"
        height="1024"
        mask={`url(#${_id}-zr-circle-a)`}
        rx="512"
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion Square wallet icon (monochrome). */
export const ZerionSquareMono = /* @__PURE__ */ createIcon(
  'ZerionSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-157.62 -259.86)scale(1.59414)">
      <defs>
        <mask id={`${_id}-zr-square-a`}>
          <path fill="#fff" d="M-180.8-15.75h1847v1635h-1847z" />
          <path
            fill="#000"
            d="M107.58 173.09c-.69 0-.95.84-.37 1.2l14.44 8.67a.83.83 0 0 0 1.09-.2l6.35-8.3c.43-.58 0-1.38-.76-1.38zm22.7 20c.69 0 .96-.86.38-1.21l-14.44-8.68a.8.8 0 0 0-1.08.21l-6.36 8.3c-.43.58.02 1.38.76 1.38z"
          />
        </mask>
      </defs>
      <path
        d="M98.87 173.8c0-3.76 0-5.63.73-7.06a6.7 6.7 0 0 1 2.93-2.93c1.43-.73 3.3-.73 7.05-.73h18.73c3.75 0 5.62 0 7.06.73a6.7 6.7 0 0 1 2.92 2.93c.73 1.43.73 3.3.73 7.05v18.59c0 3.74 0 5.62-.73 7.05a6.7 6.7 0 0 1-2.92 2.92c-1.44.73-3.31.73-7.06.73h-18.73c-3.75 0-5.62 0-7.05-.73a6.7 6.7 0 0 1-2.93-2.92c-.73-1.43-.73-3.3-.73-7.06z"
        mask={`url(#${_id}-zr-square-a)`}
      />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zerion wallet icon (colored). */
export const Zerion = ZerionCircle;

/** Zerion wallet icon (monochrome). */
export const ZerionMono = ZerionCircleMono;
