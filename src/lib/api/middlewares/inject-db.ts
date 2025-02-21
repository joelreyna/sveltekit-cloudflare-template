import { createMiddleware } from 'hono/factory';
import { drizzle } from 'drizzle-orm/d1';

import { dbTesting } from '$lib/api/lib/test-setup';
import * as schema from '$lib/db/schema';

export const injectDB = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        c.set('db', dbTesting);
    } else {
        const db = drizzle(c.env.DB, {
            schema
        });
        c.set('db', db);
    }

    return await next();
});