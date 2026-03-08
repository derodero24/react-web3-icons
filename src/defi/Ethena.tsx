import { createIcon } from '../utils';

// Ethena — dark circle with white "E" lettermark; background is integral to the brand
const ETHENA_CIRCLE =
  'M196.092 3.52853H196.099C301.898 3.52853 387.665 89.2955 387.665 195.095V195.102C387.665 300.901 301.898 386.668 196.099 386.668H196.092C90.2926 386.668 4.5256 300.901 4.5256 195.102V195.095C4.5256 89.2955 90.2926 3.52853 196.092 3.52853Z';
const ETHENA_E =
  'M153.405 104.362H149.248L146.552 107.527L76.9679 189.259L72.0008 195.094L76.9679 200.928L146.552 282.66L149.248 285.826H153.405H278.681H287.681V276.826V224.867H269.681V267.826H173.087L230.9 200.981L235.992 195.094L230.9 189.206L173.087 122.362H269.681V165.321H287.681V113.362V104.362H278.681H153.405ZM153.458 127.183L95.6407 195.094L153.458 263.005L212.193 195.094L153.458 127.183Z';

export const Ethena = createIcon('Ethena', '0 0 392 391', () => (
  <>
    <path d={ETHENA_CIRCLE} fill="#111111" />
    <path d={ETHENA_E} fill="#fff" fillRule="evenodd" clipRule="evenodd" />
  </>
));

export const EthenaMono = createIcon(
  'EthenaMono',
  '0 0 392 391',
  _id => (
    <>
      <path d={ETHENA_CIRCLE} mask={`url(#${_id}-eth-a)`} />
      <defs>
        <mask id={`${_id}-eth-a`}>
          <rect width="392" height="391" fill="#fff" />
          <path
            d={ETHENA_E}
            fill="#000"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
