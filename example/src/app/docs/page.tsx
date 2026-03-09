import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import CodeBlock from '../../components/elements/CodeBlock';

export const metadata: Metadata = {
  title: 'Docs — React Web3 Icons',
  description: 'API reference and usage guide for react-web3-icons.',
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

const TOC_ITEMS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'icon-props', label: 'Icon Props' },
  { id: 'icon-context', label: 'IconContext' },
  { id: 'import-patterns', label: 'Import Patterns' },
  { id: 'naming', label: 'Naming' },
  { id: 'deprecation', label: 'Deprecation' },
  { id: 'rsc', label: 'RSC' },
  { id: 'typescript', label: 'TypeScript' },
] as const;

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-white">API Reference</h1>
          <p className="mb-10 text-white/40">
            Usage guide and complete API reference for{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-sm text-white/60">
              react-web3-icons
            </code>
            .
          </p>

          <div className="flex flex-col gap-10">
            {/* Getting Started */}
            <Section id="getting-started" title="Getting Started">
              <p className="mb-3 text-sm text-white/60">
                Install via your package manager:
              </p>
              <CodeBlock>{`npm install react-web3-icons
# or
pnpm add react-web3-icons
# or
yarn add react-web3-icons`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-white/60">
                Import and use any icon component:
              </p>
              <CodeBlock>{`import { Ethereum, BitcoinCircle, MetaMask } from 'react-web3-icons';

export function MyComponent() {
  return (
    <div>
      <Ethereum size={32} />
      <BitcoinCircle className="text-orange-500" size={48} />
      <MetaMask title="MetaMask wallet" size={24} />
    </div>
  );
}`}</CodeBlock>
            </Section>

            {/* Icon Props */}
            <Section id="icon-props" title="Icon Props">
              <p className="mb-4 text-sm text-white/60">
                All icon components accept the following props in addition to
                standard SVG attributes.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Prop
                      </th>
                      <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Type
                      </th>
                      <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Default
                      </th>
                      <th className="py-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border pl-3">
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        size
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        {'string | number'}
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        {'"1em"'}
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        Sets both{' '}
                        <code className="rounded bg-surface px-1">width</code>{' '}
                        and{' '}
                        <code className="rounded bg-surface px-1">height</code>.
                        Accepts any valid CSS size or a unitless number (treated
                        as pixels).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        className
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        CSS class applied to the root{' '}
                        <code className="rounded bg-surface px-1">
                          {'<svg>'}
                        </code>
                        . Use{' '}
                        <code className="rounded bg-surface px-1">text-*</code>{' '}
                        utilities to set the color of{' '}
                        <code className="rounded bg-surface px-1">
                          currentColor
                        </code>{' '}
                        mono icons.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        title
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        Accessible label rendered as a{' '}
                        <code className="rounded bg-surface px-1">
                          {'<title>'}
                        </code>{' '}
                        element inside the SVG. When provided,{' '}
                        <code className="rounded bg-surface px-1">
                          aria-hidden
                        </code>{' '}
                        is removed automatically.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        titleId
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        Optional ID for the{' '}
                        <code className="rounded bg-surface px-1">
                          {'<title>'}
                        </code>{' '}
                        element. When both{' '}
                        <code className="rounded bg-surface px-1">title</code>{' '}
                        and{' '}
                        <code className="rounded bg-surface px-1">titleId</code>{' '}
                        are provided, the SVG sets{' '}
                        <code className="rounded bg-surface px-1">
                          aria-labelledby
                        </code>{' '}
                        to that ID.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        aria-hidden
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        boolean
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        true
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        Defaults to{' '}
                        <code className="rounded bg-surface px-1">true</code>{' '}
                        (decorative). Set to{' '}
                        <code className="rounded bg-surface px-1">false</code>{' '}
                        or supply a{' '}
                        <code className="rounded bg-surface px-1">title</code>{' '}
                        to expose the icon to screen readers.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                        style
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/60">
                        CSSProperties
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-white/40">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-white/60">
                        Inline styles merged (shallow spread) on top of any{' '}
                        <code className="rounded bg-surface px-1">
                          IconContext
                        </code>{' '}
                        defaults.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* IconContext */}
            <Section id="icon-context" title="IconContext">
              <p className="mb-3 text-sm text-white/60">
                Wrap a subtree with{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  IconContext.Provider
                </code>{' '}
                to apply default props to every icon inside it. Per-icon props
                always take precedence over context defaults.
              </p>
              <CodeBlock>{`import { IconContext } from 'react-web3-icons';

// Apply a default size and color to all icons in the subtree
<IconContext.Provider value={{ size: 24, className: 'text-gray-700' }}>
  <Ethereum />      {/* size=24, text-gray-700 */}
  <Bitcoin size={48} /> {/* size=48 (overrides context), text-gray-700 */}
</IconContext.Provider>`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-white/60">
                Context value accepts all{' '}
                <a
                  href="#icon-props"
                  className="text-accent underline hover:text-accent-hover"
                >
                  IconProps
                </a>
                .
              </p>
            </Section>

            {/* Import Patterns */}
            <Section id="import-patterns" title="Import Patterns">
              <p className="mb-3 text-sm text-white/60">
                Two ways to import icons:
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-1.5 text-sm font-medium text-white/80">
                    Named import from root entry
                  </p>
                  <CodeBlock>{`import { Ethereum, BitcoinMono } from 'react-web3-icons';`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-white/80">
                    Category subpath (better tree-shaking)
                  </p>
                  <CodeBlock>{`import { Ethereum } from 'react-web3-icons/chain';
import { Bitcoin, Doge } from 'react-web3-icons/coin';
import { MetaMask } from 'react-web3-icons/wallet';`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-white/80">
                    Available subpath categories
                  </p>
                  <CodeBlock>{`react-web3-icons/bridge
react-web3-icons/chain
react-web3-icons/coin
react-web3-icons/defi
react-web3-icons/devtool
react-web3-icons/dex
react-web3-icons/domain
react-web3-icons/exchange
react-web3-icons/explorer
react-web3-icons/marketplace
react-web3-icons/node
react-web3-icons/portfolio
react-web3-icons/storage
react-web3-icons/tracker
react-web3-icons/wallet`}</CodeBlock>
                </div>
              </div>
            </Section>

            {/* Naming Conventions */}
            <Section id="naming" title="Naming Conventions">
              <p className="mb-4 text-sm text-white/60">
                Icon names use PascalCase. Variant suffixes describe visual
                differences:
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Suffix
                      </th>
                      <th className="py-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['(none)', 'Default colored variant'],
                      [
                        'Mono',
                        'Single-color; uses currentColor — controlled via CSS color',
                      ],
                      ['Circle', 'Icon enclosed in a circle background'],
                      ['CircleMono', 'Circle variant in single-color'],
                      [
                        'Square',
                        'Icon enclosed in a square/rounded background',
                      ],
                      ['Wordmark', 'Full logo with logotype text'],
                      ['Symbol', 'Symbol-only mark without text'],
                      [
                        'Flat',
                        'Single-color simplification of the default design',
                      ],
                      ['Alt', 'Meaningfully different design or color scheme'],
                      [
                        'Light',
                        'White/light-colored artwork for dark backgrounds',
                      ],
                    ].map(([suffix, desc]) => (
                      <tr
                        key={suffix}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent">
                          {suffix}
                        </td>
                        <td className="py-2 align-top text-sm text-white/60">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Example:{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  Ethereum
                </code>
                ,{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  EthereumMono
                </code>
                ,{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  EthereumCircle
                </code>
                ,{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  EthereumCircleMono
                </code>
              </p>
            </Section>

            {/* Deprecation */}
            <Section id="deprecation" title="Deprecation Policy">
              <p className="mb-3 text-sm text-white/60">
                When a project rebrands, the old name stays as a deprecated
                re-export alias and is removed only in a major release (after at
                least one minor release and 90 days).
              </p>
              <p className="mb-3 text-sm text-white/60">
                A{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  DEPRECATED_ICON_NAMES
                </code>{' '}
                set is exported to help you filter deprecated aliases at
                runtime:
              </p>
              <CodeBlock>{`import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';
// or from the dedicated subpath (smaller bundle):
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons/deprecated';

// Get only current (non-deprecated) icon names:
import * as icons from 'react-web3-icons';
const activeNames = Object.keys(icons).filter(
  name =>
    !DEPRECATED_ICON_NAMES.has(name) &&
    name !== 'IconContext' &&
    name !== 'DEPRECATED_ICON_NAMES',
);`}</CodeBlock>
            </Section>

            {/* RSC */}
            <Section id="rsc" title="React Server Components">
              <p className="mb-3 text-sm text-white/60">
                Icons use{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  useId
                </code>{' '}
                and{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  useContext
                </code>
                , so they cannot render in React Server Components directly.
                Mark the importing file as a Client Component:
              </p>
              <CodeBlock>{`// my-component.tsx
'use client';

import { Ethereum } from 'react-web3-icons';

export function MyComponent() {
  return <Ethereum size={24} />;
}`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-white/60">
                Alternatively, create a small re-export wrapper:
              </p>
              <CodeBlock>{`// icons.tsx — client boundary
'use client';
export { Ethereum, Bitcoin } from 'react-web3-icons';`}</CodeBlock>
            </Section>

            {/* TypeScript */}
            <Section id="typescript" title="TypeScript">
              <p className="mb-3 text-sm text-white/60">
                The{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  IconName
                </code>{' '}
                union type enumerates every exported icon name and is useful for
                type-safe dynamic icon selection:
              </p>
              <CodeBlock>{`import type { IconName } from 'react-web3-icons';
import * as icons from 'react-web3-icons';

function DynamicIcon({ name, size }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} />;
}`}</CodeBlock>
            </Section>
          </div>
        </div>

        {/* Sticky sidebar TOC (desktop only) */}
        <aside className="hidden lg:block">
          <nav aria-label="Table of contents" className="sticky top-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
              On this page
            </p>
            <ul className="flex flex-col gap-1.5 border-l border-border pl-3">
              {TOC_ITEMS.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-white/40 transition-colors hover:text-white/80"
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
