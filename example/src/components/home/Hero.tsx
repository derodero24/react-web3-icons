import { Arbitrum, Base, Ethereum, Solana } from 'react-web3-icons/chain';
import { MetaMask, Phantom } from 'react-web3-icons/wallet';
import { STATS } from '../../lib/catalog';
import InstallCommand from './InstallCommand';

const FEATURES = [
  {
    title: 'From official brand kits',
    body: 'Each icon records the brand asset it was drawn from.',
  },
  {
    title: 'Look up by chain ID or ticker',
    body: '<ChainIcon chainId={8453} />, <CoinIcon symbol="ETH" />',
  },
  {
    title: 'Server Components ready',
    body: 'No client JavaScript per icon. About 1 kB each, tree-shaken.',
  },
  {
    title: 'Beyond React',
    body: 'Plain SVG files, a CDN and Iconify JSON for Vue, Svelte and Figma.',
  },
] as const;

export default function Hero() {
  return (
    <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_auto]">
      <div className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-fg">
          Open source · MIT
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Web3 brand icons for React.
        </h1>
        <p className="max-w-xl text-base text-fg-muted text-pretty sm:text-lg">
          {STATS.icons} icons and {STATS.components} components for chains,
          coins, wallets, DEXs and more, each with colored and mono variants.
        </p>
        <InstallCommand />
      </div>
      <HeroArt />
      <ul className="hidden gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        {FEATURES.map(feature => (
          <li key={feature.title} className="space-y-1 bg-bg p-4">
            <p className="text-sm font-medium">{feature.title}</p>
            <p className="text-sm text-fg-muted">{feature.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A tilted stack of real icons, rendered on the server. */
function HeroArt() {
  const tiles = [
    ['Ethereum', Ethereum],
    ['Solana', Solana],
    ['Base', Base],
    ['Arbitrum', Arbitrum],
    ['MetaMask', MetaMask],
    ['Phantom', Phantom],
  ] as const;
  return (
    <div
      aria-hidden="true"
      className="hidden grid-cols-3 gap-3 lg:grid [transform:perspective(900px)_rotateY(-14deg)_rotateX(6deg)]"
    >
      {tiles.map(([name, Tile]) => (
        <div
          key={name}
          className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm"
        >
          <Tile size={48} />
        </div>
      ))}
    </div>
  );
}
