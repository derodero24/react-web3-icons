import { createIcon } from '../utils';

// Source: legacy artwork of unidentified origin (not an official Paxos or Binance file)
// Legacy artwork: no matching official or third-party source was identified
// BUSD is discontinued: Paxos no longer mints it (https://paxos.com/busd/) and Binance ended support in December 2023; deprecation is tracked in #815
/** @deprecated Paxos stopped minting BUSD in February 2023 and Binance ended support in December 2023. */
export const Busd = /* @__PURE__ */ createIcon(
  'Busd',
  '0 0 64 64',
  () => (
    <path d="m32 4 6.92 7.08L21.5 28.5l-6.92-6.92zm10.5 10.5 6.92 7.08L21.5 49.5l-6.92-6.92zM11 25l6.92 7.08L11 39l-6.92-6.92zm42 0 6.92 7.08L32 60l-6.92-6.92z" />
  ),
  { fill: '#f0b90b' },
);

/** @deprecated Paxos stopped minting BUSD in February 2023 and Binance ended support in December 2023. */
export const BusdMono = /* @__PURE__ */ createIcon(
  'BusdMono',
  '0 0 64 64',
  () => (
    <path d="m32 4 6.92 7.08L21.5 28.5l-6.92-6.92zm10.5 10.5 6.92 7.08L21.5 49.5l-6.92-6.92zM11 25l6.92 7.08L11 39l-6.92-6.92zm42 0 6.92 7.08L32 60l-6.92-6.92z" />
  ),
  { fill: 'currentColor' },
);
