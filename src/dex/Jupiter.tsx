import { createIcon } from '../utils';

// Source: https://jup.ag/favicon.svg
// Source: https://developers.jup.ag (official brand kit: JupiterLogo/logo-dark.svg)
// Source: https://github.com/jup-ag/docs/blob/main/static/files/brand-kit/jupiter-brand-kit.zip (official brand kit: JupiterTokens/Token-512x512.svg, the JUP token)
// Paths sourced from the official jup.ag favicon.svg (six arc segments, #00BEF0 to #C7F284); matches the current file (checked 2026-10-03); the developers.jup.ag brand kit's JupiterLogo/logo-dark.svg has the same six arcs and #00BEF0 to #C7F284 gradients
// Circle: the official JUP token (JupiterTokens/Token-512x512.svg in the brand kit: the six arcs in their #C7F284 to #00BEF0 gradients on a #0F1524 disc), paths and gradients unchanged and full-bleed on the 64 grid; its full-viewBox clip-path is a no-op and is left out
// CircleMono: the token's disc in currentColor with the six arcs knocked out (fill-rule=evenodd)
/** Jupiter DEX icon (colored). */
export const Jupiter = /* @__PURE__ */ createIcon(
  'Jupiter',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 4.25)scale(1.73416)">
      <defs>
        <linearGradient
          id={`${_id}-jup-g`}
          x1="21.5"
          x2="6.67"
          y1="6.5"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M3.09 25.17a16.4 16.4 0 0 0 11.62 6.75c-1.18-1.79-2.9-3.43-5.06-4.68s-4.42-1.93-6.56-2.07"
      />
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M12.54 22.27C8.4 19.87 3.92 19.25.71 20.33a17 17 0 0 0 1.22 2.96c2.79-.06 5.83.7 8.66 2.34 2.83 1.65 5 3.92 6.32 6.37q1.61-.05 3.18-.4c-.65-3.33-3.4-6.92-7.55-9.33"
      />
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M32.28 12.5A16.4 16.4 0 0 0 11.85.63c3.54.43 7.48 1.76 11.34 4s6.96 5 9.1 7.87Z"
      />
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M27.13 20.36c-1.82-3.01-4.93-5.9-8.76-8.13-3.83-2.22-7.87-3.5-11.39-3.58-3.09-.07-5.4.83-6.36 2.47l-.02.03q-.12.45-.22.92 2-.79 4.58-.85c3.81-.07 8.07 1.15 12 3.44 3.94 2.28 7.12 5.38 8.94 8.73q1.23 2.27 1.53 4.4.36-.3.7-.65v-.03c.96-1.64.6-4.1-1-6.75"
      />
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M15.46 17.25C9.6 13.85 3.12 13.3 0 15.69q0 1.11.17 2.22a13 13 0 0 1 2.82-.52c3.48-.27 7.32.7 10.8 2.73s6.23 4.88 7.73 8.03q.63 1.31.94 2.71a16 16 0 0 0 2.02-.95c.52-3.89-3.15-9.25-9.02-12.66"
      />
      <path
        fill={`url(#${_id}-jup-g)`}
        d="M30.14 15.31c-1.83-3-4.97-5.9-8.82-8.14S13.4 3.64 9.87 3.54c-2.68-.08-4.77.57-5.84 1.8 4.48-.76 10.39.52 16.12 3.85s9.76 7.83 11.32 12.1c.54-1.55.07-3.68-1.33-5.98"
      />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Jupiter DEX icon (monochrome). */
export const JupiterMono = /* @__PURE__ */ createIcon(
  'JupiterMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M9.36 47.9A28.5 28.5 0 0 0 29.5 59.6c-2.05-3.1-5.04-5.94-8.77-8.1-3.73-2.17-7.68-3.35-11.38-3.6Z" />
      <path d="M25.75 42.87c-7.18-4.17-14.96-5.23-20.52-3.35a29 29 0 0 0 2.11 5.13c4.84-.11 10.11 1.2 15.03 4.05 4.9 2.85 8.66 6.79 10.96 11.05q2.8-.1 5.51-.71c-1.12-5.76-5.9-12-13.09-16.17" />
      <path d="M59.99 25.93A28.47 28.47 0 0 0 24.54 5.34c6.15.75 12.97 3.06 19.67 6.95s12.08 8.67 15.78 13.64" />
      <path d="M51.04 39.56c-3.14-5.23-8.53-10.23-15.18-14.1-6.64-3.85-13.65-6.05-19.75-6.2-5.36-.12-9.38 1.43-11.03 4.28l-.04.05q-.21.8-.39 1.6c2.3-.91 4.98-1.42 7.95-1.47 6.6-.13 14 1.98 20.83 5.95C40.25 33.63 45.75 39 48.9 44.8c1.42 2.61 2.3 5.19 2.66 7.64q.6-.54 1.2-1.13l.02-.06c1.65-2.84 1.02-7.1-1.75-11.7Z" />
      <path d="M30.81 34.16c-10.17-5.9-21.4-6.83-26.81-2.7q0 1.93.3 3.85a22 22 0 0 1 4.88-.9c6.04-.46 12.7 1.22 18.74 4.74 6.04 3.5 10.8 8.46 13.4 13.93q1.09 2.25 1.63 4.69a29 29 0 0 0 3.5-1.65c.9-6.74-5.47-16.05-15.64-21.96" />
      <path d="M56.27 30.81c-3.18-5.22-8.62-10.24-15.3-14.12-6.7-3.89-13.74-6.12-19.85-6.3-4.66-.14-8.27 1-10.14 3.13 7.77-1.32 18.02.9 27.96 6.66 9.93 5.78 16.93 13.58 19.64 20.99.92-2.68.12-6.38-2.3-10.36" />
    </>
  ),
  { fill: 'currentColor' },
);

/** Jupiter Circle DEX icon (colored). */
export const JupiterCircle = /* @__PURE__ */ createIcon(
  'JupiterCircle',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <path d="M64 32C64 14.33 49.67 0 32 0S0 14.33 0 32s14.33 32 32 32 32-14.33 32-32" />
      <path
        fill={`url(#${_id}-a)`}
        d="M11.92 46.36a25.4 25.4 0 0 0 17.95 10.42c-1.83-2.75-4.5-5.29-7.81-7.22-3.32-1.92-6.84-2.98-10.14-3.2"
      />
      <path
        fill={`url(#${_id}-b)`}
        d="M26.52 41.89c-6.4-3.72-13.32-4.67-18.28-3q.72 2.39 1.89 4.58c4.3-.1 9 1.06 13.37 3.6 4.38 2.54 7.72 6.05 9.77 9.84q2.49-.08 4.9-.63c-1-5.13-5.26-10.68-11.65-14.4"
      />
      <path
        fill={`url(#${_id}-c)`}
        d="M57 26.8A25.35 25.35 0 0 0 25.44 8.47c5.48.67 11.55 2.72 17.51 6.18C48.91 18.12 53.71 22.38 57 26.8"
      />
      <path
        fill={`url(#${_id}-d)`}
        d="M49.04 38.93c-2.8-4.65-7.6-9.1-13.52-12.54s-12.16-5.4-17.58-5.53c-4.78-.11-8.36 1.28-9.83 3.8q0 .03-.03.05-.19.71-.35 1.43 3.09-1.22 7.08-1.31c5.88-.11 12.46 1.77 18.54 5.3s10.97 8.32 13.8 13.48q1.88 3.51 2.35 6.8.56-.48 1.07-1l.02-.05c1.48-2.54.9-6.34-1.55-10.43"
      />
      <path
        fill={`url(#${_id}-e)`}
        d="M30.87 32.79C21.82 27.52 11.81 26.7 7 30.37q.01 1.73.26 3.44 2.14-.65 4.35-.81c5.38-.4 11.3 1.1 16.69 4.22 5.38 3.13 9.62 7.54 11.93 12.4a20 20 0 0 1 1.45 4.18q1.6-.63 3.12-1.47c.8-6-4.87-14.28-13.93-19.54"
      />
      <path
        fill={`url(#${_id}-f)`}
        d="M53.7 31.15c-2.84-4.65-7.68-9.12-13.64-12.58-5.95-3.46-12.22-5.45-17.67-5.6-4.14-.13-7.36.88-9.02 2.78 6.91-1.18 16.04.8 24.89 5.93 8.84 5.14 15.08 12.1 17.48 18.69.83-2.39.11-5.68-2.05-9.22"
      />
      <defs>
        <linearGradient
          id={`${_id}-a`}
          x1="40.35"
          x2="17.44"
          y1="17.54"
          y2="56.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-b`}
          x1="40.35"
          x2="17.44"
          y1="17.54"
          y2="56.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-c`}
          x1="40.35"
          x2="17.44"
          y1="17.54"
          y2="56.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-d`}
          x1="40.35"
          x2="17.44"
          y1="17.54"
          y2="56.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-e`}
          x1="40.2"
          x2="17.29"
          y1="16.19"
          y2="55.56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-f`}
          x1="40.35"
          x2="17.44"
          y1="17.54"
          y2="56.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C7F284" />
          <stop offset="1" stopColor="#00BEF0" />
        </linearGradient>
      </defs>
    </>
  ),
  { fill: '#0F1524', ids: true },
);

/** Jupiter Circle DEX icon (monochrome). */
export const JupiterCircleMono = /* @__PURE__ */ createIcon(
  'JupiterCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M64 32C64 14.33 49.67 0 32 0S0 14.33 0 32s14.33 32 32 32 32-14.33 32-32M11.92 46.36a25.4 25.4 0 0 0 17.95 10.42c-1.83-2.75-4.5-5.29-7.81-7.22-3.32-1.92-6.84-2.98-10.14-3.2m14.6-4.47c-6.4-3.72-13.32-4.67-18.28-3q.72 2.39 1.89 4.58c4.3-.1 9 1.06 13.37 3.6 4.38 2.54 7.72 6.05 9.77 9.84q2.49-.08 4.9-.63c-1-5.13-5.26-10.68-11.65-14.4M57 26.8A25.35 25.35 0 0 0 25.44 8.47c5.48.67 11.55 2.72 17.51 6.18C48.91 18.12 53.71 22.38 57 26.8m-7.96 12.13c-2.8-4.65-7.6-9.1-13.52-12.54s-12.16-5.4-17.58-5.53c-4.78-.11-8.36 1.28-9.83 3.8q0 .03-.03.05-.19.71-.35 1.43 3.09-1.22 7.08-1.31c5.88-.11 12.46 1.77 18.54 5.3s10.97 8.32 13.8 13.48q1.88 3.51 2.35 6.8.56-.48 1.07-1l.02-.05c1.48-2.54.9-6.34-1.55-10.43M30.87 32.8C21.82 27.52 11.81 26.7 7 30.37q.01 1.73.26 3.44 2.14-.65 4.35-.81c5.38-.4 11.3 1.1 16.69 4.22 5.38 3.13 9.62 7.54 11.93 12.4a20 20 0 0 1 1.45 4.18q1.6-.63 3.12-1.47c.8-6-4.87-14.28-13.93-19.54m22.82-1.64c-2.83-4.65-7.67-9.12-13.63-12.58-5.95-3.46-12.22-5.45-17.67-5.6-4.14-.13-7.36.88-9.02 2.78 6.91-1.18 16.04.8 24.89 5.93 8.84 5.14 15.08 12.1 17.48 18.69.83-2.39.11-5.68-2.05-9.22"
    />
  ),
  { fill: 'currentColor' },
);
