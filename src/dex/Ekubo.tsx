import { createIcon } from '../utils';

// Ekubo DEX icon — chain-link/infinity mark on circular background
// From ekubo.org/logo.svg (official); gradient #661CC4 → #000
const EKUBO_PATH =
  'M30 54.0769C30 47.9593 34.9696 43 41.1 43H92.9C99.0304 43 104 47.9593 104 54.0769V79.9231C104 86.0407 99.0304 91 92.9 91H41.1C34.9696 91 30 86.0407 30 79.9231V54.0769ZM67 67C67 75.1568 60.3738 81.7692 52.2 81.7692C44.0262 81.7692 37.4 75.1568 37.4 67C37.4 58.8432 44.0262 52.2308 52.2 52.2308C60.3738 52.2308 67 58.8432 67 67ZM67 67C67 58.8432 73.6262 52.2308 81.8 52.2308C89.9738 52.2308 96.6 58.8432 96.6 67C96.6 75.1568 89.9738 81.7692 81.8 81.7692C73.6262 81.7692 67 75.1568 67 67Z';

export const Ekubo = createIcon('Ekubo', '0 0 134 134', _id => (
  <>
    <defs>
      <linearGradient
        id={`${_id}-ekubo-a`}
        x1="0"
        y1="0"
        x2="134"
        y2="134"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#661CC4" />
        <stop offset="1" stopColor="#000" />
      </linearGradient>
    </defs>
    <circle cx="67" cy="67" r="67" fill={`url(#${_id}-ekubo-a)`} />
    <path d={EKUBO_PATH} fill="#F1F0FA" fillRule="evenodd" />
  </>
));

export const EkuboMono = createIcon(
  'EkuboMono',
  '0 0 134 134',
  () => <path d={EKUBO_PATH} fillRule="evenodd" />,
  'currentColor',
);
