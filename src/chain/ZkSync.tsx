import { createIcon } from '../utils';

const ZKSYNC_ARROWS =
  'm32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z';

export const ZkSync = createIcon('ZkSync', '0 0 40 40', () => (
  <>
    <path d="M0 0h40v40H0z" fill="#000" />
    <path d={ZKSYNC_ARROWS} fill="#fff" fillRule="evenodd" clipRule="evenodd" />
  </>
));

export const ZkSyncMono = createIcon(
  'ZkSyncMono',
  '0 0 40 40',
  _id => (
    <>
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            d={ZKSYNC_ARROWS}
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
