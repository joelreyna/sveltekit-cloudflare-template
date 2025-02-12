import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

export const injectDB = createMiddleware(async (c, next) => {
    console.log("Injecting DB");
    console.log(c);
    const db = drizzle(c.env.DB);
    console.log("DB injected");
    console.log(db);
    c.set('db', db);

    return await next();
});