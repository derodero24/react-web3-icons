import { createIcon } from '../utils';

// Source: https://zksync.io
// Circle variant: 40×40 content scaled to ~46px centered in 64×64
/** Zk Sync chain icon (colored). */
export const ZkSync = /* @__PURE__ */ createIcon('ZkSync', '0 0 40 40', () => (
  <>
    <path d="M0 0h40v40H0z" fill="#000" />
    <path
      d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
      fill="#fff"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </>
));

/** Zk Sync chain icon (monochrome). */
export const ZkSyncMono = /* @__PURE__ */ createIcon(
  'ZkSyncMono',
  '0 0 40 40',
  _id => (
    <>
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
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

/** Zk Sync Circle chain icon (colored). */
export const ZkSyncCircle = /* @__PURE__ */ createIcon(
  'ZkSyncCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#000" />
      <g transform="translate(9 9) scale(1.15)">
        <path
          d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </g>
    </>
  ),
);

/** Zk Sync Square chain icon (colored). */
export const ZkSyncSquare = /* @__PURE__ */ createIcon(
  'ZkSyncSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="12.8" fill="#000" />
      <g transform="translate(9 9) scale(1.15)">
        <path
          d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </g>
    </>
  ),
);

/** Zk Sync Square chain icon (monochrome). */
export const ZkSyncSquareMono = /* @__PURE__ */ createIcon(
  'ZkSyncSquareMono',
  '0 0 64 64',
  _id => (
    <>
      <rect width="64" height="64" rx="12.8" mask={`url(#${_id}-zkss-a)`} />
      <defs>
        <mask id={`${_id}-zkss-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform="translate(9 9) scale(1.15)" fill="#000">
            <path
              d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);

/** Zk Sync Circle chain icon (monochrome). */
export const ZkSyncCircleMono = /* @__PURE__ */ createIcon(
  'ZkSyncCircleMono',
  '0 0 64 64',
  _id => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-zksc-a)`} />
      <defs>
        <mask id={`${_id}-zksc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g transform="translate(9 9) scale(1.15)" fill="#000">
            <path
              d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7l6.954-6.922ZM7.75 20.005l6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7L7.75 20.004Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  'currentColor',
);
