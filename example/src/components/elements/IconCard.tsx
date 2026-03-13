'use client';

import type { IconComponent } from '../../types/icons';

interface Props {
  base: string;
  activeVariant: string;
  components: Record<string, IconComponent>;
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
  const Icon = components[activeVariant] as IconComponent | undefined;

  const borderClass = highlighted
    ? 'border-accent bg-accent/10'
    : 'border-border bg-surface';

  return (
    <button
      type="button"
      aria-label={`View ${base} icon details`}
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-200 hover:border-fg/15 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${borderClass}`}
    >
      {Icon && <Icon className="text-4xl" />}
      <p className="w-full truncate text-center font-mono text-[11px] text-fg/50">
        {base}
      </p>
    </button>
  );
}
