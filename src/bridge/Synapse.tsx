import { createIcon } from '../utils';

// Paths sourced from synapsecns/sanguine (docs/bridge/static/brand-assets/synapse-mark.svg)
// Brand colors: linear gradient from hsl(285deg 100% 65%) to hsl(265deg 100% 75%) (#BC68FF to #9C72FF)
/** Synapse bridge icon (colored). */
export const Synapse = /* @__PURE__ */ createIcon(
  'Synapse',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(32 32)scale(1.16666)">
      <defs>
        <linearGradient
          id={`${_id}-syn-g`}
          x1="-24"
          x2="24"
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#BC68FF" />
          <stop offset="100%" stopColor="#9C72FF" />
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
