import { Suspense } from 'react';
import CategoryBar from '../components/sections/CategoryBar';
import IconTable from '../components/sections/IconTable';

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <aside className="fixed flex h-full w-64 justify-center border-r border-gray-200 bg-gray-100 shadow duration-100 dark:border-gray-600 dark:bg-gray-700" />
        }
      >
        <CategoryBar />
      </Suspense>
      <Suspense
        fallback={
          <section className="relative mb-24 ml-72 mr-8 mt-12">
            <p className="font-orbitron text-3xl font-bold capitalize">all</p>
          </section>
        }
      >
        <IconTable />
      </Suspense>
    </>
  );
}
