'use client';

import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

import {
  ICON_CATEGORIES,
  type IconCategory,
  REACT_WEB3_ICONS,
} from '../../utils/icons';

type Category = IconCategory;

const CATEGORY_SET: ReadonlySet<string> = new Set<string>(ICON_CATEGORIES);

export default function CategoryBar() {
  const [rawCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all'),
  );
  const current: Category =
    typeof rawCategory === 'string' && CATEGORY_SET.has(rawCategory)
      ? (rawCategory as Category)
      : 'all';

  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Update indicator position and scroll active tab into view when category changes
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
    if (!active) return;

    // Update indicator
    const navRect = nav.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    setIndicator({
      left: rect.left - navRect.left + nav.scrollLeft,
      width: rect.width,
    });

    // Scroll into view
    active.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  });

  return (
    <nav
      ref={navRef}
      aria-label="Icon categories"
      className="scrollbar-none sticky top-0 z-10 overflow-x-auto border-b border-border bg-[#0a0a0a] px-4 py-2 sm:px-6"
    >
      <div className="relative flex gap-1">
        {/* Animated indicator */}
        <div
          className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent transition-all duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {ICON_CATEGORIES.map(item => {
          const isActive = item === current;
          const count = REACT_WEB3_ICONS[item].length;
          return (
            <Link
              key={item}
              href={item === 'all' ? '/' : `/?category=${item}`}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:bg-white/5 hover:text-white/70'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
              <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
