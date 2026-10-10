import { createIcon } from '../utils';

// Source: https://www.exodus.com/icon.svg (official favicon, rel=icon)
// Default: the official icon.svg unchanged (two halves in the #0B46F9 -> #BBFBE0 gradient under a #8952FF -> #DABDFF overlay clipped by an alpha mask), placed on the 64 grid. It replaces a copy that was stretched 1.8% horizontally
// Mono: the two halves of icon.svg in currentColor. exodus.com/brand answers automated requests with 403 (checked 2026-10-09)
/** Exodus wallet icon (colored). */
export const Exodus = /* @__PURE__ */ createIcon(
  'Exodus',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(3.82 4)scale(.21212)">
      <path
        fill={`url(#${_id}-exodus-a)`}
        d="M262.42 73.71 149.99 0v41.21l72.13 46.87-8.49 26.85H150v34.14h63.63l8.49 26.85L150 222.8V264l112.42-73.48-18.39-58.4z"
      />
      <path
        fill={`url(#${_id}-exodus-b)`}
        d="M52.18 149.07h63.4v-34.14H51.95L43.7 88.08l71.88-46.87V0L3.16 73.71l18.39 58.4-18.39 58.41L115.82 264v-41.21L43.7 175.92z"
      />
      <mask
        id={`${_id}-exodus-e`}
        width="260"
        height="264"
        x="3"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
      >
        <path
          fill={`url(#${_id}-exodus-c)`}
          d="M262.42 73.71 150 0v41.21l72.12 46.87-8.49 26.85H150v34.14h63.63l8.49 26.85L150 222.8V264l112.42-73.48-18.39-58.4z"
        />
        <path
          fill={`url(#${_id}-exodus-d)`}
          d="M52.18 149.07h63.4v-34.14H51.95L43.7 88.08l71.88-46.87V0L3.16 73.71l18.39 58.4-18.39 58.41L115.82 264v-41.21L43.7 175.92z"
        />
      </mask>
      <g mask={`url(#${_id}-exodus-e)`}>
        <rect
          width="257.4"
          height="264"
          x="3.3"
          fill={`url(#${_id}-exodus-f)`}
        />
      </g>
      <defs>
        <linearGradient
          id={`${_id}-exodus-a`}
          x1="226.05"
          x2="150.74"
          y1="282.15"
          y2="-28.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-b`}
          x1="226.05"
          x2="150.74"
          y1="282.15"
          y2="-28.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-c`}
          x1="226.05"
          x2="150.74"
          y1="282.15"
          y2="-28.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-d`}
          x1="226.05"
          x2="150.74"
          y1="282.15"
          y2="-28.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-f`}
          x1="19.8"
          x2="150.15"
          y1="59.4"
          y2="156.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".12" stopColor="#8952FF" stopOpacity=".87" />
          <stop offset="1" stopColor="#DABDFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Exodus wallet icon (monochrome). */
export const ExodusMono = /* @__PURE__ */ createIcon(
  'ExodusMono',
  '0 0 64 64',
  () => (
    <g>
      <path d="M59.49 19.64 35.64 4v8.75l15.3 9.93-1.8 5.7h-13.5v7.24h13.5l1.8 5.69-15.3 9.95V60L59.5 44.42l-3.9-12.4z" />
      <path d="M14.9 35.62h13.44v-7.24h-13.5l-1.74-5.69 15.24-9.96V4L4.5 19.64l3.89 12.39-3.9 12.39L28.4 60v-8.75l-15.3-9.92z" />
    </g>
  ),
  { fill: 'currentColor' },
);
