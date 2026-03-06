'use client';

import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

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

  return (
    <nav
      aria-label="Icon categories"
      className="overflow-x-auto border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6"
    >
      <div className="flex gap-2">
        {ICON_CATEGORIES.map(item => {
          const isActive = item === current;
          const count = REACT_WEB3_ICONS[item].length;
          return (
            <Link
              key={item}
              href={item === 'all' ? '/' : `/?category=${item}`}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? 'bg-indigo-700 text-white dark:bg-indigo-200 dark:text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
              <span
                className={`ml-1.5 text-xs font-normal tabular-nums ${
                  isActive
                    ? 'opacity-80'
                    : count === 0
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-400 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
