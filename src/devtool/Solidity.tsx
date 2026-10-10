import { createIcon } from '../utils';

// Source: https://github.com/ethereum/solidity/blob/develop/docs/logo.svg (the official logo file of the Solidity repository)
// Source: https://docs.soliditylang.org/en/latest/_static/img/logo.svg (the same file, served as the docs header logo)
// Source: https://docs.soliditylang.org/en/latest/brand-guide.html (Solidity brand guide: logo licence and usage)
// Solidity: the six paths of docs/logo.svg, placed on the 64 grid unchanged, with its root fill #2B247C and path opacities .8/.45/.6. The docs header (light theme) and the www.soliditylang.org header (inline <svg viewBox="0 0 100 160">) draw the same logo; the dark-theme twin logo-dark.svg has the same geometry in #E6E3EC
// SolidityMono: the same six paths in currentColor with the same opacity tiers, as in Solidity's own one-colour logo.svg and logo-dark.svg
// The previous artwork mixed two logo versions: the geometry of the legacy brand-guide file _images/solidity_logo.svg (2016 export, flatter triangles, unfilled black) recoloured to the #2B247C of logo.svg
// The Solidity logo is licensed CC BY 4.0 (brand guide); accessed 2026-10-09
/** Solidity devtool icon (colored). */
export const Solidity = /* @__PURE__ */ createIcon(
  'Solidity',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 19.36 23.15 4.02l-8.86 15.34 8.86 15.33z" opacity=".8" />
      <path d="m32 19.36 8.85-15.34h-17.7l-8.86 15.34z" opacity=".45" />
      <path d="M40.85 4.02h-17.7L32 19.36h17.7z" opacity=".6" />
      <path d="m32 44.64 8.85 15.34 8.86-15.34-8.86-15.33z" opacity=".8" />
      <path d="m32 44.64-8.85 15.34h17.7l8.86-15.34z" opacity=".45" />
      <path d="M23.15 59.98h17.7L32 44.64H14.3z" opacity=".6" />
    </>
  ),
  { fill: '#2B247C' },
);

/** Solidity devtool icon (monochrome). */
export const SolidityMono = /* @__PURE__ */ createIcon(
  'SolidityMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 19.36 23.15 4.02l-8.86 15.34 8.86 15.33z" opacity=".8" />
      <path d="m32 19.36 8.85-15.34h-17.7l-8.86 15.34z" opacity=".45" />
      <path d="M40.85 4.02h-17.7L32 19.36h17.7z" opacity=".6" />
      <path d="m32 44.64 8.85 15.34 8.86-15.34-8.86-15.33z" opacity=".8" />
      <path d="m32 44.64-8.85 15.34h17.7l8.86-15.34z" opacity=".45" />
      <path d="M23.15 59.98h17.7L32 44.64H14.3z" opacity=".6" />
    </>
  ),
  { fill: 'currentColor' },
);
