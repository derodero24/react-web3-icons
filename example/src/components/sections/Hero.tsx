'use client';

import { useState } from 'react';
import { useCopyAction } from '../../hooks/useCopyAction';
import { groupIcons } from '../../utils/groupIcons';
import { REACT_WEB3_ICONS } from '../../utils/icons';
import CopyToggleIcon from '../elements/CopyToggleIcon';

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
  const { copied, copy, reset } = useCopyAction();

  const handlePkgChange = (m: PkgManager) => {
    setPkg(m);
    reset();
  };

  return (
    <section className="border-b border-border px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          {ICON_COUNT}+ Web3 icons for React
        </h2>
        <p className="mt-3 text-sm text-fg/50 sm:text-base">
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
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  pkg === m ? 'bg-fg/10 text-fg' : 'text-fg/50 hover:text-fg/60'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => copy(INSTALL_CMDS[pkg])}
            aria-label="Copy install command"
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm text-fg/80 transition-colors hover:bg-surface-hover"
          >
            <span className="select-all">{INSTALL_CMDS[pkg]}</span>
            <span className="text-fg/50">
              <CopyToggleIcon copied={copied} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
