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
 * // Get current (non-deprecated) icon names, excluding non-icon exports
 * const activeIconNames = Object.keys(icons).filter(
 *   name =>
 *     !DEPRECATED_ICON_NAMES.has(name) &&
 *     name !== 'IconContext' &&
 *     name !== 'DEPRECATED_ICON_NAMES',
 * );
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
  // Light -> Inverted (naming clarification)
  'BasescanLight',
  'BscscanLight',
  'BybitLight',
  'EtherscanLight',
  // TofuNFT marketplace shut down permanently in 2024
  'TofuNft',
  'TofuNftMono',
  // Truffle Suite sunset by ConsenSys in September 2023
  'Ganache',
  'GanacheMono',
  'Truffle',
  'TruffleMono',
  'Drizzle',
  'DrizzleMono',
]);
