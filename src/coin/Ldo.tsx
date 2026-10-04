import { createIcon } from '../utils';

// Source: https://lido.fi/static/LIDO_press_kit.zip (official 2026 press kit: Lido/Tokens/LDO/LDO.svg)
// Ldo / LdoMono re-export the Lido logomark and its mono (artwork owned by icons/defi/lido.json)
// Circle: the official LDO token (Lido/Tokens/LDO/LDO.svg in the press kit: the white Lido mark on a #FFAA7D disc, the token's own peach colourway, drawn as an 80x80 rect with rx 40), paths unchanged and full-bleed on the 64 grid; its clip-path is the same disc and clips nothing of the mark, so it is left out
// CircleMono: the token's disc in currentColor with the mark knocked out (fill-rule=evenodd)
export {
  Lido as Ldo,
  LidoMono as LdoMono,
} from '../defi/Lido';

/** Ldo Circle coin icon (colored). */
export const LdoCircle = /* @__PURE__ */ createIcon(
  'LdoCircle',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="32" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m32.03 12.74 9.12 13.76-9.12 5.12-9.12-5.13zm-6.33 13.1 6.32-9.54 6.34 9.54-6.33 3.55z"
      />
      <path
        fill="#fff"
        d="m32.02 34.64-10.58-5.96-.29.44c-3.25 4.91-2.53 11.35 1.75 15.47 5.04 4.86 13.2 4.86 18.24 0 4.28-4.12 5-10.56 1.75-15.47l-.29-.44z"
      />
    </>
  ),
  { fill: '#FFAA7D' },
);

/** Ldo Circle coin icon (monochrome). */
export const LdoCircleMono = /* @__PURE__ */ createIcon(
  'LdoCircleMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64m.03 12.73 9.12 13.76-9.12 5.12-9.12-5.12zm-6.33 13.1 6.33-9.54 6.33 9.55-6.33 3.55zm6.32 8.8L21.44 28.7l-.29.44c-3.26 4.91-2.53 11.35 1.75 15.47 5.04 4.85 13.2 4.85 18.24 0 4.28-4.12 5-10.56 1.75-15.47l-.3-.44z"
    />
  ),
  { fill: 'currentColor' },
);
