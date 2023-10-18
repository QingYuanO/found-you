import { z } from 'zod';

export const BaseSchema = z.object({
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
