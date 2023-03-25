import { Bitcoin, Bitcoin2, BitcoinMono, BitcoinMono2 } from '../chain/Bitcoin';

import type { IconProps } from '../lib';

export function Btc(props: IconProps) {
  return <Bitcoin {...props} />;
}
export function Btc2(props: IconProps) {
  return <Bitcoin2 {...props} />;
}
export function BtcMono(props: IconProps) {
  return <BitcoinMono {...props} />;
}
export function BtcMono2(props: IconProps) {
  return <BitcoinMono2 {...props} />;
}
