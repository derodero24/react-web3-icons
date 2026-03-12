import { createIcon } from '../utils';

const paraSwapContent = () => (
  <>
    <path d="M21 19.2 12.675 4.8 4.35 19.2z" />
    <path d="M6.825 11.55 10.65 4.8H3z" />
    <path d="M17.6 17.294H7.75l4.925-8.52z" />
  </>
);

/** Para Swap DEX icon (colored). */
export const ParaSwap = createIcon(
  'ParaSwap',
  '0 0 24 24',
  paraSwapContent,
  '#2669F5',
);

/** Para Swap DEX icon (monochrome). */
export const ParaSwapMono = createIcon(
  'ParaSwapMono',
  '0 0 24 24',
  paraSwapContent,
  'currentColor',
);
