import { createIcon } from '../utils';

// Paths sourced from bandprotocol/governance-portal (Apache-2.0)
const bandContent = () => (
  <path
    fillRule="nonzero"
    d="M46.2 0C20.684 0 0 20.684 0 46.2 0 71.716 20.684 92.4 46.2 92.4 71.716 92.4 92.4 71.716 92.4 46.2 92.4 20.6844446 71.7155554 0 46.2 0zm19 65.496L45.896 76.66v.004l-.008-.001L26.572 65.496V26.864l.02.012L45.88 15.736l12.38 6.908.004-.001v17.44l-6.024-3.46V26.12L45.888 22.5 32.592 30.188v32.024L45.888 69.9l13.296-7.664.064-13.16L40.356 38.116l6.068-3.192L65.248 45.9 65.2 65.5v-.004zM49.528 44.944l4.652 2.676-13.824 7.872V39.62l4.856 2.864v4.764l4.32-2.304h-.004z"
  />
);

export const Band = createIcon('Band', '0 0 93 93', bandContent, '#516BF0');

export const BandMono = createIcon(
  'BandMono',
  '0 0 93 93',
  bandContent,
  'currentColor',
);
