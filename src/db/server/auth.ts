import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '@/lib/auth';

export const isHasAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: '未登录', body: null }, { status: 401 });
  }
  return !!session;
};

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
