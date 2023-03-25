import Layout from '../components/Layout';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <Layout title="404" description="404 (page not found)">
      <h1 className="my-24 flex flex-col items-center">
        <span className="my-1 text-6xl font-bold">404</span>
        <span className="text-xl font-medium opacity-60">
          page not found...
        </span>
      </h1>
    </Layout>
  );
};

export default Page;
