'use client';

import { useEffect, useRef, useState } from 'react';
import { groupIcons } from '../../utils/groupIcons';
import { REACT_WEB3_ICONS } from '../../utils/icons';

type PkgManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

const INSTALL_CMDS: Record<PkgManager, string> = {
  npm: 'npm i react-web3-icons',
  yarn: 'yarn add react-web3-icons',
  pnpm: 'pnpm add react-web3-icons',
  bun: 'bun add react-web3-icons',
};

const PKG_MANAGERS: PkgManager[] = ['npm', 'yarn', 'pnpm', 'bun'];

// Unique base icon count (not variant count)
const ICON_COUNT = groupIcons(REACT_WEB3_ICONS.all).length;

export default function Hero() {
  const [pkg, setPkg] = useState<PkgManager>('npm');
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Clear timer on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(INSTALL_CMDS[pkg])
      .then(() => {
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 1500);
      })
      // biome-ignore lint/suspicious/noConsole: clipboard error
      .catch(console.error);
  };

  // Reset copied when switching package manager
  const handlePkgChange = (m: PkgManager) => {
    setPkg(m);
    setCopied(false);
    clearTimeout(timerRef.current);
  };

  return (
    <section className="border-b border-border px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {ICON_COUNT}+ Web3 icons for React
        </h2>
        <p className="mt-3 text-sm text-white/40 sm:text-base">
          Open-source SVG icons for chains, coins, wallets, DEXs, and more.
        </p>

        {/* Install command */}
        <div className="mt-8 inline-flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {PKG_MANAGERS.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => handlePkgChange(m)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  pkg === m
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy install command"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm text-white/80 transition-colors hover:bg-surface-hover"
          >
            <span className="select-all">{INSTALL_CMDS[pkg]}</span>
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
                className="h-4 w-4 text-white/30"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
