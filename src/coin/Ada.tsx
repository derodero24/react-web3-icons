import { Cardano, Cardano2, CardanoMono } from '../chain/Cardano';

import type { IconProps } from '../lib';

export function Ada(props: IconProps) {
  return <Cardano {...props} />;
}
export function Ada2(props: IconProps) {
  return <Cardano2 {...props} />;
}
export function AdaMono(props: IconProps) {
  return <CardanoMono {...props} />;
}
