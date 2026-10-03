import { createIcon } from '../utils';

// Source: https://polkadot.network
/** Polkadot chain icon (colored). */
export const Polkadot = /* @__PURE__ */ createIcon(
  'Polkadot',
  '0 0 64 64',
  () => (
    <g transform="translate(-7.7 -7.67)scale(.0397)">
      <ellipse cx="1000" cy="441.78" rx="254.27" ry="147.95" />
      <ellipse cx="1000" cy="1556.15" rx="254.27" ry="147.95" />
      <ellipse
        cx="517.47"
        cy="720.38"
        rx="254.27"
        ry="147.95"
        transform="rotate(-60 517.47 720.38)"
      />
      <ellipse
        cx="1482.53"
        cy="1277.56"
        rx="254.27"
        ry="147.95"
        transform="rotate(-60 1482.53 1277.56)"
      />
      <ellipse
        cx="517.47"
        cy="1277.56"
        rx="147.95"
        ry="254.27"
        transform="rotate(-30 517.46 1277.55)"
      />
      <ellipse
        cx="1482.53"
        cy="720.38"
        rx="147.95"
        ry="254.27"
        transform="rotate(-30 1482.53 720.38)"
      />
    </g>
  ),
  { fill: '#e6007a' },
);

/** Polkadot chain icon (monochrome). */
export const PolkadotMono = /* @__PURE__ */ createIcon(
  'PolkadotMono',
  '0 0 64 64',
  () => (
    <g transform="translate(-7.7 -7.67)scale(.0397)">
      <ellipse cx="1000" cy="441.78" rx="254.27" ry="147.95" />
      <ellipse cx="1000" cy="1556.15" rx="254.27" ry="147.95" />
      <ellipse
        cx="517.47"
        cy="720.38"
        rx="254.27"
        ry="147.95"
        transform="rotate(-60 517.47 720.38)"
      />
      <ellipse
        cx="1482.53"
        cy="1277.56"
        rx="254.27"
        ry="147.95"
        transform="rotate(-60 1482.53 1277.56)"
      />
      <ellipse
        cx="517.47"
        cy="1277.56"
        rx="147.95"
        ry="254.27"
        transform="rotate(-30 517.46 1277.55)"
      />
      <ellipse
        cx="1482.53"
        cy="720.38"
        rx="147.95"
        ry="254.27"
        transform="rotate(-30 1482.53 720.38)"
      />
    </g>
  ),
  { fill: 'currentColor' },
);
