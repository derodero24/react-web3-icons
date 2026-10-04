import { createIcon } from '../utils';

// Source: https://www.htx.com/v4/fed-hbg-enhome/_next/static/media/avatar.2fce523a.svg (HTX flame mark served by htx.com)
// Source: https://www.htx.com/v4/fed-hbg-enhome/_next/static/media/logo.48ff6a75.svg (htx.com dark-theme header logo: the same two flames in white and #008CD6)
// Colored: the two flame paths of the official avatar.2fce523a.svg unchanged (#00003E and #008CD6); the pale #F7F9FB avatar disc is left out. The colours match htx.com/pwa/icon-pwa-180.png. It replaces the pale HT-token flame taken from @web3icons/react
// Mono: both flames in currentColor
/** Htx exchange icon (colored). */
export const Htx = /* @__PURE__ */ createIcon(
  'Htx',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#00003E"
        d="M24.96 47.96c.15-13.3 14.3-16.13 12.7-30.65-.43-4.2-2.47-9.15-6.56-13.11a.3.3 0 0 0-.55.25c1.27 13.36-8.18 19.69-12.43 25.25-9.4 12.35-2.48 28.2 11.43 30.28.33.05.51-.33.28-.56-2.84-2.82-4.87-6.43-4.87-11.43"
      />
      <path
        fill="#008CD6"
        d="M43.2 26.68a.33.33 0 0 0-.51.18c-.36 1.72-1.43 4.57-4.88 9.57-8.94 12.93-4.62 18.67-.71 22.99.84 1.02.43-.23 2.26-1.5 2.44-1.7 3.48-1.9 5.82-3.96 2.64-2.67 4.8-6.86 5-11.1.46-9.2-4.95-14.48-6.99-16.18"
      />
    </>
  ),
  {},
);

/** Htx exchange icon (monochrome). */
export const HtxMono = /* @__PURE__ */ createIcon(
  'HtxMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M24.96 47.96c.15-13.3 14.3-16.13 12.7-30.65-.43-4.2-2.47-9.15-6.56-13.11a.3.3 0 0 0-.55.25c1.27 13.36-8.18 19.69-12.43 25.25-9.4 12.35-2.48 28.2 11.43 30.28.33.05.51-.33.28-.56-2.84-2.82-4.87-6.43-4.87-11.43" />
      <path d="M43.2 26.68a.33.33 0 0 0-.51.18c-.36 1.72-1.43 4.57-4.88 9.57-8.94 12.93-4.62 18.67-.71 22.99.84 1.02.43-.23 2.26-1.5 2.44-1.7 3.48-1.9 5.82-3.96 2.64-2.67 4.8-6.86 5-11.1.46-9.2-4.95-14.48-6.99-16.18" />
    </>
  ),
  { fill: 'currentColor' },
);
