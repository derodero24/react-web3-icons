'use client';

import Link from 'next/link';
import pkg from '../../../../package.json';
import GitHubButton from '../elements/GitHubButton';

export default function Header() {
  return (
    <header className="theme-transition flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
          <Link href="/" className="transition-opacity hover:opacity-80">
            React Web3 Icons
          </Link>
        </h1>
        <span className="font-mono text-xs text-fg/50">v{pkg.version}</span>
      </div>
      <nav aria-label="Site navigation" className="flex items-center gap-4">
        <Link
          href="/docs"
          className="rounded text-sm font-medium text-fg/60 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Docs
        </Link>
        <Link
          href="/compare"
          className="rounded text-sm font-medium text-fg/60 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Compare
        </Link>
        <GitHubButton className="cursor-pointer text-2xl text-fg/60 transition-colors hover:text-fg focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      </nav>
    </header>
  );
}
