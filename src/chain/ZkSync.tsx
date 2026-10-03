import { createIcon } from '../utils';

// Source: https://zksync.io
// Circle variant: 40×40 content scaled to ~46px centered in 64×64
/** Zk Sync chain icon (colored). */
export const ZkSync = /* @__PURE__ */ createIcon(
  'ZkSync',
  '0 0 64 64',
  () => (
    <>
      <path d="M0 0h64v64H0z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M51.6 32.008 40.474 20.933v8.105l-11.042 8.125h11.042v5.92zm-39.2 0 11.126 11.077v-8.058l11.042-8.19H23.526v-5.92z"
        clipRule="evenodd"
      />
    </>
  ),
  {},
);

/** Zk Sync chain icon (monochrome). */
export const ZkSyncMono = /* @__PURE__ */ createIcon(
  'ZkSyncMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            fill="#000"
            fillRule="evenodd"
            d="m32.25 20.005-6.954-6.922v5.066l-6.901 5.078h6.901v3.7zm-24.5 0 6.954 6.923v-5.036l6.901-5.119h-6.901v-3.7z"
            clipRule="evenodd"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zk Sync Circle chain icon (colored). */
export const ZkSyncCircle = /* @__PURE__ */ createIcon(
  'ZkSyncCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" />
      <g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m46.088 32.006-7.998-7.96v5.825l-7.936 5.84h7.936v4.255zm-28.175 0 7.997 7.961v-5.791l7.936-5.887H25.91v-4.255l-7.997 7.97Z"
          clipRule="evenodd"
        />
      </g>
    </>
  ),
  {},
);

/** Zk Sync Square chain icon (colored). */
export const ZkSyncSquare = /* @__PURE__ */ createIcon(
  'ZkSyncSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" rx="12.8" />
      <g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m46.088 32.006-7.998-7.96v5.825l-7.936 5.84h7.936v4.255zm-28.175 0 7.997 7.961v-5.791l7.936-5.887H25.91v-4.255l-7.997 7.97Z"
          clipRule="evenodd"
        />
      </g>
    </>
  ),
  {},
);

/** Zk Sync Square chain icon (monochrome). */
export const ZkSyncSquareMono = /* @__PURE__ */ createIcon(
  'ZkSyncSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-zkss-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-zkss-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path
              fillRule="evenodd"
              d="m46.088 32.006-7.998-7.96v5.825l-7.936 5.84h7.936v4.255zm-28.175 0 7.997 7.961v-5.791l7.936-5.887H25.91v-4.255l-7.997 7.97Z"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Zk Sync Circle chain icon (monochrome). */
export const ZkSyncCircleMono = /* @__PURE__ */ createIcon(
  'ZkSyncCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-zksc-a)`} />
      <defs>
        <mask id={`${_id}-zksc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path
              fillRule="evenodd"
              d="m46.088 32.006-7.998-7.96v5.825l-7.936 5.84h7.936v4.255zm-28.175 0 7.997 7.961v-5.791l7.936-5.887H25.91v-4.255l-7.997 7.97Z"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
