import { createIcon } from '../utils';

const stxContent = () => (
  <path d="M9.455 9.279a2.72 2.72 0 0 0-2.721 2.72 3.555 3.555 0 0 1-3.558 3.559H3v-.838h.176A2.72 2.72 0 0 0 5.896 12a3.555 3.555 0 0 1 3.56-3.56h4.22A3.555 3.555 0 0 1 17.232 12v.205a3.355 3.355 0 0 1-3.353 3.353v-.838c1.39 0 2.515-1.13 2.515-2.515V12a2.72 2.72 0 0 0-2.72-2.721zm7.778 2.72a3.555 3.555 0 0 1 3.558-3.558H21v.838h-.21a2.72 2.72 0 1 0 0 5.441H21v.838h-.21A3.557 3.557 0 0 1 17.234 12m-6.28-.209v3.768h.838V11.79z" />
);

export const Stx = createIcon('Stx', '0 0 24 24', stxContent, '#7023EB');

export const StxMono = createIcon(
  'StxMono',
  '0 0 24 24',
  stxContent,
  'currentColor',
);
