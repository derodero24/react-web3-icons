import { createIcon } from '../utils';

// Source: https://liquity.org (official brand)
// Liquity V2 logo: light-blue circle + indigo column/arc overlay
/** Liquity DeFi icon (colored). */
export const Liquity = /* @__PURE__ */ createIcon(
  'Liquity',
  '0 0 40 40',
  () => (
    <>
      <path
        fill="#95CBF3"
        d="M40 20c0 11.047-8.955 20-20 20S0 31.047 0 20C0 8.955 8.955 0 20 0s20 8.955 20 20"
      />
      <path
        fill="#405AE5"
        d="M0 20c0 8.708 5.567 16.117 13.333 18.862V1.138C5.567 3.883 0 11.292 0 20m38.87-6.642a24 24 0 0 0-1.092-.025c-13.5 0-24.445 10.945-24.445 24.445q0 .55.025 1.092A19.9 19.9 0 0 0 20 40c11.045 0 20-8.953 20-20a20 20 0 0 0-1.13-6.642"
      />
    </>
  ),
  {},
);

/** Liquity DeFi icon (monochrome). */
export const LiquityMono = /* @__PURE__ */ createIcon(
  'LiquityMono',
  '0 0 40 40',
  () => (
    <>
      <path
        fillRule="evenodd"
        d="M0 20a20 20 0 1 0 40 0 20 20 0 1 0-40 0m.9 0a19.1 19.1 0 1 0 38.2 0A19.1 19.1 0 1 0 .9 20"
      />
      <path d="M0 20c0 8.708 5.567 16.117 13.333 18.862V1.138C5.567 3.883 0 11.292 0 20m38.87-6.642a24 24 0 0 0-1.092-.025c-13.5 0-24.445 10.945-24.445 24.445q0 .55.025 1.092A19.9 19.9 0 0 0 20 40c11.045 0 20-8.953 20-20a20 20 0 0 0-1.13-6.642" />
    </>
  ),
  { fill: 'currentColor' },
);
