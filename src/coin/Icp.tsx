import { createIcon } from '../utils';

// Source: https://internetcomputer.org/favicon.svg (official site)
// Colored: the three paths of the official favicon.svg unchanged (orange #F15A24 to #FBB03B loop, pink #ED1E79 to #522785 loop, #29ABE2 strand) at their source coordinates (viewBox 0 0 358.8 179.8, without the favicon's own placement transform); the gradients' gradientTransform matrix(1 0 0 -1 0 272) is applied to their end points; placed on the 64 grid
// Mono: the union of the three paths in currentColor (the infinity silhouette with both loop holes open)
/** Icp coin icon (colored). */
export const Icp = /* @__PURE__ */ createIcon(
  'Icp',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(4 17.97)scale(.15607)">
      <defs>
        <linearGradient
          id={`${_id}-icp-a`}
          x1="224.79"
          x2="348.07"
          y1="14.25"
          y2="138.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".21" stopColor="#F15A24" />
          <stop offset=".68" stopColor="#FBB03B" />
        </linearGradient>
        <linearGradient
          id={`${_id}-icp-b`}
          x1="133.95"
          x2="10.67"
          y1="165.57"
          y2="41.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".21" stopColor="#ED1E79" />
          <stop offset=".89" stopColor="#522785" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${_id}-icp-a)`}
        d="M271.6 0c-20 0-41.9 10.9-65 32.4-10.9 10.1-20.5 21.1-27.5 29.8 0 0 11.2 12.9 23.5 26.8 6.7-8.4 16.2-19.8 27.3-30.1 20.5-19.2 33.9-23.1 41.6-23.1 28.8 0 52.2 24.2 52.2 54.1 0 29.6-23.4 53.8-52.2 54.1-1.4 0-3-.2-5-.6 8.4 3.9 17.5 6.7 26 6.7 52.8 0 63.2-36.5 63.8-39.1 1.5-6.7 2.4-13.7 2.4-20.9C358.6 40.4 319.6 0 271.6 0"
      />
      <path
        fill={`url(#${_id}-icp-b)`}
        d="M87.1 179.8c20 0 41.9-10.9 65-32.4 10.9-10.1 20.5-21.1 27.5-29.8 0 0-11.2-12.9-23.5-26.8-6.7 8.4-16.2 19.8-27.3 30.1-20.5 19-34 23.1-41.6 23.1C58.4 144 35 119.8 35 89.9c0-29.6 23.4-53.8 52.2-54.1 1.4 0 3 .2 5 .6-8.4-3.9-17.5-6.7-26-6.7C13.4 29.6 3 66.1 2.4 68.8.9 75.5 0 82.5 0 89.7c0 49.7 39 90.1 87.1 90.1"
      />
      <path
        fill="#29ABE2"
        fillRule="evenodd"
        d="M127.3 59.7c-5.8-5.6-34-28.5-61-29.3C18.1 29.2 4 64.2 2.7 68.7 12 29.5 46.4.2 87.2 0c33.3 0 67 32.7 91.9 62.2l.1-.1s11.2 12.9 23.5 26.8c0 0 14 16.5 28.8 31 5.8 5.6 33.9 28.2 60.9 29 49.5 1.4 63.2-35.6 63.9-38.4-9.1 39.5-43.6 68.9-84.6 69.1-33.3 0-67-32.7-92-62.2 0 .1-.1.1-.1.2 0 0-11.2-12.9-23.5-26.8.1 0-13.9-16.6-28.8-31.1"
      />
    </g>
  ),
  { ids: true },
);

/** Icp coin icon (monochrome). */
export const IcpMono = /* @__PURE__ */ createIcon(
  'IcpMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M59.98 32.03q-.01 1.7-.37 3.26l-.1.34C57.94 41.6 52.66 45.97 46.4 46c-5.2 0-10.46-5.1-14.36-9.7l-.02.02c-1.1 1.36-2.59 3.08-4.3 4.65-3.6 3.36-7.01 5.06-10.14 5.06C10.1 46.03 4 39.73 4 31.97q.01-1.69.37-3.26c.02-.07.08-.3.2-.6C6.22 22.27 11.45 18 17.61 17.96c5.2 0 10.46 5.1 14.34 9.7 1.1-1.35 2.6-3.07 4.3-4.64 3.6-3.36 7.02-5.06 10.14-5.06 7.5 0 13.58 6.3 13.6 14.06m-13.6 8.41c4.49-.04 8.14-3.82 8.14-8.44 0-4.67-3.65-8.44-8.15-8.44-1.2 0-3.29.6-6.49 3.6-1.72 1.6-3.2 3.37-4.25 4.68 0 0 2.2 2.58 4.5 4.84.65.63 3.1 2.63 6 3.75zM17.6 23.56c-4.5.04-8.15 3.82-8.15 8.44 0 4.67 3.65 8.44 8.15 8.44 1.19 0 3.3-.64 6.5-3.6 1.72-1.6 3.2-3.39 4.25-4.7.02 0-2.17-2.59-4.5-4.85-.62-.61-2.96-2.54-5.75-3.69zm10.75 8.58c1.92 2.17 3.67 4.18 3.67 4.18s-1.75-2.01-3.67-4.18"
    />
  ),
  { fill: 'currentColor' },
);
