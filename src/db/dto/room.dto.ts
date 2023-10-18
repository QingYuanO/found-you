import { z } from 'zod';

import { roomTypeEnum } from '../schema';
import { BaseSchema } from './base';

export const RoomSchema = z
  .object({
    id: z.number().min(1),
    name: z.string().min(1, '请填写用户名').max(100),
    description: z.string().nullable(),
    type: z.enum(roomTypeEnum.enumValues),
    userId: z.number().min(1),
  })
  .merge(BaseSchema);

export const RoomRequestSchema = RoomSchema.pick({ name: true, description: true, type: true });

export type TypeRoomRequest = z.infer<typeof RoomRequestSchema>;

export type TypeRoom = z.infer<typeof RoomSchema>;
