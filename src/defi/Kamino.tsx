import { createIcon } from '../utils';

// Kamino Finance — dark navy background with stylized "K" mark in cyan
// Paths sourced from cdn.kamino.finance/kamino.svg
const KAMINO_RECT = 'M230.411 124H170V416.11H230.411V124Z';
const KAMINO_ARCH =
  'M374.819 412.464C344.558 391.602 324.114 352.799 324.114 308.331C324.114 263.862 344.558 225.059 374.819 204.197V200.684H291.108C271.52 231.032 259.815 268.144 259.815 308.331C259.815 348.517 271.498 385.607 291.108 415.978H374.819V412.464Z';

export const Kamino = createIcon('Kamino', '0 0 540 540', () => (
  <>
    <rect width="540" height="540" fill="#082A56" />
    <path d={KAMINO_RECT} fill="#CAF2FC" />
    <path d={KAMINO_ARCH} fill="#CAF2FC" />
  </>
));

export const KaminoMono = createIcon(
  'KaminoMono',
  '0 0 540 540',
  _id => (
    <>
      <rect width="540" height="540" mask={`url(#${_id}-kamino-a)`} />
      <defs>
        <mask id={`${_id}-kamino-a`}>
          <rect width="540" height="540" fill="#fff" />
          <path d={KAMINO_RECT} fill="#000" />
          <path d={KAMINO_ARCH} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
