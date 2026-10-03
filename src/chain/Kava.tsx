import { createIcon } from '../utils';

// Source: https://kava.io
/** Kava chain icon (colored). */
export const Kava = /* @__PURE__ */ createIcon(
  'Kava',
  '0 0 64 64',
  () => (
    <path d="M18.8 60V4h-8.79v56zM43 60 23.2 32 43 4.01h11L34.2 32 54 60z" />
  ),
  { fill: '#FF564F' },
);

/** Kava chain icon (monochrome). */
export const KavaMono = /* @__PURE__ */ createIcon(
  'KavaMono',
  '0 0 64 64',
  () => (
    <path d="M18.8 60V4h-8.79v56zM43 60 23.2 32 43 4.01h11L34.2 32 54 60z" />
  ),
  { fill: 'currentColor' },
);
