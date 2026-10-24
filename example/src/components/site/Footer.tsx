import Link from 'next/link';
import type { ReactNode } from 'react';
import pkg from '../../../../package.json';

const LINK = 'transition-colors hover:text-fg';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container grid gap-8 px-4 py-10 text-sm text-fg-muted sm:grid-cols-[1fr_auto_auto_auto] sm:gap-12 sm:px-6">
        <div className="max-w-sm space-y-2">
          <p className="font-medium text-fg">React Web3 Icons</p>
          <p>
            MIT licensed. Logos are trademarks of their respective owners and
            are drawn from their official brand assets.
          </p>
        </div>
        <FooterColumn title="Library">
          <Link className={LINK} href="/">
            Icons
          </Link>
          <Link className={LINK} href="/docs/">
            Docs
          </Link>
          <Link className={LINK} href="/compare/">
            Compare
          </Link>
        </FooterColumn>
        <FooterColumn title="Project">
          <a
            className={LINK}
            href="https://github.com/derodero24/react-web3-icons"
          >
            GitHub
          </a>
          <a
            className={LINK}
            href="https://www.npmjs.com/package/react-web3-icons"
          >
            npm
          </a>
          <a
            className={LINK}
            href="https://github.com/derodero24/react-web3-icons/blob/develop/CHANGELOG.md"
          >
            Changelog
          </a>
        </FooterColumn>
        <FooterColumn title="Contribute">
          <a
            className={LINK}
            href="https://github.com/derodero24/react-web3-icons/issues/new?template=icon-request.yml"
          >
            Request an icon
          </a>
          <a
            className={LINK}
            href="https://github.com/derodero24/react-web3-icons/blob/develop/CONTRIBUTING.md"
          >
            Contributing
          </a>
          <span className="font-mono text-xs">v{pkg.version}</span>
        </FooterColumn>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-fg/70">
        {title}
      </p>
      {children}
    </div>
  );
}
