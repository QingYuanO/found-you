import { z } from 'zod';

export const BaseSchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
