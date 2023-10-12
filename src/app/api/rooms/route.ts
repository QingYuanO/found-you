import { NextRequest, NextResponse } from 'next/server';
import { getRooms } from '@/app/actions';

export async function GET(request: NextRequest) {
  const rooms = await getRooms();
  return rooms;
}
