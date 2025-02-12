import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

export const injectDB = createMiddleware(async (c, next) => {
    const db = drizzle(c.env.DB);
    c.set('db', db);
    return await next();
});