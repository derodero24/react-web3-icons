import { createIcon } from '../utils';
import { SAFE_PATH } from './safe-path';

const safeContent = () => <path d={SAFE_PATH} />;

/** Safe wallet icon (colored). */
export const Safe = createIcon(
  'Safe',
  '126.88 145.93 32.08 33.07',
  safeContent,
  '#000',
);

/** Safe wallet icon (monochrome). */
export const SafeMono = createIcon(
  'SafeMono',
  '126.88 145.93 32.08 33.07',
  safeContent,
  'currentColor',
);
