'use client';

import { type ReactNode, useState } from 'react';

const BACKGROUNDS = [
  { value: 'theme', label: 'Theme' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'checker', label: 'Transparent' },
] as const;

type PreviewBg = (typeof BACKGROUNDS)[number]['value'];

/**
 * Switches the background of every `.preview-surface` inside it (see
 * global.css), so the server-rendered variants can be checked on light,
 * dark and transparent backgrounds.
 */
export default function PreviewBackground({
  children,
}: {
  children: ReactNode;
}) {
  const [bg, setBg] = useState<PreviewBg>('theme');
  return (
    <div data-preview-bg={bg} className="space-y-4">
      <fieldset className="flex w-fit items-center rounded-lg border border-border bg-surface p-1">
        <legend className="sr-only">Preview background</legend>
        {BACKGROUNDS.map(option => (
          <button
            key={option.value}
            type="button"
            aria-pressed={bg === option.value}
            onClick={() => setBg(option.value)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              bg === option.value
                ? 'bg-bg text-fg shadow-sm'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            {option.label}
          </button>
        ))}
      </fieldset>
      {children}
    </div>
  );
}
