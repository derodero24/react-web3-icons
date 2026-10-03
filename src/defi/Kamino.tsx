import { createIcon } from '../utils';

// Kamino Finance — dark navy background with stylized "K" mark in cyan
// Paths sourced from cdn.kamino.finance/kamino.svg
/** Kamino DeFi icon (colored). */
export const Kamino = /* @__PURE__ */ createIcon(
  'Kamino',
  '0 0 64 64',
  () => (
    <g transform="scale(.11852)">
      <rect width="540" height="540" fill="#082A56" />
      <path fill="#CAF2FC" d="M230.411 124H170v292.11h60.411z" />
      <path
        fill="#CAF2FC"
        d="M374.819 412.464c-30.261-20.862-50.705-59.665-50.705-104.133 0-44.469 20.444-83.272 50.705-104.134v-3.513h-83.711c-19.588 30.348-31.293 67.46-31.293 107.647 0 40.186 11.683 77.276 31.293 107.647h83.711z"
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
          <path fill="#000" d="M230.411 124H170v292.11h60.411z" />
          <path
            fill="#000"
            d="M374.819 412.464c-30.261-20.862-50.705-59.665-50.705-104.133 0-44.469 20.444-83.272 50.705-104.134v-3.513h-83.711c-19.588 30.348-31.293 67.46-31.293 107.647 0 40.186 11.683 77.276 31.293 107.647h83.711z"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
