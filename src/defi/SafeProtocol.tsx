import { createIcon } from '../utils';
import { SAFE_PATH } from '../wallet/safe-path';

const safeProtocolContent = () => <path d={SAFE_PATH} />;

/** Safe Protocol DeFi icon (colored). */
export const SafeProtocol = createIcon(
  'SafeProtocol',
  '126.88 145.93 32.08 33.07',
  safeProtocolContent,
  '#000',
);

/** Safe Protocol DeFi icon (monochrome). */
export const SafeProtocolMono = createIcon(
  'SafeProtocolMono',
  '126.88 145.93 32.08 33.07',
  safeProtocolContent,
  'currentColor',
);
