import type { ComponentType } from 'react';
import { useMemo } from 'react';

import * as iconModules from 'react-web3-icons';

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
  ada: ['Cardano'],
  algo: ['Algorand'],
  arb: ['Arbitrum'],
  arb1: ['ArbitrumOne'],
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
  link: ['Chainlink'],
  ltc: ['Ltc'],
  matic: ['Polygon'],
  mkr: ['Maker'],
  near: ['Near'],
  op: ['Optimism'],
  pol: ['Polygon'],
  shib: ['Shib'],
  snx: ['Synthetix'],
  sol: ['Solana'],
  stx: ['Stacks'],
  sushi: ['SushiSwap'],
  tron: ['Tron'],
  uni: ['Uniswap'],
  usdc: ['Usdc'],
  usdt: ['Usdt'],
  wbtc: ['Wbtc'],
  xrp: ['Xrp'],
  xlm: ['Stellar'],
  zrx: ['ZeroEx'],
};

function matchesSearch(name: string, normalizedKeyword: string): boolean {
  if (!normalizedKeyword) return true;
  // Check alias match: alias → list of base names; name must start with one of them
  const aliasTargets = SEARCH_ALIASES[normalizedKeyword];
  if (aliasTargets?.some(target => name.startsWith(target))) return true;
  // Fallback: substring match
  return name.toLowerCase().includes(normalizedKeyword);
}

function filterByVariant(name: string, variant: Variant): boolean {
  if (variant === 'mono') return name.endsWith('Mono');
  if (variant === 'colored') return !name.endsWith('Mono');
  return true;
}

export function useIconFilter(
  categoryIcons: string[],
  keyword: string,
  variant: Variant,
) {
  return useMemo(() => {
    const normalizedKeyword = keyword.toLowerCase().trim();
    return categoryIcons
      .filter(name => filterByVariant(name, variant))
      .filter(name => matchesSearch(name, normalizedKeyword))
      .map(name => ({
        name,
        component: icons[name] as ComponentType<{ className?: string }>,
      }));
  }, [categoryIcons, keyword, variant]);
}
