'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'rw3i-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Restore saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.dataset['theme'] = saved;
    }
  }, []);

  // Apply data-theme attribute when theme changes
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.dataset['theme'] = 'light';
    } else {
      delete document.documentElement.dataset['theme'];
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-changing');
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    setTimeout(() => root.classList.remove('theme-changing'), 300);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
