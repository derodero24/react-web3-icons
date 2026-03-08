import { createIcon } from '../utils';

const HEDERA_CIRCLE = 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18';
const HEDERA_H =
  'M15.659 15.893h-1.143v-2.43H9.485v2.43H8.342v-7.88h1.143v2.372h5.03V8.013h1.144z';
const HEDERA_BAR = 'M9.54 12.553h5.03v-1.255H9.54z';

export const Hedera = createIcon('Hedera', '0 0 24 24', () => (
  <>
    <path d={HEDERA_CIRCLE} fill="#000" />
    <path d={HEDERA_H} fill="#fff" />
    <path d={HEDERA_BAR} fill="#fff" />
  </>
));

export const HederaMono = createIcon(
  'HederaMono',
  '0 0 24 24',
  _id => (
    <>
      <path d={HEDERA_CIRCLE} mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={HEDERA_H} fill="#000" />
          <path d={HEDERA_BAR} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
