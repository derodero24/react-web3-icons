import { createIcon } from '../utils';

// Source: https://xverseapp.notion.site/xverse-brand-public (official brand assets, Logo page: Xverse Logo – Various Formats.zip, Symbol/Dark/xverse_icon_blackcolor 1.svg)
// Default: the kit's standalone symbol for light backgrounds (Symbol/Dark/xverse_icon_blackcolor 1.svg: the #0F0F0F X body and the #EE7A30 accent), paths unchanged and placed on the 64 grid. It replaces the white X on a #181818 disc, a container no official asset uses (the kit's symbols have no background; the xverse.app webclip.png app icon is a dark rounded square)
// Mono: the same two paths in currentColor; the body and the accent are already separated by the kit's own gap, so no seam is added (the kit's white symbol, xverse_icon_whitecolor.svg, has the same geometry)
/** Xverse wallet icon (colored). */
export const Xverse = /* @__PURE__ */ createIcon(
  'Xverse',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#0F0F0F"
        d="M59.73 58.96V48.8q-.01-.62-.44-1.07L16.12 4.58a1.5 1.5 0 0 0-1.07-.45H4.91c-.5 0-.91.41-.91.91v9.43q.01.62.44 1.07l15.5 15.5a.9.9 0 0 1 0 1.28L4.27 47.99a1 1 0 0 0-.27.64v10.33c0 .5.4.9.9.9h16.96c.5 0 .9-.4.9-.9v-6.09q0-.37.27-.64l8.41-8.4a.9.9 0 0 1 1.29 0l15.6 15.6q.44.43 1.07.44h9.42c.5 0 .9-.41.9-.91z"
      />
      <path
        fill="#EE7A30"
        d="M37.12 17.57h8.49c.5 0 .91.4.91.91v8.5c0 .8.99 1.21 1.56.64l11.65-11.67q.26-.27.27-.64V5.09c0-.5-.41-.91-.92-.91l-10.36-.02q-.38 0-.65.27L36.47 16c-.57.57-.16 1.56.65 1.56"
      />
    </>
  ),
  {},
);

/** Xverse wallet icon (monochrome). */
export const XverseMono = /* @__PURE__ */ createIcon(
  'XverseMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M59.73 58.96V48.8q-.01-.62-.44-1.07L16.12 4.58a1.5 1.5 0 0 0-1.07-.45H4.91c-.5 0-.91.41-.91.91v9.43q.01.62.44 1.07l15.5 15.5a.9.9 0 0 1 0 1.28L4.27 47.99a1 1 0 0 0-.27.64v10.33c0 .5.4.9.9.9h16.96c.5 0 .9-.4.9-.9v-6.09q0-.37.27-.64l8.41-8.4a.9.9 0 0 1 1.29 0l15.6 15.6q.44.43 1.07.44h9.42c.5 0 .9-.41.9-.91z" />
      <path d="M37.12 17.57h8.49c.5 0 .91.4.91.91v8.5c0 .8.99 1.21 1.56.64l11.65-11.67q.26-.27.27-.64V5.09c0-.5-.41-.91-.92-.91l-10.36-.02q-.38 0-.65.27L36.47 16c-.57.57-.16 1.56.65 1.56" />
    </>
  ),
  { fill: 'currentColor' },
);
