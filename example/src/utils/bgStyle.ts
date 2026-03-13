import type { CSSProperties } from 'react';

export type PreviewBg = 'dark' | 'light' | 'checker';

/** Background style helper for icon preview areas */
export function bgStyle(bg: PreviewBg): CSSProperties {
  if (bg === 'light') return { backgroundColor: '#fff' };
  if (bg === 'checker')
    return {
      backgroundImage:
        'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)',
      backgroundSize: '8px 8px',
    };
  return { backgroundColor: '#111' };
}
