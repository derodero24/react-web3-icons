'use client';

import type { ComponentType, CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  base: string;
  variants: string[];
  components: Record<
    string,
    ComponentType<{ className?: string; style?: CSSProperties }>
  >;
  /** Current category key, or 'all' when browsing all categories */
  category: string;
  onClose: () => void;
}

type CodeTab = 'import' | 'subpath' | 'svg';

const SIZES = [16, 24, 32, 48, 64] as const;
const PRESET_COLORS = [
  { value: '', label: 'Default' },
  { value: '#ffffff', label: 'White' },
  { value: '#6366f1', label: 'Indigo' },
  { value: '#22c55e', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#ef4444', label: 'Red' },
  { value: '#06b6d4', label: 'Cyan' },
] as const;

/** Safely copy text and show a brief check mark. */
function useCopyAction() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 1500);
      })
      // biome-ignore lint/suspicious/noConsole: clipboard error
      .catch(console.error);
  }, []);

  return { copied, copy };
}

function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyAction();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
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

/** Background style helper used in both normal and compare previews */
function bgStyle(bg: 'dark' | 'light' | 'checker'): CSSProperties {
  if (bg === 'light') return { backgroundColor: '#fff' };
  if (bg === 'checker')
    return {
      backgroundImage:
        'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)',
      backgroundSize: '8px 8px',
    };
  return { backgroundColor: '#111' };
}

export default function IconDrawer({
  base,
  variants,
  components,
  category,
  onClose,
}: Props) {
  const [selected, setSelected] = useState(
    variants.find(v => v === base) ?? variants[0] ?? '',
  );
  const [codeTab, setCodeTab] = useState<CodeTab>('import');
  const [previewSize, setPreviewSize] = useState(64);
  const [previewColor, setPreviewColor] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'checker'>(
    'dark',
  );
  const [svgMarkup, setSvgMarkup] = useState('');
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trigger enter animation on mount
  useEffect(() => {
    requestAnimationFrame(() => setOpen(true));
  }, []);

  const Icon = components[selected] as
    | ComponentType<{ className?: string; style?: CSSProperties }>
    | undefined;

  // Serialize SVG after render so the code tab shows the current DOM.
  // Deps trigger re-serialization when the icon or its styling changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional triggers for DOM serialization
  useEffect(() => {
    // Small delay lets React commit the icon DOM first
    const id = requestAnimationFrame(() => {
      const svg = iconRef.current?.querySelector('svg');
      if (svg) {
        setSvgMarkup(new XMLSerializer().serializeToString(svg));
      }
    });
    return () => cancelAnimationFrame(id);
  }, [selected, previewSize, previewColor]);

  // Close on Escape and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap: cycle focus within drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus close button on open and lock body scroll (preserve previous value)
  useEffect(() => {
    const closeBtn = drawerRef.current?.querySelector<HTMLElement>(
      '[aria-label="Close drawer"]',
    );
    closeBtn?.focus();

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  // Code content
  const importCode = `import { ${selected} } from 'react-web3-icons';`;
  const hasSubpath = category !== 'all';
  const subpathCode = hasSubpath
    ? `import { ${selected} } from 'react-web3-icons/${category}';`
    : '';

  const codeTabs: { key: CodeTab; label: string }[] = [
    { key: 'import', label: 'Import' },
    ...(hasSubpath ? [{ key: 'subpath' as CodeTab, label: 'Subpath' }] : []),
    { key: 'svg', label: 'SVG' },
  ];

  // Reset to 'import' if subpath tab disappears
  const effectiveTab =
    codeTab === 'subpath' && !hasSubpath ? 'import' : codeTab;

  const codeContent =
    effectiveTab === 'import'
      ? importCode
      : effectiveTab === 'subpath'
        ? subpathCode
        : svgMarkup || '(loading...)';

  const textColor = previewBg === 'light' ? '#666' : 'rgba(255,255,255,0.4)';

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismisses drawer
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled via useEffect
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 ${open ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={drawerRef}
        className={`flex h-full w-full flex-col overflow-y-auto border-l border-border bg-[#0a0a0a] transition-transform duration-300 ease-out sm:max-w-md ${open ? 'translate-x-0' : 'translate-x-full'}`}
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

        {/* Preview background selector */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-2">
          <span className="text-xs text-white/30">BG</span>
          {(['dark', 'light', 'checker'] as const).map(bg => (
            <button
              key={bg}
              type="button"
              onClick={() => setPreviewBg(bg)}
              className={`h-5 w-5 rounded border transition-colors ${
                previewBg === bg ? 'border-accent' : 'border-border'
              }`}
              style={bgStyle(bg)}
              aria-label={`${bg} background`}
              aria-pressed={previewBg === bg}
            />
          ))}
          <div className="flex-1" />
          {variants.length > 1 && (
            <button
              type="button"
              onClick={() => setCompareMode(prev => !prev)}
              aria-pressed={compareMode}
              className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${
                compareMode
                  ? 'bg-accent/20 text-accent'
                  : 'bg-white/5 text-white/30 hover:text-white/50'
              }`}
            >
              Compare
            </button>
          )}
        </div>

        {compareMode ? (
          /* Compare all variants side by side */
          <div className="border-b border-border px-5 py-6">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(variants.length, 3)}, 1fr)`,
              }}
            >
              {variants.map(v => {
                const VIcon = components[v] as
                  | ComponentType<{
                      className?: string;
                      style?: CSSProperties;
                    }>
                  | undefined;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setSelected(v);
                      setCompareMode(false);
                    }}
                    className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-white/5"
                  >
                    <div
                      className="flex items-center justify-center rounded-lg p-3"
                      style={bgStyle(previewBg)}
                    >
                      {VIcon && (
                        <span style={{ fontSize: previewSize }}>
                          <VIcon
                            {...(previewColor
                              ? { style: { color: previewColor } }
                              : {})}
                          />
                        </span>
                      )}
                    </div>
                    <span
                      className="max-w-full truncate font-mono text-[10px]"
                      style={{ color: textColor }}
                    >
                      {v}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* Icon preview */}
            <div
              className="flex flex-col items-center gap-4 border-b border-border px-5 py-8"
              style={bgStyle(previewBg)}
            >
              <div
                ref={iconRef}
                className="flex items-center justify-center"
                style={{ minHeight: 96 }}
              >
                {Icon && (
                  <span style={{ fontSize: previewSize }}>
                    <Icon
                      {...(previewColor
                        ? { style: { color: previewColor } }
                        : {})}
                    />
                  </span>
                )}
              </div>
              <p className="font-mono text-sm" style={{ color: textColor }}>
                {selected}
              </p>
            </div>

            {/* Variant selector */}
            <div className="border-b border-border px-5 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
                Variants
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="radiogroup"
                aria-label="Icon variant"
              >
                {variants.map(v => {
                  const VariantIcon = components[v] as
                    | ComponentType<{ className?: string }>
                    | undefined;
                  const isSelected = selected === v;
                  return (
                    // biome-ignore lint/a11y/useSemanticElements: button with role="radio" is intentional for custom radio group styling
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={v}
                      onClick={() => setSelected(v)}
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-colors ${
                        isSelected
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
          </>
        )}

        {/* Size control */}
        <div className="border-b border-border px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-white/30">
              Size
            </p>
            <span className="font-mono text-xs text-white/40">
              {previewSize}px
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={12}
              max={128}
              value={previewSize}
              onChange={e => setPreviewSize(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
              aria-label="Preview size"
            />
          </div>
          <div className="mt-2 flex gap-1.5">
            {SIZES.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setPreviewSize(size)}
                className={`rounded px-2 py-0.5 font-mono text-[10px] transition-colors ${
                  previewSize === size
                    ? 'bg-accent/20 text-accent'
                    : 'bg-white/5 text-white/30 hover:text-white/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color control */}
        <div className="border-b border-border px-5 py-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
            Color
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COLORS.map(c => (
              <button
                key={c.value || 'default'}
                type="button"
                onClick={() => setPreviewColor(c.value)}
                title={c.label}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  previewColor === c.value
                    ? 'border-accent scale-110'
                    : 'border-transparent hover:border-white/20'
                }`}
                style={
                  c.value
                    ? { backgroundColor: c.value }
                    : {
                        background:
                          'conic-gradient(#ef4444, #f59e0b, #22c55e, #06b6d4, #6366f1, #ec4899, #ef4444)',
                      }
                }
                aria-label={c.label}
              />
            ))}
            <label className="relative">
              <input
                type="color"
                value={previewColor || '#ffffff'}
                onChange={e => setPreviewColor(e.target.value)}
                className="absolute inset-0 h-7 w-7 cursor-pointer opacity-0"
                aria-label="Custom color"
              />
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-white/20 text-white/30 transition-colors hover:border-white/40 hover:text-white/50">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx={8} cy={8} r={6} />
                  <path d="M8 5v6M5 8h6" />
                </svg>
              </span>
            </label>
          </div>
        </div>

        {/* Code block */}
        <div className="flex-1 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {codeTabs.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setCodeTab(tab.key)}
                  className={`rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    effectiveTab === tab.key
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
