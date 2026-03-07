import type { SVGProps } from 'react';
import type * as bridge from '../bridge';
import type * as chain from '../chain';
import type * as coin from '../coin';
import type * as defi from '../defi';
import type * as devtool from '../devtool';
import type * as dex from '../dex';
import type * as domain from '../domain';
import type * as exchange from '../exchange';
import type * as explorer from '../explorer';
import type * as marketplace from '../marketplace';
import type * as node from '../node';
import type * as portfolio from '../portfolio';
import type * as storage from '../storage';
import type * as tracker from '../tracker';
import type * as wallet from '../wallet';

type AllIconModules = typeof bridge &
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
 * Union type of all exported icon component names.
 * Derived automatically from category exports — stays in sync as icons are added.
 *
 * @example
 * ```tsx
 * import type { IconName } from 'react-web3-icons';
 * import * as allIcons from 'react-web3-icons';
 *
 * function DynamicIcon({ name }: { name: IconName }) {
 *   const Icon = allIcons[name];
 *   return <Icon />;
 * }
 * ```
 */
export type IconName = keyof AllIconModules;

/**
 * Props accepted by all icon components.
 * Extends all standard SVG attributes (`fill`, `stroke`, `onClick`, etc.).
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Accessible label rendered as a `<title>` element inside the SVG. When provided, the icon is no longer treated as decorative. */
  title?: string;
  /** ID applied to the `<title>` element. When provided together with `title`, `aria-labelledby` is automatically set to this value on the `<svg>`. */
  titleId?: string;
  /**
   * Shorthand for both `width` and `height`. Defaults to `"1em"` so the icon scales with the surrounding font size.
   * Overridden by explicit `width` or `height` props.
   */
  size?: string | number;
}

export { createIcon } from './createIcon';
export { IconContext, type IconContextValue } from './IconContext';
