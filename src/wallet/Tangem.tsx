import { createIcon } from '../utils';

// Source: https://tangem.com (official site; the header draws the logo inline as the tangem-logo symbol, in currentColor)
// Not verified (checked 2026-10-09): the three-part mark matches the symbol of tangem.com's inline header logo in structure, but its proportions differ slightly (in the official symbol the gap under the bar is larger and the right leg starts higher; alpha IoU 0.93), and the site sets no colour of its own (currentColor), so #1E1E1E is unverified. tangem.com has no brand or press page (/en/press/, /en/media-kit/ and /en/brand/ return 404). The artwork, which predates the source policy, is unchanged
/** Tangem wallet icon (colored). */
export const Tangem = /* @__PURE__ */ createIcon(
  'Tangem',
  '0 0 64 64',
  () => (
    <>
      <path d="M43.78 4.01H20.22c-3.72 0-5.57 0-7 .72a6.6 6.6 0 0 0-2.9 2.9c-.72 1.42-.72 3.28-.72 7v3.94h44.8v-3.94c0-3.72 0-5.58-.73-7a6.6 6.6 0 0 0-2.9-2.9c-1.42-.72-3.27-.72-7-.72" />
      <path d="M39.46 30.88H54.4v18.5c0 3.72 0 5.58-.72 7a6.6 6.6 0 0 1-2.9 2.9c-1.42.72-3.28.72-7 .72h-4.3z" />
      <path d="M9.6 30.88h14.93V60h-4.3c-3.73 0-5.58 0-7-.73a6.6 6.6 0 0 1-2.9-2.9c-.73-1.41-.73-3.27-.73-6.99z" />
    </>
  ),
  { fill: '#1E1E1E' },
);

/** Tangem wallet icon (monochrome). */
export const TangemMono = /* @__PURE__ */ createIcon(
  'TangemMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M43.78 4.01H20.22c-3.72 0-5.57 0-7 .72a6.6 6.6 0 0 0-2.9 2.9c-.72 1.42-.72 3.28-.72 7v3.94h44.8v-3.94c0-3.72 0-5.58-.73-7a6.6 6.6 0 0 0-2.9-2.9c-1.42-.72-3.27-.72-7-.72" />
      <path d="M39.46 30.88H54.4v18.5c0 3.72 0 5.58-.72 7a6.6 6.6 0 0 1-2.9 2.9c-1.42.72-3.28.72-7 .72h-4.3z" />
      <path d="M9.6 30.88h14.93V60h-4.3c-3.73 0-5.58 0-7-.73a6.6 6.6 0 0 1-2.9-2.9c-.73-1.41-.73-3.27-.73-6.99z" />
    </>
  ),
  { fill: 'currentColor' },
);
