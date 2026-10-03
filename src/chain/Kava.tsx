import { createIcon } from '../utils';

// Source: https://kava.io
/** Kava chain icon (colored). */
export const Kava = /* @__PURE__ */ createIcon(
  'Kava',
  '0 0 64 64',
  () => (
    <path d="M18.804 59.992V4.009H10.01v55.983zm24.197 0L23.198 31.994 43.001 4.02h10.994L34.202 31.994l19.793 27.998z" />
  ),
  { fill: '#FF564F' },
);

/** Kava chain icon (monochrome). */
export const KavaMono = /* @__PURE__ */ createIcon(
  'KavaMono',
  '0 0 64 64',
  () => (
    <path d="M18.804 59.992V4.009H10.01v55.983zm24.197 0L23.198 31.994 43.001 4.02h10.994L34.202 31.994l19.793 27.998z" />
  ),
  { fill: 'currentColor' },
);
