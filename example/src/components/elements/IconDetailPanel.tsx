'use client';

import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { buildImportStatement } from '../../hooks/useCopy';

const SIZES = [16, 24, 48, 64] as const;

/** Short label for a variant chip relative to the base name. */
function variantLabel(variantName: string, base: string): string {
  if (variantName === base) return 'Colored';
  const suffix = variantName.slice(base.length);
  const LABELS: Record<string, string> = {
    Mono: 'Mono',
    Circle: 'Circle',
    CircleMono: 'Circle Mono',
    CircleAlt: 'Circle Alt',
    CircleAltMono: 'Circle Alt Mono',
    Square: 'Square',
    SquareMono: 'Square Mono',
    SquareAlt: 'Square Alt',
    Wordmark: 'Wordmark',
    WordmarkMono: 'Wordmark Mono',
    WordmarkFlat: 'Wordmark Flat',
    Symbol: 'Symbol',
    SymbolMono: 'Symbol Mono',
    Flat: 'Flat',
    FlatMono: 'Flat Mono',
    Alt: 'Alt',
    AltMono: 'Alt Mono',
    Light: 'Light',
    LightMono: 'Light Mono',
  };
  return LABELS[suffix] ?? suffix;
}

interface VariantRowProps {
  variantName: string;
  base: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  isCopied: boolean;
  onCopy: () => void;
}

function VariantRow({
  variantName,
  base,
  Icon,
  isCopied,
  onCopy,
}: VariantRowProps) {
  const isMono = variantName.endsWith('Mono');
  const importStatement = buildImportStatement(variantName);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 dark:border-gray-700 dark:bg-gray-800">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
          isMono
            ? 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
            : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900'
        }`}
      >
        <Icon className="text-2xl" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          {variantLabel(variantName, base)}
        </p>
        <p className="truncate font-mono text-[10px] text-gray-400 dark:text-gray-500">
          {importStatement}
        </p>
      </div>

      <button
        type="button"
        aria-label={isCopied ? 'Copied!' : `Copy import for ${variantName}`}
        title={importStatement}
        onClick={onCopy}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      >
        {isCopied ? (
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="13.5 4.5 6.5 11.5 2.5 7.5" />
          </svg>
        ) : (
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
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M2 11V2h9" />
          </svg>
        )}
      </button>
    </div>
  );
}

interface Props {
  base: string;
  variants: string[];
  components: Record<
    string,
    ComponentType<{ className?: string; style?: React.CSSProperties }>
  >;
  copiedName: string | null;
  onCopy: (name: string) => void;
  onClose: () => void;
}

export default function IconDetailPanel({
  base,
  variants,
  components,
  copiedName,
  onCopy,
  onClose,
}: Props) {
  // Dismiss on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const PrimaryIcon = (components[base] ??
    components[variants[0] ?? '']) as ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${base} icon details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {base}
          </h2>
          <button
            type="button"
            aria-label="Close detail panel"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 4 4 12M4 4l8 8" />
            </svg>
          </button>
        </div>

        {/* Size previews */}
        <div className="flex items-end justify-center gap-6 px-5 py-6">
          {SIZES.map(size => (
            <div key={size} className="flex flex-col items-center gap-1.5">
              <PrimaryIcon style={{ width: size, height: size }} />
              <span className="text-[10px] text-gray-400">{size}px</span>
            </div>
          ))}
        </div>

        {/* Variant rows */}
        <div className="flex flex-col gap-2 px-5 pb-6">
          {variants.map(v => {
            const Comp = components[v] as ComponentType<{
              className?: string;
              style?: React.CSSProperties;
            }>;
            return (
              <VariantRow
                key={v}
                variantName={v}
                base={base}
                Icon={Comp}
                isCopied={copiedName === v}
                onCopy={() => onCopy(v)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
