export type Theme = 'dark' | 'light';

/**
 * localStorage key holding an explicit theme override. Absent means "follow
 * the system". (The previous key, `rw3i-theme`, was written on every visit
 * even without a user choice, so it is not migrated.)
 */
export const THEME_STORAGE_KEY = 'rw3i-theme-override';

export const LIGHT_SCHEME_QUERY = '(prefers-color-scheme: light)';

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light';
}

/**
 * Inline, render-blocking script for <head>: resolves the theme (stored
 * override, else system preference) and sets `html[data-theme]` before
 * first paint, so there is no flash of the wrong theme. Its content is a
 * build-time constant, so a CSP can allow it with a stable `sha256-…` hash.
 * Keep the logic in sync with `ThemeProvider`.
 */
export const THEME_INIT_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia(${JSON.stringify(
  LIGHT_SCHEME_QUERY,
)}).matches?"light":"dark";document.documentElement.dataset.theme=t})()`;
