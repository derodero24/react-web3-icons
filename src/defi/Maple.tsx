import { createIcon } from '../utils';

// Maple Finance — orange circle with white maple leaf details
// Paths sourced from CoinSpace/crypto-db: logo/maple-finance.svg
const MAPLE_CIRCLE =
  'M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10';
const MAPLE_LEAF_1 =
  'M5.101 8.866c2.14-.062 7.24-.297 8.38-1.958.865-1.263-1.046-2.577-1.953-3.052-.908-.477-2.172-.69-2.172-.69 2.542.288 6.56 1.685 5.31 4.223C13.546 9.661 7.706 9.97 5.1 9.97V8.866zm.001 5.657v-1.08c3.233-.107 7.557-.212 9.798-2.349.061 1.882-2.524 2.731-4.503 3.085-1.712.306-3.538.393-5.295.344';
const MAPLE_LEAF_2 =
  'M14.8 8.788c-1.775 1.819-5.204 2.356-9.7 2.356v1.09c4.728 0 9.687-.722 9.7-3.446';

export const Maple = createIcon(
  'Maple',
  '0 0 20 20',
  () => (
    <>
      <path d={MAPLE_CIRCLE} />
      <path fill="#fff" d={MAPLE_LEAF_1} />
      <path fill="#fff" d={MAPLE_LEAF_2} />
    </>
  ),
  '#FC784A',
);

export const MapleMono = createIcon(
  'MapleMono',
  '0 0 20 20',
  _id => (
    <>
      <path d={MAPLE_CIRCLE} mask={`url(#${_id}-maple-a)`} />
      <defs>
        <mask id={`${_id}-maple-a`}>
          <rect width="20" height="20" fill="#fff" />
          <path d={MAPLE_LEAF_1} fill="#000" />
          <path d={MAPLE_LEAF_2} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
