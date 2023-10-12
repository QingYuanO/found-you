import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('subscribed_at'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
