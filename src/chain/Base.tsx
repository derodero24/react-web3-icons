import { createIcon } from '../utils';

const BASE_CIRCLE = 'M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z';
const BASE_B =
  'M13.967 23.86c5.445 0 9.86-4.415 9.86-9.86 0-5.445-4.415-9.86-9.86-9.86-5.166 0-9.403 3.974-9.825 9.03h14.63v1.642H4.142c.413 5.065 4.654 9.047 9.826 9.047Z';

export const Base = createIcon('Base', '0 0 28 28', () => (
  <>
    <path d={BASE_CIRCLE} fill="#0052FF" />
    <path d={BASE_B} fill="#fff" />
  </>
));

export const BaseMono = createIcon(
  'BaseMono',
  '0 0 28 28',
  _id => (
    <>
      <path d={BASE_CIRCLE} mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <path d={BASE_B} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

// Circle variant: 28×28 content scaled to ~46px centered in 64×64
const BASE_CIRCLE_TX = 'translate(9 9) scale(1.643)';

export const BaseCircle = createIcon('BaseCircle', '0 0 64 64', () => (
  <>
    <circle cx="32" cy="32" r="32" fill="#0052FF" />
    <g transform={BASE_CIRCLE_TX}>
      <path d={BASE_B} fill="#fff" />
    </g>
  </>
));

export const BaseSquare = createIcon('BaseSquare', '0 0 64 64', () => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#0052FF" />
    <g transform={BASE_CIRCLE_TX}>
      <path d={BASE_B} fill="#fff" />
    </g>
  </>
));

export const BaseSquareMono = createIcon(
  'BaseSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-bass-a)`} />
      <defs>
        <mask id={`${_id}-bass-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={BASE_CIRCLE_TX} fill="#000">
            <path d={BASE_B} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const BaseCircleMono = createIcon(
  'BaseCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-basc-a)`} />
      <defs>
        <mask id={`${_id}-basc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={BASE_CIRCLE_TX} fill="#000">
            <path d={BASE_B} />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
