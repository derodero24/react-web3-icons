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
 * first paint, so there is no flash of the wrong theme. It is a plain string
 * literal (no interpolation), so a CSP can allow it with a stable `sha256-…`
 * hash and no value can ever be spliced into executable code. It hardcodes
 * `THEME_STORAGE_KEY` and `LIGHT_SCHEME_QUERY`; `ThemeInitScriptInSync`
 * below fails the type check if they drift. Keep the logic in sync with `ThemeProvider`.
 */
export const THEME_INIT_SCRIPT =
  '(function(){var t=null;try{t=localStorage.getItem("rw3i-theme-override")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t})()';

type Contains<
  Haystack extends string,
  Needle extends string,
> = Haystack extends `${string}${Needle}${string}` ? true : false;
type AssertTrue<T extends true> = T;

/** Compile-time guard: the script literal must embed both constants. */
export type ThemeInitScriptInSync = AssertTrue<
  [
    Contains<typeof THEME_INIT_SCRIPT, `"${typeof THEME_STORAGE_KEY}"`>,
    Contains<typeof THEME_INIT_SCRIPT, `"${typeof LIGHT_SCHEME_QUERY}"`>,
  ] extends [true, true]
    ? true
    : false
>;
