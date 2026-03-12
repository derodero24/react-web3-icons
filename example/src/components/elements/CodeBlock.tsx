'use client';

import { useCopyAction } from '../../hooks/useCopyAction';
import CopyToggleIcon from './CopyToggleIcon';

export default function CodeBlock({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  const { copied, copy } = useCopyAction();

  const Wrapper = label ? 'section' : 'div';

  return (
    <Wrapper
      className="group relative"
      {...(label ? { 'aria-label': label } : {})}
    >
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 pr-12 font-mono text-sm text-white/80">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={() => copy(children)}
        aria-label="Copy code"
        className="absolute right-2 top-2 rounded p-1.5 text-white/20 opacity-0 transition-all hover:bg-white/10 hover:text-white/60 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <CopyToggleIcon copied={copied} />
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </Wrapper>
  );
}
