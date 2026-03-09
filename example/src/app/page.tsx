import { Suspense } from 'react';
import CategoryBar from '../components/sections/CategoryBar';
import Hero from '../components/sections/Hero';
import IconTable from '../components/sections/IconTable';

export default function Home() {
  return (
    <Suspense>
      <Hero />
      <CategoryBar />
      <IconTable />
    </Suspense>
  );
}
