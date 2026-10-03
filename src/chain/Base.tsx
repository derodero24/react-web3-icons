import { createIcon } from '../utils';

// Source: https://base.org
// Circle variant: 28×28 content scaled to ~46px centered in 64×64
/** Base chain icon (colored). */
export const Base = /* @__PURE__ */ createIcon(
  'Base',
  '0 0 64 64',
  () => (
    <>
      <path fill="#0052FF" d="M32 64a32 32 0 1 0 0-64 32 32 0 0 0 0 64" />
      <path
        fill="#fff"
        d="M31.925 54.537c12.445 0 22.537-10.091 22.537-22.537S44.37 9.463 31.925 9.463c-11.808 0-21.493 9.083-22.458 20.64h33.44v3.753H9.467c.944 11.577 10.638 20.679 22.46 20.679Z"
      />
    </>
  ),
  {},
);

/** Base chain icon (monochrome). */
export const BaseMono = /* @__PURE__ */ createIcon(
  'BaseMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M32 64a32 32 0 1 0 0-64 32 32 0 0 0 0 64m-.075-9.463c12.445 0 22.537-10.091 22.537-22.537S44.37 9.463 31.925 9.463c-11.808 0-21.493 9.083-22.458 20.64h33.44v3.753H9.467c.944 11.577 10.638 20.679 22.46 20.679Z"
    />
  ),
  { fill: 'currentColor' },
);

/** Base Circle chain icon (colored). */
export const BaseCircle = /* @__PURE__ */ createIcon(
  'BaseCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#0052FF" />
      <g>
        <path
          fill="#fff"
          d="M31.948 48.202c8.946 0 16.2-7.254 16.2-16.2s-7.254-16.2-16.2-16.2c-8.488 0-15.45 6.53-16.143 14.836h24.037v2.698H15.805C16.484 41.658 23.452 48.2 31.95 48.2Z"
        />
      </g>
    </>
  ),
  {},
);

/** Base Square chain icon (colored). */
export const BaseSquare = /* @__PURE__ */ createIcon(
  'BaseSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#0052FF" rx="12.8" />
      <g>
        <path
          fill="#fff"
          d="M31.948 48.202c8.946 0 16.2-7.254 16.2-16.2s-7.254-16.2-16.2-16.2c-8.488 0-15.45 6.53-16.143 14.836h24.037v2.698H15.805C16.484 41.658 23.452 48.2 31.95 48.2Z"
        />
      </g>
    </>
  ),
  {},
);

/** Base Square chain icon (monochrome). */
export const BaseSquareMono = /* @__PURE__ */ createIcon(
  'BaseSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-bass-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-bass-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M31.948 48.202c8.946 0 16.2-7.254 16.2-16.2s-7.254-16.2-16.2-16.2c-8.488 0-15.45 6.53-16.143 14.836h24.037v2.698H15.805C16.484 41.658 23.452 48.2 31.95 48.2Z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Base Circle chain icon (monochrome). */
export const BaseCircleMono = /* @__PURE__ */ createIcon(
  'BaseCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-basc-a)`} />
      <defs>
        <mask id={`${_id}-basc-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M31.948 48.202c8.946 0 16.2-7.254 16.2-16.2s-7.254-16.2-16.2-16.2c-8.488 0-15.45 6.53-16.143 14.836h24.037v2.698H15.805C16.484 41.658 23.452 48.2 31.95 48.2Z" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
