import { createIcon } from '../utils';

const enaPath =
  'M153.405 104.362h-4.157l-2.696 3.165L76.968 189.259l-4.967 5.835 4.967 5.834 69.584 81.732 2.696 3.166h4.157H278.681h9V276.826v-51.959h-18v42.959H173.087l57.813-66.845 5.092-5.887-5.092-5.888-57.813-66.844h96.594v42.959h18v-51.959v-9H278.681H153.405zM153.458 127.183l-57.817 67.911 57.817 67.911 58.735-67.911-58.735-67.911z';

export const Ena = createIcon('Ena', '0 0 392 392', () => (
  <>
    <circle cx="196" cy="196" r="196" fill="#1C1C1C" />
    <path fillRule="evenodd" clipRule="evenodd" fill="#fff" d={enaPath} />
  </>
));

export const EnaMono = createIcon('EnaMono', '0 0 392 392', _id => (
  <>
    <defs>
      <mask
        id={`${_id}-mask`}
        x="0"
        y="0"
        width="392"
        height="392"
        maskUnits="userSpaceOnUse"
      >
        <rect width="392" height="392" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d={enaPath} fill="black" />
      </mask>
    </defs>
    <circle
      cx="196"
      cy="196"
      r="196"
      fill="currentColor"
      mask={`url(#${_id}-mask)`}
    />
  </>
));
