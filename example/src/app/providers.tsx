'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '../hooks/useTheme';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
