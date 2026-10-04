import { createIcon } from '../utils';

// Source: https://mkt-site-asset.crypto.com/assets/logo/main-app-default.svg (Crypto.com App icon served by crypto.com, product menu of the header)
// Source: https://mkt-site-asset.crypto.com/assets/logo/crypto-com.svg (crypto.com header lockup: the same hexagon and lion in white)
// Colored: main-app-default.svg unchanged (radial #3C62D1 to #010348 rounded tile, white hexagon outline and lion), placed on the 64 grid. It replaces a flat #03316C filled hexagon that matched no official vector (crypto.com/favicon.ico is a two-tone raster of a filled hexagon)
// Mono: the tile in currentColor with the hexagon outline and the lion knocked out
/** Crypto Com exchange icon (colored). */
export const CryptoCom = /* @__PURE__ */ createIcon(
  'CryptoCom',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" fill={`url(#${_id}-cdc-a)`} rx="10" />
      <path fill="white" d="M14.86 11.25h10.27l1.24 5.23h-12.7z" />
      <path
        fill="white"
        d="m22.25 20.2 1.1-2.93H16.7l1.12 2.93-.34 3.28H20l2.56-.01z"
      />
      <path
        fill="white"
        d="m26.4 18.25-3.02 1.96v3.48l-2.3 2.2v1.04l2.22 2.04h1.85l4.67-8.14z"
      />
      <path
        fill="white"
        d="m16.69 20.21-3.05-1.93-3.44 2.55L14.9 29h1.87l2.21-2.07V25.9l-2.3-2.21z"
      />
      <path
        fill="white"
        fillRule="evenodd"
        d="M6.4 12.11 20 4.26l13.63 7.87v15.74L20 35.74l-.03-.02-13.6-7.85V12.13zM20 5.87 7.76 12.94v14.13L20 34.13l12.24-7.06V12.94z"
        clipRule="evenodd"
      />
      <defs>
        <radialGradient
          id={`${_id}-cdc-a`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90)scale(40 87.2467)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".02" stopColor="#3C62D1" />
          <stop offset=".29" stopColor="#1E379D" />
          <stop offset=".55" stopColor="#041C73" />
          <stop offset=".99" stopColor="#010348" />
        </radialGradient>
      </defs>
    </g>
  ),
  { ids: true },
);

/** Crypto Com exchange icon (monochrome). */
export const CryptoComMono = /* @__PURE__ */ createIcon(
  'CryptoComMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" mask={`url(#${_id}-cdcm-a)`} rx="10" />
      <defs>
        <mask id={`${_id}-cdcm-a`}>
          <rect width="40" height="40" fill="#fff" />
          <g fill="#000">
            <path d="M14.86 11.25h10.27l1.24 5.23h-12.7z" />
            <path d="m22.25 20.2 1.1-2.93H16.7l1.12 2.93-.34 3.28H20l2.56-.01z" />
            <path d="m26.4 18.25-3.02 1.96v3.48l-2.3 2.2v1.04l2.22 2.04h1.85l4.67-8.14z" />
            <path d="m16.69 20.21-3.05-1.93-3.44 2.55L14.9 29h1.87l2.21-2.07V25.9l-2.3-2.21z" />
            <path
              fillRule="evenodd"
              d="M6.4 12.11 20 4.26l13.63 7.87v15.74L20 35.74l-.03-.02-13.6-7.85V12.13zM20 5.87 7.76 12.94v14.13L20 34.13l12.24-7.06V12.94z"
            />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
