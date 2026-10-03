'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useIconFilter } from '../../hooks/useIconFilter';
import {
  useCategoryParam,
  useKeywordParam,
  useLinkedIconParam,
} from '../../hooks/useIconParams';
import type { Variant } from '../../types/icons';
import { type CategoryFilter, getIconGroups } from '../../utils/icons';
import IconCard from '../elements/IconCard';
import IconDrawer from '../elements/IconDrawer';
import SearchForm from '../elements/SearchForm';
import ThemeToggle from '../elements/ThemeToggle';

const VARIANT_LABELS: Record<Variant, string> = {
  all: 'All',
  colored: 'Colored',
  mono: 'Mono',
};

const VARIANTS: Variant[] = ['all', 'colored', 'mono'];

const PAGE_SIZE = 120;

interface ViewProps {
  category: CategoryFilter;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  /** Base name of the icon whose drawer is open ('' when closed). */
  linkedIcon: string;
  onLinkedIconChange: (base: string) => void;
}

function IconTableView({
  category,
  keyword,
  onKeywordChange,
  linkedIcon,
  onLinkedIconChange,
}: ViewProps) {
  const [variant, setVariant] = useState<Variant>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // All groups in this category (unfiltered) — also used for drawer lookup
  // so direct links work even when the icon is filtered out.
  const groups = getIconGroups(category);
  const displayedGroups = useIconFilter(groups, keyword, variant);

  // Reset visible count when the displayed results change
  const prevResultKey = useRef('');
  const resultKey = `${category}-${keyword}-${variant}`;
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

  const drawerGroup = linkedIcon
    ? groups.find(group => group.base === linkedIcon)
    : undefined;

  useEffect(() => {
    if (!linkedIcon) return;
    const el = document.querySelector<HTMLElement>(
      `[data-icon-name="${CSS.escape(linkedIcon)}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [linkedIcon]);

  const totalCount = groups.length;
  const resultCount = displayedGroups.length;
  const resultsText = keyword
    ? `${resultCount} of ${totalCount} icons`
    : `${totalCount} icons`;

  const isCategoryEmpty = totalCount === 0;
  const isSearchEmpty =
    !isCategoryEmpty && keyword.length > 0 && resultCount === 0;

  const handleCloseDrawer = useCallback(() => {
    // Restore focus to the card that opened the drawer
    const iconName = linkedIcon;
    onLinkedIconChange('');
    if (iconName) {
      requestAnimationFrame(() => {
        const card = document.querySelector<HTMLElement>(
          `[data-icon-name="${CSS.escape(iconName)}"] button`,
        );
        card?.focus();
      });
    }
  }, [linkedIcon, onLinkedIconChange]);

  return (
    <section
      id="icon-grid"
      tabIndex={-1}
      aria-label={`${category} icons`}
      className="relative mb-6 px-4 pt-6 outline-none sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-1">
          <SearchForm
            keyword={keyword}
            setKeyword={onKeywordChange}
            resultCount={resultCount}
            totalCount={totalCount}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <fieldset className="flex overflow-hidden rounded-lg border border-border bg-surface">
            <legend className="sr-only">Icon variant filter</legend>
            {VARIANTS.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                aria-pressed={variant === v}
                className={`h-11 px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                  variant === v
                    ? 'bg-fg/10 text-fg'
                    : 'text-fg-muted hover:bg-fg/5 hover:text-fg/80'
                }`}
              >
                {VARIANT_LABELS[v]}
              </button>
            ))}
          </fieldset>

          <ThemeToggle />
        </div>
      </div>

      <p id="icon-count" className="sr-only" aria-live="polite">
        {resultsText}
      </p>

      {isCategoryEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-fg-muted">
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
          <p className="text-base font-medium text-fg-muted">No icons yet</p>
          <p className="text-sm">
            {`${category.charAt(0).toUpperCase()}${category.slice(1)} icons are coming soon`}
          </p>
        </div>
      ) : isSearchEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-fg-muted">
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
          <p className="text-base font-medium text-fg-muted">
            No results for &ldquo;{keyword}&rdquo;
          </p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : (
        <>
          <ul
            key={`${category}-${variant}`}
            className="mt-6 grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-0 sm:grid-cols-[repeat(auto-fill,minmax(112px,1fr))]"
          >
            {visibleGroups.map(group => (
              <li key={group.base} data-icon-name={group.base} className="p-2">
                <IconCard
                  base={group.base}
                  Icon={group.activeVariant.Component}
                  highlighted={linkedIcon === group.base}
                  onClick={() => onLinkedIconChange(group.base)}
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
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-fg/10 border-t-accent" />
            </div>
          )}
        </>
      )}

      {/* Detail drawer */}
      {drawerGroup && (
        <IconDrawer
          // Reset drawer state (selected variant, tab) when another icon opens
          key={`${drawerGroup.category}/${drawerGroup.base}`}
          group={drawerGroup}
          onClose={handleCloseDrawer}
        />
      )}
    </section>
  );
}

const noop = () => {};

/**
 * Default state ("all", no search, no drawer). Rendered as the <Suspense>
 * fallback so the static export contains the initial grid; it is replaced
 * by the URL-bound table as soon as the client hydrates.
 */
export function IconTableFallback() {
  return (
    <IconTableView
      category="all"
      keyword=""
      onKeywordChange={noop}
      linkedIcon=""
      onLinkedIconChange={noop}
    />
  );
}

/** Icon grid bound to the `?category=`, `?q=` and `?icon=` query parameters. */
export default function IconTable() {
  const [category] = useCategoryParam();
  const [keyword, setKeyword] = useKeywordParam();
  const [linkedIcon, setLinkedIcon] = useLinkedIconParam();

  const handleKeywordChange = useCallback(
    (value: string) => void setKeyword(value),
    [setKeyword],
  );
  const handleLinkedIconChange = useCallback(
    (base: string) => void setLinkedIcon(base),
    [setLinkedIcon],
  );

  return (
    <IconTableView
      category={category}
      keyword={keyword}
      onKeywordChange={handleKeywordChange}
      linkedIcon={linkedIcon}
      onLinkedIconChange={handleLinkedIconChange}
    />
  );
}
