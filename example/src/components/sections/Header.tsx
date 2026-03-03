'use client';

import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

const BUTTONS = [
  { key: 'theme', Component: ThemeButton },
  { key: 'github', Component: GitHubButton },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6">
      <h1 className="font-orbitron text-xl font-bold sm:text-2xl">
        React Web3 Icons
      </h1>
      <nav aria-label="Site actions" className="flex items-center space-x-4">
        {BUTTONS.map(({ key, Component }) => (
          <Component
            key={key}
            className="cursor-pointer text-3xl opacity-75 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded"
          />
        ))}
      </nav>
    </header>
  );
}
