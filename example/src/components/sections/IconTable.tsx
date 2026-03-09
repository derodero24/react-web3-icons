'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useCopy } from '../../hooks/useCopy';
import { useIconFilter } from '../../hooks/useIconFilter';
import { groupIcons } from '../../utils/groupIcons';
import { REACT_WEB3_ICONS } from '../../utils/icons';
import IconCard from '../elements/IconCard';
import SearchForm from '../elements/SearchForm';

type Variant = 'all' | 'colored' | 'mono';

const VARIANT_LABELS: Record<Variant, string> = {
  all: 'All',
  colored: 'Colored',
  mono: 'Mono',
};

const VARIANTS: Variant[] = ['all', 'colored', 'mono'];

export default function IconTable() {
  const [rawCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all'),
  );
  const [keyword, setKeyword] = useQueryState(
    'q',
    parseAsString.withDefault(''),
  );
  const [linkedIcon] = useQueryState('icon', parseAsString.withDefault(''));
  const [variant, setVariant] = useState<Variant>('all');
  const { copy, copiedName, copyStatus } = useCopy();

  const validCategory = Object.hasOwn(REACT_WEB3_ICONS, rawCategory)
    ? (rawCategory as keyof typeof REACT_WEB3_ICONS)
    : 'all';

  const categoryIcons = REACT_WEB3_ICONS[validCategory];
  const displayedGroups = useIconFilter(categoryIcons, keyword, variant);

  const totalGroupCount = useMemo(
    () => groupIcons(categoryIcons).length,
    [categoryIcons],
  );

  const hasScrolled = useRef(false);
  useEffect(() => {
    if (!linkedIcon || hasScrolled.current) return;
    const el = document.querySelector<HTMLElement>(
      `[data-icon-name="${CSS.escape(linkedIcon)}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      hasScrolled.current = true;
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

  return (
    <section
      aria-label={`${validCategory} icons`}
      className="relative mb-6 px-4 pt-6 sm:px-6 lg:px-8"
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

      <output aria-live="polite" className="sr-only">
        {copyStatus}
      </output>

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
        <div
          key={`${validCategory}-${variant}`}
          className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-0"
        >
          {displayedGroups.map(group => (
            <div key={group.base} data-icon-name={group.base} className="p-3">
              <IconCard
                base={group.base}
                variants={group.variants}
                activeVariant={group.activeVariant}
                components={group.components}
                isCopied={group.variants.includes(copiedName ?? '')}
                onCopy={copy}
                highlighted={linkedIcon === group.base}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
