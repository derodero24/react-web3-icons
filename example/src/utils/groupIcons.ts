// Known variant suffix parts: base suffixes and modifiers.
// Compound suffixes (e.g. "CircleMono") are generated automatically.
const VARIANT_PARTS = [
  'Circle',
  'Square',
  'Wordmark',
  'Symbol',
  'Flat',
  'Alt',
  'Inverted',
  'Light',
] as const;
const MODIFIERS = ['Mono'] as const;

// Build all valid suffixes: compound first (longest), then base parts, then modifiers
const SUFFIXES: string[] = [
  // Compound: base part + modifier (e.g. "CircleMono", "SquareMono")
  ...VARIANT_PARTS.flatMap(s => MODIFIERS.map(m => `${s}${m}`)),
  // Special compound: "WordmarkFlat"
  'WordmarkFlat',
  // Individual parts and modifiers
  ...VARIANT_PARTS,
  ...MODIFIERS,
];

// Sort longest-first so compound suffixes match before their components
SUFFIXES.sort((a, b) => b.length - a.length);

const SUFFIX_RE = new RegExp(`(${SUFFIXES.join('|')})$`);

/**
 * Derive the base icon name by iteratively stripping known variant suffixes.
 * e.g. "EthereumCircleMono" → "Ethereum", "CoinbaseCircleAlt" → "Coinbase"
 */
export function getBaseName(name: string): string {
  let base = name;
  let prev = '';
  while (base !== prev) {
    prev = base;
    base = base.replace(SUFFIX_RE, '');
  }
  return base;
}

export interface IconGroup {
  /** The derived base name (e.g. "Ethereum") */
  base: string;
  /** All variant names in the group, sorted with the primary (base) variant first */
  variants: string[];
}

/**
 * Group a list of icon names by their derived base name.
 * The primary (base name itself) variant is listed first when it exists.
 */
export function groupIcons(names: string[]): IconGroup[] {
  const map = new Map<string, string[]>();
  for (const name of names) {
    const base = getBaseName(name);
    const existing = map.get(base);
    if (existing) {
      existing.push(name);
    } else {
      map.set(base, [name]);
    }
  }

  return Array.from(map.entries()).map(([base, variants]) => {
    // Sort a copy so the exact base name comes first, then alphabetically
    const sorted = [...variants].sort((a, b) => {
      if (a === b) return 0;
      if (a === base) return -1;
      if (b === base) return 1;
      return a.localeCompare(b);
    });
    return { base, variants: sorted };
  });
}
