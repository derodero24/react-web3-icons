import { useMemo } from 'react';

import { ICON_MANIFEST } from 'react-web3-icons/manifest';
import {
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  TICKER_TO_COIN,
} from 'react-web3-icons/meta';
import type { Variant } from '../types/icons';
import type { IconGroup, IconVariant } from '../utils/icons';

// Search aliases live in the icon manifest (icons/<category>/<slug>.json
// → ICON_MANIFEST[].aliases), merged with the meta maps so chain IDs
// (e.g. "1" → Ethereum), slugs, and ticker symbols are all searchable.
function buildSearchAliases(): ReadonlyMap<string, readonly string[]> {
  const aliases = new Map<string, string[]>();

  const addAlias = (key: string, value: string) => {
    const existing = aliases.get(key);
    if (!existing) {
      aliases.set(key, [value]);
    } else if (!existing.includes(value)) {
      existing.push(value);
    }
  };

  for (const entry of ICON_MANIFEST) {
    for (const alias of entry.aliases ?? []) addAlias(alias, entry.name);
  }
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

export interface DisplayGroup extends IconGroup {
  /** The variant shown on the card for the active filter. */
  activeVariant: IconVariant;
}

/**
 * Pick the variant to display for the active filter:
 * - mono:    the plain `Mono` variant, else any mono variant
 * - colored: the first non-mono variant (the primary when it exists)
 * - all:     the primary variant
 * Returns undefined when the group has no variant matching the filter.
 */
function pickActive(
  variants: readonly IconVariant[],
  filter: Variant,
): IconVariant | undefined {
  if (filter === 'mono') {
    return (
      variants.find(v => v.suffix === 'Mono') ?? variants.find(v => v.mono)
    );
  }
  if (filter === 'colored') return variants.find(v => !v.mono);
  return variants[0];
}

function groupMatchesSearch(group: IconGroup, keyword: string): boolean {
  if (!keyword) return true;
  // Alias match: alias → base names; the group base must start with one
  const aliasTargets = SEARCH_ALIASES.get(keyword);
  if (aliasTargets?.some(target => group.base.startsWith(target))) return true;
  // Fallback: substring match on any export name in the group
  return group.variants.some(v => v.name.toLowerCase().includes(keyword));
}

export function useIconFilter(
  groups: readonly IconGroup[],
  keyword: string,
  filter: Variant,
): DisplayGroup[] {
  return useMemo(() => {
    const normalizedKeyword = keyword.toLowerCase().trim();
    const result: DisplayGroup[] = [];
    for (const group of groups) {
      const activeVariant = pickActive(group.variants, filter);
      if (activeVariant && groupMatchesSearch(group, normalizedKeyword)) {
        result.push({ ...group, activeVariant });
      }
    }
    return result;
  }, [groups, keyword, filter]);
}
