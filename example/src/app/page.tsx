import Gallery from '../components/gallery/Gallery';
import LegacyLinkRedirect from '../components/gallery/LegacyLinkRedirect';
import Hero from '../components/home/Hero';
import { CATALOG } from '../lib/catalog';

export default function Home() {
  // Links from the previous site (`/?icon=Ethereum`, `/?category=chain`)
  // still resolve: the redirect maps them to the new pages.
  const legacyTargets = Object.fromEntries(
    CATALOG.filter(icon => icon.listedInAll).map(icon => [
      icon.name,
      icon.href,
    ]),
  );
  return (
    <div className="container px-4 sm:px-6">
      <LegacyLinkRedirect iconHrefs={legacyTargets} />
      <Hero />
      <Gallery filter="all" />
    </div>
  );
}
