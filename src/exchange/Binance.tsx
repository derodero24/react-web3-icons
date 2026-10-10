import { createIcon } from '../utils';

// Source: https://www.binance.com (official site; walled, see notes)
// Not verified (checked 2026-10-09): binance.com and its /en/brand page answer automated requests with a 202 bot challenge, and developers.binance.com serves the logo only as PNG (https://bin.bnbstatic.com/static/images/bnb-for/brand.png). The #F0B90B diamond artwork predates the source policy and is unchanged. It is not the BNB Chain kit's symbol (icons/chain/bnb-smart-chain.json, re-exported as the coin Bnb), which is now a cube
/** Binance exchange icon (colored). */
export const Binance = /* @__PURE__ */ createIcon(
  'Binance',
  '0 0 64 64',
  () => (
    <g transform="translate(4.27 4.02)scale(.44194)">
      <polygon points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896" />
      <rect
        width="20.23"
        height="20.23"
        x="3.64"
        y="53.19"
        transform="rotate(45 13.76 63.3)"
      />
      <polygon points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611 23.863,87.716 23.843,87.696" />
      <rect
        width="20.23"
        height="20.23"
        x="101.64"
        y="53.19"
        transform="rotate(135 111.76 63.3)"
      />
      <polygon points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285 48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305" />
    </g>
  ),
  { fill: '#F0B90B' },
);

/** Binance exchange icon (monochrome). */
export const BinanceMono = /* @__PURE__ */ createIcon(
  'BinanceMono',
  '0 0 64 64',
  () => (
    <g transform="translate(4.27 4.02)scale(.44194)">
      <polygon points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896" />
      <rect
        width="20.23"
        height="20.23"
        x="3.64"
        y="53.19"
        transform="rotate(45 13.76 63.3)"
      />
      <polygon points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611 23.863,87.716 23.843,87.696" />
      <rect
        width="20.23"
        height="20.23"
        x="101.64"
        y="53.19"
        transform="rotate(135 111.76 63.3)"
      />
      <polygon points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285 48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305" />
    </g>
  ),
  { fill: 'currentColor' },
);
