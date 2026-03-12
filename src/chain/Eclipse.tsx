import { createIcon } from '../utils';

const ECLIPSE_OUTER =
  'M138.34 427.17C90.8801 427.17 61.9901 388.69 73.8201 341.22L119.31 158.78C131.14 111.32 179.22 72.83 226.69 72.83H474.7C439.91 27.82 384.02 0 315.18 0C177.1 0 39.2601 111.92 7.3001 250C-24.6599 388.08 61.3401 500 199.42 500C268.26 500 337.03 472.18 392.66 427.17Z';

const ECLIPSE_INNER =
  'M262.08 143.07C250.21 143.07 238.19 152.69 235.24 164.56L222.69 214.88H415.84L398.33 285.12H205.18L192.63 335.44C189.67 347.31 196.89 356.93 208.76 356.93H458.57C481.44 324.51 498.44 288.26 507.3 250C516.16 211.74 515.94 175.49 508.08 143.07Z';

const eclipseContent = () => (
  <>
    <path d={ECLIPSE_OUTER} />
    <path d={ECLIPSE_INNER} />
  </>
);

export const Eclipse = createIcon(
  'Eclipse',
  '0 0 508 500',
  eclipseContent,
  '#000',
);

export const EclipseMono = createIcon(
  'EclipseMono',
  '0 0 508 500',
  eclipseContent,
  'currentColor',
);
