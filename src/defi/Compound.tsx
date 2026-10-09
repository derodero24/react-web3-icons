import { createIcon } from '../utils';

// Source: https://framerusercontent.com/images/MHkmyvXQcMf4GVNNuCKEJulrPw.svg (header logo of the official site https://www.compound.xyz: the #00D395 mark of the lockup)
// Source: https://www.compound.xyz/redirect (compound.finance now redirects here: the same mark as an inline <svg viewBox="0 0 25 31">)
// Compound: the #00D395 mark of three stacked bars, uniformly scaled onto the 64 grid. It matches the mark of the official compound.xyz header logo (silhouette IoU 0.996, same #00D395) and the inline mark on the compound.finance move notice (IoU 0.995); checked 2026-10-09. The old note cited compound-mark.svg in compound-finance/compound-components, which can no longer be found
// Mono: the same path in currentColor
/** Compound DeFi icon (colored). */
export const Compound = /* @__PURE__ */ createIcon(
  'Compound',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.3 47.64a4.7 4.7 0 0 1-2.25-4v-9.1q0-.55.27-1a1.96 1.96 0 0 1 2.68-.7l20.6 12c1.2.7 1.94 1.99 1.94 3.38v9.44q0 .66-.34 1.23a2.35 2.35 0 0 1-3.24.77zM43 30.34c1.2.71 1.94 2 1.94 3.39v19.15c0 .57-.3 1.09-.8 1.36l-4.5 2.54-.18.07V46.22c0-1.38-.73-2.65-1.91-3.36l-18.08-10.8v-12q0-.54.27-1a1.96 1.96 0 0 1 2.68-.7zm9-14.14c1.21.7 1.96 2 1.96 3.4v27.96c0 .58-.32 1.1-.83 1.38l-4.27 2.3V31.77c0-1.38-.72-2.65-1.9-3.36L28.47 17.34V5.96a2 2 0 0 1 .27-.99 1.96 1.96 0 0 1 2.68-.7z"
      clipRule="evenodd"
    />
  ),
  { fill: '#00D395' },
);

/** Compound DeFi icon (monochrome). */
export const CompoundMono = /* @__PURE__ */ createIcon(
  'CompoundMono',
  '0 0 64 64',
  () => (
    <path
      fillRule="evenodd"
      d="M12.3 47.64a4.7 4.7 0 0 1-2.25-4v-9.1q0-.55.27-1a1.96 1.96 0 0 1 2.68-.7l20.6 12c1.2.7 1.94 1.99 1.94 3.38v9.44q0 .66-.34 1.23a2.35 2.35 0 0 1-3.24.77zM43 30.34c1.2.71 1.94 2 1.94 3.39v19.15c0 .57-.3 1.09-.8 1.36l-4.5 2.54-.18.07V46.22c0-1.38-.73-2.65-1.91-3.36l-18.08-10.8v-12q0-.54.27-1a1.96 1.96 0 0 1 2.68-.7zm9-14.14c1.21.7 1.96 2 1.96 3.4v27.96c0 .58-.32 1.1-.83 1.38l-4.27 2.3V31.77c0-1.38-.72-2.65-1.9-3.36L28.47 17.34V5.96a2 2 0 0 1 .27-.99 1.96 1.96 0 0 1 2.68-.7z"
      clipRule="evenodd"
    />
  ),
  { fill: 'currentColor' },
);
