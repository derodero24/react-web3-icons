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
    Inverted: 'Iv',
    InvertedMono: 'IvM',
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
  highlighted = false,
}: Props) {
  const [selected, setSelected] = useState(activeVariant);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(activeVariant);
  }, [activeVariant]);

  const Icon = (components[selected] ??
    components[variants[0] ?? '']) as ComponentType<{
    className?: string;
  }>;
  const hasMultiple = variants.length > 1;

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col items-center gap-1.5"
    >
      <button
        type="button"
        aria-label={`Copy import for ${selected}`}
        title={buildImportStatement(selected)}
        className={`relative flex aspect-square w-full cursor-pointer items-center justify-center border border-border transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
          highlighted
            ? 'bg-accent/10 ring-1 ring-accent ring-inset'
            : 'bg-surface'
        }`}
        onClick={() => onCopy(selected)}
      >
        <Icon
          className={`text-4xl transition-all duration-150 ${
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
            className="absolute h-6 w-6 text-green-400"
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
        className="absolute top-1 right-1 z-10 rounded p-1 text-white/30 opacity-0 transition-opacity hover:text-white/70 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
        className={`w-full text-balance text-center font-mono text-[11px] leading-tight transition-colors ${
          isCopied ? 'text-green-400' : 'text-white/40'
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
                  ? 'bg-white/15 text-white'
                  : 'text-white/25 hover:bg-white/5 hover:text-white/50'
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
