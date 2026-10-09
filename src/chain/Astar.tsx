import { createIcon } from '../utils';

// Source: https://astar.network/favicon.svg (the astar.network site icon, the Astar symbol as a vector)
// Source: https://astar.network/brand-asset-kit/ (official brand asset kit; its astar-brand-asset-kit.zip has the symbol only as PNG: Astar/Symbol_Color.png, Astar/Symbol_White.png)
// Default: the Astar symbol, a ring and knot in the #E6007A, #703AC2, #0070EB, #0297FB and #0AE2FF gradient. It renders the same as favicon.svg (IoU 0.997, the same colours, and the same 12 overlay and 15 multiply highlight layers) but is a different export of the mark, in its own coordinate system, whose origin is not recorded: its ring is about 1.3% narrower than tall (63.2 x 64 on the grid) where the favicon's ring is a true circle. Kept, as the difference does not show at icon sizes
// Mono: a one-colour silhouette derived from the default, the ring and the knot in currentColor with the knot's crossings merged; the kit has no one-colour vector (Symbol_White.png is a shaded raster)
/** Astar chain icon (colored). */
export const Astar = /* @__PURE__ */ createIcon(
  'Astar',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-7.72 -19.93)scale(.45714)">
      <defs>
        <linearGradient
          id={`${_id}-astr-a`}
          x1="24.95"
          x2="114.2"
          y1="316.72"
          y2="228.58"
          href={`#${_id}-astr-z`}
        >
          <stop offset="0" stopColor="#e6007a" />
          <stop offset=".21" stopColor="#703ac2" />
          <stop offset=".46" stopColor="#0070eb" />
          <stop offset=".77" stopColor="#0297fb" />
          <stop offset="1" stopColor="#0ae2ff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-d`}
          x1="30.03"
          x2="44.77"
          y1="301.53"
          y2="301.33"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-g`}
          x1="121.04"
          x2="113.35"
          y1="289.57"
          y2="276.83"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-j`}
          x1="65.3"
          x2="57.97"
          y1="215.73"
          y2="228.69"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-k`}
          x1="68.5"
          x2="45.94"
          y1="209.11"
          y2="215.59"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-l`}
          x1="25.95"
          x2="45.03"
          y1="296.08"
          y2="315.75"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-m`}
          x1="127.03"
          x2="133.73"
          y1="293.09"
          y2="272.96"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-n`}
          x1="78.76"
          x2="108.99"
          y1="220.65"
          y2="227.49"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-o`}
          x1="110.11"
          x2="88.74"
          y1="298.92"
          y2="321.63"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-p`}
          x1="27.51"
          x2="18.19"
          y1="287.29"
          y2="257.38"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-q`}
          x1="85.36"
          x2="75.69"
          y1="231.93"
          y2="241.48"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-r`}
          x1="33.84"
          x2="46.92"
          y1="275.84"
          y2="279.3"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-s`}
          x1="97.16"
          x2="93.58"
          y1="299.06"
          y2="285.87"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-t`}
          x1="77.29"
          x2="83.12"
          y1="287.31"
          y2="279.36"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-u`}
          x1="57.56"
          x2="46.04"
          y1="283.84"
          y2="289.25"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-v`}
          x1="53.4"
          x2="57.02"
          y1="264.51"
          y2="271.94"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-w`}
          x1="69.9"
          x2="67.39"
          y1="241.47"
          y2="232.91"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-x`}
          x1="96.38"
          x2="103.48"
          y1="280.7"
          y2="282.32"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={`${_id}-astr-y`}
          x1="85.24"
          x2="76.23"
          y1="256.42"
          y2="254.8"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#231f20" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${_id}-astr-z`} gradientUnits="userSpaceOnUse" />
        <radialGradient
          id={`${_id}-astr-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(26.2819 0 0 26.6154 91.83 254.78)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-astr-c`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(15.2911 0 0 15.485 52.98 304.15)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-astr-e`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(240.31 100.24 114.8)scale(26.5324 26.3641)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-astr-f`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(240.31 133.8 101.59)scale(15.4368 15.3389)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-astr-h`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(119.69 -48.27 167.29)scale(26.5324 26.3641)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${_id}-astr-i`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(119.69 -42.34 132.26)scale(15.4368 15.3389)"
          href={`#${_id}-astr-z`}
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        <path
          fill={`url(#${_id}-astr-a)`}
          d="M141.08 264.2c-2.59-38.57-35.56-67.71-73.65-65.09-18.97 1.3-35.63 10.25-47.25 23.67l-.04-.03-.23.33C8.37 236.56 1.87 254.48 3.16 273.7a72 72 0 0 0 .6 5.41l.03.25q.26 1.76.6 3.5l.02.06a70 70 0 0 0 .7 3.12c7.98 32.24 37.8 55.08 71.7 52.74 38.09-2.62 66.87-36.01 64.27-74.58m-15.04 1.03c.32 4.75.02 9.4-.81 13.87l-.03-.08c-5.01-12.4-14.93-21.35-23.64-26.3 1.76-21.02-5.28-29.88-13.25-31.32l-.65-.1c-6.33-.82-12.11 3.7-12.92 10.1s3.66 12.27 9.98 13.1a11 11 0 0 0 1.64.07q.05 1.07.06 2.26c-7.37-1.85-14.26-2.22-20.54-1.64q-3.52.23-7.03.9c.78-7.1 3.41-15.07 8.51-20.9 4.94-5.64 12.27-8.87 20.27-8.04 1.52.16 3.13.54 4.59 1.03l.2.07c18.54 7.64 32.17 25.44 33.62 46.98m-48.18 10.7-.01.02a50 50 0 0 1-5.92 7.08c-3.45-3.72-6.22-7.73-8.33-11.87l-.33-.66v-.02a50 50 0 0 1-3.1-8.73c4.9-1.17 9.72-1.6 14.32-1.38l.73.04h.03q4.33.36 9 1.65c-1.46 4.89-3.5 9.33-5.99 13.25zM54.24 217.3l-.04.05c-8.1 10.6-10.8 23.76-10.68 33.87-18.85 8.97-22.9 19.57-20.15 27.28l.24.63c2.46 5.95 9.22 8.76 15.1 6.27s8.66-9.34 6.2-15.3q-.32-.77-.75-1.47a51 51 0 0 1 1.92-1.2c2.1 7.39 5.21 13.64 8.84 18.86A61 61 0 0 0 59.2 292c-6.46 2.86-14.6 4.54-22.13 2.98-7.29-1.5-13.72-6.32-17.01-13.75-.62-1.4-1.11-3.02-1.42-4.54a55 55 0 0 1-.43-4.04c-1.69-25.08 13.68-47.4 36.03-55.35M75.8 323.54c-14.7 1.02-28.45-4.06-38.83-13.09 13.1 1.8 25.71-2.4 34.3-7.57 17.1 12.06 28.2 10.32 33.41 4.05l.42-.53c3.87-5.13 2.89-12.47-2.18-16.38s-12.32-2.92-16.18 2.21q-.5.68-.9 1.4a52 52 0 0 1-1.96-1.08c5.27-5.54 9.03-11.4 11.68-17.2a61 61 0 0 0 2.75-6.62c5.68 4.24 11.19 10.53 13.63 17.92 2.35 7.15 1.45 15.2-3.26 21.8a22 22 0 0 1-3.18 3.5l-.05.06c-8.24 6.55-18.43 10.76-29.65 11.54"
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-b)`}
          d="m88.31 221.4-.65-.1a11 11 0 0 0-3.28.05c6.6 3.65 11.43 13.8 8.9 33.82-.85 6.63-2.8 12.94-5.6 18.73a62 62 0 0 1-9.55 14.84c2 1.51 3.95 2.79 5.74 3.81 5.27-5.54 9.03-11.4 11.68-17.2 2.81-5.79 4.76-12.1 5.6-18.73 3.02-23.84-4.4-33.69-12.84-35.22"
          opacity=".9"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
      </g>
      <g opacity=".8" style={{ mixBlendMode: 'overlay' }}>
        <path
          fill="#fff"
          d="M108.03 99.82c2.53-20.02-2.29-30.17-8.9-33.82q-.39.07-.76.16c6.47 3.77 11.13 13.9 8.63 33.66-.84 6.63-2.79 12.94-5.6 18.73-2.2 4.81-5.18 9.67-9.14 14.35l.62.48a62 62 0 0 0 9.55-14.83c2.81-5.8 4.76-12.1 5.6-18.73"
        />
      </g>
      <g>
        <path
          fill={`url(#${_id}-astr-c)`}
          d="m68.14 300.58-1.82-1.49c-9.75 4.13-23.28 6.71-36.71 3.56a55 55 0 0 0 7.35 7.8c13.1 1.8 25.71-2.4 34.3-7.57a91 91 0 0 1-3.12-2.3"
          opacity=".5"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-d)`}
          d="m66.32 299.1-.9-.76c-9.82 3.98-23.41 6.36-36.81 2.98l1 1.33c13.43 3.15 26.95.57 36.71-3.55"
          opacity=".6"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-e)`}
          d="m23.37 278.52.24.63A12 12 0 0 0 25.3 282c-.2-7.62 6.07-16.93 24.47-24.71 6.09-2.58 12.46-4.03 18.81-4.46 5.4-.5 11.25-.29 17.46.95.3-2.51.42-4.86.4-6.94-7.38-1.85-14.27-2.21-20.55-1.64a59 59 0 0 0-18.82 4.45c-21.9 9.28-26.62 20.7-23.7 28.87"
          opacity=".9"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
      </g>
      <g opacity=".8" style={{ mixBlendMode: 'overlay' }}>
        <path
          fill="#fff"
          d="M64.52 101.94c-18.39 7.78-24.66 17.09-24.47 24.7l.52.6c-.02-7.56 6.33-16.72 24.47-24.4a58 58 0 0 1 18.82-4.45c5.21-.48 10.86-.3 16.84.84l.1-.8a61 61 0 0 0-17.46-.95c-6.36.43-12.73 1.88-18.82 4.46"
        />
      </g>
      <g>
        <path
          fill={`url(#${_id}-astr-f)`}
          d="m101.17 256.62-.36 2.34c8.4 6.5 17.38 17.07 21.4 30.43a55 55 0 0 0 3-10.35c-5.02-12.4-14.92-21.36-23.64-26.3a92 92 0 0 1-.4 3.88"
          opacity=".4"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-g)`}
          d="m100.8 258.96-.2 1.16c8.33 6.63 17.16 17.36 20.96 30.8l.64-1.53c-4.01-13.36-12.99-23.93-21.4-30.43"
          opacity=".5"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-h)`}
          d="m104.68 306.91.42-.52q1.01-1.38 1.6-2.9c-6.43 3.97-17.52 3.13-33.37-9.1-5.26-4.06-9.68-8.92-13.22-14.28a63 63 0 0 1-7.92-15.8c-2.3 1-4.36 2.08-6.13 3.13 2.1 7.4 5.24 13.62 8.87 18.85 3.54 5.36 7.97 10.22 13.22 14.27 18.88 14.57 31 13 36.53 6.35"
          opacity=".9"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
      </g>
      <g opacity=".8" style={{ mixBlendMode: 'overlay' }}>
        <path
          fill="#fff"
          d="M88.08 139.03c15.86 12.24 26.95 13.08 33.37 9.1q.14-.37.25-.74c-6.46 3.79-17.46 2.8-33.1-9.26-5.25-4.05-9.68-8.92-13.22-14.28-3.02-4.34-5.68-9.38-7.7-15.2l-.73.32a63 63 0 0 0 7.91 15.79c3.55 5.36 7.97 10.22 13.22 14.27"
        />
      </g>
      <g>
        <path
          fill={`url(#${_id}-astr-i)`}
          d="m47.06 249.63 2.17-.85c1.36-10.62 5.91-23.77 15.33-33.98q-5.31.76-10.35 2.55c-8.1 10.59-10.8 23.75-10.68 33.87a91 91 0 0 1 3.53-1.59"
          opacity=".3"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-j)`}
          d="m49.24 248.78 1.09-.4c1.51-10.62 6.27-23.72 15.87-33.79q-.83.09-1.64.21c-9.42 10.2-13.97 23.36-15.32 33.98"
          opacity=".4"
          style={{ mixBlendMode: 'overlay' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-k)`}
          d="M67.43 199.11c-18.97 1.3-35.63 10.25-47.25 23.67l-.27.3c2.27 2.28 9.67 6.76 12.66 8.63 5.89-6.41 13.29-11.42 21.67-14.4a46 46 0 0 1 1.84-2.25c7.8-8.92 18.47-13.64 30.84-13.64 1.37 0 4.18.23 4.24.23a68 68 0 0 0-23.73-2.54"
          opacity=".4"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-l)`}
          d="M75.79 323.55c-14.7 1-28.45-4.07-38.84-13.1q-1.44-.2-2.9-.5c-11.54-2.38-20.9-9.37-27.08-20.22a41 41 0 0 1-1.86-3.69c7.98 32.24 37.8 55.08 71.7 52.74.15-3.53-.88-11.73-1.02-15.23"
          opacity=".4"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-m)`}
          d="M141.08 264.2c-2.12-.22-12.5.6-15.04 1.03.32 4.75.02 9.4-.81 13.87a46 46 0 0 1 1 2.72c3.73 11.31 2.43 23.02-3.76 33.87a41 41 0 0 1-2.17 3.4l-.05.07.05-.05c14.04-13.83 22.22-33.57 20.78-54.91"
          opacity=".4"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-n)`}
          d="M87.63 217.15c1.52.16 3.13.54 4.59 1.03l.2.07a54 54 0 0 1 16.13 10.32l.03.02c2.27-2.62 6.63-5.5 6.63-5.5s-6.68-6.93-16.91-9.08c-7.16-1.51-23.31-2.97-33.5 14.58l.1-.1q1.12-1.72 2.46-3.3c4.93-5.64 12.27-8.87 20.27-8.04"
          opacity=".5"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-o)`}
          d="M108.66 308.44c-.89 1.25-2.02 2.48-3.17 3.51l-.16.15a54 54 0 0 1-16.89 8.98l-.04.01c1.12 3.3 1.4 8.58 1.4 8.58s9.27-2.4 16.22-10.3c4.87-5.53 14.19-18.96 4.27-36.67l.03.14c.61 1.23 1.17 2.5 1.6 3.8 2.36 7.15 1.45 15.2-3.26 21.8"
          opacity=".5"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-p)`}
          d="M20.08 281.26c-.62-1.4-1.1-3.01-1.41-4.54l-.05-.21c-.88-6.46-.6-13 .77-19.3v-.04c-3.38-.68-8.03-3.07-8.03-3.07s-2.58 9.33.7 19.38c2.3 7.03 9.12 21.92 29.22 22.08l-.13-.04q-2.05-.12-4.06-.5a23.7 23.7 0 0 1-17-13.76"
          opacity=".5"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-q)`}
          d="M84.72 244.5q.83.09 1.64.07s-.36-7.27-1.24-11-2.19-6.2-3.62-7.6c-1.02-1-4.25-2.25-6.76 5.44-.81 6.4 3.66 12.26 9.98 13.08"
          opacity=".6"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-r)`}
          d="M44.91 270.13a12 12 0 0 0-.75-1.48s-6.04 3.95-8.79 6.6-4.2 5-4.7 6.96c-.34 1.4.21 4.86 8.04 3.21 5.89-2.49 8.66-9.34 6.2-15.3"
          opacity=".5"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-s)`}
          d="M86.73 292.21q-.49.68-.89 1.4s6.4 3.32 10.04 4.41 6.4 1.19 8.3.64c1.37-.4 4.06-2.61-1.26-8.66-5.08-3.91-12.32-2.92-16.19 2.21"
          opacity=".6"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-t)`}
          d="M84.25 262.06c-1.46 4.89-3.5 9.33-6 13.25l-.4.61v.03a50 50 0 0 1-5.92 7.08q2.37 2.56 5.17 4.92a54 54 0 0 0 6.77 4.6c5.27-5.54 9.03-11.4 11.68-17.2a61 61 0 0 0 2.75-6.62c-2.43-1.81-4.9-3.26-7.17-4.24a54 54 0 0 0-6.88-2.43"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-u)`}
          d="M36.96 310.45c13.1 1.8 25.71-2.4 34.3-7.57a90 90 0 0 1-3.12-2.3A59 59 0 0 1 59.2 292c-6.46 2.86-14.6 4.54-22.13 2.98-7.29-1.5-13.72-6.32-17.01-13.75-.62-1.4-1.11-3.01-1.42-4.54a54.8 54.8 0 0 0 18.31 33.75"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-v)`}
          d="M71.93 283.03c-3.45-3.72-6.22-7.73-8.33-11.87l-.33-.66v-.02a50 50 0 0 1-3.1-8.73 55 55 0 0 0-6.79 2.07 53 53 0 0 0-7.3 3.62c2.1 7.39 5.21 13.64 8.84 18.86a61 61 0 0 0 4.28 5.71c2.77-1.22 5.24-2.67 7.22-4.17a55 55 0 0 0 5.51-4.81"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-w)`}
          d="M54.2 217.36c-8.1 10.6-10.8 23.76-10.68 33.87q1.68-.8 3.55-1.59 5.78-2.43 11.78-3.55c.78-7.1 3.41-15.07 8.51-20.9 4.94-5.64 12.27-8.87 20.27-8.04 1.52.16 3.13.54 4.59 1.03l.2.07a53 53 0 0 0-23.96-3.9 53 53 0 0 0-14.22 2.96z"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-x)`}
          d="M125.2 279.02c-5.01-12.4-14.93-21.36-23.64-26.3q-.15 1.88-.41 3.9a60 60 0 0 1-2.85 12.1c5.68 4.25 11.19 10.54 13.62 17.93 2.36 7.15 1.45 15.2-3.25 21.8a22 22 0 0 1-3.18 3.5l-.05.06a55 55 0 0 0 19.79-32.9z"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
        <path
          fill={`url(#${_id}-astr-y)`}
          d="M58.8 254.5a56 56 0 0 0 1.36 7.25c4.92-1.17 9.73-1.6 14.33-1.38l.73.04h.03q4.33.36 9 1.65a57 57 0 0 0 1.62-6.99c.43-3.02.57-5.8.55-8.25-7.37-1.84-14.26-2.2-20.54-1.63q-3.52.22-7.03.9c-.34 3.04-.34 5.93-.04 8.41"
          opacity=".3"
          style={{ mixBlendMode: 'multiply' }}
          transform="translate(14.76 -155.35)"
        />
      </g>
    </g>
  ),
  { ids: true },
);

/** Astar chain icon (monochrome). */
export const AstarMono = /* @__PURE__ */ createIcon(
  'AstarMono',
  '0 0 64 64',
  () => (
    <path d="M63.52 29.83C62.34 12.2 47.26-1.13 29.85.07c-8.67.6-16.29 4.7-21.6 10.82h-.02l-.1.14A32.2 32.2 0 0 0 .47 34.17a33 33 0 0 0 .27 2.48l.02.1q.12.82.28 1.6v.04l.32 1.42C5.01 54.55 18.65 65 34.14 63.92c17.41-1.2 30.57-16.46 29.38-34.1m-6.88.47q.21 3.27-.37 6.34l-.01-.03c-2.3-5.67-6.82-9.77-10.8-12.03.8-9.6-2.42-13.66-6.06-14.32l-.3-.04c-2.9-.38-5.54 1.69-5.9 4.62s1.66 5.6 4.56 5.98a5 5 0 0 0 .74.04q.03.48.03 1.03a28 28 0 0 0-9.39-.75q-1.6.1-3.21.4c.36-3.24 1.56-6.88 3.9-9.54 2.25-2.58 5.6-4.06 9.25-3.68.7.07 1.44.24 2.1.47l.1.03a25 25 0 0 1 15.36 21.48M34.62 35.2a23 23 0 0 1-2.71 3.25A24 24 0 0 1 28.1 33l-.16-.3v-.01a23 23 0 0 1-1.42-4 24 24 0 0 1 6.55-.62l.33.02h.01q1.99.15 4.12.75a24 24 0 0 1-2.74 6.06zM23.82 8.4l-.02.03c-3.7 4.84-4.93 10.86-4.88 15.48C10.3 28 8.45 32.85 9.71 36.37l.1.29c1.13 2.72 4.22 4 6.91 2.87s3.96-4.27 2.84-7q-.15-.35-.35-.67l.88-.55c.96 3.38 2.38 6.24 4.04 8.62q.9 1.36 1.96 2.61c-2.96 1.31-6.67 2.08-10.12 1.37a10.9 10.9 0 0 1-7.77-6.3 10 10 0 0 1-.65-2.07q-.14-.9-.2-1.84C6.58 22.23 13.6 12.03 23.82 8.4m9.85 48.57c-6.72.46-13-1.86-17.75-5.99 6 .83 11.76-1.1 15.68-3.46 7.82 5.52 12.9 4.72 15.28 1.85l.19-.24c1.77-2.35 1.32-5.7-1-7.49a5.23 5.23 0 0 0-7.8 1.65q-.45-.22-.9-.49a29 29 0 0 0 5.34-7.86 28 28 0 0 0 1.25-3.03c2.6 1.94 5.12 4.81 6.23 8.2 1.08 3.26.67 6.94-1.49 9.96-.4.57-.92 1.13-1.45 1.6l-.02.02c-3.77 3-8.43 4.92-13.56 5.28" />
  ),
  { fill: 'currentColor' },
);
