import { Suspense } from 'react';
import CategoryBar from '../components/sections/CategoryBar';
import IconTable from '../components/sections/IconTable';

export default function Home() {
  return (
    <Suspense>
      <CategoryBar />
      <IconTable />
    </Suspense>
  );
}
