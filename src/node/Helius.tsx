import { createIcon } from '../utils';

// Source: https://www.helius.dev/brand (Helius Brand Kit: Helius/Helius-Icon.svg, Helius/Helius-Icon-Black.svg, Helius/Helius-Icon-White.svg)
// Source: https://www.helius.dev/Helius-Brandkit/Helius/Helius-Icon.svg
// Source: https://www.helius.dev/favicon.svg (the site icon, the same symbol)
// Default: the Helius symbol in flat Helius Orange #E84125, the orange of the brand kit. Its shapes match favicon.svg (the same 1.006 aspect); the kit's Helius-Icon.svg draws them about 0.7% narrower and shades each piece from #E35930 to #E84125, a gradient this flat artwork leaves out
// Mono: the same shapes in currentColor, as in the kit's one-colour Helius-Icon-Black.svg and Helius-Icon-White.svg
/** Helius node icon (colored). */
export const Helius = /* @__PURE__ */ createIcon(
  'Helius',
  '0 0 64 64',
  () => (
    <>
      <path d="M39.11 15.83a18 18 0 0 0-7.1-1.44c-2.52 0-4.91.51-7.1 1.44L31.43 4.5a.66.66 0 0 1 1.15 0z" />
      <path d="M23.18 16.67A18.3 18.3 0 0 0 14.38 28L9.51 15.62a.66.66 0 0 1 .72-.9z" />
      <path d="M17.65 43.97 4.5 39.89a.67.67 0 0 1-.26-1.12l9.78-9.1a19 19 0 0 0-.25 3.01c0 4.26 1.46 8.18 3.9 11.29Z" />
      <path d="M31.74 50.97 20.2 58.85a.66.66 0 0 1-1.03-.5l-1.03-13.8a18.2 18.2 0 0 0 13.6 6.41" />
      <path d="m45.85 44.6-1.03 13.74a.67.67 0 0 1-.7.6 1 1 0 0 1-.33-.1l-11.52-7.87a18.2 18.2 0 0 0 13.58-6.36Z" />
      <path d="m59.52 39.85-13.1 4.06a18.2 18.2 0 0 0 3.84-11.23q0-1.55-.25-3.04l9.77 9.09c.37.35.23.97-.26 1.12" />
      <path d="m54.5 15.64-4.84 12.38a18.3 18.3 0 0 0-8.78-11.33l12.9-1.95a.66.66 0 0 1 .72.9" />
      <path d="M32.01 54.92a4.9 4.9 0 0 0-4.87 4.88h9.75a4.9 4.9 0 0 0-4.87-4.88" />
      <path d="M49.84 46.91a4.9 4.9 0 0 0 .77 6.87l6.08-7.64a4.87 4.87 0 0 0-6.86.77Z" />
      <path d="M53.83 28.01a4.87 4.87 0 0 0 5.84 3.68l-2.17-9.54a4.9 4.9 0 0 0-3.67 5.86" />
      <path d="M41.87 13.06a4.87 4.87 0 0 0 6.5-2.28L39.6 6.53a4.9 4.9 0 0 0 2.28 6.53Z" />
      <path d="M21.93 13.06a4.9 4.9 0 0 0 2.28-6.53l-8.79 4.25a4.87 4.87 0 0 0 6.51 2.28" />
      <path d="M10.32 28.01a4.9 4.9 0 0 0-3.67-5.85l-2.17 9.53a4.87 4.87 0 0 0 5.84-3.68" />
      <path d="m8.02 46.14 6.08 7.64a4.9 4.9 0 0 0 .77-6.87 4.87 4.87 0 0 0-6.85-.77" />
    </>
  ),
  { fill: '#E84125' },
);

/** Helius node icon (monochrome). */
export const HeliusMono = /* @__PURE__ */ createIcon(
  'HeliusMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M39.11 15.83a18 18 0 0 0-7.1-1.44c-2.52 0-4.91.51-7.1 1.44L31.43 4.5a.66.66 0 0 1 1.15 0z" />
      <path d="M23.18 16.67A18.3 18.3 0 0 0 14.38 28L9.51 15.62a.66.66 0 0 1 .72-.9z" />
      <path d="M17.65 43.97 4.5 39.89a.67.67 0 0 1-.26-1.12l9.78-9.1a19 19 0 0 0-.25 3.01c0 4.26 1.46 8.18 3.9 11.29Z" />
      <path d="M31.74 50.97 20.2 58.85a.66.66 0 0 1-1.03-.5l-1.03-13.8a18.2 18.2 0 0 0 13.6 6.41" />
      <path d="m45.85 44.6-1.03 13.74a.67.67 0 0 1-.7.6 1 1 0 0 1-.33-.1l-11.52-7.87a18.2 18.2 0 0 0 13.58-6.36Z" />
      <path d="m59.52 39.85-13.1 4.06a18.2 18.2 0 0 0 3.84-11.23q0-1.55-.25-3.04l9.77 9.09c.37.35.23.97-.26 1.12" />
      <path d="m54.5 15.64-4.84 12.38a18.3 18.3 0 0 0-8.78-11.33l12.9-1.95a.66.66 0 0 1 .72.9" />
      <path d="M32.01 54.92a4.9 4.9 0 0 0-4.87 4.88h9.75a4.9 4.9 0 0 0-4.87-4.88" />
      <path d="M49.84 46.91a4.9 4.9 0 0 0 .77 6.87l6.08-7.64a4.87 4.87 0 0 0-6.86.77Z" />
      <path d="M53.83 28.01a4.87 4.87 0 0 0 5.84 3.68l-2.17-9.54a4.9 4.9 0 0 0-3.67 5.86" />
      <path d="M41.87 13.06a4.87 4.87 0 0 0 6.5-2.28L39.6 6.53a4.9 4.9 0 0 0 2.28 6.53Z" />
      <path d="M21.93 13.06a4.9 4.9 0 0 0 2.28-6.53l-8.79 4.25a4.87 4.87 0 0 0 6.51 2.28" />
      <path d="M10.32 28.01a4.9 4.9 0 0 0-3.67-5.85l-2.17 9.53a4.87 4.87 0 0 0 5.84-3.68" />
      <path d="m8.02 46.14 6.08 7.64a4.9 4.9 0 0 0 .77-6.87 4.87 4.87 0 0 0-6.85-.77" />
    </>
  ),
  { fill: 'currentColor' },
);
