import { createIcon } from '../utils';

const hbarContent = () => (
  <path d="M19.875 21h-2.813v-5.063H6.937V21H4.125V3h2.812v5.062h10.125V3h2.813zM6.937 13.125h10.125v-2.25H6.937z" />
);

export const Hbar = createIcon('Hbar', '0 0 24 24', hbarContent);

export const HbarMono = createIcon(
  'HbarMono',
  '0 0 24 24',
  hbarContent,
  'currentColor',
);
