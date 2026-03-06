'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ICON_CATEGORIES, type IconCategory } from '../../utils/icons';

type Category = IconCategory;

const CATEGORY_SET: ReadonlySet<string> = new Set<string>(ICON_CATEGORIES);

export default function CategoryBar() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('category');
  const current: Category =
    typeof raw === 'string' && CATEGORY_SET.has(raw)
      ? (raw as Category)
      : 'all';

  return (
    <nav
      aria-label="Icon categories"
      className="overflow-x-auto border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-600 dark:bg-gray-700 sm:px-6"
    >
      <div className="flex gap-2">
        {ICON_CATEGORIES.map(item => {
          const isActive = item === current;
          return (
            <Link
              key={item}
              href={item === 'all' ? '/' : `/?category=${item}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isActive
                  ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
