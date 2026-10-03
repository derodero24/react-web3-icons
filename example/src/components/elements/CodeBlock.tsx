'use client';

import { useCopyAction } from '../../hooks/useCopyAction';
import CopyStatusMessage from './CopyStatusMessage';
import CopyToggleIcon from './CopyToggleIcon';

export default function CodeBlock({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  const { status, copy } = useCopyAction();

  const Wrapper = label ? 'section' : 'div';

  return (
    <Wrapper
      className="group relative"
      {...(label ? { 'aria-label': label } : {})}
    >
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 pr-12 font-mono text-sm text-fg/80">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={() => void copy(children)}
        aria-label="Copy code"
        className="absolute right-2 top-2 rounded p-1.5 text-fg/20 opacity-0 transition-all hover:bg-fg/10 hover:text-fg/80 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <CopyToggleIcon status={status} />
      </button>
      <CopyStatusMessage status={status} />
    </Wrapper>
  );
}
