import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import Layout from '../components/Layout';
import { REACT_WEB3_ICONS } from '../lib/icons';

import type { NextPage } from 'next';

const CATEGORIES = [
  'all',
  'chain',
  'coin',
  'dex',
  'exchange',
  'marketplace',
  'node',
  'storage',
  'wallet',
];

const Home: NextPage = () => {
  const { query } = useRouter();
  const [keyword, setKeyword] = useState('');

  const category = useMemo(
    () => (query['category'] as undefined | string) ?? 'all',
    [query],
  );

  const icons = useMemo(() => {
    const category = query['category'] as
      | undefined
      | keyof typeof REACT_WEB3_ICONS;
    return (
      category ? REACT_WEB3_ICONS[category] : REACT_WEB3_ICONS.all
    ).filter(icon => icon.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [query, keyword]);

  return (
    <Layout title="React Web3 Icons" description="React Web3 Icons">
      <section className="fixed flex h-full w-64 justify-center border-r border-gray-200 bg-gray-100 shadow duration-150 dark:border-gray-600 dark:bg-gray-700">
        <div className="mt-12">
          <p className="font-orbitron text-3xl font-bold capitalize">
            category
          </p>
          <nav className="mt-4 ml-2 space-y-2">
            {CATEGORIES.map(item => (
              <Link
                key={item}
                href={{
                  pathname: '/',
                  query: item === 'all' ? {} : { category: item },
                }}
                className="block text-xl font-bold capitalize opacity-75"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="relative ml-72 mr-8 mt-12 mb-24">
        <p className="font-orbitron text-3xl font-bold capitalize">
          {category}
        </p>

        <form
          onSubmit={e => e.preventDefault()}
          className="relative mt-2 flex flex-col justify-center"
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            className="peer h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 shadow-sm transition-colors duration-150 focus:-translate-x-px focus:border-2 focus:border-blue-500/80 dark:border-gray-500 dark:bg-gray-600 dark:focus:border-blue-500/80"
            placeholder="Search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <HiOutlineSearch className="pointer-events-none absolute left-3 text-xl opacity-40 peer-focus:text-blue-600 peer-focus:opacity-80 dark:peer-focus:text-blue-400" />
        </form>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
          {icons.map((icon, idx) => (
            <div key={idx}>
              <div className="mx-auto flex aspect-square w-20 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm duration-150 dark:border-gray-500 dark:bg-gray-600">
                <icon.component className="text-4xl drop-shadow dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.05)]" />
              </div>
              <p className="mt-0.5 w-24 overflow-hidden text-ellipsis text-center text-xs font-medium">
                {icon.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
