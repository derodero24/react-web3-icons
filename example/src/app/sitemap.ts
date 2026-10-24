import type { MetadataRoute } from 'next';
import { CATALOG, CATALOG_CATEGORIES } from '../lib/catalog';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/docs/',
    '/compare/',
    ...CATALOG_CATEGORIES.map(category => `/icons/${category}/`),
    ...CATALOG.map(icon => icon.href),
  ];
  return paths.map(path => ({ url: new URL(path, SITE_URL).href }));
}
