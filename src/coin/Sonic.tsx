// Source: re-export of Sonic — see src/chain/Sonic.tsx
// Lookup keys: ticker FTM resolves to Sonic, not to the deprecated Ftm export, because FTM was upgraded 1:1 to S (issue #787).
export {
  Sonic,
  SonicCircle,
  SonicCircleMono,
  SonicMono,
} from '../chain/Sonic';
