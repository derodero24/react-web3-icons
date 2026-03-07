import type { Metadata } from 'next';

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
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-950">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-orbitron text-3xl font-bold text-gray-900 dark:text-gray-100">
        API Reference
      </h1>
      <p className="mb-10 text-gray-500 dark:text-gray-400">
        Usage guide and complete API reference for{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800">
          react-web3-icons
        </code>
        .
      </p>

      <div className="flex flex-col gap-10">
        {/* Getting Started */}
        <Section id="getting-started" title="Getting Started">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Install via your package manager:
          </p>
          <Code>{`npm install react-web3-icons
# or
pnpm add react-web3-icons
# or
yarn add react-web3-icons`}</Code>
          <p className="mt-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            Import and use any icon component:
          </p>
          <Code>{`import { Ethereum, BitcoinCircle, MetaMask } from 'react-web3-icons';

export function MyComponent() {
  return (
    <div>
      <Ethereum size={32} />
      <BitcoinCircle className="text-orange-500" size={48} />
      <MetaMask title="MetaMask wallet" size={24} />
    </div>
  );
}`}</Code>
        </Section>

        {/* Icon Props */}
        <Section id="icon-props" title="Icon Props">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            All icon components accept the following props in addition to
            standard SVG attributes.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Prop
                  </th>
                  <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Type
                  </th>
                  <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Default
                  </th>
                  <th className="py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 pl-3 dark:divide-gray-700">
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    size
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    {'string | number'}
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    {'"1em"'}
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    Sets both{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      width
                    </code>{' '}
                    and{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      height
                    </code>
                    . Accepts any valid CSS size or a unitless number (treated
                    as pixels).
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    className
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    string
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    —
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    CSS class applied to the root{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      {'<svg>'}
                    </code>
                    . Use{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      text-*
                    </code>{' '}
                    utilities to set the color of{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      currentColor
                    </code>{' '}
                    mono icons.
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    title
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    string
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    —
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    Accessible label rendered as a{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      {'<title>'}
                    </code>{' '}
                    element inside the SVG. When provided,{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      aria-hidden
                    </code>{' '}
                    is removed automatically.
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    titleId
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    string
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    auto
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    ID for the{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      {'<title>'}
                    </code>{' '}
                    element. When both{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      title
                    </code>{' '}
                    and{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      titleId
                    </code>{' '}
                    are provided, the SVG sets{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      aria-labelledby
                    </code>{' '}
                    automatically.
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    aria-hidden
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    boolean
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    true
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    Defaults to{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      true
                    </code>{' '}
                    (decorative). Set to{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      false
                    </code>{' '}
                    or supply a{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
                      title
                    </code>{' '}
                    to expose the icon to screen readers.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                    style
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-600 dark:text-gray-400">
                    CSSProperties
                  </td>
                  <td className="py-2 pr-4 align-top font-mono text-sm text-gray-500">
                    —
                  </td>
                  <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                    Inline styles merged (shallow spread) on top of any{' '}
                    <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
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
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Wrap a subtree with{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              IconContext.Provider
            </code>{' '}
            to apply default props to every icon inside it. Per-icon props
            always take precedence over context defaults.
          </p>
          <Code>{`import { IconContext } from 'react-web3-icons';

// Apply a default size and color to all icons in the subtree
<IconContext.Provider value={{ size: 24, className: 'text-gray-700' }}>
  <Ethereum />      {/* size=24, text-gray-700 */}
  <Bitcoin size={48} /> {/* size=48 (overrides context), text-gray-700 */}
</IconContext.Provider>`}</Code>
          <p className="mt-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            Context value accepts all{' '}
            <a
              href="#icon-props"
              className="text-indigo-600 underline hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              IconProps
            </a>
            .
          </p>
        </Section>

        {/* Import Patterns */}
        <Section id="import-patterns" title="Import Patterns">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Three equivalent ways to import icons:
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Named import from root entry
              </p>
              <Code>{`import { Ethereum, BitcoinMono } from 'react-web3-icons';`}</Code>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Category subpath (better tree-shaking)
              </p>
              <Code>{`import { Ethereum } from 'react-web3-icons/chain';
import { Bitcoin, Doge } from 'react-web3-icons/coin';
import { MetaMask } from 'react-web3-icons/wallet';`}</Code>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Available subpath categories
              </p>
              <Code>{`react-web3-icons/bridge
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
react-web3-icons/wallet`}</Code>
            </div>
          </div>
        </Section>

        {/* Naming Conventions */}
        <Section id="naming" title="Naming Conventions">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Icon names use PascalCase. Variant suffixes describe visual
            differences:
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                  <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Suffix
                  </th>
                  <th className="py-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
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
                  ['Square', 'Icon enclosed in a square/rounded background'],
                  ['Wordmark', 'Full logo with logotype text'],
                  ['Symbol', 'Symbol-only mark without text'],
                  ['Flat', 'Single-color simplification of the default design'],
                  ['Alt', 'Meaningfully different design or color scheme'],
                  ['Light', 'White/light-colored artwork for dark backgrounds'],
                ].map(([suffix, desc]) => (
                  <tr
                    key={suffix}
                    className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                  >
                    <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-indigo-600 dark:text-indigo-400">
                      {suffix}
                    </td>
                    <td className="py-2 align-top text-sm text-gray-700 dark:text-gray-300">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Example:{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              Ethereum
            </code>
            ,{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              EthereumMono
            </code>
            ,{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              EthereumCircle
            </code>
            ,{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              EthereumCircleMono
            </code>
          </p>
        </Section>

        {/* Deprecation */}
        <Section id="deprecation" title="Deprecation Policy">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            When a project rebrands, the old name stays as a deprecated
            re-export alias and is removed only in a major release (after at
            least one minor release and 90 days).
          </p>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            A{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              DEPRECATED_ICON_NAMES
            </code>{' '}
            set is exported to help you filter deprecated aliases at runtime:
          </p>
          <Code>{`import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';
// or from the dedicated subpath (smaller bundle):
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons/deprecated';

// Get only current (non-deprecated) icon names:
import * as icons from 'react-web3-icons';
const activeNames = Object.keys(icons).filter(
  name =>
    !DEPRECATED_ICON_NAMES.has(name) &&
    name !== 'IconContext' &&
    name !== 'DEPRECATED_ICON_NAMES',
);`}</Code>
        </Section>

        {/* RSC */}
        <Section id="rsc" title="React Server Components">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Icons use{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              useId
            </code>{' '}
            and{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              useContext
            </code>
            , so they cannot render in React Server Components directly. Mark
            the importing file as a Client Component:
          </p>
          <Code>{`// my-component.tsx
'use client';

import { Ethereum } from 'react-web3-icons';

export function MyComponent() {
  return <Ethereum size={24} />;
}`}</Code>
          <p className="mt-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            Alternatively, create a small re-export wrapper:
          </p>
          <Code>{`// icons.tsx — client boundary
'use client';
export { Ethereum, Bitcoin } from 'react-web3-icons';`}</Code>
        </Section>

        {/* TypeScript */}
        <Section id="typescript" title="TypeScript">
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            The{' '}
            <code className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-gray-800">
              IconName
            </code>{' '}
            union type enumerates every exported icon name and is useful for
            type-safe dynamic icon selection:
          </p>
          <Code>{`import type { IconName } from 'react-web3-icons';
import * as icons from 'react-web3-icons';

function DynamicIcon({ name, size }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} />;
}`}</Code>
        </Section>
      </div>

      {/* Nav links */}
      <nav className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-700">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            ['#getting-started', 'Getting Started'],
            ['#icon-props', 'Icon Props'],
            ['#icon-context', 'IconContext'],
            ['#import-patterns', 'Import Patterns'],
            ['#naming', 'Naming'],
            ['#deprecation', 'Deprecation'],
            ['#rsc', 'RSC'],
            ['#typescript', 'TypeScript'],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
