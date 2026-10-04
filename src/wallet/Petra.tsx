import { createIcon } from '../utils';

// Source: https://petra.app (official site; header logo: the Petra mark as an inline SVG in white on the "petra-blue" hero)
// Source: https://petra.app (stylesheet token .bg-petra-blue = rgb(90 63 255), #5A3FFF)
// Source: https://petra.app/favicon.ico (app icon: the white mark on a #5A3FFF rounded tile)
// Colored: the official mark path unchanged, white, scale 1.22 centred on a #5A3FFF rounded tile (rx 20%), as in the favicon (a raster: the tile radius and the mark size follow it approximately, nothing is traced). It replaces the old coral #FF5F5F "P"
// Mono: the tile in currentColor with the mark knocked out
/** Petra wallet icon (colored). */
export const Petra = /* @__PURE__ */ createIcon(
  'Petra',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#5A3FFF" rx="12.8" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.06 35.87c0-12.84 10.4-23.25 23.25-23.25 17.01 0 25.1 20.96 12.49 32.38l-5.94 5.38-10.7-9.77 14.12-13.5H25.55v24.27h-14.5z"
      />
    </>
  ),
  {},
);

/** Petra wallet icon (monochrome). */
export const PetraMono = /* @__PURE__ */ createIcon(
  'PetraMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-ptm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-ptm-a`}>
          <rect width="64" height="64" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M11.06 35.87c0-12.84 10.4-23.25 23.25-23.25 17.01 0 25.1 20.96 12.49 32.38l-5.94 5.38-10.7-9.77 14.12-13.5H25.55v24.27h-14.5z"
          />
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
