import { Suspense } from 'react';

import CategoryBar from '../components/sections/CategoryBar';
import Header from '../components/sections/Header';
import IconTable from '../components/sections/IconTable';

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main>
        <Suspense fallback={null}>
          <CategoryBar />
          <IconTable />
        </Suspense>
      </main>
    </div>
  );
}
