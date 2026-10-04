import { createIcon } from '../utils';

// Source: https://framerusercontent.com/assets/MjjaHZTK3Udfa5H8cBJbYTKZM.svg
// Source: https://framerusercontent.com/assets/3qSEeM9nhDU62bGUDDaURfML8.svg
// Both files are the icon downloads of the official brand kit at https://thirdweb.com/brand-kit
// Colored: the gradient icon (three bars, each #FF00A8 → #6200C6), copied unchanged
// Mono: the same three paths in currentColor, as in the kit's one-colour (white) icon
/** Thirdweb devtool icon (colored). */
export const Thirdweb = /* @__PURE__ */ createIcon(
  'Thirdweb',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(3.35 15)scale(1.48875)">
      <path
        fill={`url(#${_id}-thw-a)`}
        d="M20.22 0q.35.08.64.3.33.24.47.64l1.81 4.52 2.01 5.03 1.06 2.63a1.5 1.5 0 0 1 0 1.14l-3.07 7.64q-.3.77-1.1.9c-.68.1-1.28-.22-1.52-.81l-1.7-4.26-2.9-7.2-2.56-6.43-.85-2.13A1.42 1.42 0 0 1 13.5.03l.07-.02z"
      />
      <path
        fill={`url(#${_id}-thw-b)`}
        d="m8.28 0 .22.07a1.3 1.3 0 0 1 .85.8l1.97 4.9 2.95 7.38a1.4 1.4 0 0 1 0 1.1l-1.09 2.72-2 4.98a1.4 1.4 0 0 1-1.3.88 1.4 1.4 0 0 1-1.36-.93l-1.87-4.69-2.53-6.34L1.54 4.4.56 1.97A1.4 1.4 0 0 1 1.27.13q.19-.08.37-.12z"
      />
      <path
        fill={`url(#${_id}-thw-c)`}
        d="M38.04 13.91c-.19.62-.46 1.2-.7 1.8l-2.02 5.06-.46 1.16a1.4 1.4 0 0 1-1.33.9 1.4 1.4 0 0 1-1.32-.91l-2.95-7.37-2.55-6.37-2.49-6.23a1.4 1.4 0 0 1 1-1.91l.07-.03h6.65l.07.02a1.4 1.4 0 0 1 1.03.89l4.21 10.53c.27.67.56 1.32.78 2.01z"
      />
      <defs>
        <linearGradient
          id={`${_id}-thw-a`}
          x1="11.36"
          x2="27.38"
          y1="1.86"
          y2="17.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF00A8" />
          <stop offset="1" stopColor="#6200C6" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-b`}
          x1="-.57"
          x2="15.44"
          y1="1.85"
          y2="17.84"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF00A8" />
          <stop offset="1" stopColor="#6200C6" />
        </linearGradient>
        <linearGradient
          id={`${_id}-thw-c`}
          x1="23.08"
          x2="39.1"
          y1="1.85"
          y2="17.84"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF00A8" />
          <stop offset="1" stopColor="#6200C6" />
        </linearGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Thirdweb devtool icon (monochrome). */
export const ThirdwebMono = /* @__PURE__ */ createIcon(
  'ThirdwebMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M33.46 15.02q.52.1.95.42.48.38.7.96l2.7 6.73 2.99 7.49 1.57 3.92a2.2 2.2 0 0 1 0 1.7L37.81 47.6q-.45 1.15-1.66 1.35c-1 .15-1.9-.34-2.25-1.22q-1.29-3.16-2.54-6.33l-4.3-10.74-3.81-9.56q-.62-1.59-1.27-3.16a2.12 2.12 0 0 1 1.47-2.9q.06 0 .1-.03z" />
      <path d="m15.68 15.02.33.1a2 2 0 0 1 1.27 1.17l2.93 7.3 4.4 10.99a2 2 0 0 1 0 1.63l-1.63 4.05L20 47.68A2.1 2.1 0 0 1 18.07 49a2.1 2.1 0 0 1-2.04-1.38q-1.37-3.5-2.78-6.98l-3.76-9.45-3.84-9.6q-.72-1.83-1.46-3.64a2.1 2.1 0 0 1 1.06-2.74q.27-.12.55-.18z" />
      <path d="M59.98 35.72c-.27.92-.68 1.78-1.02 2.66l-3.02 7.54-.7 1.73a2.1 2.1 0 0 1-1.97 1.33 2.1 2.1 0 0 1-1.97-1.34l-4.38-10.98-3.8-9.47-3.7-9.28a2.1 2.1 0 0 1 1.47-2.85l.12-.04h9.9l.1.03a2.1 2.1 0 0 1 1.54 1.32l6.26 15.68c.4 1 .84 1.97 1.16 3z" />
    </>
  ),
  { fill: 'currentColor' },
);
