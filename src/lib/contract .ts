import { RoomRequestSchema, RoomSchema, TypeRoom, TypeUser, UserRequestSchema, UserSchema } from '@/db/dto';
import { roomTable } from '@/db/schema';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';



const c = initContract();

export const room = c.router({
  createRoom: {
    method: 'POST',
    path: '/room',
    responses: {
      201: c.type< TypeRoom>(),
    },
    body: RoomRequestSchema,
    summary: 'Create a room',
  },
  getRooms: {
    method: 'GET',
    path: '/rooms',
    responses: {
      200: c.type< TypeRoom[]>(),
    },
    summary: 'Get all room',
  },
});

const user = c.router({
  createUser: {
    method: 'POST',
    path: '/user',
    responses: {
      201: c.type<TypeUser>(),
    },
    body: UserRequestSchema,
    summary: 'Create a user',
  },
});

const api = c.router({
  room,
  user,
});

export default api;
