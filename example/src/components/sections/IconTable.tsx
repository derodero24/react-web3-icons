'use client';

import { useSearchParams } from 'next/navigation';
import {
  type ComponentType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as iconModules from '../../../../.';
import { REACT_WEB3_ICONS } from '../../utils/icons';
import SearchForm from '../elements/SearchForm';

const icons = iconModules as unknown as Record<
  string,
  ComponentType<{ className?: string }>
>;

type Variant = 'all' | 'colored' | 'mono';

const VARIANT_LABELS: Record<Variant, string> = {
  all: 'All',
  colored: 'Colored',
  mono: 'Mono',
};

const VARIANTS: Variant[] = ['all', 'colored', 'mono'];

function filterByVariant(name: string, variant: Variant): boolean {
  if (variant === 'mono') return name.endsWith('Mono');
  if (variant === 'colored') return !name.endsWith('Mono');
  return true;
}

export default function IconTable() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [variant, setVariant] = useState<Variant>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => {
      clearTimeout(copiedTimer.current);
      clearTimeout(statusTimer.current);
    };
  }, []);

  const category = useMemo<keyof typeof REACT_WEB3_ICONS>(() => {
    const raw = searchParams.get('category');
    const param = typeof raw === 'string' ? raw : undefined;
    if (param && Object.hasOwn(REACT_WEB3_ICONS, param)) {
      return param as keyof typeof REACT_WEB3_ICONS;
    }
    return 'all';
  }, [searchParams]);

  const categoryIcons = REACT_WEB3_ICONS[category];

  const displayedIcons = useMemo(
    () =>
      categoryIcons
        .filter(name => filterByVariant(name, variant))
        .filter(name => name.toLowerCase().includes(keyword.toLowerCase()))
        .map(name => ({
          name,
          component: icons[name] as ComponentType<{
            className?: string;
          }>,
        })),
    [categoryIcons, keyword, variant],
  );

  const copy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopyStatus(`Copied ${value}`);
        setCopiedName(value);
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopiedName(null), 1_500);
        clearTimeout(statusTimer.current);
        statusTimer.current = setTimeout(() => setCopyStatus(''), 2_000);
      })
      // biome-ignore lint/suspicious/noConsole: legitimate error reporting for clipboard API
      .catch(console.error);
  };

  const totalCount = categoryIcons.length;
  const resultCount = displayedIcons.length;
  const resultsText = keyword
    ? `${resultCount} of ${totalCount} icons`
    : `${totalCount} icons`;

  const isCategoryEmpty = totalCount === 0;
  const isSearchEmpty = !isCategoryEmpty && resultCount === 0;

  return (
    <section
      aria-label={`${category} icons`}
      className="relative mb-6 px-4 pt-6 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-1">
          <SearchForm
            keyword={keyword}
            setKeyword={setKeyword}
            resultCount={resultCount}
            totalCount={totalCount}
          />
        </div>

        <fieldset className="flex shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-500 dark:bg-gray-600">
          <legend className="sr-only">Icon variant filter</legend>
          {VARIANTS.map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              aria-pressed={variant === v}
              className={`h-12 px-4 text-sm font-medium transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
                variant === v
                  ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-500'
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
            {category === 'bridge'
              ? 'Bridge icons are coming in v3.0'
              : `${category.charAt(0).toUpperCase()}${category.slice(1)} icons are coming soon`}
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
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-3 gap-y-4">
          {displayedIcons.map(icon => {
            const isCopied = copiedName === icon.name;
            return (
              <div
                key={icon.name}
                className="relative flex flex-col items-center"
              >
                <button
                  type="button"
                  aria-label={`Copy ${icon.name}`}
                  title={icon.name}
                  className="group mx-auto flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-150 ease-out hover:scale-[1.05] hover:border-gray-300 hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-500 dark:bg-gray-600 dark:hover:border-gray-400 dark:hover:shadow-lg"
                  onClick={() => copy(icon.name)}
                >
                  <icon.component
                    className={`text-4xl drop-shadow transition-all duration-150 dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)] ${
                      isCopied ? 'scale-90 opacity-30' : ''
                    }`}
                  />
                  {isCopied && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute h-6 w-6 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <p
                  title={icon.name}
                  className={`mt-1 w-full text-balance text-center text-xs font-medium leading-tight transition-colors duration-150 ${
                    isCopied ? 'text-green-600 dark:text-green-400' : ''
                  }`}
                >
                  {isCopied ? 'Copied!' : icon.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
