import type { ComponentType } from 'react';
import { useMemo } from 'react';

import * as iconModules from 'react-web3-icons';
import { groupIcons } from '../utils/groupIcons';

type Variant = 'all' | 'colored' | 'mono';
type IconComponent = ComponentType<{ className?: string }>;

const icons = Object.fromEntries(
  Object.entries(iconModules).filter(
    ([, v]) =>
      typeof v === 'function' ||
      (typeof v === 'object' && v !== null && '$$typeof' in v),
  ),
) as Record<string, IconComponent>;

// Common Web3 ticker symbols and aliases mapped to icon base names.
// Matched before substring search so e.g. "eth" finds "Ethereum" directly.
const SEARCH_ALIASES: Record<string, string[]> = {
  '1inch': ['Oneinch'],
  aave: ['Aave'],
  ada: ['Cardano'],
  algo: ['Algorand'],
  arb: ['Arbitrum'],
  arb1: ['ArbitrumOne'],
  arw: ['Arweave'],
  astr: ['Astar'],
  avax: ['Avalanche'],
  bnb: ['Binance', 'BinanceSmartChain', 'Bnb'],
  bsc: ['BinanceSmartChain'],
  btc: ['Bitcoin'],
  cake: ['PancakeSwap'],
  dai: ['Dai'],
  doge: ['Doge'],
  dot: ['Polkadot'],
  dydx: ['Dydx'],
  eigen: ['EigenLayer'],
  eth: ['Ethereum'],
  ftm: ['Fantom'],
  gnosis: ['Safe'],
  ldo: ['Lido'],
  link: ['Chainlink'],
  ltc: ['Ltc'],
  lz: ['LayerZero'],
  matic: ['Polygon'],
  mkr: ['Maker'],
  near: ['Near'],
  okb: ['Okx'],
  op: ['Optimism'],
  pol: ['Polygon'],
  ray: ['Raydium'],
  shib: ['Shib'],
  snx: ['Synthetix'],
  sol: ['Solana'],
  stg: ['Stargate'],
  stx: ['Stacks'],
  sushi: ['SushiSwap'],
  ton: ['Ton'],
  tron: ['Tron'],
  uni: ['Uniswap'],
  usdc: ['Usdc'],
  usdt: ['Usdt'],
  wbtc: ['Wbtc'],
  wc: ['WalletConnect'],
  xrp: ['Xrp'],
  xlm: ['Stellar'],
  zrx: ['ZeroEx'],
};

export interface DisplayGroup {
  /** Base name for this group (e.g. "Ethereum") */
  base: string;
  /** All variant names in display order (primary first) */
  variants: string[];
  /** The variant currently shown on the card given the active filter */
  activeVariant: string;
  /** All variant components keyed by name */
  components: Record<string, IconComponent>;
}

/**
 * Pick the best variant to display given the active filter:
 * - mono:    prefer the `*Mono` suffix variant (exact base mono first, then any)
 * - colored: prefer the non-Mono variant (base name itself, or first non-Mono)
 * - all:     prefer the base name variant (primary)
 */
function pickActive(
  variants: string[],
  base: string,
  variant: Variant,
): string {
  if (variant === 'mono') {
    // Prefer the exact base mono (e.g. `EthereumMono`), then any `*Mono`
    return (
      variants.find(v => v === `${base}Mono`) ??
      variants.find(v => v.endsWith('Mono')) ??
      variants[0] ??
      ''
    );
  }
  if (variant === 'colored') {
    const colored = variants.find(v => !v.endsWith('Mono'));
    return colored ?? variants[0] ?? '';
  }
  // 'all': prefer the exact base variant, else first
  return variants.find(v => v === base) ?? variants[0] ?? '';
}

function groupMatchesSearch(
  base: string,
  variants: string[],
  normalizedKeyword: string,
): boolean {
  if (!normalizedKeyword) return true;
  // Check alias match: alias → list of base names; base must start with one of them
  const aliasTargets = SEARCH_ALIASES[normalizedKeyword];
  if (aliasTargets?.some(target => base.startsWith(target))) return true;
  // Fallback: substring match on base or any variant name
  return (
    base.toLowerCase().includes(normalizedKeyword) ||
    variants.some(v => v.toLowerCase().includes(normalizedKeyword))
  );
}

export function useIconFilter(
  categoryIcons: string[],
  keyword: string,
  variant: Variant,
): DisplayGroup[] {
  return useMemo(() => {
    const normalizedKeyword = keyword.toLowerCase().trim();

    // Build groups from ALL category icons (before variant/keyword filtering)
    const groups = groupIcons(categoryIcons);

    return groups
      .filter(({ variants }) => {
        // Variant filter: group must have at least one matching variant
        if (variant === 'mono') return variants.some(v => v.endsWith('Mono'));
        if (variant === 'colored')
          return variants.some(v => !v.endsWith('Mono'));
        return true;
      })
      .filter(({ base, variants }) =>
        groupMatchesSearch(base, variants, normalizedKeyword),
      )
      .map(({ base, variants }) => {
        const activeVariant = pickActive(variants, base, variant);
        const components = Object.fromEntries(
          variants.map(v => [v, icons[v] as IconComponent]),
        );
        return { base, variants, activeVariant, components };
      });
  }, [categoryIcons, keyword, variant]);
}
