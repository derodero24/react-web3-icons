import { createIcon } from '../utils';

// Source: https://hedera.com
/** Hbar coin icon (colored). */
export const Hbar = /* @__PURE__ */ createIcon(
  'Hbar',
  '0 0 64 64',
  () => (
    <path d="M56.493 59.992h-8.75V44.245h-31.49v15.747H7.507V4.009h8.746v15.743h31.49V4.01h8.75zm-40.24-24.493h31.49v-6.998h-31.49z" />
  ),
  { fill: '#000' },
);

/** Hbar coin icon (monochrome). */
export const HbarMono = /* @__PURE__ */ createIcon(
  'HbarMono',
  '0 0 64 64',
  () => (
    <path d="M56.493 59.992h-8.75V44.245h-31.49v15.747H7.507V4.009h8.746v15.743h31.49V4.01h8.75zm-40.24-24.493h31.49v-6.998h-31.49z" />
  ),
  { fill: 'currentColor' },
);
