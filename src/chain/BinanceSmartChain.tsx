import { createIcon } from '../utils';

const BNB_MARK =
  'M583.3 385.4L1250 0l666.7 385.4-250 135.4L1250 281.2 822.9 520.8 583.3 385.4h0zm1322.9 479.2l-239.6-135.4L1250 968.8 822.9 729.2 583.3 864.6v281.3l416.7 239.6v489.6l239.6 145.8 239.6-145.8v-479.2l416.7-239.6V864.6h10.3 0zm0 770.8v-281.2L1666.7 1500v270.8l239.5-135.4h0zm177.1 93.8l-416.7 239.6V2250l666.7-385.4v-770.8l-250 156.2v479.2zM1843.8 625l239.6 145.8v281.3L2323 906.3V625l-239.6-145.8L1843.8 625h0zM1000 2072.9v281.2l239.6 145.8 239.6-145.8v-281.2l-239.6 145.8-239.6-145.8h0zm-416.7-437.5l239.6 135.4v-281.2l-239.6-145.8v291.6h0zM1000 625l239.6 145.8 250-145.8L1250 479.2 1000 625zM406.2 770.8l250-145.8-250-145.8L166.7 625v281.2L406.3 1052V770.8zm0 479.2l-239.6-145.8V1875l666.7 385.4v-281.2l-416.7-239.6V1250h-10.4 0z';

const content = () => <path d={BNB_MARK} />;

export const BinanceSmartChain = createIcon(
  'BinanceSmartChain',
  '166.6 0 2166.7 2499.9',
  content,
  '#f0b90b',
);

export const BinanceSmartChainMono = createIcon(
  'BinanceSmartChainMono',
  '166.6 0 2166.7 2499.9',
  content,
  'currentColor',
);

// BNB diamond mark scaled to fit in a 64x64 circle (~72% fill).
// Original viewBox 166.6 0 2166.7 2499.9 -> scale 0.0184, translate(9, 9)
const BNB_CIRCLE_TX = 'translate(9 9) scale(0.0184)';

export const BinanceSmartChainCircle = createIcon(
  'BinanceSmartChainCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#f0b90b" />
      <path transform={BNB_CIRCLE_TX} d={BNB_MARK} fill="#fff" />
    </>
  ),
);

export const BinanceSmartChainCircleMono = createIcon(
  'BinanceSmartChainCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-bnbc-a)`} />
      <defs>
        <mask id={`${_id}-bnbc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path transform={BNB_CIRCLE_TX} d={BNB_MARK} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
