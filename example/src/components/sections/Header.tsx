import Link from 'next/link';

import GitHubButton from '../elements/GitHubButton';
import ThemeButton from '../elements/ThemeButton';

export default function Header() {
  return (
    <header className="container flex justify-between px-4 py-2">
      <Link href="/" className="text-xl">
        Next.js
      </Link>
      <div className="flex items-center space-x-6">
        <ThemeButton className="icon-btn" />
        <GitHubButton className="icon-btn" />
      </div>
    </header>
  );
}
