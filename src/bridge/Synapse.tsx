import { createIcon } from '../utils';

// Source: https://github.com/synapsecns/sanguine/blob/master/docs/bridge/static/brand-assets/synapse-mark.svg
// Source: https://github.com/synapsecns/sanguine/blob/master/docs/bridge/static/brand-assets/synapse-mark-black.svg
// Geometry from the official synapse-mark.svg (synapsecns/sanguine docs/bridge/static/brand-assets): four circles and the half-opacity bevelled rhombus stroke
// Gradient as in the official file: a default (objectBoundingBox, left to right) linear gradient on each element from hsl(285deg 100% 65%) = #D24DFF to hsl(265deg 100% 75%) = #B580FF; the previous artwork used mis-converted stops (#BC68FF, #9C72FF) in one user-space gradient across the whole mark
// Mono: binary ink, built from the official geometry (#746): the four circles solid, and the 5.5-wide bevelled connector stroke outlined and solid too, cut back from each circle by a 1.2-unit knockout seam so the dots stay distinct. Synapse's own one-colour marks (synapse-mark-black.svg / synapse-mark-white.svg) draw the connector at opacity .5 instead
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
    <path d="M45.25 35.2h-26.7q.64-1.48.65-3.2a8.2 8.2 0 0 0-5.13-7.6l10.32-10.33a8.2 8.2 0 0 0 4.54 4.54L18.75 28.79h26.7a8.2 8.2 0 0 0 4.48 10.81L39.61 49.94a8.2 8.2 0 0 0-4.54-4.54zM25 53a7 7 0 1 1 14 0 7 7 0 0 1-14 0m21-21a7 7 0 1 1 14 0 7 7 0 0 1-14 0M4 32a7 7 0 1 1 14 0 7 7 0 0 1-14 0m21-21a7 7 0 1 1 14 0 7 7 0 0 1-14 0" />
  ),
  { fill: 'currentColor' },
);
