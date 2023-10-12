'use server';

import { NextResponse } from 'next/server';
import db from '@/db';
import { roomsTable } from '@/db/schema';

export async function getRooms() {
  const rooms = await db.select().from(roomsTable);
  return NextResponse.json({
    rooms,
  });
}
