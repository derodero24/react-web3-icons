'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import { useCategoryParam } from '../../hooks/useIconParams';
import {
  CATEGORY_FILTERS,
  type CategoryFilter,
  getIconGroups,
} from '../../utils/icons';

/** Icon group counts per category (static data, computed once) */
const CATEGORY_COUNTS = new Map(
  CATEGORY_FILTERS.map(category => [category, getIconGroups(category).length]),
);

/** Category tabs for an explicit selection (used as the prerendered fallback). */
export function CategoryBarView({ current }: { current: CategoryFilter }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Update indicator position and scroll active tab into view when category changes.
  // useLayoutEffect prevents visual flicker on the indicator position.
  // biome-ignore lint/correctness/useExhaustiveDependencies: current drives which DOM element is active
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );
    if (!active) return;

    // Compute position relative to the inner container (the indicator's offset parent)
    const containerRect = container.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    const newLeft = rect.left - containerRect.left;
    const newWidth = rect.width;
    setIndicator(prev =>
      prev.left === newLeft && prev.width === newWidth
        ? prev
        : { left: newLeft, width: newWidth },
    );

    // Scroll active tab into view within the scrollable nav
    active.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [current]);

  return (
    <nav
      aria-label="Icon categories"
      className="scrollbar-none sticky top-0 z-10 overflow-x-auto border-b border-border bg-bg-nav px-4 py-2 sm:px-6"
    >
      <div ref={containerRef} className="relative flex gap-1">
        {/* Animated indicator */}
        <div
          className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-accent transition-all duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {CATEGORY_FILTERS.map(item => {
          const isActive = item === current;
          return (
            <Link
              key={item}
              href={item === 'all' ? '/' : `/?category=${item}`}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'text-fg'
                  : 'text-fg-muted hover:bg-fg/5 hover:text-fg/70'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
              <span className="ml-1 font-mono text-xs text-fg-muted">
                {CATEGORY_COUNTS.get(item)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** Category tabs bound to the `?category=` query parameter. */
export default function CategoryBar() {
  const [category] = useCategoryParam();
  return <CategoryBarView current={category} />;
}
