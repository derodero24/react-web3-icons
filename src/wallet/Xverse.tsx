import { createIcon } from '../utils';

// Source: https://xverseapp.notion.site/xverse-brand-public (official brand assets, Logo page: xverse_icon_whitecolor.svg)
// Source: https://cdn.prod.website-files.com/624b08d53d7ac60ccfc11d8d/64637a0aafc684e4c2627b56_webclip.png (official app icon served by xverse.app)
// White X body and #EE7A30 accent: the same two shapes as the official xverse_icon_whitecolor.svg symbol (checked 2026-10-03), on a #181818 disc
// The official app icon (webclip.png) puts the symbol on a dark rounded square, not a disc; artwork unchanged here
/** Xverse wallet icon (colored). */
export const Xverse = /* @__PURE__ */ createIcon(
  'Xverse',
  '0 0 64 64',
  () => (
    <g transform="scale(3.2)">
      <rect width="20" height="20" fill="#181818" rx="10" />
      <path
        fill="#fff"
        d="M14.24 14.1v-1.55a.14.14 0 0 0-.04-.14L7.57 5.78a.14.14 0 0 0-.17 0H5.85a.14.14 0 0 0-.14.07V7.3q0 .1.07.16l2.37 2.37a.14.14 0 0 1 0 .2l-2.4 2.4a.1.1 0 0 0-.04.1v1.57q.01.13.14.14h2.6a.14.14 0 0 0 .13-.14v-.93a.1.1 0 0 1 .04-.1l1.3-1.28a.14.14 0 0 1 .19 0l2.38 2.38q.07.07.17.07h1.44a.14.14 0 0 0 .14-.14"
      />
      <path
        fill="#EE7A30"
        d="M10.78 7.77h1.3a.14.14 0 0 1 .14.14v1.3a.13.13 0 0 0 .24.1l1.78-1.79a.1.1 0 0 0 .04-.1V5.87a.14.14 0 0 0-.14-.14h-1.59a.1.1 0 0 0-.1.04l-2.18 1.78a.14.14 0 0 0 .1.23z"
      />
    </g>
  ),
  {},
);

/** Xverse wallet icon (monochrome). */
export const XverseMono = /* @__PURE__ */ createIcon(
  'XverseMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(3.2)">
      <defs>
        <mask id={`${_id}-xverse-a`}>
          <rect width="20" height="20" fill="#fff" rx="10" />
          <path
            fill="#000"
            d="M14.24 14.1v-1.55a.14.14 0 0 0-.04-.14L7.57 5.78a.14.14 0 0 0-.17 0H5.85a.14.14 0 0 0-.14.07V7.3q0 .1.07.16l2.37 2.37a.14.14 0 0 1 0 .2l-2.4 2.4a.1.1 0 0 0-.04.1v1.57q.01.13.14.14h2.6a.14.14 0 0 0 .13-.14v-.93a.1.1 0 0 1 .04-.1l1.3-1.28a.14.14 0 0 1 .19 0l2.38 2.38q.07.07.17.07h1.44a.14.14 0 0 0 .14-.14"
          />
          <path
            fill="#000"
            d="M10.78 7.77h1.3a.14.14 0 0 1 .14.14v1.3a.13.13 0 0 0 .24.1l1.78-1.79a.1.1 0 0 0 .04-.1V5.87a.14.14 0 0 0-.14-.14h-1.59a.1.1 0 0 0-.1.04l-2.18 1.78a.14.14 0 0 0 .1.23z"
          />
        </mask>
      </defs>
      <rect width="20" height="20" mask={`url(#${_id}-xverse-a)`} rx="10" />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
