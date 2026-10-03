import { createIcon } from '../utils';

// Source: https://cdn.prod.website-files.com/667150f66409572775122b43/667bc178f7d7c5e9849c975b_webclip.svg (official app icon of https://www.eclipse.xyz)
// Default: Eclipse's official app icon (the eclipse.xyz webclip.svg: #A1FEA0 tile with the black E, clipped to its 200/256 safe area as in the file); the site's favicon.svg shows the same tile, so the background is integral and the icon is a container drawn full-bleed. It replaces an unsourced black E without the tile
// Mono: the tile in currentColor with the E knocked out through a mask
/** Eclipse chain icon (colored). */
export const Eclipse = /* @__PURE__ */ createIcon(
  'Eclipse',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.25)">
      <rect width="256" height="256" fill="#A1FEA0" />
      <g fill="black" clipPath={`url(#${_id}-ecl-c)`}>
        <path d="m121.91 98.81-4.69 16.76h86.33l-6.96 24.86h-86.32l-4.69 16.76c-1.25 4.48 1.25 8.1 5.6 8.1h98.77l-.03.11c7.14-11.55 12.49-24.17 15.47-37.4 2.97-13.18 3.33-25.77 1.41-37.3h-94.77c-4.34 0-8.87 3.64-10.12 8.11" />
        <path
          fillRule="evenodd"
          d="M63.48 167.67c-3.47 12.42 3.47 22.49 15.51 22.49h111.3C167.25 213.2 136.37 228 105.45 228c-53.8 0-87.3-44.77-74.85-100S96.75 28 150.55 28c30.91 0 55.13 14.78 67.77 37.84H113.76c-9.31 0-18.95 6.02-24.44 14.5l-.17.26c-1.53 2.41-2.72 5.01-3.48 7.73z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id={`${_id}-ecl-c`}>
          <rect
            width="200"
            height="200"
            fill="white"
            transform="translate(28 28)"
          />
        </clipPath>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Eclipse chain icon (monochrome). */
export const EclipseMono = /* @__PURE__ */ createIcon(
  'EclipseMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.25)">
      <path d="M0 0h256v256H0Z" mask={`url(#${_id}-eclm-m)`} />
      <defs>
        <clipPath id={`${_id}-eclm-c`}>
          <rect width="200" height="200" x="28" y="28" />
        </clipPath>
        <mask id={`${_id}-eclm-m`}>
          <rect width="256" height="256" fill="#fff" />
          <g fill="#000" clipPath={`url(#${_id}-eclm-c)`}>
            <path d="m121.91 98.81-4.69 16.76h86.33l-6.96 24.86h-86.32l-4.69 16.76c-1.25 4.48 1.25 8.1 5.6 8.1h98.77l-.03.11c7.14-11.55 12.49-24.17 15.47-37.4 2.97-13.18 3.33-25.77 1.41-37.3h-94.77c-4.34 0-8.87 3.64-10.12 8.11" />
            <path
              fillRule="evenodd"
              d="M63.48 167.67c-3.47 12.42 3.47 22.49 15.51 22.49h111.3C167.25 213.2 136.37 228 105.45 228c-53.8 0-87.3-44.77-74.85-100S96.75 28 150.55 28c30.91 0 55.13 14.78 67.77 37.84H113.76c-9.31 0-18.95 6.02-24.44 14.5l-.17.26c-1.53 2.41-2.72 5.01-3.48 7.73z"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
