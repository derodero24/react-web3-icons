import { createIcon } from '../utils';

// Source: https://polygon.technology
// Square variant: original viewBox 14.85 41.75 470.3 416.51 → scale 0.09783, translate(7.55, 7.54)
/** Polygon chain icon (colored). */
export const Polygon = /* @__PURE__ */ createIcon(
  'Polygon',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(2.23 2.23)scale(.11907)">
      <defs>
        <linearGradient
          id={`${_id}-plgn-a`}
          x1="54.83"
          x2="459.03"
          y1="392.31"
          y2="97.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a726c1" />
          <stop offset=".88" stopColor="#803bdf" />
          <stop offset="1" stopColor="#7b3fe4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-plgn-a)`}
        d="m364.03 335.08 111.55-64.4a19.2 19.2 0 0 0 9.57-16.58V125.28a19.2 19.2 0 0 0-9.57-16.58L364.03 44.3a19.2 19.2 0 0 0-19.14 0l-111.55 64.4a19.2 19.2 0 0 0-9.57 16.58v230.19l-78.22 45.15-78.22-45.15v-90.33l78.22-45.15 51.6 29.78v-60.59l-42.03-24.26a19.2 19.2 0 0 0-19.14 0L24.42 229.33a19.2 19.2 0 0 0-9.57 16.58v128.81a19.2 19.2 0 0 0 9.57 16.58l111.55 64.41c5.9 3.4 13.23 3.4 19.14 0l111.55-64.4a19.2 19.2 0 0 0 9.57-16.58V144.54l1.41-.81 76.81-44.34 78.22 45.16v90.32l-78.22 45.16-51.52-29.74v60.59l41.95 24.23c5.9 3.4 13.24 3.4 19.14 0z"
      />
    </g>
  ),
  { ids: true },
);

/** Polygon chain icon (monochrome). */
export const PolygonMono = /* @__PURE__ */ createIcon(
  'PolygonMono',
  '0 0 64 64',
  () => (
    <path d="m45.58 42.13 13.28-7.67c.7-.4 1.14-1.16 1.14-1.97V17.15a2.3 2.3 0 0 0-1.14-1.98L45.58 7.51a2.3 2.3 0 0 0-2.28 0l-13.28 7.66a2.3 2.3 0 0 0-1.14 1.98v27.4l-9.32 5.38-9.31-5.37V33.8l9.31-5.37 6.15 3.54v-7.21l-5-2.9a2.3 2.3 0 0 0-2.29 0L5.14 29.55A2.3 2.3 0 0 0 4 31.5v15.34a2.3 2.3 0 0 0 1.14 1.97l13.28 7.67c.7.4 1.58.4 2.28 0l13.28-7.66a2.3 2.3 0 0 0 1.14-1.98v-27.4l.17-.1 9.15-5.28 9.31 5.37V30.2l-9.31 5.37-6.14-3.54v7.22l5 2.88c.7.4 1.57.4 2.28 0" />
  ),
  { fill: 'currentColor' },
);

/** Polygon Square chain icon (colored). */
export const PolygonSquare = /* @__PURE__ */ createIcon(
  'PolygonSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#7b3fe4" rx="12.8" />
      <g>
        <path
          fill="#fff"
          d="m43.16 40.32 10.92-6.3c.57-.33.93-.95.93-1.62V19.8a1.9 1.9 0 0 0-.93-1.63l-10.92-6.3a1.9 1.9 0 0 0-1.87 0l-10.91 6.3a1.9 1.9 0 0 0-.94 1.63v22.52l-7.65 4.41-7.65-4.41v-8.84l7.65-4.42 5.05 2.91v-5.92l-4.11-2.38a1.9 1.9 0 0 0-1.88 0l-10.91 6.3A1.9 1.9 0 0 0 9 31.6v12.6a1.9 1.9 0 0 0 .94 1.62l10.91 6.3c.58.33 1.3.33 1.87 0l10.92-6.3a1.9 1.9 0 0 0 .93-1.62V21.68l.14-.08 7.52-4.34 7.65 4.42v8.84l-7.65 4.42-5.04-2.91v5.92l4.1 2.37c.58.34 1.3.34 1.87 0"
        />
      </g>
    </>
  ),
  {},
);

/** Polygon Square chain icon (monochrome). */
export const PolygonSquareMono = /* @__PURE__ */ createIcon(
  'PolygonSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-plgns-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-plgns-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="m43.16 40.32 10.92-6.3c.57-.33.93-.95.93-1.62V19.8a1.9 1.9 0 0 0-.93-1.63l-10.92-6.3a1.9 1.9 0 0 0-1.87 0l-10.91 6.3a1.9 1.9 0 0 0-.94 1.63v22.52l-7.65 4.41-7.65-4.41v-8.84l7.65-4.42 5.05 2.91v-5.92l-4.11-2.38a1.9 1.9 0 0 0-1.88 0l-10.91 6.3A1.9 1.9 0 0 0 9 31.6v12.6a1.9 1.9 0 0 0 .94 1.62l10.91 6.3c.58.33 1.3.33 1.87 0l10.92-6.3a1.9 1.9 0 0 0 .93-1.62V21.68l.14-.08 7.52-4.34 7.65 4.42v8.84l-7.65 4.42-5.04-2.91v5.92l4.1 2.37c.58.34 1.3.34 1.87 0" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Polygon Circle chain icon (colored). */
export const PolygonCircle = /* @__PURE__ */ createIcon(
  'PolygonCircle',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.65 -.65)scale(.1306)">
      <defs>
        <linearGradient
          id={`${_id}-plgn2-b`}
          x1="-116.09"
          x2="437.45"
          y1="25.97"
          y2="364.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a229c5" />
          <stop offset="1" stopColor="#7b3fe4" />
        </linearGradient>
        <clipPath id={`${_id}-plgn2-a`}>
          <circle cx="250" cy="250" r="244.91" fill="none" />
        </clipPath>
      </defs>
      <path
        fill={`url(#${_id}-plgn2-b)`}
        d="M-18.1-18.1h536.2v536.2H-18.1z"
        clipPath={`url(#${_id}-plgn2-a)`}
      />
      <path
        fill="#fff"
        d="m320.83 302.85 69.29-40.01a11.9 11.9 0 0 0 5.94-10.3v-80.01c0-4.23-2.28-8.18-5.94-10.3l-69.29-40.01a11.9 11.9 0 0 0-11.89 0l-69.29 40.01a11.9 11.9 0 0 0-5.94 10.3v142.99l-48.59 28.05-48.59-28.05v-56.11l48.59-28.05 32.05 18.5v-37.64l-26.11-15.07a11.9 11.9 0 0 0-11.89 0l-69.29 40.01a11.9 11.9 0 0 0-5.94 10.3v80.01c0 4.23 2.28 8.18 5.94 10.3l69.29 40.01a12 12 0 0 0 11.89 0l69.29-40a11.9 11.9 0 0 0 5.94-10.3V184.49l.88-.5 47.71-27.55 48.59 28.05v56.11l-48.59 28.05-32-18.48v37.64l26.06 15.05a12 12 0 0 0 11.89 0Z"
      />
    </g>
  ),
  { ids: true },
);

/** Polygon Circle chain icon (monochrome). */
export const PolygonCircleMono = /* @__PURE__ */ createIcon(
  'PolygonCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.65 -.65)scale(.1306)">
      <path
        d="M-18.1-18.1h536.2v536.2H-18.1z"
        clipPath={`url(#${_id}-plgnm2-a)`}
        mask={`url(#${_id}-plgnm2-b)`}
      />
      <defs>
        <clipPath id={`${_id}-plgnm2-a`}>
          <circle cx="250" cy="250" r="244.91" fill="none" />
        </clipPath>
        <mask id={`${_id}-plgnm2-b`}>
          <rect width="982" height="978" fill="#fff" />
          <path
            fill="#000"
            d="m320.83 302.85 69.29-40.01a11.9 11.9 0 0 0 5.94-10.3v-80.01c0-4.23-2.28-8.18-5.94-10.3l-69.29-40.01a11.9 11.9 0 0 0-11.89 0l-69.29 40.01a11.9 11.9 0 0 0-5.94 10.3v142.99l-48.59 28.05-48.59-28.05v-56.11l48.59-28.05 32.05 18.5v-37.64l-26.11-15.07a11.9 11.9 0 0 0-11.89 0l-69.29 40.01a11.9 11.9 0 0 0-5.94 10.3v80.01c0 4.23 2.28 8.18 5.94 10.3l69.29 40.01a12 12 0 0 0 11.89 0l69.29-40a11.9 11.9 0 0 0 5.94-10.3V184.49l.88-.5 47.71-27.55 48.59 28.05v56.11l-48.59 28.05-32-18.48v37.64l26.06 15.05a12 12 0 0 0 11.89 0Z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
