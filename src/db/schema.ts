import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const baseColumn = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
};

/**
 * 房间
 */
export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ...baseColumn,
});

export const roomsTableRelations = relations(roomsTable, ({ many }) => ({
  containers: many(containerTable),
}));
/**容器 */
export const containerTable = pgTable('containers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  roomId: integer('room_id').references(() => roomsTable.id),
  ...baseColumn,
});

export const containerTableRelations = relations(containerTable, ({ one, many }) => ({
  room: one(roomsTable, {
    fields: [containerTable.id],
    references: [roomsTable.id],
  }),
  stuffs: many(stuffTable),
}));

/**物件 */
export const stuffTable = pgTable('stuff', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  containerId: integer('container_id').references(() => containerTable.id),
  ...baseColumn,
});

export const stuffTableRelations = relations(stuffTable, ({ one, many }) => ({
  container: one(containerTable, {
    fields: [stuffTable.id],
    references: [containerTable.id],
  }),
}));

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  ...baseColumn,
});
