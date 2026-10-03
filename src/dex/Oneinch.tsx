import { createIcon } from '../utils';

// Source: https://1inch.com/assets/images/landing/press-room/assets/1inch_block_black.svg (official press room, https://1inch.com/press-room)
// Source: https://1inch.com/favicon/favicon.svg
// Colored: the official 1inch_block_black.svg unchanged, the white 1" sign on a black square (the same block the site uses as favicon.svg and logo_small.svg after the 2025 rebrand), placed full-bleed on the 64 grid; the former red #E82219 tile appears in no current official file
// The press room also publishes the sign alone (1inch_sign_black.svg / 1inch_sign_white.svg); the default keeps the block, as before
// Mono: the square in currentColor with the sign knocked out (evenodd), the layout of the official block
/** Oneinch DEX icon (colored). */
export const Oneinch = /* @__PURE__ */ createIcon(
  'Oneinch',
  '0 0 64 64',
  () => (
    <>
      <path d="M63.97 0H0v63.97h63.97z" />
      <path
        fill="#fff"
        d="M21.17 47.87h21.57v-4.58h-7.96V16.01h-4.71c-.2 3.81-1.29 4.77-6.5 4.77h-2.4v4.32h7.96v18.2h-7.96zM45 25.1V16h-4.58v9.1zm8.03 0V16h-4.57v9.1z"
      />
    </>
  ),
  {},
);

/** Oneinch DEX icon (monochrome). */
export const OneinchMono = /* @__PURE__ */ createIcon(
  'OneinchMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M63.97 0H0v63.97h63.97zm-42.8 47.87h21.57v-4.58h-7.96V16.01h-4.71c-.2 3.81-1.29 4.77-6.5 4.77h-2.4v4.32h7.96v18.2h-7.96zM45 25.1V16h-4.58v9.1zm8.03 0V16h-4.57v9.1z"
    />
  ),
  { fill: 'currentColor' },
);
