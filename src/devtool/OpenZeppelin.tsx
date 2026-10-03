import { createIcon } from '../utils';

// Source: https://openzeppelin.com
/** Open Zeppelin devtool icon (colored). */
export const OpenZeppelin = /* @__PURE__ */ createIcon(
  'OpenZeppelin',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#63d2f9"
        d="M56.88 60H25.82l5.06-8.6c2.19-3.71 6.12-5.96 10.37-5.96h15.63z"
      />
      <path fill="#4e5ee4" d="M7.13 4h49.75L48.3 18.57H7.13z" />
      <path
        fill="#63b0f9"
        d="M26.82 26.78a13.2 13.2 0 0 1 11.34-6.52h9.23L23.9 60H7.19z"
      />
    </>
  ),
  {},
);

/** Open Zeppelin devtool icon (monochrome). */
export const OpenZeppelinMono = /* @__PURE__ */ createIcon(
  'OpenZeppelinMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M56.88 60H25.82l5.06-8.6c2.19-3.71 6.12-5.96 10.37-5.96h15.63z" />
      <path d="M7.13 4h49.75L48.3 18.57H7.13z" />
      <path d="M26.82 26.78a13.2 13.2 0 0 1 11.34-6.52h9.23L23.9 60H7.19z" />
    </>
  ),
  { fill: 'currentColor' },
);
