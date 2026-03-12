import { createIcon } from '../utils';

// Source: https://zksync.io
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

// Circle variant: 40×40 content scaled to ~46px centered in 64×64
const ZKSYNC_CIRCLE_TX = 'translate(9 9) scale(1.15)';

export const ZkSyncCircle = createIcon('ZkSyncCircle', '0 0 64 64', () => (
  <>
    <circle cx="32" cy="32" r="32" fill="#000" />
    <g transform={ZKSYNC_CIRCLE_TX}>
      <path
        d={ZKSYNC_ARROWS}
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>
  </>
));

export const ZkSyncSquare = createIcon('ZkSyncSquare', '0 0 64 64', () => (
  <>
    <rect width="64" height="64" rx="12.8" fill="#000" />
    <g transform={ZKSYNC_CIRCLE_TX}>
      <path
        d={ZKSYNC_ARROWS}
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>
  </>
));

export const ZkSyncSquareMono = createIcon(
  'ZkSyncSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-zkss-a)`} />
      <defs>
        <mask id={`${_id}-zkss-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={ZKSYNC_CIRCLE_TX} fill="#000">
            <path d={ZKSYNC_ARROWS} fillRule="evenodd" clipRule="evenodd" />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

export const ZkSyncCircleMono = createIcon(
  'ZkSyncCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-zksc-a)`} />
      <defs>
        <mask id={`${_id}-zksc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform={ZKSYNC_CIRCLE_TX} fill="#000">
            <path d={ZKSYNC_ARROWS} fillRule="evenodd" clipRule="evenodd" />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
