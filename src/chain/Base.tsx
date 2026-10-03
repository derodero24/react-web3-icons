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
        d="M31.92 54.54c12.45 0 22.54-10.1 22.54-22.54S44.37 9.46 31.92 9.46c-11.8 0-21.49 9.09-22.45 20.64H42.9v3.76H9.47c.94 11.57 10.64 20.67 22.46 20.67Z"
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
      d="M32 64a32 32 0 1 0 0-64 32 32 0 0 0 0 64m-.08-9.46c12.45 0 22.54-10.1 22.54-22.54S44.37 9.46 31.92 9.46c-11.8 0-21.49 9.09-22.45 20.64H42.9v3.76H9.47c.94 11.57 10.64 20.67 22.46 20.67Z"
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
          d="M31.95 48.2c8.94 0 16.2-7.25 16.2-16.2s-7.26-16.2-16.2-16.2c-8.49 0-15.45 6.53-16.14 14.84h24.03v2.7H15.81c.67 8.32 7.64 14.86 16.14 14.86"
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
          d="M31.95 48.2c8.94 0 16.2-7.25 16.2-16.2s-7.26-16.2-16.2-16.2c-8.49 0-15.45 6.53-16.14 14.84h24.03v2.7H15.81c.67 8.32 7.64 14.86 16.14 14.86"
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
            <path d="M31.95 48.2c8.94 0 16.2-7.25 16.2-16.2s-7.26-16.2-16.2-16.2c-8.49 0-15.45 6.53-16.14 14.84h24.03v2.7H15.81c.67 8.32 7.64 14.86 16.14 14.86" />
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
            <path d="M31.95 48.2c8.94 0 16.2-7.25 16.2-16.2s-7.26-16.2-16.2-16.2c-8.49 0-15.45 6.53-16.14 14.84h24.03v2.7H15.81c.67 8.32 7.64 14.86 16.14 14.86" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);
