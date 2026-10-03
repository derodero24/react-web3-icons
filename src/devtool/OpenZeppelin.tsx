import { createIcon } from '../utils';

// Source: https://openzeppelin.com
/** Open Zeppelin devtool icon (colored). */
export const OpenZeppelin = /* @__PURE__ */ createIcon(
  'OpenZeppelin',
  '0 0 29.86 33.62',
  () => (
    <>
      <path
        fill="#63d2f9"
        d="M29.865 33.624H11.222l3.038-5.168a7.21 7.21 0 0 1 6.225-3.58h9.379v8.748z"
      />
      <path fill="#4e5ee4" d="M0 0h29.865l-5.146 8.748H0z" />
      <path
        fill="#63b0f9"
        d="M11.82 13.679a7.9 7.9 0 0 1 6.806-3.918h5.545L10.06 33.624H.033z"
      />
    </>
  ),
  {},
);

/** Open Zeppelin devtool icon (monochrome). */
export const OpenZeppelinMono = /* @__PURE__ */ createIcon(
  'OpenZeppelinMono',
  '0 0 29.86 33.62',
  () => (
    <>
      <path d="M29.865 33.624H11.222l3.038-5.168a7.21 7.21 0 0 1 6.225-3.58h9.379v8.748z" />
      <path d="M0 0h29.865l-5.146 8.748H0z" />
      <path d="M11.82 13.679a7.9 7.9 0 0 1 6.806-3.918h5.545L10.06 33.624H.033z" />
    </>
  ),
  { fill: 'currentColor' },
);
