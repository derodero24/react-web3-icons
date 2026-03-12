import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import CodeBlock from '../../components/elements/CodeBlock';

export const metadata: Metadata = {
  title: 'Compare — React Web3 Icons',
  description:
    'How react-web3-icons compares to other Web3 icon libraries on bundle size, API design, and features.',
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mx-auto h-4 w-4 text-accent"
      aria-label="Yes"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mx-auto h-4 w-4 text-white/30"
      aria-label="No"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z"
      />
    </svg>
  );
}

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'bundle-size', label: 'Bundle Size' },
  { id: 'api', label: 'API Comparison' },
  { id: 'features', label: 'Feature Matrix' },
] as const;

const COMPARISON_ROWS: {
  feature: string;
  ours: ReactNode;
  theirs: ReactNode;
  note?: string;
}[] = [
  {
    feature: 'Tree-shakeable',
    ours: <CheckIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'TypeScript types',
    ours: <CheckIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'Colored variant',
    ours: <CheckIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'Mono variant',
    ours: <CheckIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'Background variant',
    ours: <CrossIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'Dynamic loading',
    ours: <CheckIcon />,
    theirs: <CrossIcon />,
    note: 'react-web3-icons/dynamic',
  },
  {
    feature: 'Meta maps (chain ID → name)',
    ours: <CheckIcon />,
    theirs: <CrossIcon />,
    note: 'react-web3-icons/meta',
  },
  {
    feature: 'JSDoc IDE hints',
    ours: <CheckIcon />,
    theirs: <CrossIcon />,
  },
  {
    feature: 'Category subpath imports',
    ours: <CheckIcon />,
    theirs: <CrossIcon />,
    note: '/chain, /coin, /wallet, …',
  },
  {
    feature: 'Raw SVG files',
    ours: <CheckIcon />,
    theirs: <CheckIcon />,
    note: 'dist/svg/<category>/<Name>.svg',
  },
  {
    feature: 'Figma plugin',
    ours: <CrossIcon />,
    theirs: <CheckIcon />,
  },
  {
    feature: 'Icon count',
    ours: <span className="text-sm text-white/70">~250</span>,
    theirs: <span className="text-sm text-white/70">2,500+</span>,
  },
];

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            Library Comparison
          </h1>
          <p className="mb-10 text-white/50">
            How{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-sm text-white/60">
              react-web3-icons
            </code>{' '}
            compares to{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-sm text-white/60">
              @web3icons/react
            </code>
            , the other widely-used Web3 icon library for React.
          </p>

          <div className="flex flex-col gap-10">
            {/* Overview */}
            <Section id="overview" title="Overview">
              <p className="mb-4 text-sm text-white/60">
                Both libraries provide React SVG icon components for Web3
                projects. They differ in scope and focus:
              </p>
              <ul className="mb-4 flex flex-col gap-2 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">→</span>
                  <span>
                    <strong className="font-medium text-white/80">
                      react-web3-icons
                    </strong>{' '}
                    prioritises a lean, production-ready bundle with
                    TypeScript-first ergonomics, per-category subpath imports,
                    and utilities like dynamic loaders and chain ID maps that go
                    beyond simple icon rendering.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">→</span>
                  <span>
                    <strong className="font-medium text-white/80">
                      @web3icons/react
                    </strong>{' '}
                    offers a much larger catalogue (2,500+ icons), a raw SVG
                    package for non-React consumers, and an accompanying Figma
                    plugin.
                  </span>
                </li>
              </ul>
            </Section>

            {/* Bundle Size */}
            <Section id="bundle-size" title="Bundle Size">
              <p className="mb-4 text-sm text-white/60">
                Because both libraries ship ES modules, your bundler tree-shakes
                unused icons automatically. The numbers below reflect
                gzip-compressed size for a handful of representative import
                patterns.
              </p>

              <div className="mb-6 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Bundle size comparison for react-web3-icons
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                        Import
                      </th>
                      <th className="py-2 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-white/50">
                        Raw
                      </th>
                      <th className="py-2 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-white/50">
                        Gzip
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {
                        label: 'Single icon (Ethereum)',
                        raw: '~1.2 KB',
                        gzip: '~0.6 KB',
                      },
                      {
                        label: 'Full coin category (/coin)',
                        raw: '~57 KB',
                        gzip: '~21 KB',
                      },
                      {
                        label: 'Full chain category (/chain)',
                        raw: '~29 KB',
                        gzip: '~12 KB',
                      },
                      {
                        label: 'Dynamic loader (/dynamic)',
                        raw: '~106 KB',
                        gzip: '~33 KB',
                      },
                      {
                        label: 'Entire library',
                        raw: '~142 KB',
                        gzip: '~46 KB',
                      },
                    ].map(row => (
                      <tr key={row.label}>
                        <td className="py-2 pr-4 pl-3 font-mono text-sm text-white/70">
                          {row.label}
                        </td>
                        <td className="py-2 pr-4 text-right font-mono text-sm text-white/50">
                          {row.raw}
                        </td>
                        <td className="py-2 pr-4 text-right font-mono text-sm text-white/50">
                          {row.gzip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-white/40">
                Measured with{' '}
                <code className="rounded bg-surface px-1 font-mono text-xs">
                  size-limit
                </code>{' '}
                on the published ESM build. Single-icon size varies by path
                complexity.
              </p>
            </Section>

            {/* API Comparison */}
            <Section id="api" title="API Comparison">
              <p className="mb-4 text-sm text-white/60">
                Both libraries expose named React components with a{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  size
                </code>{' '}
                prop and standard SVG passthrough. The main differences appear
                when you need dynamic loading or metadata.
              </p>

              <h3 className="mb-2 mt-6 text-sm font-semibold text-white/80">
                react-web3-icons
              </h3>
              <CodeBlock>{`// Named import — fully tree-shakeable
import { Ethereum, BitcoinCircle } from 'react-web3-icons';
// or from a category subpath (smaller bundle entry):
import { Ethereum } from 'react-web3-icons/chain';

<Ethereum size={32} />
<BitcoinCircle className="text-orange-500" size={48} />

// Dynamic loading by slug — no static import needed
import { ChainIcon } from 'react-web3-icons/dynamic';
<ChainIcon name="ethereum" size={32} />

// Chain ID → component name
import { CHAIN_ID_TO_NAME } from 'react-web3-icons/meta';
const name = CHAIN_ID_TO_NAME[1]; // "Ethereum"`}</CodeBlock>

              <h3 className="mb-2 mt-6 text-sm font-semibold text-white/80">
                @web3icons/react
              </h3>
              <CodeBlock>{`// Named import
import { IconEthereum } from '@web3icons/react';

<IconEthereum size={32} variant="branded" />
<IconEthereum size={32} variant="mono" />
<IconEthereum size={32} variant="background" />`}</CodeBlock>

              <p className="mt-4 text-sm text-white/60">
                Key differences:{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  react-web3-icons
                </code>{' '}
                uses separate exported names for each variant (
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  Ethereum
                </code>{' '}
                vs{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  EthereumMono
                </code>
                ), enabling per-variant tree-shaking.{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  @web3icons/react
                </code>{' '}
                uses a single component with a{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  variant
                </code>{' '}
                prop.
              </p>
            </Section>

            {/* Feature Matrix */}
            <Section id="features" title="Feature Matrix">
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Feature comparison between react-web3-icons and
                    @web3icons/react
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                        Feature
                      </th>
                      <th className="py-2 pr-4 text-center text-xs font-semibold uppercase tracking-wide text-white/50">
                        react-web3-icons
                      </th>
                      <th className="py-2 pr-4 text-center text-xs font-semibold uppercase tracking-wide text-white/50">
                        @web3icons/react
                      </th>
                      <th className="hidden py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-white/50 sm:table-cell">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {COMPARISON_ROWS.map(row => (
                      <tr key={row.feature}>
                        <td className="py-2.5 pr-4 pl-3 text-sm text-white/70">
                          {row.feature}
                        </td>
                        <td className="py-2.5 pr-4 text-center">{row.ours}</td>
                        <td className="py-2.5 pr-4 text-center">
                          {row.theirs}
                        </td>
                        <td className="hidden py-2.5 pr-4 text-sm text-white/40 sm:table-cell">
                          {row.note ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-white/40">
                Data current as of March 2026.{' '}
                <a
                  href="https://github.com/0xa3k5/web3icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/60"
                >
                  @web3icons/react source
                </a>
                .
              </p>
            </Section>
          </div>
        </div>

        {/* Sticky sidebar TOC (desktop only) */}
        <aside className="hidden lg:block">
          <nav aria-label="Table of contents" className="sticky top-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
              On this page
            </p>
            <ul className="flex flex-col gap-1.5 border-l border-border pl-3">
              {TOC_ITEMS.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-white/50 transition-colors hover:text-white/80"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
