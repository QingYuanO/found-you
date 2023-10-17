import React from 'react';

import SignInForm from '@/components/form/SignInForm';
import { getServerSession } from 'next-auth';
import { redirect, RedirectType } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect('/', RedirectType.replace);
  }
  return (
    <div className="w-full">
      <SignInForm />
    </div>
  );
}
