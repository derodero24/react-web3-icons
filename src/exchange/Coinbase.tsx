import { createIcon } from '../utils';

// Source: https://coinbase.com (official brand)

const COINBASE_BG =
  'M1250 0h0c690.2 0 1250 559.8 1250 1250h0c0 690.2-559.8 1250-1250 1250h0C559.8 2500 0 1940.2 0 1250h0C0 559.8 559.8 0 1250 0z';
const COINBASE_C =
  'M1250.4 1689.5c-242.8 0-439.4-196.7-439.4-439.5s196.7-439.4 439.4-439.4c217.5 0 398.1 158.6 432.9 366.2H2126c-37.4-451.2-414.9-805.7-875.6-805.7-485.2 0-878.9 393.7-878.9 878.9s393.7 878.9 878.9 878.9c460.7 0 838.3-354.5 875.6-805.7h-443.1c-34.8 207.7-215 366.3-432.5 366.3h0z';

export const CoinbaseCircle = createIcon(
  'CoinbaseCircle',
  '0 0 2500 2500',
  () => (
    <>
      <path d={COINBASE_BG} fill="#fff" />
      <path d={COINBASE_C} fill="#0052ff" />
    </>
  ),
);

export const CoinbaseCircleAlt = createIcon(
  'CoinbaseCircleAlt',
  '0 0 2500 2500',
  () => (
    <>
      <path d={COINBASE_BG} fill="#0052ff" />
      <path d={COINBASE_C} fill="#fff" />
    </>
  ),
);

export const Coinbase = createIcon(
  'Coinbase',
  '371.5 371.1 1754.5 1757.8',
  () => <path d={COINBASE_C} />,
  '#0052ff',
);

export const CoinbaseCircleMono = createIcon(
  'CoinbaseCircleMono',
  '0 0 2500 2500',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-cbem-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={COINBASE_C} fill="#000" />
        </mask>
      </defs>
      <path d={COINBASE_BG} mask={`url(#${_id}-cbem-a)`} />
    </>
  ),
  'currentColor',
);

export const CoinbaseMono = createIcon(
  'CoinbaseMono',
  '371.5 371.1 1754.5 1757.8',
  () => <path d={COINBASE_C} />,
  'currentColor',
);
