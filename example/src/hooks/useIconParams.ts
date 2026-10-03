'use client';

import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';
import { CATEGORY_FILTERS } from '../utils/icons';

// URL state for the icon browser. These hooks read `useSearchParams`, so any
// component using them must render inside a <Suspense> boundary to keep the
// rest of the page statically prerendered.

/** `?category=` — unknown values fall back to "all". */
export function useCategoryParam() {
  return useQueryState(
    'category',
    parseAsStringLiteral(CATEGORY_FILTERS).withDefault('all'),
  );
}

/** `?q=` — search keyword. */
export function useKeywordParam() {
  return useQueryState('q', parseAsString.withDefault(''));
}

/** `?icon=` — base name of the icon whose drawer is open. */
export function useLinkedIconParam() {
  return useQueryState(
    'icon',
    parseAsString.withDefault('').withOptions({ history: 'push' }),
  );
}
