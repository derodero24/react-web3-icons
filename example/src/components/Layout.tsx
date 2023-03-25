import CustomHead from './sections/CustomHead';
import Header from './sections/Header';

import type { CustomHeadProps } from './sections/CustomHead';
import type { ReactNode } from 'react';

interface Props extends CustomHeadProps {
  children: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <CustomHead {...props} />
      <div className="flex min-h-100svh flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
