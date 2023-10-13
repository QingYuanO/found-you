import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const baseColumn = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
};

export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('subscribed_at'),
  ...baseColumn,
});

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  ...baseColumn,
});
