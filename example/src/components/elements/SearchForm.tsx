interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchForm({
  keyword,
  setKeyword,
  resultCount,
  totalCount,
}: Props) {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="relative mt-2 flex flex-col justify-center"
    >
      <label htmlFor="search" className="sr-only">
        Search icons
      </label>
      <input
        type="search"
        id="search"
        className="peer h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 shadow-sm transition-colors duration-100 focus:-translate-x-px focus:border-2 focus:border-blue-500/80 dark:border-gray-500 dark:bg-gray-600 dark:focus:border-blue-500/80"
        placeholder="Search"
        aria-describedby="icon-count"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        width="1em"
        height="1em"
        className="pointer-events-none absolute left-3 text-xl opacity-40 peer-focus:text-blue-600 peer-focus:opacity-80 dark:peer-focus:text-blue-400"
        aria-hidden="true"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      {keyword && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {resultCount} of {totalCount} icons
        </p>
      )}
    </form>
  );
}
