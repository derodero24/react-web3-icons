import { Suspense } from 'react';
import CategoryBar, {
  CategoryBarView,
} from '../components/sections/CategoryBar';
import Hero from '../components/sections/Hero';
import IconTable, { IconTableFallback } from '../components/sections/IconTable';
import { getIconGroups } from '../utils/icons';

export default function Home() {
  // Only the URL-bound parts (nuqs → useSearchParams) sit behind Suspense.
  // Their fallbacks render the default view, so the static export contains
  // the category bar and the initial icon grid, not an empty shell.
  return (
    <>
      <Hero iconCount={getIconGroups('all').length} />
      <Suspense fallback={<CategoryBarView current="all" />}>
        <CategoryBar />
      </Suspense>
      <Suspense fallback={<IconTableFallback />}>
        <IconTable />
      </Suspense>
    </>
  );
}
