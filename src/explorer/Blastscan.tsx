import { createIcon } from '../utils';

// Source: re-export of Blast (default and Mono) — see src/chain/Blast.tsx
// Source: https://blastscan.io/assets/blast/images/svg/logos/chain-dark.svg
// Source: https://blastscan.io/assets/blast/images/svg/logos/chain-light.svg (BlastscanLight)
// Blastscan uses the Blast L2 geometric "BLAST" wordmark as its brandmark
// Blastscan and BlastscanMono re-export Blast and BlastMono: the Blastscan mark (chain-dark.svg) is the Blast mark, and the two units' files differed by at most 0.03 units, so the artwork now lives in one place. BlastscanLight (chain-light.svg, the mark in black) stays its own artwork
export {
  Blast as Blastscan,
  BlastMono as BlastscanMono,
} from '../chain/Blast';

/** Blastscan Light explorer icon (colored). */
export const BlastscanLight = /* @__PURE__ */ createIcon(
  'BlastscanLight',
  '0 0 64 64',
  () => (
    <>
      <path d="m48.1 31.67 8.83-4.4 3.05-9.34-6.09-4.43H13.37L4 20.46h47.63L49.1 28.3H30l-1.84 5.73h19.1L41.9 50.5l8.95-4.43 3.2-9.88-6-4.4z" />
      <path d="m17.47 43.42 5.51-17.17-6.12-4.58L7.67 50.5H41.9l2.29-7.08z" />
    </>
  ),
  { fill: '#000' },
);
