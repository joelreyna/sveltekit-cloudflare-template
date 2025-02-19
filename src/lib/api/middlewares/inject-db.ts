import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

import * as schema from '$lib/db/schema';
import { dbTesting } from '$lib/api/lib/test-setup';

export const injectDB = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        const db = dbTesting;
        c.set('db', db);
    } else {
        const db = drizzle(c.env.DB, {
            schema
        });
        c.set('db', db);
    }
    return await next();
});