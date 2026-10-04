import { createIcon } from '../utils';

// Source: https://github.com/remix-project-org/remix-project/blob/master/libs/remix-ui/top-bar/src/components/BasicLogo.tsx
// Source: https://github.com/remix-project-org/remix-project/blob/master/apps/remix-ide/src/assets/css/themes/remix-light_powaqg.css
// Artwork: the three paths of the official BasicLogo component (viewBox 0 0 105 100), the inline SVG logo remix.ethereum.org draws in its top bar and home icon; checked against the live bundle on 2026-10-04
// Colored: BasicLogo has no fill of its own; Remix paints it with var(--bs-primary) (topbar.css, remix-ui-vertical-icons-panel.css), which both official themes (remix-light_powaqg.css, remix-dark_tvx1s2.css) set to #007AA6, the same blue as the official raster remix-logo-blue.png
// Mono: the same three paths in currentColor
// The previous artwork (a black disc with a figure) was the unrelated apps/remix-ide/src/assets/img/logoicon.svg, which the IDE no longer uses as its logo
/** Remix devtool icon (colored). */
export const Remix = /* @__PURE__ */ createIcon(
  'Remix',
  '0 0 64 64',
  () => (
    <>
      <path d="m53.87 24.87-.05-.04a22.5 22.5 0 0 0-43.62 0l-.06.04c-1.48 0-6.12.19-6.12 4.13 0 4.7.55 8.78 3.3 11.15 1.18 1.02 3.18 1.26 5.08 1.22a24 24 0 0 0 3.54-.37.04.04 0 0 0 .03-.09 19 19 0 0 1-3.17-10.56v-.17a19.2 19.2 0 0 1 38.42 0v.17a19 19 0 0 1-3.18 10.56.04.04 0 0 0 .04.09 24 24 0 0 0 3.54.37c1.9.04 3.9-.2 5.08-1.22C59.45 37.81 60 33.7 60 29c0-3.94-4.64-4.13-6.13-4.13" />
      <path d="M32 46.27 17.4 41.4a.05.05 0 0 0-.05.1l14.62 14.6a.03.03 0 0 0 .08 0l14.61-14.6a.05.05 0 0 0-.05-.1z" />
      <path d="m45 31.4 3.47-1.05.05-.05a17 17 0 0 0-.48-3.8l-.05-.05-3.53-.32a.05.05 0 0 1-.03-.1l2.62-2.29v-.07a17 17 0 0 0-2-3.33h-.06l-3.25 1.1a.04.04 0 0 1-.06-.08l1.4-3.08v-.07a17 17 0 0 0-3.2-2.26h-.06l-2.45 2.26a.05.05 0 0 1-.1-.03l.06-3.3-.04-.05a17 17 0 0 0-3.84-.8l-.06.03-1.3 3.04a.05.05 0 0 1-.1 0l-1.3-3.04a.05.05 0 0 0-.07-.03 17 17 0 0 0-3.84.8l-.04.06.05 3.32a.04.04 0 0 1-.09.04l-2.49-2.3h-.06a17 17 0 0 0-3.2 2.27v.07l1.42 3.07a.05.05 0 0 1-.07.08l-3.24-1.1h-.07a17 17 0 0 0-1.98 3.33v.07l2.63 2.3a.05.05 0 0 1-.04.1l-3.5.32-.06.04a17 17 0 0 0-.5 3.81l.04.05 3.48 1.1a.04.04 0 0 1 0 .09l-3.21 1.79v.06A17 17 0 0 0 17 37.1l.55 1.15h.03l14.43 4.81 14.45-4.81.04-.03a17 17 0 0 0 1.7-4.88l-.02-.06-3.2-1.78a.05.05 0 0 1 .02-.1" />
    </>
  ),
  { fill: '#007AA6' },
);

/** Remix devtool icon (monochrome). */
export const RemixMono = /* @__PURE__ */ createIcon(
  'RemixMono',
  '0 0 64 64',
  () => (
    <>
      <path d="m53.87 24.87-.05-.04a22.5 22.5 0 0 0-43.62 0l-.06.04c-1.48 0-6.12.19-6.12 4.13 0 4.7.55 8.78 3.3 11.15 1.18 1.02 3.18 1.26 5.08 1.22a24 24 0 0 0 3.54-.37.04.04 0 0 0 .03-.09 19 19 0 0 1-3.17-10.56v-.17a19.2 19.2 0 0 1 38.42 0v.17a19 19 0 0 1-3.18 10.56.04.04 0 0 0 .04.09 24 24 0 0 0 3.54.37c1.9.04 3.9-.2 5.08-1.22C59.45 37.81 60 33.7 60 29c0-3.94-4.64-4.13-6.13-4.13" />
      <path d="M32 46.27 17.4 41.4a.05.05 0 0 0-.05.1l14.62 14.6a.03.03 0 0 0 .08 0l14.61-14.6a.05.05 0 0 0-.05-.1z" />
      <path d="m45 31.4 3.47-1.05.05-.05a17 17 0 0 0-.48-3.8l-.05-.05-3.53-.32a.05.05 0 0 1-.03-.1l2.62-2.29v-.07a17 17 0 0 0-2-3.33h-.06l-3.25 1.1a.04.04 0 0 1-.06-.08l1.4-3.08v-.07a17 17 0 0 0-3.2-2.26h-.06l-2.45 2.26a.05.05 0 0 1-.1-.03l.06-3.3-.04-.05a17 17 0 0 0-3.84-.8l-.06.03-1.3 3.04a.05.05 0 0 1-.1 0l-1.3-3.04a.05.05 0 0 0-.07-.03 17 17 0 0 0-3.84.8l-.04.06.05 3.32a.04.04 0 0 1-.09.04l-2.49-2.3h-.06a17 17 0 0 0-3.2 2.27v.07l1.42 3.07a.05.05 0 0 1-.07.08l-3.24-1.1h-.07a17 17 0 0 0-1.98 3.33v.07l2.63 2.3a.05.05 0 0 1-.04.1l-3.5.32-.06.04a17 17 0 0 0-.5 3.81l.04.05 3.48 1.1a.04.04 0 0 1 0 .09l-3.21 1.79v.06A17 17 0 0 0 17 37.1l.55 1.15h.03l14.43 4.81 14.45-4.81.04-.03a17 17 0 0 0 1.7-4.88l-.02-.06-3.2-1.78a.05.05 0 0 1 .02-.1" />
    </>
  ),
  { fill: 'currentColor' },
);
