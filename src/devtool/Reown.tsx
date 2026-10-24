import { createIcon } from '../utils';

// Source: https://reown.com/brand (official brand page, accessed 2026-10-24: "Download brand assets")
// Source: https://drive.google.com/drive/folders/1CnhBzy82qcEYSu0cBafk-NWatLjTaCW5 (the brand page's asset folder: Brand Assets/Reown Logo/Brandmark/SVG/reown-brandmark-positive.svg, reown-brandmark-negative.svg)
// Reown is the company behind WalletConnect and its AppKit / WalletKit SDKs; WalletConnect (the protocol) stays a wallet icon
// Default: the official reown-brandmark-positive.svg (two #202020 shapes with a white slash and dot), paths unchanged, placed on the 64 grid
// Inverted: the official reown-brandmark-negative.svg (white shapes with the slash and dot cut out in #202020), paths unchanged, for dark backgrounds
// Mono: the positive brandmark in currentColor with the slash and dot knocked out (fill-rule=evenodd), so it matches the negative on any background
/** Reown devtool icon (colored). */
export const Reown = /* @__PURE__ */ createIcon(
  'Reown',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#202020"
        d="M24.63 24.63c0-5.7 4.62-10.31 10.32-10.31h14.73c5.7 0 10.32 4.62 10.32 10.31v14.74c0 5.7-4.62 10.31-10.32 10.31H34.95c-5.7 0-10.32-4.62-10.32-10.31z"
      />
      <path fill="white" d="m38.5 38.63 5.16-14h1.52l-5.16 14z" />
      <path
        fill="#202020"
        d="M4 23.9c0-5.3 4.29-9.58 9.58-9.58s9.58 4.28 9.58 9.57v16.22c0 5.29-4.3 9.57-9.58 9.57S4 45.4 4 40.11z"
      />
      <path fill="white" d="M12.66 36.42v-1.84h1.84v1.84z" />
    </>
  ),
  { fill: 'none' },
);

/** Reown devtool icon (monochrome). */
export const ReownMono = /* @__PURE__ */ createIcon(
  'ReownMono',
  '0 0 64 64',
  () => (
    <>
      <path
        fillRule="evenodd"
        d="M24.63 24.63c0-5.7 4.62-10.31 10.32-10.31h14.73c5.7 0 10.32 4.62 10.32 10.31v14.74c0 5.7-4.62 10.31-10.32 10.31H34.95c-5.7 0-10.32-4.62-10.32-10.31zm13.87 14 5.16-14h1.52l-5.16 14z"
      />
      <path
        fillRule="evenodd"
        d="M4 23.9c0-5.3 4.29-9.58 9.58-9.58s9.58 4.28 9.58 9.57v16.22c0 5.29-4.3 9.57-9.58 9.57S4 45.4 4 40.11zm8.66 12.52v-1.84h1.84v1.84z"
      />
    </>
  ),
  { fill: 'currentColor' },
);

/** Reown Inverted devtool icon (colored). */
export const ReownInverted = /* @__PURE__ */ createIcon(
  'ReownInverted',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="white"
        d="M24.63 24.63c0-5.7 4.62-10.31 10.32-10.31h14.73c5.7 0 10.32 4.62 10.32 10.31v14.74c0 5.7-4.62 10.31-10.32 10.31H34.95c-5.7 0-10.32-4.62-10.32-10.31z"
      />
      <path
        fill="#202020"
        fillRule="evenodd"
        d="m43.58 24.51-5.24 14.24h1.77l5.25-14.24z"
        clipRule="evenodd"
      />
      <path
        fill="white"
        d="M4 23.9c0-5.3 4.29-9.58 9.58-9.58s9.58 4.28 9.58 9.57v16.22c0 5.29-4.3 9.57-9.58 9.57S4 45.4 4 40.11z"
      />
      <path
        fill="#202020"
        fillRule="evenodd"
        d="M12.54 34.46v2.08h2.08v-2.08z"
        clipRule="evenodd"
      />
    </>
  ),
  { fill: 'none' },
);
