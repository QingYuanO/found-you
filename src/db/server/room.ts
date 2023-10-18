import { eq } from 'drizzle-orm';

import db from '..';
import { TypeRoomRequest } from '../dto';
import { roomTable } from '../schema';
import { getSession } from './auth';

export const getRooms = async () => {
  const session = await getSession();

  if (!session) {
    return { status: 401, message: '未登录', body: null };
  }
  const rooms = await db
    .select()
    .from(roomTable)
    .where(eq(roomTable.userId, +session?.user.id!));

  return {
    status: 200,
    body: rooms,
    message: '获取成功',
  };
};

export const createRoom = async (body: TypeRoomRequest) => {
  const session = await getSession();
  if (!session) {
    return { status: 401, message: '未登录', body: null };
  }
  const newRoom = (
    await db
      .insert(roomTable)
      .values({ ...body, userId: +session?.user.id })
      .returning()
  )[0];
  return { status: 201, message: '创建成功', body: newRoom };
};
