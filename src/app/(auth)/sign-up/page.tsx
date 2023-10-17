import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect, RedirectType } from 'next/navigation';

import SignUpForm from '@/components/form/SignUpForm';

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect('/', RedirectType.replace);
  }
  return (
    <div className="w-full">
      <SignUpForm />
    </div>
  );
}
