import type { Dispatch, SetStateAction } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function SearchForm({ keyword, setKeyword }: Props) {
  return (
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
        className="peer h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 shadow-sm transition-colors duration-100 focus:-translate-x-px focus:border-2 focus:border-blue-500/80 dark:border-gray-500 dark:bg-gray-600 dark:focus:border-blue-500/80"
        placeholder="Search"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <HiOutlineSearch className="pointer-events-none absolute left-3 text-xl opacity-40 peer-focus:text-blue-600 peer-focus:opacity-80 dark:peer-focus:text-blue-400" />
    </form>
  );
}
