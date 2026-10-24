import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import pkg from '../../../../../../package.json';
import CodeBlock from '../../../../components/elements/CodeBlock';
import IconCard from '../../../../components/gallery/IconCard';
import PreviewBackground from '../../../../components/icon/PreviewBackground';
import VariantCard from '../../../../components/icon/VariantCard';
import {
  CATALOG,
  type CatalogIcon,
  getIcon,
  getIcons,
  getRelated,
} from '../../../../lib/catalog';
import { CATEGORY_INFO, kebab } from '../../../../lib/categories';

export const dynamicParams = false;

export function generateStaticParams(): { category: string; slug: string }[] {
  return CATALOG.map(icon => ({ category: icon.category, slug: icon.slug }));
}

async function resolveIcon(
  params: PageProps<'/icons/[category]/[slug]'>['params'],
): Promise<CatalogIcon> {
  const { category, slug } = await params;
  const icon = getIcon(category, slug);
  if (!icon) notFound();
  return icon;
}

function describe(icon: CatalogIcon): string {
  const kinds = icon.variants.map(variant => variant.label).join(', ');
  return `${icon.name} ${CATEGORY_INFO[icon.category].noun} icon as a React component and SVG: ${icon.variants.length} variants (${kinds}).`;
}

export async function generateMetadata({
  params,
}: PageProps<'/icons/[category]/[slug]'>): Promise<Metadata> {
  const icon = await resolveIcon(params);
  const title = `${icon.name} icon`;
  const description = describe(icon);
  return {
    title,
    description,
    alternates: { canonical: icon.href },
    openGraph: { title, description },
  };
}

/** Turns the URLs in a provenance line into links. */
function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((part, index) =>
    index % 2 === 1 ? (
      <a
        // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-accent-fg underline-offset-2 hover:underline"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function usageSnippets(icon: CatalogIcon): { title: string; code: string }[] {
  const { name, category, dynamic } = icon;
  const snippets = [
    {
      title: 'Import',
      code: `import { ${name} } from 'react-web3-icons';\n\n<${name} size={32} />`,
    },
    {
      title: 'Category subpath',
      code: `import { ${name} } from 'react-web3-icons/${category}';`,
    },
  ];
  if (dynamic) {
    const value =
      typeof dynamic.value === 'number'
        ? `{${dynamic.value}}`
        : `"${dynamic.value}"`;
    snippets.push({
      title: 'Lookup at runtime',
      code: `import { ${dynamic.component} } from 'react-web3-icons/dynamic';\n\n<${dynamic.component} ${dynamic.prop}=${value} />`,
    });
  }
  const iconifyName = `${category}-${kebab(name)}`;
  snippets.push(
    {
      title: 'SVG file (CDN)',
      code: `https://cdn.jsdelivr.net/npm/react-web3-icons@${pkg.version}/dist/svg/${category}/${name}.svg`,
    },
    {
      title: 'Iconify (Vue, Svelte, web components)',
      code: `// collection: react-web3-icons/iconify.json (prefix "web3")\n<Icon icon="web3:${iconifyName}" />`,
    },
  );
  return snippets;
}

export default async function IconPage({
  params,
}: PageProps<'/icons/[category]/[slug]'>) {
  const icon = await resolveIcon(params);
  const { label } = CATEGORY_INFO[icon.category];
  const [primary] = icon.variants;
  const Primary = primary.Component;
  const related = getRelated(icon);
  // Alphabetical neighbours in the category, the icon itself in the middle.
  const siblings = getIcons(icon.category).filter(
    other => other === icon || !related.includes(other),
  );
  const at = siblings.indexOf(icon);
  const start = Math.max(0, Math.min(at - 6, siblings.length - 13));
  const more = siblings
    .slice(start, start + 13)
    .filter(other => other !== icon);
  const keys = [
    { term: 'Chain IDs', values: icon.chainIds.map(String) },
    { term: 'Tickers', values: icon.tickers },
    { term: 'Slugs', values: icon.slugs },
    { term: 'Search aliases', values: icon.aliases },
  ].filter(row => row.values.length > 0);

  return (
    <article className="container space-y-14 px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-fg-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-fg">
              Icons
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/icons/${icon.category}/`} className="hover:text-fg">
              {label}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-fg">
            {icon.name}
          </li>
        </ol>
      </nav>

      <header className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-border bg-surface">
          <Primary size={96} />
        </div>
        <div className="min-w-0 space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              {icon.name}
            </h1>
            <p className="text-fg-muted">{describe(icon)}</p>
          </div>
          <dl className="flex flex-wrap gap-2 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <dt className="text-fg-muted">Category</dt>
              <dd>
                <Link
                  href={`/icons/${icon.category}/`}
                  className="hover:underline"
                >
                  {icon.category}
                </Link>
              </dd>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
              <dt className="text-fg-muted">Brand color</dt>
              <dd className="flex items-center gap-1.5 font-mono">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: icon.brandColor }}
                />
                {icon.brandColor}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <Section title="Variants" id="variants">
        <PreviewBackground>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
            {icon.variants.map(variant => {
              const Variant = variant.Component;
              return (
                <VariantCard
                  key={variant.name}
                  name={variant.name}
                  label={variant.label}
                  svg={variant.svg}
                >
                  <Variant size={72} />
                </VariantCard>
              );
            })}
          </ul>
        </PreviewBackground>
      </Section>

      <Section title="Usage" id="usage">
        <div className="grid gap-4 lg:grid-cols-2">
          {usageSnippets(icon).map(snippet => (
            <div key={snippet.title} className="min-w-0 space-y-2">
              <h3 className="text-sm font-medium text-fg-muted">
                {snippet.title}
              </h3>
              <CodeBlock>{snippet.code}</CodeBlock>
            </div>
          ))}
        </div>
      </Section>

      {keys.length > 0 && (
        <Section title="Lookup keys" id="lookup-keys">
          <p className="text-sm text-fg-muted">
            The keys that{' '}
            <Link href="/docs/#dynamic" className="underline">
              dynamic components
            </Link>{' '}
            and <code className="font-mono">react-web3-icons/meta</code> resolve
            to this icon.
          </p>
          <dl className="divide-y divide-border rounded-xl border border-border">
            {keys.map(row => (
              <div
                key={row.term}
                className="grid gap-2 px-4 py-3 sm:grid-cols-[10rem_1fr]"
              >
                <dt className="text-sm text-fg-muted">{row.term}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {row.values.map(value => (
                    <code
                      key={value}
                      className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm"
                    >
                      {value}
                    </code>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title="Source" id="source">
        <div className="space-y-4 rounded-xl border border-border p-4 text-sm">
          {icon.source.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5">
              {icon.source.map(line => (
                <li key={line}>{linkify(line)}</li>
              ))}
            </ul>
          ) : (
            <p className="text-fg-muted">No source recorded.</p>
          )}
          {icon.notes.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-fg-muted hover:text-fg">
                How the artwork was drawn
              </summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-fg-muted">
                {icon.notes.map(line => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
          )}
          <p className="text-fg-muted">
            Defined in{' '}
            <a
              href={`https://github.com/derodero24/react-web3-icons/blob/develop/${icon.unitPath}`}
              className="font-mono text-accent-fg hover:underline"
            >
              {icon.unitPath}
            </a>
            . Spotted an outdated logo?{' '}
            <a
              href={`https://github.com/derodero24/react-web3-icons/issues/new?template=bug.yml&title=${encodeURIComponent(`${icon.name}: `)}`}
              className="text-accent-fg hover:underline"
            >
              Report it
            </a>
            .
          </p>
        </div>
      </Section>

      {related.length > 0 && (
        <Section title="Same brand" id="related">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3 [--icon-size:32px]">
            {related.map(other => (
              <IconCard key={other.id} icon={other} />
            ))}
          </ul>
        </Section>
      )}

      {more.length > 0 && (
        <Section title={`More ${label.toLowerCase()}`} id="more">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3 [--icon-size:32px]">
            {more.map(other => (
              <IconCard key={other.id} icon={other} />
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}
