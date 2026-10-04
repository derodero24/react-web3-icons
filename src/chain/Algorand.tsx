import { createIcon } from '../utils';

// Source: https://algorand.co/brand-hub (AlgoBrand Kit, accessed 2026-10-03)
// Source: https://drive.google.com/drive/folders/1X8IAs8hJZTDdvib4YvFVEte3DnOh_GYn (the hub's Logomark download: Blue/algorand-logomark-blue-RGB.svg, White/algorand-logomark-white-RGB.svg)
// Source: https://drive.google.com/drive/folders/16KHGZK5nsAbXN9AyKF0U2IP5LRr2XZJ8 (AlgoBrand Kit: Brand Guide/Algorand-Brand Guidelines-External-v1.pdf, Logomark p. 21, primary palette p. 37)
// Default: the official logomark algorand-logomark-blue-RGB.svg (#2D2DF1, Algorand Blue), the variant the brand hub's Logomark card shows; paths unchanged. It replaces a pure-black redraw of the same A (silhouette IoU 0.99 with the kit path), a colour the kit does not ship (its black logomark is #001324). The guide lets the logomark take any primary colour (#2D2DF1, #17CAC6, #001324, #FFFFFF)
// Mono: the same path in currentColor (the kit ships it in black and white)
// Circle: no official circular logomark exists; a repo-convention #2D2DF1 disc (r=32) holding the official white logomark (algorand-logomark-white-RGB.svg) at the size and centre of the previous circle's glyph (41 of 64 units tall); CircleMono is the disc in currentColor with the same glyph masked out
/** Algorand chain icon (colored). */
export const Algorand = /* @__PURE__ */ createIcon(
  'Algorand',
  '0 0 64 64',
  () => (
    <path
      fill="#2D2DF1"
      d="M59.92 60H51.2l-5.7-21.13L33.27 60h-9.78l18.9-32.72-3.06-11.42L13.83 60H4.06L36.38 4.02h8.58l3.72 13.94h8.83l-6 10.48z"
    />
  ),
  {},
);

/** Algorand chain icon (monochrome). */
export const AlgorandMono = /* @__PURE__ */ createIcon(
  'AlgorandMono',
  '0 0 64 64',
  () => (
    <path d="M59.92 60H51.2l-5.7-21.13L33.27 60h-9.78l18.9-32.72-3.06-11.42L13.83 60H4.06L36.38 4.02h8.58l3.72 13.94h8.83l-6 10.48z" />
  ),
  { fill: 'currentColor' },
);

/** Algorand Circle chain icon (colored). */
export const AlgorandCircle = /* @__PURE__ */ createIcon(
  'AlgorandCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#2D2DF1" />
      <path
        fill="#fff"
        d="M52.5 52.54h-6.4l-4.18-15.5-8.98 15.5h-7.18l13.87-24.01-2.24-8.38-18.72 32.4H11.5l23.72-41.1h6.3l2.73 10.24h6.48l-4.4 7.69z"
      />
    </>
  ),
  {},
);

/** Algorand Circle chain icon (monochrome). */
export const AlgorandCircleMono = /* @__PURE__ */ createIcon(
  'AlgorandCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-algo-cm-a)`} />
      <defs>
        <mask id={`${_id}-algo-cm-a`}>
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            d="M52.5 52.54h-6.4l-4.18-15.5-8.98 15.5h-7.18l13.87-24.01-2.24-8.38-18.72 32.4H11.5l23.72-41.1h6.3l2.73 10.24h6.48l-4.4 7.69z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
