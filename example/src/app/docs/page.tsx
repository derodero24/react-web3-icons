import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type {
  BridgeVariant,
  ChainVariant,
  CoinVariant,
  DefiVariant,
  DexVariant,
  ExchangeVariant,
  OracleVariant,
  WalletVariant,
} from 'react-web3-icons/dynamic';
import {
  BRIDGE_SLUG_TO_NAME,
  CHAIN_ID_TO_NAME,
  CHAIN_SLUG_TO_NAME,
  DEFI_SLUG_TO_NAME,
  DEX_SLUG_TO_NAME,
  EXCHANGE_SLUG_TO_NAME,
  ORACLE_SLUG_TO_NAME,
  TICKER_TO_COIN,
  WALLET_SLUG_TO_NAME,
} from 'react-web3-icons/meta';
import pkg from '../../../../package.json';
import CodeBlock from '../../components/elements/CodeBlock';
import { ICON_CATEGORIES } from '../../utils/icons';

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
      <h2 className="mb-4 text-xl font-semibold text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface px-1 font-mono text-sm">
      {children}
    </code>
  );
}

const TH_CLASS =
  'py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-fg-muted first:pl-3';
const TD_CLASS = 'py-2 pr-4 align-top text-sm text-fg/60 first:pl-3';

/**
 * The values of a `variant` union besides `'colored'` and `'mono'`. The
 * record must name every value of `V` and nothing else, so the page fails to
 * type-check (and `next build` fails) when a category's generated variant
 * union (src/dynamic/imports/<category>.ts) gains or loses a value.
 */
function variantsOf<V extends string>(all: Record<V, true>): string[] {
  return Object.keys(all).filter(v => v !== 'colored' && v !== 'mono');
}

/** Dynamic components, their identifier props and variants (src/dynamic). */
const DYNAMIC_COMPONENTS: readonly {
  component: string;
  identifier: string;
  resolvesWith: string;
  variants: readonly string[];
}[] = [
  {
    component: 'ChainIcon',
    identifier: 'chainId: ChainId | number, name: ChainSlug | string, or both',
    resolvesWith: 'CHAIN_ID_TO_NAME, CHAIN_SLUG_TO_NAME',
    variants: variantsOf<ChainVariant>({
      colored: true,
      mono: true,
      Circle: true,
      CircleMono: true,
      Square: true,
      SquareMono: true,
    }),
  },
  {
    component: 'CoinIcon',
    identifier: 'symbol: Ticker | string',
    resolvesWith: 'TICKER_TO_COIN',
    variants: variantsOf<CoinVariant>({
      colored: true,
      mono: true,
      Alt: true,
      Circle: true,
      CircleMono: true,
      Square: true,
      SquareMono: true,
    }),
  },
  {
    component: 'WalletIcon',
    identifier: 'name: WalletSlug | string',
    resolvesWith: 'WALLET_SLUG_TO_NAME',
    variants: variantsOf<WalletVariant>({
      colored: true,
      mono: true,
      Circle: true,
      CircleMono: true,
      Square: true,
      SquareMono: true,
      Symbol: true,
      SymbolMono: true,
    }),
  },
  {
    component: 'ExchangeIcon',
    identifier: 'name: ExchangeSlug | string',
    resolvesWith: 'EXCHANGE_SLUG_TO_NAME',
    variants: variantsOf<ExchangeVariant>({
      colored: true,
      mono: true,
      Circle: true,
      CircleAlt: true,
      CircleMono: true,
      Inverted: true,
      Square: true,
      SquareMono: true,
    }),
  },
  {
    component: 'DefiIcon',
    identifier: 'name: DefiSlug | string',
    resolvesWith: 'DEFI_SLUG_TO_NAME',
    variants: variantsOf<DefiVariant>({
      colored: true,
      mono: true,
      Circle: true,
      CircleMono: true,
    }),
  },
  {
    component: 'DexIcon',
    identifier: 'name: DexSlug | string',
    resolvesWith: 'DEX_SLUG_TO_NAME',
    variants: variantsOf<DexVariant>({
      colored: true,
      mono: true,
      Circle: true,
      CircleMono: true,
      Inverted: true,
      Square: true,
      SquareMono: true,
    }),
  },
  {
    component: 'BridgeIcon',
    identifier: 'name: BridgeSlug | string',
    resolvesWith: 'BRIDGE_SLUG_TO_NAME',
    variants: variantsOf<BridgeVariant>({
      colored: true,
      mono: true,
      Inverted: true,
    }),
  },
  {
    component: 'OracleIcon',
    identifier: 'name: OracleSlug | string',
    resolvesWith: 'ORACLE_SLUG_TO_NAME',
    variants: variantsOf<OracleVariant>({ colored: true, mono: true }),
  },
];

/** Lookup maps exported from react-web3-icons/meta; entry counts are live. */
const META_MAPS: readonly {
  name: string;
  keyType: string;
  key: string;
  category: string;
  map: Readonly<Record<string | number, string>>;
}[] = [
  {
    name: 'CHAIN_ID_TO_NAME',
    keyType: 'ChainId',
    key: 'EVM chain ID (1, 8453, …)',
    category: 'chain',
    map: CHAIN_ID_TO_NAME,
  },
  {
    name: 'CHAIN_SLUG_TO_NAME',
    keyType: 'ChainSlug',
    key: "Lowercase slug ('arbitrum')",
    category: 'chain',
    map: CHAIN_SLUG_TO_NAME,
  },
  {
    name: 'TICKER_TO_COIN',
    keyType: 'Ticker',
    key: "Uppercase ticker ('ETH')",
    category: 'coin',
    map: TICKER_TO_COIN,
  },
  {
    name: 'WALLET_SLUG_TO_NAME',
    keyType: 'WalletSlug',
    key: "Lowercase slug ('metamask')",
    category: 'wallet',
    map: WALLET_SLUG_TO_NAME,
  },
  {
    name: 'EXCHANGE_SLUG_TO_NAME',
    keyType: 'ExchangeSlug',
    key: "Lowercase slug ('binance')",
    category: 'exchange',
    map: EXCHANGE_SLUG_TO_NAME,
  },
  {
    name: 'DEFI_SLUG_TO_NAME',
    keyType: 'DefiSlug',
    key: "Lowercase slug ('etherfi')",
    category: 'defi',
    map: DEFI_SLUG_TO_NAME,
  },
  {
    name: 'DEX_SLUG_TO_NAME',
    keyType: 'DexSlug',
    key: "Lowercase slug ('uniswap')",
    category: 'dex',
    map: DEX_SLUG_TO_NAME,
  },
  {
    name: 'BRIDGE_SLUG_TO_NAME',
    keyType: 'BridgeSlug',
    key: "Lowercase slug ('layerzero')",
    category: 'bridge',
    map: BRIDGE_SLUG_TO_NAME,
  },
  {
    name: 'ORACLE_SLUG_TO_NAME',
    keyType: 'OracleSlug',
    key: "Lowercase slug ('pyth')",
    category: 'oracle',
    map: ORACLE_SLUG_TO_NAME,
  },
];

const TOC_ITEMS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'icon-props', label: 'Icon Props' },
  { id: 'import-patterns', label: 'Import Patterns' },
  { id: 'dynamic', label: 'Dynamic Components' },
  { id: 'meta', label: 'Metadata Maps' },
  { id: 'naming', label: 'Naming' },
  { id: 'deprecation', label: 'Deprecation' },
  { id: 'rsc', label: 'RSC' },
  { id: 'distribution', label: 'Beyond React' },
  { id: 'typescript', label: 'TypeScript' },
] as const;

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-fg">API Reference</h1>
          <p className="mb-10 text-fg-muted">
            Usage guide and complete API reference for{' '}
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-sm text-fg/60">
              react-web3-icons
            </code>
            .
          </p>

          <div className="flex flex-col gap-10">
            {/* Getting Started */}
            <Section id="getting-started" title="Getting Started">
              <p className="mb-3 text-sm text-fg/60">
                Install via your package manager:
              </p>
              <CodeBlock>{`npm install react-web3-icons
# or
pnpm add react-web3-icons
# or
yarn add react-web3-icons`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-fg/60">
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
              <p className="mb-4 text-sm text-fg/60">
                All icon components accept the following props in addition to
                standard SVG attributes.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">Icon component props</caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                        Prop
                      </th>
                      <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                        Type
                      </th>
                      <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                        Default
                      </th>
                      <th className="py-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border pl-3">
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        size
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        {'string | number'}
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        {'"1em"'}
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
                        Sets both{' '}
                        <code className="rounded bg-surface px-1">width</code>{' '}
                        and{' '}
                        <code className="rounded bg-surface px-1">height</code>.
                        Accepts any valid CSS size or a unitless number (treated
                        as pixels).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        className
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
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
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        title
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
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
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        titleId
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        string
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
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
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        aria-hidden
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        boolean
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        true
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
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
                      <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                        style
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg/60">
                        CSSProperties
                      </td>
                      <td className="py-2 pr-4 align-top font-mono text-sm text-fg-muted">
                        —
                      </td>
                      <td className="py-2 align-top text-sm text-fg/60">
                        Inline styles applied to the SVG element.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Import Patterns */}
            <Section id="import-patterns" title="Import Patterns">
              <p className="mb-3 text-sm text-fg/60">
                Two ways to import icons:
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="mb-1.5 text-sm font-medium text-fg/80">
                    Named import from root entry
                  </p>
                  <CodeBlock>{`import { Ethereum, BitcoinMono } from 'react-web3-icons';`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-fg/80">
                    Category subpath (tree-shakes the same, grouped by category)
                  </p>
                  <CodeBlock>{`import { Ethereum } from 'react-web3-icons/chain';
import { Bitcoin, Doge } from 'react-web3-icons/coin';
import { MetaMask } from 'react-web3-icons/wallet';`}</CodeBlock>
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-medium text-fg/80">
                    Available subpath categories
                  </p>
                  <CodeBlock>
                    {ICON_CATEGORIES.map(
                      category => `react-web3-icons/${category}`,
                    ).join('\n')}
                  </CodeBlock>
                </div>
              </div>
            </Section>

            {/* Dynamic components */}
            <Section id="dynamic" title="Dynamic Components">
              <p className="mb-3 text-sm text-fg/60">
                <Code>react-web3-icons/dynamic</Code> resolves an icon from
                runtime data (chain ID, slug, ticker, wallet connector id) and
                lazy-loads only that icon&apos;s chunk. These are client
                components (<Code>&apos;use client&apos;</Code>); each wraps the
                lazy icon in its own <Code>{'<Suspense>'}</Code>.
              </p>
              <CodeBlock>{`import { ChainIcon, CoinIcon, WalletIcon } from 'react-web3-icons/dynamic';

<ChainIcon chainId={chain.id} name={chain.slug} size={24} />
<CoinIcon symbol={token.symbol} variant="mono" fallback={<Placeholder />} />
<WalletIcon name={connector.id} variant="Square" />`}</CodeBlock>
              <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Dynamic icon components, their identifier props and variants
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className={TH_CLASS}>Component</th>
                      <th className={TH_CLASS}>Identifier props</th>
                      <th className={TH_CLASS}>Resolved via</th>
                      <th className={TH_CLASS}>
                        Variants besides colored and mono
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {DYNAMIC_COMPONENTS.map(row => (
                      <tr key={row.component}>
                        <td className={`${TD_CLASS} font-mono text-accent-fg`}>
                          {row.component}
                        </td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {row.identifier}
                        </td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {row.resolvesWith}
                        </td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {row.variants.join(', ') || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                Every dynamic component also accepts:
              </p>
              <ul className="mb-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-fg/60">
                <li>
                  <Code>variant</Code> — <Code>&apos;colored&apos;</Code> (the
                  default), <Code>&apos;mono&apos;</Code> (the{' '}
                  <Code>{'<Name>Mono'}</Code> export), or a variant suffix of
                  the category from the table (<Code>&apos;Circle&apos;</Code>{' '}
                  loads <Code>{'<Name>Circle'}</Code>). The prop is typed with
                  the category&apos;s union (<Code>ChainVariant</Code>,{' '}
                  <Code>CoinVariant</Code>, …), exported from{' '}
                  <Code>react-web3-icons/dynamic</Code>, so a typo is a type
                  error. Not every icon ships every variant of its category;
                  check the manifest&apos;s <Code>variants</Code>.
                </li>
                <li>
                  <Code>fallback?: ReactNode</Code> — rendered while the chunk
                  loads, when the identifier is not recognized (including{' '}
                  <Code>undefined</Code> or <Code>null</Code> from untyped
                  data), when the variant is unknown or the icon does not ship
                  it, and when the chunk fails to load (a later render retries
                  the import). Default: nothing.
                </li>
                <li>
                  All icon props (<Code>size</Code>, <Code>className</Code>,{' '}
                  <Code>title</Code>, …) and <Code>ref</Code>, forwarded to the
                  loaded icon&apos;s <Code>{'<svg>'}</Code>.
                </li>
              </ul>
              <p className="mb-3 text-sm text-fg/60">
                Names, slugs and tickers resolve through the metadata maps, with
                both sides normalized the same way: lowercased, with whitespace,{' '}
                <Code>.</Code>, <Code>-</Code> and <Code>_</Code> removed. So{' '}
                <Code>&apos;Arbitrum Nova&apos;</Code>,{' '}
                <Code>&apos;arbitrum_nova&apos;</Code> and{' '}
                <Code>&apos;arbitrum-nova&apos;</Code> are the same key, as are{' '}
                <Code>&apos;Ether.fi&apos;</Code> /{' '}
                <Code>&apos;etherfi&apos;</Code> and{' '}
                <Code>&apos;eth&apos;</Code> / <Code>&apos;ETH&apos;</Code>. The
                keys include legacy names, the manifest&apos;s search aliases
                and common wallet connector ids (
                <Code>&apos;metaMaskSDK&apos;</Code>,{' '}
                <Code>&apos;walletConnect&apos;</Code>, …).
              </p>
              <p className="mb-3 text-sm text-fg/60">
                <Code>ChainIcon</Code> needs <Code>chainId</Code> or{' '}
                <Code>name</Code>. <Code>chainId</Code> takes precedence; an
                unknown <Code>chainId</Code> falls back to <Code>name</Code>, so{' '}
                <Code>
                  {'<ChainIcon chainId={chain.id} name={chain.slug} />'}
                </Code>{' '}
                still renders a chain without a registered ID.
              </p>
              <p className="text-sm text-fg/60">
                Identifier props autocomplete the known keys but accept any
                string (and <Code>chainId</Code> any number), so values from API
                data type-check; one that matches nothing renders{' '}
                <Code>fallback</Code>. In development builds, an unknown
                identifier, an unknown or missing variant and a failed load each
                log one <Code>console.warn</Code>; production builds strip these
                warnings. Details:{' '}
                <a
                  href="https://github.com/derodero24/react-web3-icons#dynamic-icon-components"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg/80"
                >
                  README, Dynamic Icon Components
                </a>
                .
              </p>
            </Section>

            {/* Metadata maps */}
            <Section id="meta" title="Metadata Maps">
              <p className="mb-3 text-sm text-fg/60">
                <Code>react-web3-icons/meta</Code> exports the plain lookup
                tables behind the dynamic components. Each maps an identifier to
                an icon base name (append <Code>Mono</Code> for the monochrome
                export), has a matching key type for narrowing, and works in
                server components:
              </p>
              <div className="mb-4 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">Metadata lookup maps</caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className={TH_CLASS}>Export</th>
                      <th className={TH_CLASS}>Key type</th>
                      <th className={TH_CLASS}>Key</th>
                      <th className={TH_CLASS}>Icons from</th>
                      <th className={TH_CLASS}>Entries</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {META_MAPS.map(row => (
                      <tr key={row.name}>
                        <td className={`${TD_CLASS} font-mono text-accent-fg`}>
                          {row.name}
                        </td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {row.keyType}
                        </td>
                        <td className={TD_CLASS}>{row.key}</td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {row.category}
                        </td>
                        <td className={`${TD_CLASS} font-mono`}>
                          {Object.keys(row.map).length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CodeBlock>{`import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';
import * as chains from 'react-web3-icons/chain'; // bundles every chain icon

function isChainId(id: number): id is ChainId {
  return Object.hasOwn(CHAIN_ID_TO_NAME, id);
}

function ChainLogo({ chainId }: { chainId: number }) {
  if (!isChainId(chainId)) return null;
  const Icon = chains[CHAIN_ID_TO_NAME[chainId]]; // 8453 → Base
  return <Icon size={20} />;
}`}</CodeBlock>
            </Section>

            {/* Naming Conventions */}
            <Section id="naming" title="Naming Conventions">
              <p className="mb-4 text-sm text-fg/60">
                Icon names use PascalCase. Variant suffixes describe visual
                differences:
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Naming convention suffixes
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="py-2 pr-4 pl-3 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                        Suffix
                      </th>
                      <th className="py-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">
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
                      ['SquareMono', 'Square variant in single-color'],
                      ['Wordmark', 'Full logo with logotype text'],
                      ['WordmarkMono', 'Wordmark in single-color'],
                      [
                        'Symbol',
                        'Standalone symbol without the container the default has',
                      ],
                      ['SymbolMono', 'Symbol variant in single-color'],
                      [
                        'Flat',
                        'Single-color simplification of the default design',
                      ],
                      ['Alt', 'Meaningfully different design or color scheme'],
                      [
                        'CircleAlt',
                        'Circle variant in an alternative color scheme',
                      ],
                      [
                        'Inverted',
                        'Colors reworked for dark backgrounds; same shape as the default',
                      ],
                      [
                        'Light',
                        'Legacy, closed to new icons: only BlastscanLight, the official dark single-color mark for light backgrounds (the default is pale). New icons use Flat for a version in one brand color and Mono for a black one.',
                      ],
                    ].map(([suffix, desc]) => (
                      <tr
                        key={suffix}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-2 pr-4 pl-3 align-top font-mono text-sm text-accent-fg">
                          {suffix}
                        </td>
                        <td className="py-2 align-top text-sm text-fg/60">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-fg/60">
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
              <p className="mb-3 text-sm text-fg/60">
                Renamed exports, including rebrands that kept their artwork,
                stay as deprecated aliases of the new name. When a rebrand
                brings new artwork, or a project shuts down, the old export
                keeps its old artwork and is deprecated. Deprecated exports are
                removed only in a major release, after at least one minor
                release and 90 days.
              </p>
              <p className="mb-3 text-sm text-fg/60">
                A{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  DEPRECATED_ICON_NAMES
                </code>{' '}
                set is exported to help you filter deprecated exports at
                runtime:
              </p>
              <CodeBlock>{`import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';
// or from its own subpath:
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons/deprecated';

const iconNames = ['Ethereum', 'Argent', 'Ready'];
const current = iconNames.filter(name => !DEPRECATED_ICON_NAMES.has(name));
// ['Ethereum', 'Ready']`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                To list the current icons, use the manifest, which flags
                deprecated entries itself. <Code>Object.keys()</Code> on{' '}
                <Code>import * as icons</Code> also works, but it bundles the
                whole library.
              </p>
              <CodeBlock>{`import { ICON_MANIFEST } from 'react-web3-icons/manifest';

// A Set, because an icon exported from two categories (e.g. Sonic) has two entries
const activeIconNames = new Set(
  ICON_MANIFEST.filter(e => !e.deprecated).map(e => e.name),
);`}</CodeBlock>
            </Section>

            {/* RSC */}
            <Section id="rsc" title="React Server Components">
              <p className="mb-3 text-sm text-fg/60">
                Static icons call no hooks other than{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  useId
                </code>
                , which React supports in Server Components, and icons without
                internal ids (masks, gradients, clip paths) call no hooks at
                all. They render in React Server Components with no{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  &apos;use client&apos;
                </code>{' '}
                directive:
              </p>
              <CodeBlock>{`// app/page.tsx — Server Component, no directive needed
import { Ethereum } from 'react-web3-icons';

export default function Page() {
  return <Ethereum size={24} />;
}`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                Only the dynamic components (
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  react-web3-icons/dynamic
                </code>
                ) are client-only — they lazy-load icon chunks at runtime.
              </p>
            </Section>

            {/* Distribution formats */}
            <Section id="distribution" title="Beyond React">
              <p className="mb-3 text-sm text-fg/60">
                The same icon set ships in three framework-agnostic forms. Raw
                SVG files live under the{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  svg/
                </code>{' '}
                subpath:
              </p>
              <CodeBlock>{`import ethereumSvgUrl from 'react-web3-icons/svg/chain/Ethereum.svg';
// or on a CDN:
// https://cdn.jsdelivr.net/npm/react-web3-icons@${pkg.version}/dist/svg/chain/Ethereum.svg`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                Pin an exact version: a URL without one, or with{' '}
                <Code>@latest</Code>, can start serving different files whenever
                a new version is published. Details:{' '}
                <a
                  href="https://github.com/derodero24/react-web3-icons#raw-svg-files"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg/80"
                >
                  README, Raw SVG Files
                </a>
                .
              </p>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                IconifyJSON collections (
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  web3
                </code>{' '}
                colored,{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  web3-mono
                </code>{' '}
                currentColor) work with Iconify&apos;s React, Vue, Svelte, and
                Web Component packages and with unplugin-icons:
              </p>
              <CodeBlock>{`npm install @iconify/react`}</CodeBlock>
              <CodeBlock>{`import { addCollection, Icon } from '@iconify/react';
import web3Icons from 'react-web3-icons/iconify.json';

addCollection(web3Icons);
<Icon icon="web3:chain-ethereum" />;`}</CodeBlock>
              <p className="mt-4 mb-3 text-sm text-fg/60">
                The manifest is a flat catalog of every export (name, category,
                and any registered chain ID / slug / ticker); base entries of
                each artwork unit also carry variants, search aliases, and the
                brand color. Built for icon pickers and search indexes:
              </p>
              <CodeBlock>{`import { ICON_MANIFEST } from 'react-web3-icons/manifest';

const chains = ICON_MANIFEST.filter(
  e => e.category === 'chain' && !e.deprecated && e.variants,
);
// [{ name: 'Ethereum', chainId: 1, slug: 'ethereum', variants: ['', 'Mono', …], brandColor: '#…' }, …]`}</CodeBlock>
            </Section>

            {/* TypeScript */}
            <Section id="typescript" title="TypeScript">
              <p className="mb-3 text-sm text-fg/60">
                The{' '}
                <code className="rounded bg-surface px-1 font-mono text-sm">
                  IconName
                </code>{' '}
                union type enumerates every exported icon name. Collect the
                icons you need in a map: only the listed icons are bundled, and{' '}
                <Code>satisfies</Code> rejects names that don&apos;t exist:
              </p>
              <CodeBlock>{`import { Arbitrum, Base, Ethereum, type IconName } from 'react-web3-icons';

const ICONS = { Arbitrum, Base, Ethereum } satisfies Partial<Record<IconName, unknown>>;

function NamedIcon({ name, size }: { name: keyof typeof ICONS; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} />;
}`}</CodeBlock>
              <p className="mt-4 text-sm text-fg/60">
                Accepting any <Code>IconName</Code> at runtime (
                <Code>import * as icons</Code> and <Code>icons[name]</Code>)
                bundles the whole library. To resolve icons from runtime data,
                use the{' '}
                <a href="#dynamic" className="underline hover:text-fg/80">
                  dynamic components
                </a>
                , which load one icon at a time.
              </p>
            </Section>
          </div>
        </div>

        {/* Sticky sidebar TOC (desktop only) */}
        <aside className="hidden lg:block">
          <nav aria-label="Table of contents" className="sticky top-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-muted">
              On this page
            </p>
            <ul className="flex flex-col gap-1.5 border-l border-border pl-3">
              {TOC_ITEMS.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-fg/80"
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
