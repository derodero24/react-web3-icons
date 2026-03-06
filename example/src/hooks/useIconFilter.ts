import type { ComponentType } from 'react';
import { useMemo } from 'react';

import * as iconModules from 'react-web3-icons';

type Variant = 'all' | 'colored' | 'mono';

const icons = iconModules as unknown as Record<
  string,
  ComponentType<{ className?: string }>
>;

function filterByVariant(name: string, variant: Variant): boolean {
  if (variant === 'mono') return name.endsWith('Mono');
  if (variant === 'colored') return !name.endsWith('Mono');
  return true;
}

export function useIconFilter(
  categoryIcons: string[],
  keyword: string,
  variant: Variant,
) {
  return useMemo(
    () =>
      categoryIcons
        .filter(name => filterByVariant(name, variant))
        .filter(name => name.toLowerCase().includes(keyword.toLowerCase()))
        .map(name => ({
          name,
          component: icons[name] as ComponentType<{ className?: string }>,
        })),
    [categoryIcons, keyword, variant],
  );
}
