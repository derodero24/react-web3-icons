import { createIcon } from '../utils';

// Celoscan uses the Celo "C" mark — a square path forming an open C shape.
// viewBox is trimmed to the 180×180 mark area (offset 70,70 in the source 320×320 SVG).
const CELOSCAN_C =
  'M250 70H70V250H249.995V187.169H220.125C209.828 210.09 186.649 226.055 160.125 226.055C123.557 226.055 93.9445 196.188 93.9445 159.873C93.9445 123.558 123.557 93.9499 160.125 93.9499C187.161 93.9499 210.34 110.432 220.641 133.865H250V70Z';

/** Celoscan explorer icon (colored). */
export const Celoscan = createIcon(
  'Celoscan',
  '70 70 180 180',
  () => <path d={CELOSCAN_C} />,
  '#35D07F',
);

/** Celoscan Square explorer icon (colored). */
export const CeloscanSquare = createIcon(
  'CeloscanSquare',
  '0 0 320 320',
  () => (
    <>
      <rect width="320" height="320" fill="#FCFF52" />
      <path d={CELOSCAN_C} fill="#000" />
    </>
  ),
);

/** Celoscan explorer icon (monochrome). */
export const CeloscanMono = createIcon(
  'CeloscanMono',
  '70 70 180 180',
  () => <path d={CELOSCAN_C} />,
  'currentColor',
);

/** Celoscan Square explorer icon (monochrome). */
export const CeloscanSquareMono = createIcon(
  'CeloscanSquareMono',
  '0 0 320 320',
  _id => (
    <>
      <rect width="320" height="320" mask={`url(#${_id}-celo-a)`} />
      <defs>
        <mask id={`${_id}-celo-a`}>
          <rect width="320" height="320" fill="#fff" />
          <path d={CELOSCAN_C} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
