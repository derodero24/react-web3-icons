import Link from 'next/link';

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
];

export default function CategoryBar() {
  return (
    <section className="fixed flex h-full w-64 justify-center border-r border-gray-200 bg-gray-100 shadow duration-100 dark:border-gray-600 dark:bg-gray-700">
      <div className="mt-12">
        <p className="font-orbitron text-3xl font-bold capitalize">category</p>
        <nav className="ml-2 mt-4 space-y-2">
          {CATEGORIES.map(item => (
            <Link
              key={item}
              href={{
                pathname: '/',
                query: item === 'all' ? {} : { category: item },
              }}
              className="block text-xl font-bold capitalize opacity-75 hover:opacity-100"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
