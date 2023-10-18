import { NextResponse } from 'next/server';
import { getRooms } from '@/db/server';

export async function GET() {
  const data = await getRooms();
  return NextResponse.json(data);
}
