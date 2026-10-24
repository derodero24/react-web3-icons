import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Gallery from '../../../components/gallery/Gallery';
import { CATALOG_CATEGORIES, getIcons } from '../../../lib/catalog';
import { CATEGORY_INFO, isCategory } from '../../../lib/categories';

export const dynamicParams = false;

/** `dev tool` → `Dev tool`; `DeFi` and `DEX` stay as they are. */
function capitalize(text: string): string {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function generateStaticParams(): { category: string }[] {
  return CATALOG_CATEGORIES.map(category => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<'/icons/[category]'>): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const { noun, blurb } = CATEGORY_INFO[category];
  const title = `${capitalize(noun)} icons for React`;
  const description = `${getIcons(category).length} ${noun} icons as React components, colored and mono. ${blurb}`;
  return {
    title,
    description,
    alternates: { canonical: `/icons/${category}/` },
    openGraph: { title, description },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<'/icons/[category]'>) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const { noun, blurb } = CATEGORY_INFO[category];
  return (
    <div className="container px-4 sm:px-6">
      <header className="space-y-2 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          {capitalize(noun)} icons
        </h1>
        <p className="text-fg-muted">
          {blurb} Import them from{' '}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-fg">
            react-web3-icons/{category}
          </code>{' '}
          or the package root.
        </p>
      </header>
      <Gallery filter={category} />
    </div>
  );
}
