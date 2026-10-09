import { createIcon } from '../utils';

// Source: https://storage.googleapis.com/unstoppable-client-assets/images/favicon/icon.svg (the site icon linked from https://unstoppabledomains.com; the site header logo draws the same mark beside the wordmark)
// Default: icon.svg's two paths unchanged, a #00C9FF stripe behind a #0D67FE U, placed on the 64 grid (the file's dark-scheme style, which turns the U #FFFCF0, is left out). It replaces a redraw of the mark about 1.4% wider than the file
// Mono: derived mechanically from icon.svg, as no one-colour version is published: the U in currentColor, and the stripe, which passes behind it, cut back from the U by a 1.2-unit seam
// unstoppabledomains.com/brand and /press return 404; no brand kit was found
/** Unstoppable Domains domain icon (colored). */
export const UnstoppableDomains = /* @__PURE__ */ createIcon(
  'UnstoppableDomains',
  '0 0 64 64',
  () => (
    <>
      <path fill="#00C9FF" d="M59.98 7.43v19.3L3.99 49.55z" />
      <path
        fill="#0D67FE"
        d="M49.48 6.55V39.9c0 9.7-7.83 17.55-17.5 17.55s-17.5-7.86-17.5-17.55V25.86l10.5-5.8V39.9a6 6 0 0 0 1.8 4.34 6 6 0 0 0 4.33 1.8c1.62 0 3.18-.65 4.33-1.8a6.2 6.2 0 0 0 1.8-4.34V13.3z"
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
    <path d="M49.48 6.55V39.9c0 9.7-7.83 17.55-17.5 17.55s-17.5-7.86-17.5-17.55V25.86l10.5-5.8V39.9a6 6 0 0 0 1.8 4.34 6 6 0 0 0 4.33 1.8c1.62 0 3.18-.65 4.33-1.8a6.2 6.2 0 0 0 1.8-4.34V13.3zm10.5.88v19.3l-9.3 3.79v-16.1zM3.99 49.55l9.48-7.13q.23 1.53.68 2.99zm22.19-9.64v-7.05l9.86-7.42v11.05l-9.85 4.01q-.03-.29-.01-.59" />
  ),
  { fill: 'currentColor' },
);
