import { createIcon } from '../utils';

// Source: https://www.quicknode.com/brand-kit/quicknode-brand-kit.zip (official brand kit: mark/svg/quicknode-mark-green.svg, quicknode-mark-black.svg)
// Default: the official QuickNode mark in green #6CFF75 (quicknode-mark-green.svg), replacing the older cyan #00A4D6 Q
// Mono: the kit's one-colour mark (quicknode-mark-black.svg, same geometry) in currentColor
/** Quick Node node icon (colored). */
export const QuickNode = /* @__PURE__ */ createIcon(
  'QuickNode',
  '0 0 64 64',
  () => (
    <path
      fill="#6CFF75"
      d="M13.83 15.94c-3.67 4.13-5.8 9.67-5.8 16.06 0 13.37 9.35 23.08 22.64 23.71l1.37.04H60v-.68l-9.43-5.8s-.48-.15-.5-.7q0-.29.2-.52c3.67-4.13 5.8-9.67 5.8-16.05 0-13.37-9.35-23.08-22.64-23.71l-1.39-.04h.02H4v.68l9.55 5.82s.39.12.47.57c.06.36-.19.63-.19.63M15.15 32c0-10.46 6.93-17.28 16.91-17.28S48.98 21.54 48.98 32s-6.93 17.28-16.92 17.28c-9.98 0-16.91-6.82-16.91-17.28"
    />
  ),
  {},
);

/** Quick Node node icon (monochrome). */
export const QuickNodeMono = /* @__PURE__ */ createIcon(
  'QuickNodeMono',
  '0 0 64 64',
  () => (
    <path d="M13.83 15.94c-3.67 4.13-5.8 9.67-5.8 16.06 0 13.37 9.35 23.08 22.64 23.71l1.37.04H60v-.68l-9.43-5.8s-.48-.15-.5-.7q0-.29.2-.52c3.67-4.13 5.8-9.67 5.8-16.05 0-13.37-9.35-23.08-22.64-23.71l-1.39-.04h.02H4v.68l9.55 5.82s.39.12.47.57c.06.36-.19.63-.19.63M15.15 32c0-10.46 6.93-17.28 16.91-17.28S48.98 21.54 48.98 32s-6.93 17.28-16.92 17.28c-9.98 0-16.91-6.82-16.91-17.28" />
  ),
  { fill: 'currentColor' },
);
