import { Ethereum, EthereumMono } from '../chain/Ethereum';

import type { IconProps } from '../lib';

export function Eth(props: IconProps) {
  return <Ethereum {...props} />;
}
export function EthMono(props: IconProps) {
  return <EthereumMono {...props} />;
}
