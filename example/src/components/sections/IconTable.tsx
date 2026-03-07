'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';

import { useCopy } from '../../hooks/useCopy';
import { useIconFilter } from '../../hooks/useIconFilter';
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
  const [variant, setVariant] = useState<Variant>('all');
  const [previewDark, setPreviewDark] = useState(false);
  const { copy, copiedName, copyStatus } = useCopy();

  const validCategory = Object.hasOwn(REACT_WEB3_ICONS, rawCategory)
    ? (rawCategory as keyof typeof REACT_WEB3_ICONS)
    : 'all';

  const categoryIcons = REACT_WEB3_ICONS[validCategory];
  const displayedIcons = useIconFilter(categoryIcons, keyword, variant);

  const totalCount = categoryIcons.length;
  const resultCount = displayedIcons.length;
  const resultsText = keyword
    ? `${resultCount} of ${totalCount} icons`
    : `${totalCount} icons`;

  const isCategoryEmpty = totalCount === 0;
  const isSearchEmpty = !isCategoryEmpty && resultCount === 0;

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

        <div className="flex shrink-0 items-center gap-2">
          {variant === 'mono' && (
            <button
              type="button"
              aria-pressed={previewDark}
              aria-label="Toggle dark card background"
              title="Preview mono icons on dark background"
              onClick={() => setPreviewDark(p => !p)}
              className={`flex h-12 items-center gap-1.5 rounded-xl border px-3 text-sm font-medium shadow-sm transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                previewDark
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-sm border ${previewDark ? 'border-gray-500 bg-gray-900' : 'border-gray-400 bg-gray-800'}`}
                aria-hidden="true"
              />
              Dark
            </button>
          )}

          <fieldset className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
            <legend className="sr-only">Icon variant filter</legend>
            {VARIANTS.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  if (v !== 'mono') setPreviewDark(false);
                  setVariant(v);
                }}
                aria-pressed={variant === v}
                className={`h-12 px-4 text-sm font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
                  variant === v
                    ? 'bg-indigo-700 text-white dark:bg-indigo-100 dark:text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {VARIANT_LABELS[v]}
              </button>
            ))}
          </fieldset>
        </div>
      </div>

      <p id="icon-count" className="sr-only" aria-live="polite">
        {resultsText}
      </p>

      <output aria-live="polite" className="sr-only">
        {copyStatus}
      </output>

      {isCategoryEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-gray-400 dark:text-gray-500">
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
          <p className="text-base font-medium">No icons yet</p>
          <p className="text-sm">
            {`${validCategory.charAt(0).toUpperCase()}${validCategory.slice(1)} icons are coming soon`}
          </p>
        </div>
      ) : isSearchEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-gray-400 dark:text-gray-500">
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
          <p className="text-base font-medium">
            No results for &ldquo;{keyword}&rdquo;
          </p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : (
        <div
          key={`${validCategory}-${variant}`}
          className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-3 gap-y-4"
        >
          {displayedIcons.map((icon, index) => (
            <div
              key={icon.name}
              className="motion-safe:animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 12, 150)}ms` }}
            >
              <IconCard
                name={icon.name}
                component={icon.component}
                isCopied={copiedName === icon.name}
                onCopy={copy}
                previewDark={variant === 'mono' && previewDark}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
