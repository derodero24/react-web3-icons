import type { ComponentType } from 'react';
import { useRef } from 'react';
import { buildImportStatement } from '../../hooks/useCopy';

interface Props {
  name: string;
  component: ComponentType<{ className?: string }>;
  isCopied: boolean;
  onCopy: (name: string) => void;
  previewDark?: boolean;
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

export default function IconCard({
  name,
  component: Icon,
  isCopied,
  onCopy,
  previewDark = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col items-center"
    >
      <button
        type="button"
        aria-label={`Copy import for ${name}`}
        title={buildImportStatement(name)}
        className={`group mx-auto flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border shadow-sm transition-all duration-150 ease-out hover:scale-[1.05] hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
          previewDark
            ? 'border-gray-700 bg-gray-900 text-white hover:border-gray-600'
            : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-500 dark:bg-gray-600 dark:hover:border-gray-400 dark:hover:shadow-lg'
        }`}
        onClick={() => onCopy(name)}
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
        aria-label={`Download ${name} SVG`}
        title={`Download ${name}.svg`}
        onClick={e => {
          e.stopPropagation();
          downloadSvg(name, containerRef.current);
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
        title={name}
        className={`mt-1 w-full text-balance text-center text-xs font-medium leading-tight transition-colors duration-150 ${
          isCopied ? 'text-green-600 dark:text-green-400' : ''
        }`}
      >
        {isCopied ? 'Copied!' : name}
      </p>
    </div>
  );
}
