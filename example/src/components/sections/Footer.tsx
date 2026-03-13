import pkg from '../../../../package.json';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between text-xs text-fg/50">
        <div className="flex items-center gap-3">
          <span className="font-medium text-fg/60">React Web3 Icons</span>
          <span className="font-mono">v{pkg.version}</span>
          <span>MIT</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/derodero24/react-web3-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg/80"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-web3-icons"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg/80"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
