import Link from 'next/link';
import { CATALOG_CATEGORIES, getIcons } from '../../lib/catalog';
import {
  CATEGORY_INFO,
  type CategoryFilter,
  categoryHref,
} from '../../lib/categories';

/** Category tabs as links, so every category has its own static page. */
export default function CategoryNav({ current }: { current: CategoryFilter }) {
  const filters: readonly CategoryFilter[] = ['all', ...CATALOG_CATEGORIES];
  return (
    <nav
      aria-label="Categories"
      className="scrollbar-none -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
    >
      {filters.map(filter => {
        const active = filter === current;
        return (
          <Link
            key={filter}
            href={categoryHref(filter)}
            aria-current={active ? 'page' : undefined}
            scroll={false}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              active
                ? 'border-fg bg-fg text-bg'
                : 'border-border text-fg-muted hover:border-fg/30 hover:text-fg'
            }`}
          >
            {filter === 'all' ? 'All' : CATEGORY_INFO[filter].label}
            <span
              className={`font-mono text-[11px] ${active ? 'text-bg/70' : 'text-fg-muted'}`}
            >
              {getIcons(filter).length}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
