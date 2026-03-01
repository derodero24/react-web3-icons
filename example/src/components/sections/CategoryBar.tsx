'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  'all',
  'chain',
  'coin',
  'devtool',
  'dex',
  'domain',
  'exchange',
  'explorer',
  'marketplace',
  'node',
  'portfolio',
  'storage',
  'tracker',
  'wallet',
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_SET: ReadonlySet<string> = new Set<string>(CATEGORIES);

export default function CategoryBar() {
  const searchParams = useSearchParams();
  const raw = searchParams.get('category');
  const current: Category =
    typeof raw === 'string' && CATEGORY_SET.has(raw)
      ? (raw as Category)
      : 'all';

  return (
    <aside
      aria-label="Categories"
      className="fixed flex h-full w-64 justify-center border-r border-gray-200 bg-gray-100 shadow duration-100 dark:border-gray-600 dark:bg-gray-700"
    >
      <div className="mt-12">
        <h2 className="font-orbitron text-3xl font-bold capitalize">
          category
        </h2>
        <nav aria-label="Icon categories" className="ml-2 mt-4 space-y-2">
          {CATEGORIES.map(item => {
            const isActive = item === current;
            return (
              <Link
                key={item}
                href={item === 'all' ? '/' : `/?category=${item}`}
                className={`block rounded text-xl font-bold capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'opacity-100 underline underline-offset-4'
                    : 'opacity-75 hover:opacity-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
