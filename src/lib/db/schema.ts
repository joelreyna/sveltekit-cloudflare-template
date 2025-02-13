import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
export const tasks = sqliteTable('tasks', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    done: integer('done', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdate(() => new Date())
});

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(tasks)
    .extend({
        name: z.string().min(1),
        done: z.boolean()
    })
    .required({
        name: true,
        done: true
    })
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true
    });

export const patchTasksSchema = insertTasksSchema.partial();