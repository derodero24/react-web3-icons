import { Suspense } from 'react';
import CategoryBar from '../components/sections/CategoryBar';
import IconTable from '../components/sections/IconTable';

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <nav className="border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-600 dark:bg-gray-700 sm:px-6">
            <div className="flex gap-2">
              <span className="h-8 w-16 rounded-full bg-gray-300 dark:bg-gray-500" />
            </div>
          </nav>
        }
      >
        <CategoryBar />
      </Suspense>
      <Suspense
        fallback={
          <section className="relative mb-24 px-4 pt-6 sm:px-6 lg:px-8">
            <p className="font-orbitron text-3xl font-bold capitalize">all</p>
          </section>
        }
      >
        <IconTable />
      </Suspense>
    </>
  );
}
