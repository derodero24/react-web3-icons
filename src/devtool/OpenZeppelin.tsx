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
        d="M56.877 60.006H25.824l5.06-8.608a12.01 12.01 0 0 1 10.37-5.963h15.622v14.571z"
      />
      <path fill="#4e5ee4" d="M7.132 4h49.745l-8.571 14.571H7.132z" />
      <path
        fill="#63b0f9"
        d="M26.82 26.785a13.16 13.16 0 0 1 11.337-6.526h9.236L23.889 60.006H7.187z"
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
      <path d="M56.877 60.006H25.824l5.06-8.608a12.01 12.01 0 0 1 10.37-5.963h15.622v14.571z" />
      <path d="M7.132 4h49.745l-8.571 14.571H7.132z" />
      <path d="M26.82 26.785a13.16 13.16 0 0 1 11.337-6.526h9.236L23.889 60.006H7.187z" />
    </>
  ),
  { fill: 'currentColor' },
);
