import { createMiddleware } from 'hono/factory';

import { dbTesting } from '$lib/api/lib/test-setup';
import { db, getProdDB } from '$lib/db/db';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/db/schema';

export const injectDB = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        c.set('db', dbTesting);
    } else {
        const db = drizzle(getProdDB() as D1Database, {
            schema
        });
        console.log("Injecting DB")
        c.set('db', db);
    }

    return await next();
});