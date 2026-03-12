import { createIcon } from '../utils';

/** Phemex exchange icon (colored). */
export const Phemex = createIcon('Phemex', '0 0 16 16', () => (
  <>
    <path
      fill="#13DAFD"
      d="M2.3 4.7v7.5C2.3 13.8 5.1 16 7 16V8.5C7 7 4.2 4.7 2.3 4.7z"
    />
    <path
      fill="#003398"
      d="M9 0v7.5c0 1.6 2.8 3.8 4.7 3.8V3.8C13.7 2.2 10.9 0 9 0z"
    />
  </>
));

/** Phemex exchange icon (monochrome). */
export const PhemexMono = createIcon(
  'PhemexMono',
  '0 0 16 16',
  () => (
    <>
      <path d="M2.3 4.7v7.5C2.3 13.8 5.1 16 7 16V8.5C7 7 4.2 4.7 2.3 4.7z" />
      <path d="M9 0v7.5c0 1.6 2.8 3.8 4.7 3.8V3.8C13.7 2.2 10.9 0 9 0z" />
    </>
  ),
  'currentColor',
);
