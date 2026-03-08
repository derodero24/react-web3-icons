import { createIcon } from '../utils';
import { SAFE_PATH } from '../wallet/safe-path';

const safeProtocolContent = () => <path d={SAFE_PATH} />;

export const SafeProtocol = createIcon(
  'SafeProtocol',
  '126.88 145.93 32.08 33.07',
  safeProtocolContent,
  '#000',
);

export const SafeProtocolMono = createIcon(
  'SafeProtocolMono',
  '126.88 145.93 32.08 33.07',
  safeProtocolContent,
  'currentColor',
);
