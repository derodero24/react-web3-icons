import CustomHead from './sections/CustomHead';

import type { CustomHeadProps } from './sections/CustomHead';
import type { ReactNode } from 'react';

interface Props extends CustomHeadProps {
  children: ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <CustomHead {...props} />
      <main className="flex min-h-100svh flex-col">{children}</main>
    </>
  );
}
