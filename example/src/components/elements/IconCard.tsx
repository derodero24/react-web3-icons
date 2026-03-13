'use client';

import type { CSSProperties } from 'react';

import type { IconComponent } from '../../types/icons';

interface Props {
  base: string;
  activeVariant: string;
  components: Record<string, IconComponent>;
  highlighted?: boolean;
  lightMode?: boolean;
  cardStyle?: CSSProperties;
  onClick: () => void;
}

export default function IconCard({
  base,
  activeVariant,
  components,
  highlighted = false,
  lightMode = false,
  cardStyle,
  onClick,
}: Props) {
  const Icon = components[activeVariant] as IconComponent | undefined;

  const borderClass = highlighted
    ? 'border-accent bg-accent/10'
    : lightMode
      ? 'border-black/10 bg-white'
      : 'border-border bg-surface';

  const hoverClass = lightMode
    ? 'hover:border-black/20 hover:bg-gray-50'
    : 'hover:border-white/15 hover:bg-surface-hover';

  const labelClass = lightMode ? 'text-black/50' : 'text-white/50';

  return (
    <button
      type="button"
      aria-label={`View ${base} icon details`}
      onClick={onClick}
      style={cardStyle}
      className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-200 ${hoverClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${borderClass}`}
    >
      {Icon && <Icon className="text-4xl" />}
      <p
        className={`w-full truncate text-center font-mono text-[11px] ${labelClass}`}
      >
        {base}
      </p>
    </button>
  );
}
