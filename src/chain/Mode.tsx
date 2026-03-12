import { createIcon } from '../utils';

// Source: https://mode.network
const modeContent = () => (
  <path d="M20.984 19.963h-3.511v-7.938l1.406-4.527-.998-.355-4.553 12.82h-2.672L6.1 7.143l-.994.355 1.405 4.527v7.941H3V4.034h5.227l3.243 9.118v2.68h1.06v-2.68l3.243-9.118H21v15.93z" />
);

export const Mode = createIcon('Mode', '0 0 24 24', modeContent, '#DFFE00');

export const ModeMono = createIcon(
  'ModeMono',
  '0 0 24 24',
  modeContent,
  'currentColor',
);
