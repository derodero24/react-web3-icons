import { createIcon } from '../utils';

// Source: https://linea.build
// Not verified (checked 2026-10-10): the source cites only the home page, not an official logo file, and the artwork has not been compared with one
/** Linea chain icon (colored). */
export const Linea = /* @__PURE__ */ createIcon(
  'Linea',
  '0 0 64 64',
  () => (
    <>
      <path d="M0 0h64v64H0z" />
      <path
        fill="#fff"
        d="M41.11 46.4h-22.9V22.27h5.24v19.45h17.66zm0-19.45a4.67 4.67 0 1 0 0-9.35 4.67 4.67 0 0 0 0 9.35"
      />
    </>
  ),
  {},
);

/** Linea chain icon (monochrome). */
export const LineaMono = /* @__PURE__ */ createIcon(
  'LineaMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="scale(1.6)">
      <rect width="40" height="40" mask={`url(#${_id}-a)`} />
      <defs>
        <mask id={`${_id}-a`}>
          <rect width="40" height="40" fill="#fff" />
          <path
            fill="#000"
            d="M25.7 29H11.38V13.92h3.28v12.16H25.7zm0-12.16a2.92 2.92 0 1 0 0-5.84 2.92 2.92 0 0 0 0 5.84"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
