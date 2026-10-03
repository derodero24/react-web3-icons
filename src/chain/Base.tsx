import { createIcon } from '../utils';

// Source: https://base.org
// Circle variant: 28×28 content scaled to ~46px centered in 64×64
/** Base chain icon (colored). */
export const Base = /* @__PURE__ */ createIcon(
  'Base',
  '0 0 28 28',
  () => (
    <>
      <path fill="#0052FF" d="M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28" />
      <path
        fill="#fff"
        d="M13.967 23.86c5.445 0 9.86-4.415 9.86-9.86s-4.415-9.86-9.86-9.86c-5.166 0-9.403 3.974-9.825 9.03h14.63v1.642H4.142c.413 5.065 4.654 9.047 9.826 9.047Z"
      />
    </>
  ),
  {},
);

/** Base chain icon (monochrome). */
export const BaseMono = /* @__PURE__ */ createIcon(
  'BaseMono',
  '0 0 28 28',
  () => (
    <path
      fillRule="evenodd"
      d="M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28m-.033-4.14c5.445 0 9.86-4.415 9.86-9.86s-4.415-9.86-9.86-9.86c-5.166 0-9.403 3.974-9.825 9.03h14.63v1.642H4.142c.413 5.065 4.654 9.047 9.826 9.047Z"
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
