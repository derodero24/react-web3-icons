/**
 * Names of all deprecated icon exports in this package.
 *
 * Use this to filter deprecated aliases from icon lists without maintaining
 * a separate copy in your app.
 *
 * @example
 * ```ts
 * import * as icons from 'react-web3-icons';
 * import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';
 *
 * // Filter to active icon components (excludes deprecated aliases and non-icon exports)
 * const activeIconNames = Object.entries(icons)
 *   .filter(([name, value]) => typeof value === 'function' && !DEPRECATED_ICON_NAMES.has(name))
 *   .map(([name]) => name);
 * ```
 */
export const DEPRECATED_ICON_NAMES: ReadonlySet<string> = new Set([
  // Matic -> Pol (Polygon rebranded)
  'Matic',
  'MaticCircle',
  'MaticMono',
  'MaticCircleMono',
  // GnosisSafe -> Safe (Safe rebranded)
  'GnosisSafe',
  'GnosisSafeMono',
]);
