import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';
import * as schema from '$lib/db/schema';

export const injectDB = createMiddleware(async (c, next) => {
    const db = drizzle(c.env.DB, {
        schema
    });
    c.set('db', db);
    return await next();
});