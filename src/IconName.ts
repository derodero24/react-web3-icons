import type * as bridge from './bridge';
import type * as chain from './chain';
import type * as coin from './coin';
import type * as defi from './defi';
import type * as devtool from './devtool';
import type * as dex from './dex';
import type * as domain from './domain';
import type * as exchange from './exchange';
import type * as explorer from './explorer';
import type * as marketplace from './marketplace';
import type * as node from './node';
import type * as portfolio from './portfolio';
import type * as storage from './storage';
import type * as tracker from './tracker';
import type * as wallet from './wallet';

type AllIconExports = typeof bridge &
  typeof chain &
  typeof coin &
  typeof defi &
  typeof devtool &
  typeof dex &
  typeof domain &
  typeof exchange &
  typeof explorer &
  typeof marketplace &
  typeof node &
  typeof portfolio &
  typeof storage &
  typeof tracker &
  typeof wallet;

/**
 * Union of all icon component names exported by react-web3-icons.
 * Includes colored, monochrome (Mono), and all other variants.
 *
 * @example
 * ```tsx
 * import type { IconName } from 'react-web3-icons';
 * import * as icons from 'react-web3-icons';
 *
 * function Icon({ name, ...props }: { name: IconName } & React.SVGProps<SVGSVGElement>) {
 *   const Component = icons[name];
 *   return <Component {...props} />;
 * }
 * ```
 */
export type IconName = keyof AllIconExports;
