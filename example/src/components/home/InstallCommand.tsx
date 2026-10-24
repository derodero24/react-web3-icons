'use client';

import { useState } from 'react';
import { useCopyAction } from '../../hooks/useCopyAction';
import CopyStatusMessage from '../elements/CopyStatusMessage';
import CopyToggleIcon from '../elements/CopyToggleIcon';

const INSTALL_COMMANDS = {
  npm: 'npm i react-web3-icons',
  pnpm: 'pnpm add react-web3-icons',
  yarn: 'yarn add react-web3-icons',
  bun: 'bun add react-web3-icons',
} as const;

type PackageManager = keyof typeof INSTALL_COMMANDS;

const PACKAGE_MANAGERS = Object.keys(INSTALL_COMMANDS) as PackageManager[];

export default function InstallCommand() {
  const [manager, setManager] = useState<PackageManager>('npm');
  const { status, copy, reset } = useCopyAction();
  const command = INSTALL_COMMANDS[manager];

  return (
    <div className="inline-flex max-w-full flex-col gap-2">
      <fieldset className="flex gap-1">
        <legend className="sr-only">Package manager</legend>
        {PACKAGE_MANAGERS.map(option => (
          <button
            key={option}
            type="button"
            aria-pressed={manager === option}
            onClick={() => {
              setManager(option);
              reset();
            }}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              manager === option
                ? 'bg-fg/10 text-fg'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            {option}
          </button>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={() => void copy(command)}
        aria-label={`Copy ${command}`}
        className="flex max-w-full items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-fg transition-colors hover:bg-surface-hover"
      >
        <span className="truncate">
          <span className="mr-2 select-none text-fg-muted">$</span>
          {command}
        </span>
        <span className="text-fg-muted">
          <CopyToggleIcon status={status} />
        </span>
      </button>
      <CopyStatusMessage status={status} />
    </div>
  );
}
