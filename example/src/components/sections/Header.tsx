'use client';

import Link from 'next/link';
import pkg from '../../../../package.json';
import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

const BUTTONS = [
  { key: 'theme', Component: ThemeButton },
  { key: 'github', Component: GitHubButton },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex items-baseline gap-2">
        <h1 className="font-orbitron text-xl font-bold sm:text-2xl">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            React Web3 Icons
          </Link>
        </h1>
        <span className="font-orbitron text-xs font-medium text-indigo-500 dark:text-indigo-400">
          v{pkg.version}
        </span>
      </div>
      <nav aria-label="Site navigation" className="flex items-center gap-4">
        <Link
          href="/docs"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          Docs
        </Link>
        {BUTTONS.map(({ key, Component }) => (
          <Component
            key={key}
            className="cursor-pointer text-3xl opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:rounded"
          />
        ))}
      </nav>
    </header>
  );
}
