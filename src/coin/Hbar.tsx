import { createIcon } from '../utils';

// Source: https://hedera.com
/** Hbar coin icon (colored). */
export const Hbar = /* @__PURE__ */ createIcon(
  'Hbar',
  '0 0 64 64',
  () => (
    <path d="M56.5 60h-8.76V44.23H16.25V60H7.51V4.01h8.74v15.74h31.5V4.01h8.74zM16.24 35.5h31.5v-7h-31.5z" />
  ),
  { fill: '#000' },
);

/** Hbar coin icon (monochrome). */
export const HbarMono = /* @__PURE__ */ createIcon(
  'HbarMono',
  '0 0 64 64',
  () => (
    <path d="M56.5 60h-8.76V44.23H16.25V60H7.51V4.01h8.74v15.74h31.5V4.01h8.74zM16.24 35.5h31.5v-7h-31.5z" />
  ),
  { fill: 'currentColor' },
);
