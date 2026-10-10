import { createIcon } from '../utils';

// Source: https://cdn.prod.website-files.com/618b0aafa4afde65f2fe38fe/65dbdd6c87cf20baca9ac049_stacks-logo-navbar.svg (the symbol in the stacks.co navbar)
// Source: https://www.stacks.co/brand (redirects to the Stacks Brand 2024 Figma file)
// Default: the official stacks.co navbar symbol (#141414, fill-rule=evenodd), path unchanged; it replaces a near-identical redraw stretched to a square box
// Mono: the same path in currentColor
// brandColor: the symbol is near-black, so the manifest uses the 2024 brand orange #FC6432 (the stacks.co favicon and accent); the coin Stx re-exports these components
/** Stacks chain icon (colored). */
export const Stacks = /* @__PURE__ */ createIcon(
  'Stacks',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M41.89 22.35a1.1 1.1 0 0 1 .06-1.2L52.07 6.1c.28-.42.3-.94.08-1.36a1.4 1.4 0 0 0-1.2-.7h-3.93a1.4 1.4 0 0 0-1.1.62l-11.88 17.6a1.7 1.7 0 0 1-1.33.73h-1.5a1.7 1.7 0 0 1-1.33-.72L18.12 4.63a1.4 1.4 0 0 0-1.1-.61h-3.97q-.8.03-1.2.72a1.4 1.4 0 0 0 .06 1.39l10.15 15.06c.25.33.28.8.06 1.16a1.1 1.1 0 0 1-1 .61H5.59a1.4 1.4 0 0 0-1.33 1.33v3.27c0 .78.6 1.34 1.33 1.34h52.8c.78 0 1.33-.61 1.33-1.34v-3.24a1.4 1.4 0 0 0-1.16-1.33H42.89a1.1 1.1 0 0 1-1-.61M29.91 41.74l-11.84 17.6a1.4 1.4 0 0 1-1.11.62h-3.94a1.4 1.4 0 0 1-1.2-.7 1.4 1.4 0 0 1 .06-1.38l10.13-15.03a1.1 1.1 0 0 0 .05-1.17 1.1 1.1 0 0 0-1-.6H5.6a1.4 1.4 0 0 1-1.33-1.37v-3.27c0-.72.58-1.33 1.33-1.33h52.8c.72 0 1.33.55 1.33 1.33v3.27c0 .75-.55 1.36-1.33 1.36H42.92q-.72 0-1 .61-.34.64.05 1.14L52.12 57.9q.36.63.06 1.38a1.4 1.4 0 0 1-1.2.7h-3.93a1.4 1.4 0 0 1-1.11-.56L34.1 41.79a1.7 1.7 0 0 0-1.33-.7H31.3a1.7 1.7 0 0 0-1.36.7z"
    />
  ),
  { fill: '#141414' },
);

/** Stacks chain icon (monochrome). */
export const StacksMono = /* @__PURE__ */ createIcon(
  'StacksMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M41.89 22.35a1.1 1.1 0 0 1 .06-1.2L52.07 6.1c.28-.42.3-.94.08-1.36a1.4 1.4 0 0 0-1.2-.7h-3.93a1.4 1.4 0 0 0-1.1.62l-11.88 17.6a1.7 1.7 0 0 1-1.33.73h-1.5a1.7 1.7 0 0 1-1.33-.72L18.12 4.63a1.4 1.4 0 0 0-1.1-.61h-3.97q-.8.03-1.2.72a1.4 1.4 0 0 0 .06 1.39l10.15 15.06c.25.33.28.8.06 1.16a1.1 1.1 0 0 1-1 .61H5.59a1.4 1.4 0 0 0-1.33 1.33v3.27c0 .78.6 1.34 1.33 1.34h52.8c.78 0 1.33-.61 1.33-1.34v-3.24a1.4 1.4 0 0 0-1.16-1.33H42.89a1.1 1.1 0 0 1-1-.61M29.91 41.74l-11.84 17.6a1.4 1.4 0 0 1-1.11.62h-3.94a1.4 1.4 0 0 1-1.2-.7 1.4 1.4 0 0 1 .06-1.38l10.13-15.03a1.1 1.1 0 0 0 .05-1.17 1.1 1.1 0 0 0-1-.6H5.6a1.4 1.4 0 0 1-1.33-1.37v-3.27c0-.72.58-1.33 1.33-1.33h52.8c.72 0 1.33.55 1.33 1.33v3.27c0 .75-.55 1.36-1.33 1.36H42.92q-.72 0-1 .61-.34.64.05 1.14L52.12 57.9q.36.63.06 1.38a1.4 1.4 0 0 1-1.2.7h-3.93a1.4 1.4 0 0 1-1.11-.56L34.1 41.79a1.7 1.7 0 0 0-1.33-.7H31.3a1.7 1.7 0 0 0-1.36.7z"
    />
  ),
  { fill: 'currentColor' },
);
