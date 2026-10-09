import { createIcon } from '../utils';

// Source: https://storage.googleapis.com/unstoppable-client-assets/images/favicon/icon.svg (the site icon linked from https://unstoppabledomains.com; the site header logo draws the same mark beside the wordmark)
// Default: the Unstoppable Domains mark, a #00C9FF stripe and a #0D67FE U, the colours of icon.svg. The paths are not the file's own: they are a redraw about 1.4% wider than icon.svg (aspect 1.115 against 1.100, IoU 0.991), kept as the difference does not show at icon sizes
// Mono: the stripe passes behind the U, cut back from it by a 1.2-unit seam.
// unstoppabledomains.com/brand and /press return 404; no brand kit was found
/** Unstoppable Domains domain icon (colored). */
export const UnstoppableDomains = /* @__PURE__ */ createIcon(
  'UnstoppableDomains',
  '0 0 64 64',
  () => (
    <>
      <path fill="#00c9ff" d="M60 7.72v19.06L4 49.31z" />
      <path
        fill="#0d67fe"
        d="M49.5 6.89v32.89a17.2 17.2 0 0 1-5.12 12.25 17.6 17.6 0 0 1-24.75 0 17.2 17.2 0 0 1-5.13-12.25V25.92L25 20.2v19.58a6 6 0 0 0 .25 2.54 6 6 0 0 0 1.28 2.21 6 6 0 0 0 2.08 1.51 6.2 6.2 0 0 0 5.04 0q1.2-.53 2.08-1.5A6 6 0 0 0 37 42.31q.39-1.25.25-2.54V13.53z"
      />
    </>
  ),
  {},
);

/** Unstoppable Domains domain icon (monochrome). */
export const UnstoppableDomainsMono = /* @__PURE__ */ createIcon(
  'UnstoppableDomainsMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M49.5 6.89v32.89c0 4.6-1.84 9.02-5.12 12.25-6.86 6.78-17.9 6.78-24.75 0a17.2 17.2 0 0 1-5.13-12.25V25.92L25 20.2v19.58a6 6 0 0 0 .25 2.54 6 6 0 0 0 1.28 2.21 6 6 0 0 0 2.08 1.51 6.2 6.2 0 0 0 5.04 0q1.2-.52 2.08-1.5A6 6 0 0 0 37 42.31a6 6 0 0 0 .25-2.54V13.53zm10.5.83v19.06l-9.3 3.74v-15.9zM4 49.31l9.5-7.05q.21 1.5.68 2.96zm22.2-9.4v-7.09l9.85-7.31v10.9l-9.9 3.99q0-.24.04-.48"
    />
  ),
  { fill: 'currentColor' },
);
