import { createIcon } from '../utils';

// Source: https://linea.build
/** Linea chain icon (colored). */
export const Linea = /* @__PURE__ */ createIcon(
  'Linea',
  '0 0 64 64',
  () => (
    <>
      <path d="M0 0h64v64H0z" />
      <path
        fill="#fff"
        d="M41.112 46.4H18.214V22.272h5.239v19.453h17.659zm0-19.453a4.674 4.674 0 1 0 0-9.347 4.674 4.674 0 0 0 0 9.347"
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
            d="M25.695 29H11.384V13.92h3.274v12.158h11.037zm0-12.158a2.92 2.92 0 1 0 0-5.842 2.92 2.92 0 0 0 0 5.842"
          />
        </mask>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
