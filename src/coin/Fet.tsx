import { createIcon } from '../utils';

const fetContent = () => (
  <path d="M3 3h2.25v2.25H3zm5.625 0h2.25v2.25h-2.25zm0 5.625h2.25v2.25h-2.25zM14.25 3h2.25v2.25h-2.25zm5.625.563H21v1.124h-1.125zm0 5.624H21v1.126h-1.125zm-5.062 0h1.124v1.126h-1.124zm0 5.625h1.124v1.126h-1.124zm-5.626 0h1.126v1.126H9.187zm-5.624 5.063h1.124V21H3.562zm5.624 0h1.126V21H9.187zm5.626 0h1.124V21h-1.124zm5.062 0H21V21h-1.125zm0-5.063H21v1.126h-1.125zM3 8.625h2.25v2.25H3zm0 5.625h2.25v2.25H3z" />
);

/** Fet coin icon (colored). */
export const Fet = createIcon('Fet', '0 0 24 24', fetContent, '#1A1E21');

/** Fet coin icon (monochrome). */
export const FetMono = createIcon(
  'FetMono',
  '0 0 24 24',
  fetContent,
  'currentColor',
);
