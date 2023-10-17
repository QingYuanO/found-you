import { FC, ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect, RedirectType } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  return <div className=" ">{children}</div>;
};

export default AuthLayout;
