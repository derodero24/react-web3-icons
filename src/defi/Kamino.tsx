import { createIcon } from '../utils';

// Source: https://cdn.kamino.finance/kamino.svg
// Kamino Finance — dark navy background with stylized "K" mark in cyan
// Paths sourced from cdn.kamino.finance/kamino.svg
/** Kamino DeFi icon (colored). */
export const Kamino = /* @__PURE__ */ createIcon(
  'Kamino',
  '0 0 64 64',
  () => (
    <g transform="scale(.11852)">
      <rect width="540" height="540" fill="#082A56" />
      <path fill="#CAF2FC" d="M230.41 124H170v292.11h60.41z" />
      <path
        fill="#CAF2FC"
        d="M374.82 412.46c-30.26-20.86-50.7-59.66-50.7-104.13s20.44-83.27 50.7-104.13v-3.52H291.1c-19.59 30.35-31.3 67.46-31.3 107.65s11.69 77.28 31.3 107.65h83.7z"
      />
    </g>
  ),
  {},
);

/** Kamino DeFi icon (monochrome). */
export const KaminoMono = /* @__PURE__ */ createIcon(
  'KaminoMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(.11852)">
      <rect width="540" height="540" mask={`url(#${_id}-kamino-a)`} />
      <defs>
        <mask id={`${_id}-kamino-a`}>
          <rect width="540" height="540" fill="#fff" />
          <path fill="#000" d="M230.41 124H170v292.11h60.41z" />
          <path
            fill="#000"
            d="M374.82 412.46c-30.26-20.86-50.7-59.66-50.7-104.13s20.44-83.27 50.7-104.13v-3.52H291.1c-19.59 30.35-31.3 67.46-31.3 107.65s11.69 77.28 31.3 107.65h83.7z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
