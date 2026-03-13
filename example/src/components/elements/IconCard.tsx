'use client';

import type { IconComponent } from '../../types/icons';
import { bgStyle, type PreviewBg } from '../../utils/bgStyle';

interface Props {
  base: string;
  activeVariant: string;
  components: Record<string, IconComponent>;
  highlighted?: boolean;
  previewBg?: PreviewBg;
  onClick: () => void;
}

export default function IconCard({
  base,
  activeVariant,
  components,
  highlighted = false,
  previewBg = 'dark',
  onClick,
}: Props) {
  const Icon = components[activeVariant] as IconComponent | undefined;
  const showBg = previewBg !== 'dark';

  return (
    <button
      type="button"
      aria-label={`View ${base} icon details`}
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-200 hover:border-white/15 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
        highlighted ? 'border-accent bg-accent/10' : 'border-border bg-surface'
      }`}
    >
      {Icon && (
        <div
          className={`flex items-center justify-center ${showBg ? 'rounded p-1' : ''}`}
          style={showBg ? bgStyle(previewBg) : undefined}
        >
          <Icon className="text-4xl" />
        </div>
      )}
      <p className="w-full truncate text-center font-mono text-[11px] text-white/50">
        {base}
      </p>
    </button>
  );
}
