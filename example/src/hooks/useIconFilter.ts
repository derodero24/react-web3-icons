import { useMemo } from 'react';

import * as iconModules from 'react-web3-icons';
import {
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  TICKER_TO_COIN,
} from 'react-web3-icons/meta';
import type { IconComponent, Variant } from '../types/icons';
import { groupIcons } from '../utils/groupIcons';

const icons = Object.fromEntries(
  Object.entries(iconModules).filter(
    ([, v]) =>
      typeof v === 'function' ||
      (typeof v === 'object' && v !== null && '$$typeof' in v),
  ),
) as Record<string, IconComponent>;

// Common Web3 abbreviations and aliases that aren't covered by meta maps.
const MANUAL_ALIASES: Record<string, string[]> = {
  '1inch': ['Oneinch'],
  arb1: ['ArbitrumOne'],
  arw: ['Arweave'],
  atom: ['Atom', 'CosmosHub'],
  bnb: ['Binance', 'BinanceSmartChain', 'Bnb'],
  bsc: ['BinanceSmartChain'],
  btc: ['Bitcoin'],
  cake: ['PancakeSwap'],
  comp: ['Compound'],
  dot: ['Polkadot'],
  eigen: ['EigenLayer'],
  fil: ['Filecoin'],
  ftm: ['Fantom'],
  gno: ['GnosisChain'],
  gnosis: ['GnosisChain', 'Safe'],
  grt: ['TheGraph'],
  lz: ['LayerZero'],
  manta: ['MantaPacific'],
  matic: ['Polygon'],
  metamask: ['MetaMask'],
  okb: ['Okx'],
  ray: ['Raydium'],
  snx: ['Synthetix'],
  steth: ['Lido'],
  stg: ['Stargate'],
  sushi: ['SushiSwap'],
  wc: ['WalletConnect'],
  zk: ['ZkSync'],
};

// Build search aliases by merging meta maps with manual overrides.
// Chain IDs (e.g. "1" → Ethereum), slugs, and ticker symbols are all searchable.
function buildSearchAliases(): Record<string, string[]> {
  const aliases: Record<string, string[]> = { ...MANUAL_ALIASES };

  const addAlias = (key: string, value: string) => {
    const existing = aliases[key];
    if (existing) {
      if (!existing.includes(value)) existing.push(value);
    } else {
      aliases[key] = [value];
    }
  };

  for (const [id, name] of Object.entries(CHAIN_ID_TO_NAME)) {
    addAlias(id, name);
  }
  for (const [slug, name] of Object.entries(CHAIN_SLUG_TO_NAME)) {
    addAlias(slug, name);
  }
  for (const [ticker, name] of Object.entries(TICKER_TO_COIN)) {
    addAlias(ticker.toLowerCase(), name);
  }

  return aliases;
}

const SEARCH_ALIASES = buildSearchAliases();

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
