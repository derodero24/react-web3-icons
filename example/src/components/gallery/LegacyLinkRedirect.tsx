'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { categoryHref, isCategory } from '../../lib/categories';

/**
 * Sends links of the previous single-page site to the new pages:
 * `/?icon=<Name>` to the icon's page, `/?category=<category>` to the
 * category page (keeping `?q=`).
 */
export default function LegacyLinkRedirect({
  iconHrefs,
}: {
  /** Export name → icon page. */
  iconHrefs: Readonly<Record<string, string>>;
}) {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const icon = params.get('icon');
    if (icon !== null && Object.hasOwn(iconHrefs, icon)) {
      const href = iconHrefs[icon];
      if (href !== undefined) router.replace(href);
      return;
    }
    const category = params.get('category');
    if (category !== null && isCategory(category)) {
      const query = params.get('q');
      router.replace(
        `${categoryHref(category)}${query ? `?q=${encodeURIComponent(query)}` : ''}`,
      );
    }
  }, [iconHrefs, router]);
  return null;
}
