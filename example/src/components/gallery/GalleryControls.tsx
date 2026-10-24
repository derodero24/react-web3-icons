'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_ICON_SIZE,
  ICON_SIZES,
  type IconSize,
  matchRank,
  normalizeQuery,
  type SearchEntry,
} from '../../lib/search';

type IconStyle = 'color' | 'mono';

const ISSUE_URL =
  'https://github.com/derodero24/react-web3-icons/issues/new?template=icon-request.yml';

function isIconStyle(value: string | null): value is IconStyle {
  return value === 'color' || value === 'mono';
}

/** Reads `?q=` and `?style=` once, after hydration (the HTML has the defaults). */
function readUrlState(): { query: string; style: IconStyle } {
  const params = new URLSearchParams(window.location.search);
  const style = params.get('style');
  return {
    query: params.get('q') ?? '',
    style: isIconStyle(style) ? style : 'color',
  };
}

/** Mirrors the state into the URL without a navigation or history entry. */
function writeUrlState(query: string, style: IconStyle): void {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  if (style === 'mono') url.searchParams.set('style', 'mono');
  else url.searchParams.delete('style');
  if (url.href !== window.location.href) {
    window.history.replaceState(window.history.state, '', url);
  }
}

/** The rules that hide, reorder and restyle the server-rendered cards. */
function buildRules(
  matches: readonly { id: string; rank: number }[] | undefined,
  style: IconStyle,
  size: IconSize,
): string {
  const rules = [`#icon-grid{--icon-size:${size}px}`];
  if (style === 'mono') {
    rules.push(
      '#icon-grid .icon-color{display:none}',
      '#icon-grid .icon-mono{display:block}',
      '#icon-grid>li:not([data-mono]){display:none}',
    );
  }
  if (matches) {
    // Ids are `<category>/<kebab-name>`: [a-z0-9/-] only, safe in a selector.
    const shown = matches.map(match => `[data-id="${match.id}"]`).join(',');
    rules.push(
      shown
        ? `#icon-grid>li:not(${shown}){display:none}`
        : '#icon-grid>li{display:none}',
    );
    for (const match of matches) {
      if (match.rank < 3) {
        rules.push(
          `#icon-grid>[data-id="${match.id}"]{order:${match.rank - 3}}`,
        );
      }
    }
  }
  return rules.join('');
}

export default function GalleryControls({
  entries,
}: {
  entries: readonly SearchEntry[];
}) {
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<IconStyle>('color');
  const [size, setSize] = useState<IconSize>(DEFAULT_ICON_SIZE);
  const inputRef = useRef<HTMLInputElement>(null);
  const restored = useRef(false);

  useEffect(() => {
    const state = readUrlState();
    setQuery(state.query);
    setStyle(state.style);
    restored.current = true;
  }, []);

  useEffect(() => {
    if (restored.current) writeUrlState(query.trim(), style);
  }, [query, style]);

  // "/" focuses the search field, as on GitHub and most docs sites.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const normalized = normalizeQuery(query.trim());
  const matches = useMemo(() => {
    if (!normalized) return undefined;
    const result: { id: string; rank: number }[] = [];
    for (const entry of entries) {
      const rank = matchRank(entry, normalized);
      if (rank !== undefined) result.push({ id: entry.id, rank });
    }
    return result;
  }, [entries, normalized]);

  const monoIds = useMemo(
    () =>
      new Set(entries.filter(entry => entry.hasMono).map(entry => entry.id)),
    [entries],
  );
  const visible = (matches ?? entries).filter(
    item => style === 'color' || monoIds.has(item.id),
  ).length;

  return (
    <div className="sticky top-14 z-20 -mx-4 space-y-2 bg-bg/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <style>{buildRules(matches, style, size)}</style>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative flex min-w-0 flex-1 basis-64 items-center">
          <span className="sr-only">Search icons</span>
          <svg
            viewBox="0 0 16 16"
            className="pointer-events-none absolute left-3 h-4 w-4 text-fg-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <circle cx={7} cy={7} r={4.5} />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Escape') setQuery('');
            }}
            placeholder="Search by name, ticker, chain ID or slug"
            autoComplete="off"
            spellCheck={false}
            aria-controls="icon-grid"
            className="h-11 w-full rounded-lg border border-border bg-surface pl-9 pr-10 text-sm placeholder:text-fg-muted focus:border-accent"
          />
          <kbd className="pointer-events-none absolute right-3 hidden rounded border border-border px-1.5 font-mono text-[11px] text-fg-muted sm:block">
            /
          </kbd>
        </label>
        <Segmented
          label="Style"
          value={style}
          options={[
            { value: 'color', label: 'Color' },
            { value: 'mono', label: 'Mono' },
          ]}
          onChange={setStyle}
        />
        <Segmented
          label="Preview size"
          value={size}
          options={ICON_SIZES.map(value => ({ value, label: `${value}` }))}
          onChange={setSize}
        />
      </div>
      <p className="text-xs text-fg-muted" aria-live="polite">
        {visible === 0 ? (
          <>
            No icons match “{query.trim()}”.{' '}
            <a
              href={`${ISSUE_URL}&title=${encodeURIComponent(`Icon request: ${query.trim()}`)}`}
              className="text-accent-fg underline-offset-2 hover:underline"
            >
              Request it on GitHub
            </a>
          </>
        ) : (
          `${visible} ${visible === 1 ? 'icon' : 'icons'}`
        )}
      </p>
    </div>
  );
}

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex h-11 items-center rounded-lg border border-border bg-surface p-1">
      <legend className="sr-only">{label}</legend>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={`h-full rounded-md px-3 text-sm transition-colors ${
            option.value === value
              ? 'bg-bg text-fg shadow-sm'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
