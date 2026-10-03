import { createIcon } from '../utils';

// Source: https://github.com/WalletConnect/walletconnect-assets/blob/master/Logo/Blue%20(Default)/Logo.svg (official WalletConnect assets repository)
// Source: https://github.com/WalletConnect/walletconnect-assets/blob/master/Icon/Blue%20(Default)/Icon.svg
// Original viewBox 45.52 99.74 387.64 237.59 → scale 0.119, translate(3.6, 6.1)
// Checked 2026-10-03: the default and Circle match the official Logo.svg and Icon.svg (#3396FF); walletconnect.network's raster icon.png uses #0888F0, but no official vector in that blue was found, so the artwork is unchanged
/** Wallet Connect Circle wallet icon (colored). */
export const WalletConnectCircle = /* @__PURE__ */ createIcon(
  'WalletConnectCircle',
  '0 0 64 64',
  () => (
    <>
      <circle cx="32" cy="32" r="32" fill="#3396FF" />
      <g fill="#fff">
        <path d="M18.46 23.5c7.52-7.37 19.72-7.37 27.24 0l.9.88c.38.37.38.97 0 1.33l-3.09 3.04a.5.5 0 0 1-.68 0l-1.25-1.22c-5.24-5.14-13.75-5.14-19 0l-1.34 1.3a.5.5 0 0 1-.68 0l-3.1-3.03a.93.93 0 0 1 0-1.33zm33.65 6.26 2.75 2.7c.38.37.38.97 0 1.34L42.43 45.97a1 1 0 0 1-1.36 0l-8.82-8.64a.24.24 0 0 0-.34 0l-8.82 8.64a1 1 0 0 1-1.36 0L9.3 33.8a.93.93 0 0 1 0-1.34l2.75-2.7a1 1 0 0 1 1.37 0l8.82 8.64q.17.15.34 0l8.82-8.64a1 1 0 0 1 1.36 0l8.82 8.64c.1.1.25.1.34 0l8.83-8.64a1 1 0 0 1 1.36 0" />
      </g>
    </>
  ),
  {},
);

/** Wallet Connect Circle wallet icon (monochrome). */
export const WalletConnectCircleMono = /* @__PURE__ */ createIcon(
  'WalletConnectCircleMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <circle cx="32" cy="32" r="32" mask={`url(#${_id}-wccm-a)`} />
      <defs>
        <mask id={`${_id}-wccm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M18.46 23.5c7.52-7.37 19.72-7.37 27.24 0l.9.88c.38.37.38.97 0 1.33l-3.09 3.04a.5.5 0 0 1-.68 0l-1.25-1.22c-5.24-5.14-13.75-5.14-19 0l-1.34 1.3a.5.5 0 0 1-.68 0l-3.1-3.03a.93.93 0 0 1 0-1.33zm33.65 6.26 2.75 2.7c.38.37.38.97 0 1.34L42.43 45.97a1 1 0 0 1-1.36 0l-8.82-8.64a.24.24 0 0 0-.34 0l-8.82 8.64a1 1 0 0 1-1.36 0L9.3 33.8a.93.93 0 0 1 0-1.34l2.75-2.7a1 1 0 0 1 1.37 0l8.82 8.64q.17.15.34 0l8.82-8.64a1 1 0 0 1 1.36 0l8.82 8.64c.1.1.25.1.34 0l8.83-8.64a1 1 0 0 1 1.36 0" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Wallet Connect Square wallet icon (colored). */
export const WalletConnectSquare = /* @__PURE__ */ createIcon(
  'WalletConnectSquare',
  '0 0 64 64',
  () => (
    <>
      <rect width="64" height="64" fill="#3396FF" rx="12.8" />
      <g fill="#fff">
        <path d="M18.46 23.5c7.52-7.37 19.72-7.37 27.24 0l.9.88c.38.37.38.97 0 1.33l-3.09 3.04a.5.5 0 0 1-.68 0l-1.25-1.22c-5.24-5.14-13.75-5.14-19 0l-1.34 1.3a.5.5 0 0 1-.68 0l-3.1-3.03a.93.93 0 0 1 0-1.33zm33.65 6.26 2.75 2.7c.38.37.38.97 0 1.34L42.43 45.97a1 1 0 0 1-1.36 0l-8.82-8.64a.24.24 0 0 0-.34 0l-8.82 8.64a1 1 0 0 1-1.36 0L9.3 33.8a.93.93 0 0 1 0-1.34l2.75-2.7a1 1 0 0 1 1.37 0l8.82 8.64q.17.15.34 0l8.82-8.64a1 1 0 0 1 1.36 0l8.82 8.64c.1.1.25.1.34 0l8.83-8.64a1 1 0 0 1 1.36 0" />
      </g>
    </>
  ),
  {},
);

/** Wallet Connect Square wallet icon (monochrome). */
export const WalletConnectSquareMono = /* @__PURE__ */ createIcon(
  'WalletConnectSquareMono',
  '0 0 64 64',
  (_props, _id) => (
    <>
      <rect width="64" height="64" mask={`url(#${_id}-wcsqm-a)`} rx="12.8" />
      <defs>
        <mask id={`${_id}-wcsqm-a`}>
          <rect width="100%" height="100%" fill="#fff" />
          <g fill="#000">
            <path d="M18.46 23.5c7.52-7.37 19.72-7.37 27.24 0l.9.88c.38.37.38.97 0 1.33l-3.09 3.04a.5.5 0 0 1-.68 0l-1.25-1.22c-5.24-5.14-13.75-5.14-19 0l-1.34 1.3a.5.5 0 0 1-.68 0l-3.1-3.03a.93.93 0 0 1 0-1.33zm33.65 6.26 2.75 2.7c.38.37.38.97 0 1.34L42.43 45.97a1 1 0 0 1-1.36 0l-8.82-8.64a.24.24 0 0 0-.34 0l-8.82 8.64a1 1 0 0 1-1.36 0L9.3 33.8a.93.93 0 0 1 0-1.34l2.75-2.7a1 1 0 0 1 1.37 0l8.82 8.64q.17.15.34 0l8.82-8.64a1 1 0 0 1 1.36 0l8.82 8.64c.1.1.25.1.34 0l8.83-8.64a1 1 0 0 1 1.36 0" />
          </g>
        </mask>
      </defs>
    </>
  ),
  { fill: 'currentColor', ids: true },
);

/** Wallet Connect wallet icon (colored). */
export const WalletConnect = /* @__PURE__ */ createIcon(
  'WalletConnect',
  '0 0 64 64',
  () => (
    <path d="M15.46 21.55c9.14-8.95 23.94-8.95 33.08 0l1.1 1.07c.45.45.45 1.17 0 1.62l-3.77 3.68a.6.6 0 0 1-.82 0l-1.51-1.48c-6.38-6.24-16.7-6.24-23.08 0l-1.62 1.59a.6.6 0 0 1-.82 0l-3.76-3.68a1.13 1.13 0 0 1 0-1.62zm40.85 7.6 3.35 3.28c.45.45.45 1.18 0 1.62l-15.1 14.78a1.2 1.2 0 0 1-1.65 0l-10.7-10.49a.3.3 0 0 0-.42 0L21.1 48.83a1.2 1.2 0 0 1-1.66 0L4.34 34.05a1.13 1.13 0 0 1 0-1.62l3.35-3.27a1.2 1.2 0 0 1 1.65 0l10.71 10.48c.11.11.3.11.41 0l10.71-10.48a1.2 1.2 0 0 1 1.66 0l10.7 10.48c.12.11.3.11.42 0l10.7-10.48a1.2 1.2 0 0 1 1.66 0" />
  ),
  { fill: '#3396FF' },
);

/** Wallet Connect wallet icon (monochrome). */
export const WalletConnectMono = /* @__PURE__ */ createIcon(
  'WalletConnectMono',
  '0 0 64 64',
  () => (
    <path d="M15.46 21.55c9.14-8.95 23.94-8.95 33.08 0l1.1 1.07c.45.45.45 1.17 0 1.62l-3.77 3.68a.6.6 0 0 1-.82 0l-1.51-1.48c-6.38-6.24-16.7-6.24-23.08 0l-1.62 1.59a.6.6 0 0 1-.82 0l-3.76-3.68a1.13 1.13 0 0 1 0-1.62zm40.85 7.6 3.35 3.28c.45.45.45 1.18 0 1.62l-15.1 14.78a1.2 1.2 0 0 1-1.65 0l-10.7-10.49a.3.3 0 0 0-.42 0L21.1 48.83a1.2 1.2 0 0 1-1.66 0L4.34 34.05a1.13 1.13 0 0 1 0-1.62l3.35-3.27a1.2 1.2 0 0 1 1.65 0l10.71 10.48c.11.11.3.11.41 0l10.71-10.48a1.2 1.2 0 0 1 1.66 0l10.7 10.48c.12.11.3.11.42 0l10.7-10.48a1.2 1.2 0 0 1 1.66 0" />
  ),
  { fill: 'currentColor' },
);
