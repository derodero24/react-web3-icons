import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="my-24 flex flex-col items-center gap-4">
      <h1 className="font-orbitron text-6xl font-bold">404</h1>
      <p className="text-xl font-medium opacity-60">Page not found</p>
      <Link
        href="/"
        className="mt-4 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Back to icons
      </Link>
    </div>
  );
}
