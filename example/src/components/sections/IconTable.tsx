'use client';

import { parseAsString, useQueryState } from 'nuqs';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as iconModules from 'react-web3-icons';
import { useIconFilter } from '../../hooks/useIconFilter';
import { groupIcons } from '../../utils/groupIcons';
import { REACT_WEB3_ICONS } from '../../utils/icons';
import IconCard from '../elements/IconCard';
import IconDrawer from '../elements/IconDrawer';
import SearchForm from '../elements/SearchForm';

type IconComponent = ComponentType<{ className?: string }>;

type Variant = 'all' | 'colored' | 'mono';

const VARIANT_LABELS: Record<Variant, string> = {
  all: 'All',
  colored: 'Colored',
  mono: 'Mono',
};

const VARIANTS: Variant[] = ['all', 'colored', 'mono'];

const PAGE_SIZE = 120;

export default function IconTable() {
  const [rawCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all'),
  );
  const [keyword, setKeyword] = useQueryState(
    'q',
    parseAsString.withDefault(''),
  );
  const [linkedIcon, setLinkedIcon] = useQueryState(
    'icon',
    parseAsString.withDefault('').withOptions({ history: 'push' }),
  );
  const [variant, setVariant] = useState<Variant>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const validCategory = Object.hasOwn(REACT_WEB3_ICONS, rawCategory)
    ? (rawCategory as keyof typeof REACT_WEB3_ICONS)
    : 'all';

  const categoryIcons = REACT_WEB3_ICONS[validCategory];
  const displayedGroups = useIconFilter(categoryIcons, keyword, variant);

  const totalGroupCount = useMemo(
    () => groupIcons(categoryIcons).length,
    [categoryIcons],
  );

  // Reset visible count when the displayed results change
  const prevResultKey = useRef('');
  const resultKey = `${validCategory}-${keyword}-${variant}`;
  if (resultKey !== prevResultKey.current) {
    prevResultKey.current = resultKey;
    if (visibleCount !== PAGE_SIZE) {
      setVisibleCount(PAGE_SIZE);
    }
  }

  const visibleGroups = useMemo(
    () => displayedGroups.slice(0, visibleCount),
    [displayedGroups, visibleCount],
  );
  const hasMore = visibleCount < displayedGroups.length;

  // Infinite scroll: load more when sentinel enters viewport
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(prev => prev + PAGE_SIZE);
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  // All groups in this category (unfiltered) — used for drawer lookup so
  // direct links work even when the icon is filtered out by search/variant.
  const allGroups = useMemo(() => groupIcons(categoryIcons), [categoryIcons]);

  // Find the group for the opened drawer from unfiltered groups
  const drawerData = useMemo(() => {
    if (!linkedIcon) return null;
    const group = allGroups.find(g => g.base === linkedIcon);
    if (!group) return null;
    const components: Record<string, IconComponent> = {};
    for (const v of group.variants) {
      const comp = iconModules[v as keyof typeof iconModules];
      if (
        typeof comp === 'function' ||
        (typeof comp === 'object' && comp !== null && '$$typeof' in comp)
      ) {
        components[v] = comp as IconComponent;
      }
    }
    return { ...group, components };
  }, [linkedIcon, allGroups]);

  useEffect(() => {
    if (!linkedIcon) return;
    const el = document.querySelector<HTMLElement>(
      `[data-icon-name="${CSS.escape(linkedIcon)}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [linkedIcon]);

  const totalCount = totalGroupCount;
  const resultCount = displayedGroups.length;
  const resultsText = keyword
    ? `${resultCount} of ${totalCount} icons`
    : `${totalCount} icons`;

  const isCategoryEmpty = categoryIcons.length === 0;
  const isSearchEmpty =
    !isCategoryEmpty && keyword.length > 0 && resultCount === 0;

  const handleOpenDrawer = useCallback(
    (base: string) => {
      void setLinkedIcon(base);
    },
    [setLinkedIcon],
  );

  const handleCloseDrawer = useCallback(() => {
    void setLinkedIcon('');
  }, [setLinkedIcon]);

  return (
    <section
      id="icon-grid"
      tabIndex={-1}
      aria-label={`${validCategory} icons`}
      className="relative mb-6 px-4 pt-6 outline-none sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-1">
          <SearchForm
            keyword={keyword}
            setKeyword={value => void setKeyword(value)}
            resultCount={resultCount}
            totalCount={totalCount}
          />
        </div>

        <fieldset className="flex shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
          <legend className="sr-only">Icon variant filter</legend>
          {VARIANTS.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              aria-pressed={variant === v}
              className={`h-11 px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                variant === v
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              {VARIANT_LABELS[v]}
            </button>
          ))}
        </fieldset>
      </div>

      <p id="icon-count" className="sr-only" aria-live="polite">
        {resultsText}
      </p>

      {isCategoryEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-white/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 opacity-40"
            aria-hidden="true"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M8 12h8" />
          </svg>
          <p className="text-base font-medium text-white/50">No icons yet</p>
          <p className="text-sm">
            {`${validCategory.charAt(0).toUpperCase()}${validCategory.slice(1)} icons are coming soon`}
          </p>
        </div>
      ) : isSearchEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-white/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 opacity-40"
            aria-hidden="true"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-base font-medium text-white/50">
            No results for &ldquo;{keyword}&rdquo;
          </p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : (
        <>
          <ul
            key={`${validCategory}-${variant}`}
            className="mt-6 grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-0 sm:grid-cols-[repeat(auto-fill,minmax(112px,1fr))]"
          >
            {visibleGroups.map(group => (
              <li key={group.base} data-icon-name={group.base} className="p-2">
                <IconCard
                  base={group.base}
                  activeVariant={group.activeVariant}
                  components={group.components}
                  highlighted={linkedIcon === group.base}
                  onClick={() => handleOpenDrawer(group.base)}
                />
              </li>
            ))}
          </ul>
          {hasMore && (
            <div
              ref={sentinelRef}
              className="flex justify-center py-8"
              aria-hidden="true"
            >
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
            </div>
          )}
        </>
      )}

      {/* Detail drawer */}
      {linkedIcon && drawerData && (
        <IconDrawer
          base={drawerData.base}
          variants={drawerData.variants}
          components={drawerData.components}
          category={validCategory}
          onClose={handleCloseDrawer}
        />
      )}
    </section>
  );
}
