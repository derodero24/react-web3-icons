import { createIcon } from '../utils';

// Source: https://moralis.com/wp-content/uploads/2025/10/Moralis-Logo-Light.svg
// Colored: the mark of the official 2025 Moralis-Logo-Light.svg (linked from https://moralis.com/brand): the clipped group of five gradient paths (blue #3A7AFF/#4033FF to magenta #EE16FF/#FF11FF) without the wordmark; paths, gradients and clip copied unchanged
// Mono: no official one-colour logo exists; the mark's four body paths in currentColor, with a thin seam knocked out along the edge of each part (a mask stroke under each path) so the fold of the upper band over the body stays readable; the hairline highlight path is dropped
/** Moralis devtool icon (colored). */
export const Moralis = /* @__PURE__ */ createIcon(
  'Moralis',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 9.67)scale(1.35341)">
      <defs>
        <radialGradient
          id={`${_id}-mrls-a`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(24.082 0 0 28.5153 36.8 2.96)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C7F6FF" />
          <stop offset="1" stopColor="#3A7AFF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-mrls-b`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(23.7236 0 0 24.7852 5.2 2.8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79E9FF" />
          <stop offset="1" stopColor="#3A7AFF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-mrls-c`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(78.4869 0 0 42.8733 50.18 36.47)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF11FF" />
          <stop offset=".36" stopColor="#EE16FF" />
          <stop offset="1" stopColor="#4033FF" />
        </radialGradient>
        <radialGradient
          id={`${_id}-mrls-d`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(76.8259 0 0 37.7179 -6.46 32.52)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF11FF" />
          <stop offset=".36" stopColor="#EE16FF" />
          <stop offset="1" stopColor="#4033FF" />
        </radialGradient>
        <linearGradient
          id={`${_id}-mrls-e`}
          x1="17.34"
          x2="41.45"
          y1="7.7"
          y2="7.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2FFCFF" />
          <stop offset="1" stopColor="#336FFF" />
        </linearGradient>
        <clipPath id={`${_id}-mrls-f`}>
          <rect
            width="41.6"
            height="32"
            fill="white"
            transform="translate(0 .5)"
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${_id}-mrls-f)`}>
        <path
          fill={`url(#${_id}-mrls-a)`}
          d="M21.15 5.5C18.08.97 11.8-.75 6.84 1.55c-2.41 1.1-4.4 3.15-5.52 5.5a15.4 15.4 0 0 0-1.3 6.8c.13-4.68 3.76-9.13 8.35-9.5 3.54-.28 6.66 1.6 8.04 4.99.66 1.6 1.1 4.33 1.13 4.51l-.02-.02.15.3c1.28 2.57 5.2 1.64 5.41-1.27.2-2.57-.46-5.18-1.93-7.34"
        />
        <path
          fill={`url(#${_id}-mrls-b)`}
          d="M37.65 4.38c-1.04-1.2-2.33-2.19-3.76-2.84C29.22-.62 23.4.77 20.19 4.7a11 11 0 0 0-2.4 4.4c-.4 1.35-.44 2.76-.32 4.14.35 3.41 4.85 3.55 5.7.66l.02-.04c.1-.66.49-2.67.86-3.58.15-.38 0 0 0 0 1.39-3.87 4.56-5.93 7.42-5.93 5.69-.27 10.84 7.12 9.33 13.9l.23-.97q.24-1.16.31-2.36c.2-3.76-1.1-7.75-3.69-10.54"
        />
        <path
          fill={`url(#${_id}-mrls-c)`}
          d="M8.37 4.34C2.56 4.81-1.7 11.8.67 17.56c1.7 5.1 5.82 9.08 10.48 11.57 1.25.65 2.42-.93 1.6-2l-.47-.6c-1.76-2.46-3.5-5.07-4.5-7.92-1.92-4.57.37-9.72 4.03-9.72 3.12 0 4.15 2.56 5.82 5.16 0-.02-.05-.17-.07-.3-.15-.78-.59-3.05-1.15-4.42-1.39-3.38-4.5-5.27-8.04-4.99"
        />
        <path
          fill={`url(#${_id}-mrls-d)`}
          d="M31.47 4.34c-2.86 0-6.03 2.06-7.42 5.93 0 0 .15-.37 0 0-.37.92-.76 2.93-.86 3.59 3.5-9.86 14.66-3.57 7.27 6.17-1.21 1.63-2.72 3.2-4.36 4.39q-.75.54-1.25 1.3c-2.51 3.99 2.48 9.06 6.7 5.68 3.88-3.1 7.24-7.08 8.86-11.82 2.57-7.11-2.88-15.52-8.94-15.24"
        />
        <path
          fill={`url(#${_id}-mrls-e)`}
          d="M41.35 14.9a15 15 0 0 0-.67-5.1c-.5-1.65-1.3-3.2-2.36-4.56q-.41-.5-.85-.97-.44-.48-.91-.9a11 11 0 0 0-2.11-1.46q-1.14-.6-2.4-.92a11.7 11.7 0 0 0-7.5.63q-.6.25-1.15.57t-1.08.68q-1.05.75-1.9 1.72-.87.95-1.52 2.06T17.9 9t-.43 2.53a13 13 0 0 0 .05 1.93q.03.33.14.63-.11-.3-.15-.62l-.06-.65q-.05-.64-.02-1.3.03-1.3.4-2.54.34-1.26.99-2.39.65-1.12 1.52-2.08c1.12-1.32 2.57-2.35 4.15-3.03A12 12 0 0 1 29.53.5q1.3.03 2.56.36 1.27.33 2.4.94 1.16.62 2.13 1.49.48.43.92.9.44.49.84 1a14 14 0 0 1 2.34 4.58c.5 1.66.72 3.4.63 5.12"
        />
      </g>
    </g>
  ),
  { ids: true },
);

/** Moralis devtool icon (monochrome). */
export const MoralisMono = /* @__PURE__ */ createIcon(
  'MoralisMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 9.67)scale(1.35341)">
      <defs>
        <mask id={`${_id}-mrls-n`}>
          <path
            fill="#fff"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M21.15 5.5C18.08.97 11.8-.75 6.84 1.55c-2.41 1.1-4.4 3.15-5.52 5.5a15.4 15.4 0 0 0-1.3 6.8c.13-4.68 3.76-9.13 8.35-9.5 3.54-.28 6.66 1.6 8.04 4.99.66 1.6 1.1 4.33 1.13 4.51l-.02-.02.15.3c1.28 2.57 5.2 1.64 5.41-1.27.2-2.57-.46-5.18-1.93-7.34Z"
            paintOrder="stroke"
          />
          <path
            fill="#fff"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M37.65 4.38c-1.04-1.2-2.33-2.19-3.76-2.84C29.22-.62 23.4.77 20.19 4.7a11 11 0 0 0-2.4 4.4c-.4 1.35-.44 2.76-.32 4.14.35 3.41 4.85 3.55 5.7.66l.02-.04c.1-.66.49-2.67.86-3.58.15-.38 0 0 0 0 1.39-3.87 4.56-5.93 7.42-5.93 5.69-.27 10.84 7.12 9.33 13.9l.23-.97q.24-1.16.31-2.36c.2-3.76-1.1-7.75-3.69-10.54Z"
            paintOrder="stroke"
          />
          <path
            fill="#fff"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M8.37 4.34C2.56 4.81-1.7 11.8.67 17.56c1.7 5.1 5.82 9.08 10.48 11.57 1.25.65 2.42-.93 1.6-2l-.47-.6c-1.76-2.46-3.5-5.07-4.5-7.92-1.92-4.57.37-9.72 4.03-9.72 3.12 0 4.15 2.56 5.82 5.16 0-.02-.05-.17-.07-.3-.15-.78-.59-3.05-1.15-4.42-1.39-3.38-4.5-5.27-8.04-4.99Z"
            paintOrder="stroke"
          />
          <path
            fill="#fff"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M31.47 4.34c-2.86 0-6.03 2.06-7.42 5.93 0 0 .15-.37 0 0-.37.92-.76 2.93-.86 3.59 3.5-9.86 14.66-3.57 7.27 6.17-1.21 1.63-2.72 3.2-4.36 4.39q-.75.54-1.25 1.3c-2.51 3.99 2.48 9.06 6.7 5.68 3.88-3.1 7.24-7.08 8.86-11.82 2.57-7.11-2.88-15.52-8.94-15.24Z"
            paintOrder="stroke"
          />
        </mask>
      </defs>
      <path d="M0 0h41.6v33H0z" mask={`url(#${_id}-mrls-n)`} />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
