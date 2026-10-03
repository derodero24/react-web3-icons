/**
 * The one normalization every dynamic lookup applies, to the identifier it
 * receives and to the keys of the `react-web3-icons/meta` maps alike:
 * lowercase, then drop whitespace, `.`, `-` and `_`. So `'Arbitrum Nova'`,
 * `'arbitrum_nova'` and `'arbitrum-nova'` all match the key
 * `'arbitrum-nova'`, `'Ether.fi'` matches `'etherfi'`, and `'eth'` matches
 * the ticker `'ETH'`.
 *
 * The icon generator (scripts/build-icons) imports this module too and fails
 * when two keys of one map normalize to the same string, so a normalized
 * identifier never matches more than one icon.
 *
 * This module has no imports so that Node can load it from the generator.
 */
export function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[\s._-]+/g, '');
}
