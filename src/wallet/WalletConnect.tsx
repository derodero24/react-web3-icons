import { createIcon } from '../utils';

// Source: https://profiles-assets.walletconnect.network/wc-icon.svg (current WalletConnect brandmark, served by https://walletguide.walletconnect.network/)
// Source: https://assets.walletconnect.com/images/wct.svg (official WCT token icon served by https://app.walletconnect.com/: the brandmark in white on a #0988F0 disc)
// Checked 2026-10-04: walletconnect.network uses the current sharp-cornered brandmark in #0888F0 (raster icon.png). The older rounded Logo.svg / Icon.svg in #3396FF from the walletconnect-assets repository (last updated 2024-02) are replaced; the Reown media kit (https://reown.com, Media Kit) has no WalletConnect files
// Colored: the two paths of wc-icon.svg unchanged, filled #0988F0, the blue of the official wct.svg, placed on the 64 grid
// Circle: wct.svg unchanged (scale 4 from its 0.5..16.5 box onto the 64 grid)
// Square: no official square asset exists; the Circle artwork (same mark, same scale) on a #0988F0 rounded square (rx 20%)
// Mono: the brandmark in currentColor; CircleMono and SquareMono knock the brandmark out of the container
/** Wallet Connect Circle wallet icon (colored). */
export const WalletConnectCircle = /* @__PURE__ */ createIcon(
  'WalletConnectCircle',
  '0 0 64 64',
  () => (
    <g transform="matrix(4 0 0 4 -2 -2)">
      <circle cx="8.5" cy="8.5" r="8" fill="#0988F0" />
      <g fill="#fff">
        <path d="m11.32 7.54 1.06-1.07c-2.4-2.41-5.4-2.41-7.81 0l1.07 1.07c1.83-1.84 3.85-1.84 5.68 0" />
        <path d="M10.96 10.02 8.48 7.53l-2.5 2.49L3.5 7.53 2.44 8.6l3.55 3.55 2.49-2.49 2.48 2.5 3.55-3.56-1.06-1.07z" />
      </g>
    </g>
  ),
  {},
);

/** Wallet Connect Circle wallet icon (monochrome). */
export const WalletConnectCircleMono = /* @__PURE__ */ createIcon(
  'WalletConnectCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(4 0 0 4 -2 -2)">
      <circle cx="8.5" cy="8.5" r="8" mask={`url(#${_id}-wccm-a)`} />
      <defs>
        <mask id={`${_id}-wccm-a`}>
          <rect width="16" height="16" x=".5" y=".5" fill="#fff" />
          <g fill="#000">
            <path d="m11.32 7.54 1.06-1.07c-2.4-2.41-5.4-2.41-7.81 0l1.07 1.07c1.83-1.84 3.85-1.84 5.68 0" />
            <path d="M10.96 10.02 8.48 7.53l-2.5 2.49L3.5 7.53 2.44 8.6l3.55 3.55 2.49-2.49 2.48 2.5 3.55-3.56-1.06-1.07z" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Wallet Connect Square wallet icon (colored). */
export const WalletConnectSquare = /* @__PURE__ */ createIcon(
  'WalletConnectSquare',
  '0 0 64 64',
  () => (
    <g transform="matrix(4 0 0 4 -2 -2)">
      <rect width="16" height="16" x=".5" y=".5" fill="#0988F0" rx="3.2" />
      <g fill="#fff">
        <path d="m11.32 7.54 1.06-1.07c-2.4-2.41-5.4-2.41-7.81 0l1.07 1.07c1.83-1.84 3.85-1.84 5.68 0" />
        <path d="M10.96 10.02 8.48 7.53l-2.5 2.49L3.5 7.53 2.44 8.6l3.55 3.55 2.49-2.49 2.48 2.5 3.55-3.56-1.06-1.07z" />
      </g>
    </g>
  ),
  {},
);

/** Wallet Connect Square wallet icon (monochrome). */
export const WalletConnectSquareMono = /* @__PURE__ */ createIcon(
  'WalletConnectSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(4 0 0 4 -2 -2)">
      <rect
        width="16"
        height="16"
        x=".5"
        y=".5"
        mask={`url(#${_id}-wcsqm-a)`}
        rx="3.2"
      />
      <defs>
        <mask id={`${_id}-wcsqm-a`}>
          <rect width="16" height="16" x=".5" y=".5" fill="#fff" />
          <g fill="#000">
            <path d="m11.32 7.54 1.06-1.07c-2.4-2.41-5.4-2.41-7.81 0l1.07 1.07c1.83-1.84 3.85-1.84 5.68 0" />
            <path d="M10.96 10.02 8.48 7.53l-2.5 2.49L3.5 7.53 2.44 8.6l3.55 3.55 2.49-2.49 2.48 2.5 3.55-3.56-1.06-1.07z" />
          </g>
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Wallet Connect wallet icon (colored). */
export const WalletConnect = /* @__PURE__ */ createIcon(
  'WalletConnect',
  '0 0 64 64',
  () => (
    <>
      <path d="m45.18 28.03 4.95-4.86c-11.19-11-25.07-11-36.25 0l4.95 4.86c8.5-8.36 17.85-8.36 26.35 0" />
      <path d="M43.53 39.37 32 28.03 20.47 39.37 8.94 28.03 4 32.9l16.47 16.2L32 37.73 43.53 49.1 60 32.89l-4.95-4.86z" />
    </>
  ),
  { fill: '#0988F0' },
);

/** Wallet Connect wallet icon (monochrome). */
export const WalletConnectMono = /* @__PURE__ */ createIcon(
  'WalletConnectMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m45.18 28.03 4.95-4.86c-11.19-11-25.07-11-36.25 0l4.95 4.86c8.5-8.36 17.85-8.36 26.35 0" />
      <path d="M43.53 39.37 32 28.03 20.47 39.37 8.94 28.03 4 32.9l16.47 16.2L32 37.73 43.53 49.1 60 32.89l-4.95-4.86z" />
    </>
  ),
  { fill: 'currentColor' },
);
