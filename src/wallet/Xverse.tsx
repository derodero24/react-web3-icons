import { createIcon } from '../utils';

// Xverse "X" main body — white diagonal bar
const XVERSE_BODY =
  'M14.239 14.103v-1.552a.139.139 0 0 0-.041-.143L7.568 5.784a.139.139 0 0 0-.164 0H5.852a.139.139 0 0 0-.14.071v1.442c0 .061.025.12.069.163l2.37 2.37a.139.139 0 0 1 0 .197l-2.397 2.397a.139.139 0 0 0-.041.097v1.58c0 .077.062.139.14.139h2.592a.139.139 0 0 0 .139-.139v-.93a.139.139 0 0 1 .041-.098l1.286-1.286a.139.139 0 0 1 .197 0l2.386 2.387c.044.043.103.068.165.068h1.441a.139.139 0 0 0 .14-.138Z';

// Xverse "X" top-right orange accent
const XVERSE_ACCENT =
  'M10.781 7.771h1.299a.139.139 0 0 1 .139.139v1.299a.139.139 0 0 0 .237.098l1.782-1.785a.139.139 0 0 0 .041-.097V5.862a.139.139 0 0 0-.139-.139l-1.586-.002a.139.139 0 0 0-.099.042L10.268 7.54a.139.139 0 0 0 .098.232h.415Z';

export const Xverse = createIcon('Xverse', '0 0 20 20', () => (
  <>
    <rect width="20" height="20" rx="10" fill="#181818" />
    <path d={XVERSE_BODY} fill="#fff" />
    <path d={XVERSE_ACCENT} fill="#EE7A30" />
  </>
));

export const XverseMono = createIcon(
  'XverseMono',
  '0 0 20 20',
  _id => (
    <>
      <defs>
        <mask id={`${_id}-xverse-a`}>
          <rect width="20" height="20" rx="10" fill="#fff" />
          <path d={XVERSE_BODY} fill="#000" />
          <path d={XVERSE_ACCENT} fill="#000" />
        </mask>
      </defs>
      <rect width="20" height="20" rx="10" mask={`url(#${_id}-xverse-a)`} />
    </>
  ),
  'currentColor',
);
