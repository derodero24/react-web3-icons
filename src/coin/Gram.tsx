import { createIcon } from '../utils';

// Source: https://ton.org/assets/media/gram_diamond_mark.zip
// Source: https://ton.org/assets/media/gram_circular_badge.zip
// Gram (GRAM) is the token formerly known as Toncoin (TON); The Open Network (chain `Ton`) keeps its own logo (ton.org/media). Default: `Gram Diamond Mark/Gram Diamond Mark.svg` unchanged
// Circle: `Gram Circular Badge/Gram Circular Badge.svg` unchanged
// Mono: the diamond with the sparkle knocked out (evenodd); CircleMono: the disc with the diamond knocked out and the sparkle kept in ink, both from the same official paths
// Lookup keys: the legacy ticker TON resolves to Gram, because Toncoin was renamed Gram (ton.org/media: "Gram is the name of the token — and GRAM is its ticker. Formerly known as Toncoin or TON.")
/** Gram coin icon (colored). */
export const Gram = /* @__PURE__ */ createIcon(
  'Gram',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#30A1F5"
        d="M41.59 8.37H22.4c-2.55 0-3.83 0-4.99.36a8 8 0 0 0-2.78 1.52c-.93.78-1.62 1.86-3 4l-6.1 9.48c-.9 1.42-1.37 2.13-1.49 2.88a3.7 3.7 0 0 0 .21 1.95c.28.7.87 1.3 2.07 2.5l22.65 22.65c1.06 1.05 1.59 1.58 2.2 1.78a2.7 2.7 0 0 0 1.64 0c.61-.2 1.14-.73 2.2-1.78l22.65-22.66c1.2-1.19 1.79-1.78 2.07-2.5a3.7 3.7 0 0 0 .2-1.94c-.11-.76-.57-1.46-1.48-2.88l-6.1-9.48c-1.37-2.14-2.06-3.22-3-4a8 8 0 0 0-2.78-1.52c-1.16-.36-2.43-.36-4.99-.36"
      />
      <path
        fill="#fff"
        d="M37.96 15.85c.3-.84 1.5-.84 1.81 0l2.15 5.82a1.3 1.3 0 0 0 .76.75l5.82 2.16c.84.31.84 1.5 0 1.81l-5.82 2.15a1.3 1.3 0 0 0-.76.76l-2.14 5.82c-.32.84-1.51.84-1.82 0l-2.15-5.82a1.3 1.3 0 0 0-.76-.75l-5.82-2.16c-.84-.3-.84-1.5 0-1.81l5.82-2.15a1.3 1.3 0 0 0 .76-.75z"
      />
    </>
  ),
  { fill: 'none' },
);

/** Gram coin icon (monochrome). */
export const GramMono = /* @__PURE__ */ createIcon(
  'GramMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M41.59 8.37H22.4c-2.55 0-3.83 0-4.99.36a8 8 0 0 0-2.78 1.52c-.93.78-1.62 1.86-3 4l-6.1 9.48c-.9 1.42-1.37 2.13-1.49 2.88a3.7 3.7 0 0 0 .21 1.95c.28.7.87 1.3 2.07 2.5l22.65 22.65c1.06 1.05 1.59 1.58 2.2 1.78a2.7 2.7 0 0 0 1.64 0c.61-.2 1.14-.73 2.2-1.78l22.65-22.66c1.2-1.19 1.79-1.78 2.07-2.5a3.7 3.7 0 0 0 .2-1.94c-.11-.76-.57-1.46-1.48-2.88l-6.1-9.48c-1.37-2.14-2.06-3.22-3-4a8 8 0 0 0-2.78-1.52c-1.16-.36-2.43-.36-4.99-.36m-3.62 7.49c.3-.85 1.5-.85 1.8 0l2.16 5.81a1.3 1.3 0 0 0 .75.75l5.82 2.16c.85.31.85 1.5 0 1.81l-5.82 2.15a1.3 1.3 0 0 0-.75.76l-2.15 5.82c-.31.84-1.5.84-1.81 0L35.8 29.3a1.3 1.3 0 0 0-.76-.75l-5.82-2.16c-.84-.3-.84-1.5 0-1.81l5.82-2.15a1.3 1.3 0 0 0 .76-.75z"
    />
  ),
  { fill: 'currentColor' },
);

/** Gram Circle coin icon (colored). */
export const GramCircle = /* @__PURE__ */ createIcon(
  'GramCircle',
  '0 0 64 64',
  () => (
    <g transform="scale(.64)">
      <rect width="100" height="100" fill="#30A1F5" rx="50" />
      <rect
        width="99"
        height="99"
        x=".5"
        y=".5"
        stroke="#000"
        strokeOpacity=".06"
        rx="49.5"
      />
      <path
        fill="#fff"
        d="M60.41 26.75H39.59c-2.77 0-4.16 0-5.41.39a9 9 0 0 0-3.03 1.65c-1 .85-1.75 2.01-3.25 4.35l-6.62 10.29c-1 1.54-1.49 2.31-1.62 3.12q-.18 1.1.22 2.13c.3.76.96 1.4 2.25 2.7l24.6 24.6c1.14 1.14 1.71 1.71 2.38 1.93q.89.28 1.79 0c.66-.22 1.23-.79 2.38-1.94l24.59-24.59c1.3-1.3 1.94-1.94 2.24-2.7a4 4 0 0 0 .23-2.13c-.13-.8-.63-1.58-1.62-3.12l-6.62-10.3c-1.5-2.33-2.25-3.5-3.25-4.34a9 9 0 0 0-3.03-1.65c-1.25-.39-2.64-.39-5.41-.39"
      />
      <path
        fill="#30A1F5"
        d="M56.47 34.87c.34-.91 1.63-.91 1.97 0l2.34 6.32q.23.59.82.82l6.31 2.34c.92.33.92 1.63 0 1.97l-6.31 2.33q-.59.23-.82.82l-2.34 6.32c-.34.91-1.63.91-1.97 0l-2.34-6.32a1.4 1.4 0 0 0-.82-.82L47 46.31c-.92-.33-.92-1.63 0-1.97l6.31-2.33q.59-.23.82-.82z"
      />
    </g>
  ),
  { fill: 'none' },
);

/** Gram Circle coin icon (monochrome). */
export const GramCircleMono = /* @__PURE__ */ createIcon(
  'GramCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64m6.66 17.12H25.34c-1.78 0-2.66 0-3.46.25a6 6 0 0 0-1.94 1.06c-.64.54-1.12 1.28-2.08 2.78l-4.24 6.59c-.64.98-.95 1.47-1.04 2q-.11.7.14 1.36c.2.48.62.9 1.44 1.72l15.75 15.75c.73.73 1.1 1.1 1.52 1.23q.57.18 1.15 0c.42-.14.78-.5 1.52-1.24l15.74-15.74c.83-.83 1.24-1.24 1.43-1.72a2.6 2.6 0 0 0 .15-1.37c-.09-.51-.4-1-1.04-2l-4.24-6.59c-.96-1.49-1.44-2.24-2.08-2.77a6 6 0 0 0-1.94-1.06c-.8-.25-1.68-.25-3.46-.25m-2.52 5.2a.67.67 0 0 1 1.26 0l1.5 4.04q.15.38.52.53l4.04 1.5c.6.2.6 1.04 0 1.25l-4.04 1.5q-.37.14-.52.52l-1.5 4.05a.67.67 0 0 1-1.26 0l-1.5-4.05a1 1 0 0 0-.52-.52l-4.04-1.5c-.59-.21-.59-1.04 0-1.26l4.04-1.5q.38-.14.52-.52z"
    />
  ),
  { fill: 'currentColor' },
);
