import { createIcon } from '../utils';

// Source: https://raw.githubusercontent.com/balancer/brand-assets/main/logo/no-container/logo-balancer-black.svg
// Colored: the official brand-assets logo-balancer-black.svg. The current Balancer mark is monochrome (the brand-assets repo ships black and white only, and the v3 app draws it in currentColor); the old #68ACFF→#4851FF gradient was the retired v2 artwork
// Mono: the same three paths in currentColor
/** Balancer DeFi icon (colored). */
export const Balancer = /* @__PURE__ */ createIcon(
  'Balancer',
  '0 0 64 64',
  () => (
    <>
      <path d="M48.8 14.88c0 3.1-7.52 5.61-16.8 5.61s-16.8-2.51-16.8-5.61S22.72 9.26 32 9.26s16.8 2.52 16.8 5.62" />
      <path d="M60 45.38c0-3.82-6.85-7.1-16.68-8.56l-.25.05c-3.32.65-7.08 1.02-11.07 1.02-4.1 0-7.95-.38-11.32-1.07C10.85 38.27 4 41.56 4 45.38c0 5.17 12.54 9.36 28 9.36s28-4.2 28-9.36" />
      <path d="M54.4 28.54c0-3.3-6.42-6.11-15.31-7.1l-.23.03c-2.12.34-4.44.52-6.86.52q-3.78-.01-7.09-.55c-8.9.99-15.31 3.8-15.31 7.1 0 4.13 10.03 7.48 22.4 7.48s22.4-3.35 22.4-7.48" />
    </>
  ),
  { fill: '#000' },
);

/** Balancer DeFi icon (monochrome). */
export const BalancerMono = /* @__PURE__ */ createIcon(
  'BalancerMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M48.8 14.88c0 3.1-7.52 5.61-16.8 5.61s-16.8-2.51-16.8-5.61S22.72 9.26 32 9.26s16.8 2.52 16.8 5.62" />
      <path d="M60 45.38c0-3.82-6.85-7.1-16.68-8.56l-.25.05c-3.32.65-7.08 1.02-11.07 1.02-4.1 0-7.95-.38-11.32-1.07C10.85 38.27 4 41.56 4 45.38c0 5.17 12.54 9.36 28 9.36s28-4.2 28-9.36" />
      <path d="M54.4 28.54c0-3.3-6.42-6.11-15.31-7.1l-.23.03c-2.12.34-4.44.52-6.86.52q-3.78-.01-7.09-.55c-8.9.99-15.31 3.8-15.31 7.1 0 4.13 10.03 7.48 22.4 7.48s22.4-3.35 22.4-7.48" />
    </>
  ),
  { fill: 'currentColor' },
);
