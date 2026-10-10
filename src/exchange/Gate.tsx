import { createIcon } from '../utils';

// Source: https://www.gate.com (official site; walled, see notes)
// Not verified (checked 2026-10-09): gate.com, gate.com/brand, gate.io and gate.io/brand answer automated requests with 403, so no official logo file could be read (only the raster favicon.ico loads). The artwork predates the source policy and is unchanged
// Gate.io rebranded to Gate (gate.com) in 2025 with the same mark, so the artwork carries over from the Gateio unit
/** Gate exchange icon (colored). */
export const Gate = /* @__PURE__ */ createIcon(
  'Gate',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#2354e6"
        d="M32 47.4c-8.5 0-15.4-6.9-15.4-15.4S23.5 16.6 32 16.6V4C16.54 4 4 16.54 4 32s12.54 28 28 28 28-12.54 28-28H47.4c0 8.5-6.9 15.4-15.4 15.4"
      />
      <path fill="#17e6a1" d="M32 32h15.4V16.6H32z" />
    </>
  ),
  {},
);

/** Gate exchange icon (monochrome). */
export const GateMono = /* @__PURE__ */ createIcon(
  'GateMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 47.4c-8.5 0-15.4-6.9-15.4-15.4S23.5 16.6 32 16.6V4C16.54 4 4 16.54 4 32s12.54 28 28 28 28-12.54 28-28H47.4c0 8.5-6.9 15.4-15.4 15.4" />
      <path d="M32 32h15.4V16.6H32z" />
    </>
  ),
  { fill: 'currentColor' },
);
