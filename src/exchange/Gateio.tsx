import { createIcon } from '../utils';

// Source: https://gate.io (official brand)
/** Gateio exchange icon (colored). */
export const Gateio = /* @__PURE__ */ createIcon(
  'Gateio',
  '0 0 64 64',
  () => (
    <>
      <path
        fill="#2354e6"
        d="M32 47.4c-8.505 0-15.4-6.895-15.4-15.4S23.495 16.6 32 16.6V4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.537 28-28H47.4c0 8.505-6.895 15.4-15.4 15.4"
      />
      <path fill="#17e6a1" d="M32 32h15.4V16.6H32z" />
    </>
  ),
  {},
);

/** Gateio exchange icon (monochrome). */
export const GateioMono = /* @__PURE__ */ createIcon(
  'GateioMono',
  '0 0 64 64',
  () => (
    <>
      <path d="M32 47.4c-8.505 0-15.4-6.895-15.4-15.4S23.495 16.6 32 16.6V4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.537 28-28H47.4c0 8.505-6.895 15.4-15.4 15.4" />
      <path d="M32 32h15.4V16.6H32z" />
    </>
  ),
  { fill: 'currentColor' },
);
