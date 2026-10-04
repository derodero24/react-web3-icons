import { createIcon } from '../utils';

// Source: https://github.com/synapsecns/sanguine/blob/master/docs/bridge/static/brand-assets/synapse-mark.svg
// Source: https://github.com/synapsecns/sanguine/blob/master/docs/bridge/static/brand-assets/synapse-mark-black.svg
// Geometry from the official synapse-mark.svg (synapsecns/sanguine docs/bridge/static/brand-assets): four circles and the half-opacity bevelled rhombus stroke
// Gradient as in the official file: a default (objectBoundingBox, left to right) linear gradient on each element from hsl(285deg 100% 65%) = #D24DFF to hsl(265deg 100% 75%) = #B580FF; the previous artwork used mis-converted stops (#BC68FF, #9C72FF) in one user-space gradient across the whole mark
// Mono: follows Synapse's own one-colour marks (synapse-mark-black.svg / synapse-mark-white.svg), which keep the connector stroke at opacity .5 under solid circles; that official opacity is kept rather than a binary redraw
/** Synapse bridge icon (colored). */
export const Synapse = /* @__PURE__ */ createIcon(
  'Synapse',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(32 32)scale(1.16666)">
      <defs>
        <linearGradient id={`${_id}-syn-g`}>
          <stop offset="0" stopColor="#D24DFF" />
          <stop offset="1" stopColor="#B580FF" />
        </linearGradient>
      </defs>
      <path
        stroke={`url(#${_id}-syn-g)`}
        strokeLinejoin="bevel"
        strokeWidth="5.5"
        d="M0 18 18 0h-36L0-18"
        opacity=".5"
      />
      <circle cy="18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cx="18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cx="-18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cy="-18" r="6" fill={`url(#${_id}-syn-g)`} />
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Synapse bridge icon (monochrome). */
export const SynapseMono = /* @__PURE__ */ createIcon(
  'SynapseMono',
  '0 0 64 64',
  () => (
    <g transform="translate(32 32)scale(1.16666)">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth="5.5"
        d="M0 18 18 0h-36L0-18"
        opacity=".5"
      />
      <circle cy="18" r="6" />
      <circle cx="18" r="6" />
      <circle cx="-18" r="6" />
      <circle cy="-18" r="6" />
    </g>
  ),
  { fill: 'currentColor' },
);
