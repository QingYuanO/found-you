import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const baseColumn = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
};

export const roomTypeEnum = pgEnum('room_type', ['bedroom', 'living_room', 'kitchen', 'toilet', 'study', 'common_room']);

/**
 * 房间
 */
export const roomTable = pgTable('room', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: roomTypeEnum('room_type').default('common_room').notNull(),
  userId: integer('user_id')
    .references(() => userTable.id)
    .notNull(),
  ...baseColumn,
});

export const roomTableRelations = relations(roomTable, ({ one, many }) => ({
  containers: many(containerTable),
  user: one(userTable, {
    fields: [roomTable.id],
    references: [userTable.id],
  }),
}));
/**容器 */
export const containerTable = pgTable('container', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  cover: text('cover'),
  identifier: varchar('identifier', { length: 4 }),
  roomId: integer('room_id')
    .references(() => roomTable.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => userTable.id)
    .notNull(),
  ...baseColumn,
});

export const containerTableRelations = relations(containerTable, ({ one, many }) => ({
  room: one(roomTable, {
    fields: [containerTable.id],
    references: [roomTable.id],
  }),
  user: one(userTable, {
    fields: [containerTable.id],
    references: [userTable.id],
  }),
  stuffs: many(stuffTable),
}));

/**物件 */
export const stuffTable = pgTable('stuff', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  cover: text('cover'),
  containerId: integer('container_id')
    .references(() => containerTable.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => userTable.id)
    .notNull(),
  ...baseColumn,
});

export const stuffTableRelations = relations(stuffTable, ({ one, many }) => ({
  container: one(containerTable, {
    fields: [stuffTable.id],
    references: [containerTable.id],
  }),
  user: one(userTable, {
    fields: [stuffTable.id],
    references: [userTable.id],
  }),
}));

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  ...baseColumn,
});

export const userTableRelations = relations(userTable, ({ one, many }) => ({
  rooms: many(roomTable),
  containers: many(containerTable),
  stuffs: many(stuffTable),
}));
