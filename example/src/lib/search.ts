// Client-safe search over the plain index the server passes down.

/** Card icon sizes of the gallery, in CSS pixels. */
export const ICON_SIZES = [24, 32, 48] as const;
export type IconSize = (typeof ICON_SIZES)[number];
export const DEFAULT_ICON_SIZE: IconSize = 32;

/** What the gallery searches for one icon card. */
export interface SearchEntry {
  /** `<category>/<slug>`, the card's `data-id`. */
  readonly id: string;
  /** Lowercase export name. */
  readonly name: string;
  /** Lowercase exact keys: aliases, slugs, tickers and chain IDs. */
  readonly keys: readonly string[];
  readonly hasMono: boolean;
}

/** Normalizes user input: lowercase, no spaces, dashes or underscores. */
export function normalizeQuery(query: string): string {
  return query.toLowerCase().replace(/[\s_-]+/g, '');
}

/**
 * Ranks a match: 0 exact key or name, 1 name prefix, 2 key prefix,
 * 3 substring of the name; undefined when the entry does not match.
 */
export function matchRank(
  entry: SearchEntry,
  query: string,
): number | undefined {
  if (query === '') return 3;
  const keys = entry.keys.map(normalizeQuery);
  if (entry.name === query || keys.includes(query)) return 0;
  if (entry.name.startsWith(query)) return 1;
  if (keys.some(key => key.startsWith(query))) return 2;
  if (entry.name.includes(query)) return 3;
  return undefined;
}
