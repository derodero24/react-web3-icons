import { createIcon } from '../utils';

const content = () => (
  <>
    <ellipse cx="1000" cy="441.78" rx="254.27" ry="147.95" />
    <ellipse cx="1000" cy="1556.15" rx="254.27" ry="147.95" />
    <ellipse
      cx="517.47"
      cy="720.38"
      rx="254.27"
      ry="147.95"
      transform="matrix(.5 -.866025 .866025 .5 -365.13 808.33)"
    />
    <ellipse
      cx="1482.53"
      cy="1277.56"
      rx="254.27"
      ry="147.95"
      transform="matrix(.5 -.866025 .866025 .5 -365.13 1922.69)"
    />
    <ellipse
      cx="517.47"
      cy="1277.56"
      rx="147.95"
      ry="254.27"
      transform="matrix(.866025 -.5 .5 .866025 -569.45 429.89)"
    />
    <ellipse
      cx="1482.53"
      cy="720.38"
      rx="147.95"
      ry="254.27"
      transform="matrix(.866025 -.5 .5 .866025 -161.57 837.78)"
    />
  </>
);

export const Polkadot = createIcon(
  'Polkadot',
  '262.21 293.83 1475.59 1410.27',
  content,
  '#e6007a',
);

export const PolkadotMono = createIcon(
  'PolkadotMono',
  '262.21 293.83 1475.59 1410.27',
  content,
  'currentColor',
);
