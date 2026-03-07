import type { ComponentType } from 'react';
import { buildImportStatement } from '../../hooks/useCopy';

interface Props {
  name: string;
  component: ComponentType<{ className?: string }>;
  isCopied: boolean;
  onCopy: (name: string) => void;
  previewDark?: boolean;
  highlighted?: boolean;
}

export default function IconCard({
  name,
  component: Icon,
  isCopied,
  onCopy,
  previewDark = false,
  highlighted = false,
}: Props) {
  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        aria-label={`Copy import for ${name}`}
        title={buildImportStatement(name)}
        className={`group mx-auto flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border shadow-sm transition-all duration-150 ease-out hover:scale-[1.05] hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
          highlighted
            ? 'border-indigo-400 bg-white ring-2 ring-indigo-400 ring-offset-1 hover:border-indigo-500 dark:bg-gray-600 dark:border-indigo-400 dark:ring-indigo-400'
            : previewDark
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
