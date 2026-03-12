import { createIcon } from '../utils';

const kavaContent = () => (
  <path d="M7.757 21V3H4.93v18zm7.78 0L9.17 11.998l6.367-8.994h3.535l-6.364 8.994L19.072 21z" />
);

/** Kava chain icon (colored). */
export const Kava = createIcon('Kava', '0 0 24 24', kavaContent, '#FF564F');

/** Kava chain icon (monochrome). */
export const KavaMono = createIcon(
  'KavaMono',
  '0 0 24 24',
  kavaContent,
  'currentColor',
);
