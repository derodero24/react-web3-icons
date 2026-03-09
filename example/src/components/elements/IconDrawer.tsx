'use client';

import type { ComponentType } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  base: string;
  variants: string[];
  components: Record<string, ComponentType<{ className?: string }>>;
  onClose: () => void;
}

type CodeTab = 'import' | 'subpath' | 'svg';

const CODE_TABS: { key: CodeTab; label: string }[] = [
  { key: 'import', label: 'Import' },
  { key: 'subpath', label: 'Subpath' },
  { key: 'svg', label: 'SVG' },
];

const SIZES = [16, 24, 32, 48, 64] as const;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      // biome-ignore lint/suspicious/noConsole: clipboard error
      .catch(console.error);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="rounded p-1.5 text-white/30 transition-colors hover:bg-white/10 hover:text-white/60"
    >
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-green-400"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
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

function getSvgMarkup(container: HTMLElement | null): string {
  const svg = container?.querySelector('svg');
  if (!svg) return '';
  return new XMLSerializer().serializeToString(svg);
}

export default function IconDrawer({
  base,
  variants,
  components,
  onClose,
}: Props) {
  const [selected, setSelected] = useState(
    variants.find(v => v === base) ?? variants[0] ?? '',
  );
  const [codeTab, setCodeTab] = useState<CodeTab>('import');
  const iconRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const Icon = components[selected] as
    | ComponentType<{ className?: string }>
    | undefined;

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  const importCode = `import { ${selected} } from 'react-web3-icons';`;
  const subpathCode = `import { ${selected} } from 'react-web3-icons/<category>';`;
  const svgCode = getSvgMarkup(iconRef.current);

  const codeContent =
    codeTab === 'import'
      ? importCode
      : codeTab === 'subpath'
        ? subpathCode
        : svgCode || '(render the icon first)';

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismisses drawer
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled via useEffect
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={drawerRef}
        className="flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-[#0a0a0a]"
        role="dialog"
        aria-label={`${base} icon details`}
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-white">{base}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Icon preview */}
        <div className="flex flex-col items-center gap-4 border-b border-border px-5 py-8">
          <div
            ref={iconRef}
            className="flex h-24 w-24 items-center justify-center"
          >
            {Icon && (
              <span style={{ fontSize: 96 }}>
                <Icon />
              </span>
            )}
          </div>
          <p className="font-mono text-sm text-white/40">{selected}</p>
        </div>

        {/* Variant selector */}
        <div className="border-b border-border px-5 py-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
            Variants
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map(v => {
              const VariantIcon = components[v] as
                | ComponentType<{ className?: string }>
                | undefined;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelected(v)}
                  title={v}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-colors ${
                    selected === v
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-surface hover:border-white/20'
                  }`}
                >
                  {VariantIcon && <VariantIcon className="text-2xl" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size preview */}
        <div className="border-b border-border px-5 py-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
            Sizes
          </p>
          <div className="flex items-end gap-4">
            {SIZES.map(size => (
              <div key={size} className="flex flex-col items-center gap-1">
                {Icon && (
                  <span style={{ fontSize: `${String(size)}px` }}>
                    <Icon />
                  </span>
                )}
                <span className="font-mono text-[10px] text-white/30">
                  {size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Code block */}
        <div className="flex-1 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {CODE_TABS.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setCodeTab(tab.key)}
                  className={`rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    codeTab === tab.key
                      ? 'bg-surface text-white'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <CopyButton text={codeContent} />
          </div>
          <pre className="overflow-x-auto rounded-b-lg rounded-tr-lg border border-border bg-surface p-4 font-mono text-sm text-white/80">
            <code>{codeContent}</code>
          </pre>

          {/* Download button */}
          <button
            type="button"
            onClick={() => downloadSvg(selected, iconRef.current)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-surface-hover hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 13h11M8 2v8m0 0-3-3m3 3 3-3" />
            </svg>
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
