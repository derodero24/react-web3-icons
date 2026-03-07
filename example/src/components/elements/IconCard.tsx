'use client';

import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { buildImportStatement } from '../../hooks/useCopy';

interface Props {
  base: string;
  variants: string[];
  activeVariant: string;
  components: Record<string, ComponentType<{ className?: string }>>;
  isCopied: boolean;
  onCopy: (name: string) => void;
  previewDark?: boolean;
  highlighted?: boolean;
}

function downloadSvg(name: string, container: HTMLElement | null) {
  const svg = container?.querySelector('svg');
  if (!svg) return;
  const serializer = new XMLSerializer();
  const svgStr =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    serializer.serializeToString(svg);
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Short label for a variant chip relative to the base name. */
function chipLabel(variantName: string, base: string): string {
  if (variantName === base) return '●';
  const suffix = variantName.slice(base.length);
  const ABBREV: Record<string, string> = {
    Mono: 'M',
    Circle: 'C',
    CircleMono: 'CM',
    CircleAlt: 'CA',
    CircleAltMono: 'CAM',
    Square: 'Sq',
    SquareMono: 'SqM',
    SquareAlt: 'SqA',
    Wordmark: 'W',
    WordmarkMono: 'WM',
    WordmarkFlat: 'WF',
    Symbol: 'Sy',
    SymbolMono: 'SyM',
    Flat: 'F',
    FlatMono: 'FM',
    Alt: 'A',
    AltMono: 'AM',
    Light: 'L',
    LightMono: 'LM',
  };
  return ABBREV[suffix] ?? suffix;
}

export default function IconCard({
  base,
  variants,
  activeVariant,
  components,
  isCopied,
  onCopy,
  previewDark = false,
  highlighted = false,
}: Props) {
  const [selected, setSelected] = useState(activeVariant);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync to parent's active variant when filter changes
  useEffect(() => {
    setSelected(activeVariant);
  }, [activeVariant]);

<<<<<<< HEAD
  // components is always populated from variants, so this is always defined
  const Icon = (components[selected] ??
    components[variants[0] ?? '']) as ComponentType<{ className?: string }>;
=======
  const Icon = components[selected] ?? components[variants[0] ?? ''];
>>>>>>> 200a297 (fix(example): guard against undefined variants[0] in strictest tsconfig)
  const hasMultiple = variants.length > 1;

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col items-center gap-1"
    >
      <button
        type="button"
        aria-label={`Copy import for ${selected}`}
        title={buildImportStatement(selected)}
        className={`group relative mx-auto flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border shadow-sm transition-all duration-150 ease-out hover:scale-[1.05] hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
          highlighted
            ? 'border-indigo-400 bg-white ring-2 ring-indigo-400 ring-offset-1 hover:border-indigo-500 dark:bg-gray-600 dark:border-indigo-400 dark:ring-indigo-400'
            : previewDark
              ? 'border-gray-700 bg-gray-900 text-white hover:border-gray-600'
              : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-500 dark:bg-gray-600 dark:hover:border-gray-400 dark:hover:shadow-lg'
        }`}
        onClick={() => onCopy(selected)}
      >
        <Icon
          className={`text-4xl drop-shadow dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-150 ${
            isCopied ? 'scale-90 opacity-30' : ''
          }`}
        />
        {isCopied && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute h-6 w-6 text-green-500 dark:text-green-400"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      <button
        type="button"
        aria-label={`Download ${selected} SVG`}
        title={`Download ${selected}.svg`}
        onClick={e => {
          e.stopPropagation();
          downloadSvg(selected, containerRef.current);
        }}
        className="absolute top-1 right-1 z-10 rounded p-0.5 text-gray-400 opacity-0 transition-opacity duration-100 hover:text-gray-700 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-500 dark:hover:text-gray-200"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 13h11M8 2v8m0 0-3-3m3 3 3-3" />
        </svg>
      </button>

      <p
        title={selected}
        className={`w-full text-balance text-center text-xs font-medium leading-tight transition-colors duration-150 ${
          isCopied ? 'text-green-600 dark:text-green-400' : ''
        }`}
      >
        {isCopied ? 'Copied!' : base}
      </p>

      {hasMultiple && (
        <div className="flex flex-wrap justify-center gap-0.5">
          {variants.map(v => (
            <button
              key={v}
              type="button"
              title={v}
              aria-label={`Show ${v}`}
              aria-pressed={selected === v}
              onClick={e => {
                e.stopPropagation();
                setSelected(v);
              }}
              className={`rounded px-1 py-0.5 font-mono text-[9px] leading-none transition-colors ${
                selected === v
                  ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {chipLabel(v, base)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
