'use client';

import { useEffect, useRef } from 'react';

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchForm({
  keyword,
  setKeyword,
  resultCount,
  totalCount,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const input = inputRef.current;
      if (!input) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
        return;
      }

      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        input.focus();
        input.select();
        return;
      }

      if (e.key === 'Escape' && document.activeElement === input) {
        input.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="relative mt-2 flex flex-col justify-center"
    >
      <label htmlFor="search" className="sr-only">
        Search icons
      </label>
      <input
        ref={inputRef}
        type="search"
        id="search"
        className="peer h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-12 shadow-sm transition-colors duration-100 focus:-translate-x-px focus:border-2 focus:border-indigo-500/80 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-indigo-500/80"
        placeholder="Search"
        aria-describedby="icon-count"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        width="1em"
        height="1em"
        className="pointer-events-none absolute left-3 text-xl opacity-40 peer-focus:text-indigo-600 peer-focus:opacity-80 dark:peer-focus:text-indigo-400"
        aria-hidden="true"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      {!keyword && (
        <kbd className="pointer-events-none absolute right-3 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-sans text-xs text-gray-400 opacity-70 peer-focus:opacity-0 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
          /
        </kbd>
      )}
      {keyword && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {resultCount} of {totalCount} icons
        </p>
      )}
    </form>
  );
}
