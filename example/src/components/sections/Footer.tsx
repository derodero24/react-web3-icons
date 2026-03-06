'use client';

import { useState } from 'react';
import pkg from '../../../../package.json';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const installCmd = 'npm i react-web3-icons';

  const copyInstall = () => {
    navigator.clipboard
      .writeText(installCmd)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1_500);
      })
      // biome-ignore lint/suspicious/noConsole: legitimate error reporting for clipboard API
      .catch(console.error);
  };

  return (
    <footer className="mt-auto border-t border-gray-200 px-4 py-5 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400 sm:px-6">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={copyInstall}
            aria-label="Copy install command"
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 font-mono text-xs transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <span className="select-all">{installCmd}</span>
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width="1em"
                height="1em"
                className="text-green-500"
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
                width="1em"
                height="1em"
                className="opacity-50"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
          <span>v{pkg.version}</span>
          <span>·</span>
          <span>MIT</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/derodero24/react-web3-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-web3-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
