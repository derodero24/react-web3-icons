import type { ReactNode } from 'react';
import type { CustomHeadProps } from './sections/CustomHead';
import CustomHead from './sections/CustomHead';
import Header from './sections/Header';

interface Props extends CustomHeadProps {
  children: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <CustomHead {...props} />
      <div className="flex min-h-svh flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
