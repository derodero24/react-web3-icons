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

export default function IconTable() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
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

  const displayedIcons = useMemo(
    () =>
      REACT_WEB3_ICONS[category]
        .filter(name => name.toLowerCase().includes(keyword.toLowerCase()))
        .map(name => ({
          name,
          component: icons[name] as ComponentType<{
            className?: string;
          }>,
        })),
    [category, keyword],
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

  const totalCount = REACT_WEB3_ICONS[category].length;
  const resultCount = displayedIcons.length;
  const resultsText = keyword
    ? `${resultCount} of ${totalCount} icons`
    : `${totalCount} icons`;

  return (
    <section
      aria-label={`${category} icons`}
      className="relative mb-24 px-4 pt-6 sm:px-6 lg:px-8"
    >
      <SearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      <p id="icon-count" className="sr-only" aria-live="polite">
        {resultsText}
      </p>

      <output aria-live="polite" className="sr-only">
        {copyStatus}
      </output>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
        {displayedIcons.map(icon => {
          const isCopied = copiedName === icon.name;
          return (
            <div key={icon.name} className="relative">
              <button
                type="button"
                aria-label={`Copy ${icon.name}`}
                className="group mx-auto flex aspect-square w-20 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-150 ease-out hover:scale-[1.05] hover:border-gray-300 hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-500 dark:bg-gray-600 dark:hover:border-gray-400 dark:hover:shadow-lg"
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
                className={`mt-0.5 w-24 overflow-hidden text-ellipsis text-center text-xs font-medium transition-colors duration-150 ${
                  isCopied ? 'text-green-600 dark:text-green-400' : ''
                }`}
              >
                {isCopied ? 'Copied!' : icon.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
