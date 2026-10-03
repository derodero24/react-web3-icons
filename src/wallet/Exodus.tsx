import { createIcon } from '../utils';

// Source: https://exodus.com
/** Exodus wallet icon (colored). */
export const Exodus = /* @__PURE__ */ createIcon(
  'Exodus',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="translate(-5.32 -5.32)scale(3.11017)">
      <defs>
        <linearGradient
          id={`${_id}-exodus-a`}
          x1="18.48"
          x2="13.42"
          y1="22.24"
          y2=".98"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-b`}
          x1="18.48"
          x2="13.42"
          y1="22.24"
          y2=".98"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B46F9" />
          <stop offset="1" stopColor="#BBFBE0" />
        </linearGradient>
        <linearGradient
          id={`${_id}-exodus-f`}
          x1="4.21"
          x2="13.1"
          y1="7.05"
          y2="13.69"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".12" stopColor="#8952FF" stopOpacity=".87" />
          <stop offset="1" stopColor="#DABDFF" stopOpacity="0" />
        </linearGradient>
        <mask
          id={`${_id}-exodus-e`}
          width="18"
          height="18"
          x="3"
          y="3"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <path
            fill="#fff"
            d="M20.76 8.03 13.09 3v2.81l4.92 3.2-.58 1.83H13.1v2.33h4.34l.58 1.83-4.92 3.19V21l7.67-5.01-1.26-3.98z"
          />
          <path
            fill="#fff"
            d="M6.42 13.16h4.33v-2.32H6.4L5.84 9l4.9-3.2V3L3.09 8.03 4.33 12l-1.25 3.98L10.76 21v-2.81l-4.91-3.2z"
          />
        </mask>
      </defs>
      <path
        fill={`url(#${_id}-exodus-a)`}
        d="M21 8.03 13.2 3v2.81l5 3.2-.59 1.83H13.2v2.33h4.42l.6 1.83-5.02 3.19V21l7.8-5.01-1.28-3.98z"
      />
      <path
        fill={`url(#${_id}-exodus-b)`}
        d="M6.4 13.16h4.4v-2.32H6.4L5.8 9l5-3.2V3L3 8.03 4.28 12 3 15.99 10.82 21v-2.81l-5-3.2z"
      />
      <g mask={`url(#${_id}-exodus-e)`}>
        <path fill={`url(#${_id}-exodus-f)`} d="M20.64 3H3.09v18h17.55z" />
      </g>
    </g>
  ),
  { fill: 'none', ids: true },
);

/** Exodus wallet icon (monochrome). */
export const ExodusMono = /* @__PURE__ */ createIcon(
  'ExodusMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M60 19.64 35.7 4.01v8.74l15.58 9.94-1.84 5.69H35.71v7.24h13.75l1.83 5.7-15.58 9.93V60L60 44.41l-3.97-12.39z" />
      <path d="M14.6 35.62h13.68v-7.24H14.54l-1.78-5.7 15.52-9.93V4L4.01 19.64l3.97 12.38L4 44.41l24.33 15.58v-8.74l-15.58-9.94z" />
    </>
  ),
  { fill: 'currentColor' },
);
