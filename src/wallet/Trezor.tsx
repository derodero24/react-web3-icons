import { createIcon } from '../utils';

// Source: https://trezor.io
/** Trezor wallet icon (colored). */
export const Trezor = /* @__PURE__ */ createIcon(
  'Trezor',
  '0 0 64 64',
  () => (
    <path d="M45.652 16.995C45.652 9.895 39.489 4 31.987 4S18.322 9.895 18.322 16.995v4.153h-5.627v29.876L31.987 60l19.292-8.976V21.282h-5.627zm-20.364 0c0-3.349 2.948-6.028 6.699-6.028s6.698 2.679 6.698 6.028v4.153H25.288zm18.22 29.206L31.987 51.56 20.465 46.2V28.249h23.043z" />
  ),
  { fill: '#000000' },
);

/** Trezor wallet icon (monochrome). */
export const TrezorMono = /* @__PURE__ */ createIcon(
  'TrezorMono',
  '0 0 64 64',
  () => (
    <path d="M45.652 16.995C45.652 9.895 39.489 4 31.987 4S18.322 9.895 18.322 16.995v4.153h-5.627v29.876L31.987 60l19.292-8.976V21.282h-5.627zm-20.364 0c0-3.349 2.948-6.028 6.699-6.028s6.698 2.679 6.698 6.028v4.153H25.288zm18.22 29.206L31.987 51.56 20.465 46.2V28.249h23.043z" />
  ),
  { fill: 'currentColor' },
);
