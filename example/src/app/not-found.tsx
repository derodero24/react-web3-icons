import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="my-24 flex flex-col items-center gap-4">
      <h1 className="text-6xl font-bold text-white/80">404</h1>
      <p className="text-xl font-medium text-white/40">Page not found</p>
      <Link
        href="/"
        className="mt-4 rounded-lg border border-border px-5 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-surface-hover hover:text-white"
      >
        Back to icons
      </Link>
    </div>
  );
}
