'use client';

import Link from 'next/link';
import pkg from '../../../../package.json';
import GitHubButton from '../elements/GitHubButton';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
          <Link href="/" className="transition-opacity hover:opacity-80">
            React Web3 Icons
          </Link>
        </h1>
        <span className="font-mono text-xs text-white/50">v{pkg.version}</span>
      </div>
      <nav aria-label="Site navigation" className="flex items-center gap-4">
        <Link
          href="/docs"
          className="rounded text-sm font-medium text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Docs
        </Link>
        <GitHubButton className="cursor-pointer text-2xl text-white/60 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </nav>
    </header>
  );
}
