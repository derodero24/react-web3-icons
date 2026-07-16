import { createIcon } from '../utils';

// Paths sourced from synapsecns/sanguine (docs/bridge/static/brand-assets/synapse-mark.svg)
// Brand colors: linear gradient from hsl(285deg 100% 65%) to hsl(265deg 100% 75%) (#BC68FF to #9C72FF)

export const Synapse = createIcon(
  'Synapse',
  '-24 -24 48 48',
  _id => (
    <>
      <defs>
        <linearGradient
          id={`${_id}-syn-g`}
          x1="-24"
          y1="0"
          x2="24"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#BC68FF" />
          <stop offset="100%" stopColor="#9C72FF" />
        </linearGradient>
      </defs>
      <path
        d="M0 18 18 0 H-18 L0 -18"
        stroke={`url(#${_id}-syn-g)`}
        strokeWidth="5.5"
        strokeLinejoin="bevel"
        opacity="0.5"
        fill="none"
      />
      <circle cy="18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cx="18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cx="-18" r="6" fill={`url(#${_id}-syn-g)`} />
      <circle cy="-18" r="6" fill={`url(#${_id}-syn-g)`} />
    </>
  ),
  'none',
);

export const SynapseMono = createIcon(
  'SynapseMono',
  '-24 -24 48 48',
  () => (
    <>
      <path
        d="M0 18 18 0 H-18 L0 -18"
        strokeWidth="5.5"
        strokeLinejoin="bevel"
        opacity="0.5"
        fill="none"
        stroke="currentColor"
      />
      <circle cy="18" r="6" />
      <circle cx="18" r="6" />
      <circle cx="-18" r="6" />
      <circle cy="-18" r="6" />
    </>
  ),
  'currentColor',
);
