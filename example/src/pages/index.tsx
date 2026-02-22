import type { NextPage } from 'next';
import Layout from '../components/Layout';
import CategoryBar from '../components/sections/CategoryBar';
import IconTable from '../components/sections/IconTable';

const Home: NextPage = () => {
  return (
    <Layout title="React Web3 Icons" description="React Web3 Icons">
      <CategoryBar />
      <IconTable />
    </Layout>
  );
};

export default Home;
