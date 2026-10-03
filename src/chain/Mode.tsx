import { createIcon } from '../utils';

// Source: https://mode.network
/** Mode chain icon (colored). */
export const Mode = /* @__PURE__ */ createIcon(
  'Mode',
  '0 0 64 64',
  () => (
    <path d="M59.94 56.77H49.02v-24.7L53.4 18l-3.1-1.1-14.16 39.87h-8.31L13.65 16.89l-3.1 1.1 4.38 14.09v24.7H4V7.22h16.26l10.08 28.36v8.34h3.3v-8.34L43.73 7.22H60v49.55z" />
  ),
  { fill: '#DFFE00' },
);

/** Mode chain icon (monochrome). */
export const ModeMono = /* @__PURE__ */ createIcon(
  'ModeMono',
  '0 0 64 64',
  () => (
    <path d="M59.94 56.77H49.02v-24.7L53.4 18l-3.1-1.1-14.16 39.87h-8.31L13.65 16.89l-3.1 1.1 4.38 14.09v24.7H4V7.22h16.26l10.08 28.36v8.34h3.3v-8.34L43.73 7.22H60v49.55z" />
  ),
  { fill: 'currentColor' },
);
