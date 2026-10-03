'use client';

import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // The theme is unknown while prerendering, so both icons are rendered and
  // CSS picks one from html[data-theme] — correct before hydration.
  const label =
    theme === 'light'
      ? 'Switch to dark mode'
      : theme === 'dark'
        ? 'Switch to light mode'
        : 'Toggle color theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg/80"
    >
      {/* Sun: shown in dark mode */}
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4 light:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx={8} cy={8} r={3.5} />
        <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
      </svg>
      {/* Half-moon: shown in light mode */}
      <svg
        viewBox="0 0 16 16"
        className="hidden h-4 w-4 light:inline-block"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 12.5a5.5 5.5 0 0 1 0-11v11Z" />
      </svg>
    </button>
  );
}
