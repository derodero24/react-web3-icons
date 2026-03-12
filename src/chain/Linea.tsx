import { createIcon } from '../utils';

const LINEA_PATHS =
  'M25.695 29H11.384V13.92h3.274v12.158h11.037V29ZM25.695 16.842a2.92 2.92 0 1 0 0-5.842 2.92 2.92 0 0 0 0 5.842Z';

/** Linea chain icon (colored). */
export const Linea = createIcon('Linea', '0 0 40 40', () => (
  <>
    <path d="M0 0h40v40H0z" fill="#000" />
    <path d={LINEA_PATHS} fill="#fff" />
  </>
));

/** Linea chain icon (monochrome). */
export const LineaMono = createIcon(
  'LineaMono',
  '0 0 40 40',
  _id => (
    <>
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path d={LINEA_PATHS} fill="#000" />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
