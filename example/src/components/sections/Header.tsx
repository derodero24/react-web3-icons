'use client';

import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

const BUTTONS = [
  { key: 'theme', Component: ThemeButton },
  { key: 'github', Component: GitHubButton },
];

export default function Header() {
  return (
    <header className="absolute right-6 top-3">
      <nav aria-label="Site actions" className="flex items-center space-x-6">
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
