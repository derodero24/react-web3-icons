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
        d="M51.6 32 40.47 20.94v8.1l-11.04 8.13h11.04v5.92zm-39.2 0 11.13 11.08v-8.05l11.04-8.2H23.53v-5.91z"
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
            d="m32.25 20-6.95-6.92v5.07l-6.9 5.08h6.9v3.7zm-24.5 0 6.95 6.93v-5.04l6.9-5.12h-6.9v-3.7z"
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
          d="m46.09 32-8-7.95v5.82l-7.94 5.84h7.94v4.26zM17.9 32l8 7.97v-5.8l7.94-5.88H25.9v-4.26z"
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
          d="m46.09 32-8-7.95v5.82l-7.94 5.84h7.94v4.26zM17.9 32l8 7.97v-5.8l7.94-5.88H25.9v-4.26z"
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
              d="m46.09 32-8-7.95v5.82l-7.94 5.84h7.94v4.26zM17.9 32l8 7.97v-5.8l7.94-5.88H25.9v-4.26z"
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
              d="m46.09 32-8-7.95v5.82l-7.94 5.84h7.94v4.26zM17.9 32l8 7.97v-5.8l7.94-5.88H25.9v-4.26z"
              clipRule="evenodd"
            />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
