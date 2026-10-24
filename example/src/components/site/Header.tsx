import Link from 'next/link';
import pkg from '../../../../package.json';
import GitHubButton from '../elements/GitHubButton';
import ThemeToggle from '../elements/ThemeToggle';
import SiteLogo from './SiteLogo';

const NAV_LINK =
  'rounded-md px-2.5 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="container flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <SiteLogo className="h-6 w-6" />
            <span className="hidden sm:inline">React Web3 Icons</span>
          </Link>
          <a
            href={`https://www.npmjs.com/package/react-web3-icons/v/${pkg.version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-fg-muted transition-colors hover:text-fg"
          >
            v{pkg.version}
          </a>
        </div>
        <nav aria-label="Site" className="flex items-center gap-1">
          <Link href="/" className={NAV_LINK}>
            Icons
          </Link>
          <Link href="/docs/" className={NAV_LINK}>
            Docs
          </Link>
          <Link
            href="/compare/"
            className={`${NAV_LINK} hidden sm:inline-block`}
          >
            Compare
          </Link>
          <GitHubButton className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-xl text-fg-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
