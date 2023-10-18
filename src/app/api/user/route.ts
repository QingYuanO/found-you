import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/db/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await createUser(body);
  return NextResponse.json(data);
}
