'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';
import {
  isTheme,
  LIGHT_SCHEME_QUERY,
  THEME_STORAGE_KEY,
  type Theme,
} from '../utils/theme';

interface ThemeContextValue {
  /** Active theme; null during prerender and hydration (unknown on the server). */
  theme: Theme | null;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: null,
  toggleTheme: () => {},
});

function readOverride(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

function writeOverride(theme: Theme | null): void {
  try {
    if (theme) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (e.g. blocked cookies): the choice lasts for this page only.
  }
}

function systemTheme(): Theme {
  return matchMedia(LIGHT_SCHEME_QUERY).matches ? 'light' : 'dark';
}

// `html[data-theme]` (set before first paint by THEME_INIT_SCRIPT) is the
// single source of truth; React subscribes to it as an external store.
const listeners = new Set<() => void>();

function applyTheme(theme: Theme): void {
  document.documentElement.dataset['theme'] = theme;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Theme {
  const value = document.documentElement.dataset['theme'];
  return isTheme(value) ? value : systemTheme();
}

function getServerSnapshot(): null {
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Follow system changes (unless overridden) and changes from other tabs.
  useEffect(() => {
    const sync = () => applyTheme(readOverride() ?? systemTheme());
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY || e.key === null) sync();
    };
    const media = matchMedia(LIGHT_SCHEME_QUERY);
    media.addEventListener('change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', onStorage);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    // Store only a deviation from the system preference: toggling back to
    // the system's theme clears the override and resumes following it.
    writeOverride(next === systemTheme() ? null : next);

    const root = document.documentElement;
    clearTimeout(timeoutRef.current);
    root.classList.add('theme-changing');
    applyTheme(next);
    timeoutRef.current = setTimeout(() => {
      root.classList.remove('theme-changing');
    }, 300);
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
