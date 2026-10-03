import { createIcon } from '../utils';

// Source: https://quicknode.com (official brand)
/** Quick Node node icon (colored). */
export const QuickNode = /* @__PURE__ */ createIcon(
  'QuickNode',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(1.4 0 0 1.4 4 4)">
      <g clipPath={`url(#${_id}-qn-a)`}>
        <path
          fillRule="evenodd"
          d="M20 32.5a12.5 12.5 0 0 0 8.73-3.55.16.16 0 0 1 .22 0l5.2 5.2 5.38 5.38c.12.12 0 .31-.16.26l-8.6-2.86a.2.2 0 0 0-.13.01A20 20 0 0 1 20 40C8.95 40 0 31.05 0 20S8.95 0 20 0s20 8.95 20 20c0 4.72-1.63 9.05-4.37 12.47a.15.15 0 0 1-.23.02L24.84 21.93c-.11-.12 0-.31.16-.26l6.71 2.23q.14.04.2-.1a13 13 0 0 0 .59-3.8c0-6.9-5.6-12.5-12.5-12.5S7.5 13.1 7.5 20 13.1 32.5 20 32.5"
        />
      </g>
      <defs>
        <clipPath id={`${_id}-qn-a`}>
          <path d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  { fill: '#00a4d6', ids: true },
);

/** Quick Node node icon (monochrome). */
export const QuickNodeMono = /* @__PURE__ */ createIcon(
  'QuickNodeMono',
  '0 0 64 64',
  (_props, _id) => (
    <g transform="matrix(1.4 0 0 1.4 4 4)">
      <g clipPath={`url(#${_id}-qn-a)`}>
        <path
          fillRule="evenodd"
          d="M20 32.5a12.5 12.5 0 0 0 8.73-3.55.16.16 0 0 1 .22 0l5.2 5.2 5.38 5.38c.12.12 0 .31-.16.26l-8.6-2.86a.2.2 0 0 0-.13.01A20 20 0 0 1 20 40C8.95 40 0 31.05 0 20S8.95 0 20 0s20 8.95 20 20c0 4.72-1.63 9.05-4.37 12.47a.15.15 0 0 1-.23.02L24.84 21.93c-.11-.12 0-.31.16-.26l6.71 2.23q.14.04.2-.1a13 13 0 0 0 .59-3.8c0-6.9-5.6-12.5-12.5-12.5S7.5 13.1 7.5 20 13.1 32.5 20 32.5"
        />
      </g>
      <defs>
        <clipPath id={`${_id}-qn-a`}>
          <path d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </g>
  ),
  { fill: 'currentColor', ids: true },
);
