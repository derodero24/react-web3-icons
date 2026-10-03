import { createIcon } from '../utils';

// Source: https://docs.frax.com (site icon: the inline <svg name="FraxIcon">, viewBox 0 0 283.46 283.46)
// Frax Finance target/crosshair mark; strictly black-and-white brand
// No downloadable brand SVG exists; the artwork is the FraxIcon component on docs.frax.com (accessed 2026-10-03) as is: a #000 disc (r 129) inside a white keyline ring (r 141) with the white crosshair, paths unchanged
// Mono: the disc in currentColor with the crosshair knocked out; the disc takes the full r 141 footprint, so the white keyline merges into it
/** Frax DeFi icon (colored). */
export const Frax = /* @__PURE__ */ createIcon(
  'Frax',
  '0 0 64 64',
  () => (
    <g transform="translate(-.16 -.16)scale(.22689)">
      <circle cx="141.73" cy="141.73" r="141" fill="#fff" />
      <circle cx="141.73" cy="141.73" r="129" />
      <path
        fill="#fff"
        d="M212.43 141.73c0-14.38-4.32-27.76-11.72-38.94l21.95-21.95-19.74-19.74-21.89 21.89a70 70 0 0 0-39.29-11.96c-14.38 0-27.76 4.32-38.94 11.72L80.84 60.8 61.1 80.54l21.89 21.89a70 70 0 0 0-11.96 39.29c0 14.38 4.32 27.76 11.72 38.94L60.8 202.62l19.74 19.74 21.89-21.89a70 70 0 0 0 39.29 11.96c14.38 0 27.76-4.32 38.94-11.72l21.96 21.96 19.74-19.74-21.89-21.89c7.55-11.26 11.96-24.78 11.96-39.31m-113.47 0c0-23.59 19.19-42.78 42.78-42.78s42.78 19.19 42.78 42.78-19.19 42.78-42.78 42.78-42.78-19.19-42.78-42.78"
      />
    </g>
  ),
  { fill: '#000' },
);

/** Frax DeFi icon (monochrome). */
export const FraxMono = /* @__PURE__ */ createIcon(
  'FraxMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-.16 -.16)scale(.22689)">
      <defs>
        <mask id={`${_id}-frx-m`}>
          <circle cx="141.73" cy="141.73" r="141" fill="#fff" />
          <path
            fill="#000"
            d="M212.43 141.73c0-14.38-4.32-27.76-11.72-38.94l21.95-21.95-19.74-19.74-21.89 21.89a70 70 0 0 0-39.29-11.96c-14.38 0-27.76 4.32-38.94 11.72L80.84 60.8 61.1 80.54l21.89 21.89a70 70 0 0 0-11.96 39.29c0 14.38 4.32 27.76 11.72 38.94L60.8 202.62l19.74 19.74 21.89-21.89a70 70 0 0 0 39.29 11.96c14.38 0 27.76-4.32 38.94-11.72l21.96 21.96 19.74-19.74-21.89-21.89c7.55-11.26 11.96-24.78 11.96-39.31m-113.47 0c0-23.59 19.19-42.78 42.78-42.78s42.78 19.19 42.78 42.78-19.19 42.78-42.78 42.78-42.78-19.19-42.78-42.78"
          />
        </mask>
      </defs>
      <circle cx="141.73" cy="141.73" r="141" mask={`url(#${_id}-frx-m)`} />
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
