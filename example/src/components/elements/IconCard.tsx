'use client';

import type { ComponentType } from 'react';

interface Props {
  base: string;
  activeVariant: string;
  components: Record<string, ComponentType<{ className?: string }>>;
  highlighted?: boolean;
  onClick: () => void;
}

export default function IconCard({
  base,
  activeVariant,
  components,
  highlighted = false,
  onClick,
}: Props) {
  const Icon = components[activeVariant] as
    | ComponentType<{ className?: string }>
    | undefined;

  return (
    <button
      type="button"
      aria-label={`View ${base} icon details`}
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
        highlighted ? 'border-accent bg-accent/10' : 'border-border bg-surface'
      }`}
    >
      {Icon && <Icon className="text-4xl" />}
      <p className="w-full truncate text-center font-mono text-[11px] text-white/40">
        {base}
      </p>
    </button>
  );
}
