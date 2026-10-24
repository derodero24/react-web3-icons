import type { CSSProperties } from 'react';
import { getIcons, toSearchEntry } from '../../lib/catalog';
import type { CategoryFilter } from '../../lib/categories';
import { DEFAULT_ICON_SIZE } from '../../lib/search';
import CategoryNav from './CategoryNav';
import GalleryControls from './GalleryControls';
import IconCard from './IconCard';

/**
 * The icon gallery of a category page. Every card is rendered here, on the
 * server; the client only receives a plain search index and filters the
 * cards with generated style rules.
 */
export default function Gallery({ filter }: { filter: CategoryFilter }) {
  const icons = getIcons(filter);
  const gridStyle = {
    '--icon-size': `${DEFAULT_ICON_SIZE}px`,
  } as CSSProperties;
  return (
    <section aria-label="Icons" className="space-y-5">
      <CategoryNav current={filter} />
      <GalleryControls entries={icons.map(toSearchEntry)} />
      <ul
        id="icon-grid"
        style={gridStyle}
        className="grid scroll-mt-32 grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-2 sm:gap-3"
      >
        {icons.map(icon => (
          <IconCard key={icon.id} icon={icon} />
        ))}
      </ul>
    </section>
  );
}
