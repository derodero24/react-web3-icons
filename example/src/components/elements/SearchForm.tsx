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
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target as HTMLElement).isContentEditable
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
        className="peer h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-12 font-mono text-sm text-white placeholder-white/30 transition-colors focus:border-accent/60 focus:ring-1 focus:ring-accent/60"
        placeholder="Search icons..."
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
        className="pointer-events-none absolute left-3 text-lg text-white/30 peer-focus:text-accent"
        aria-hidden="true"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      {keyword ? (
        <div className="pointer-events-none absolute right-3 flex items-center gap-2">
          <span className="font-mono text-xs text-white/30">
            {resultCount}/{totalCount}
          </span>
        </div>
      ) : (
        <kbd className="pointer-events-none absolute right-3 rounded border border-border bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/30 transition-opacity peer-focus:opacity-0">
          /
        </kbd>
      )}
    </form>
  );
}
