import { createMiddleware } from 'hono/factory';
import { drizzle } from 'drizzle-orm/d1';

import { dbTesting } from '$lib/api/lib/test-setup';
import { db, getProdDB } from '$lib/db/db';
import * as schema from '$lib/db/schema';
import { ENVIRONMENT } from '$env/static/private';

export const injectDB = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        c.set('db', dbTesting);
    } else if (ENVIRONMENT === "production") {
        const db = drizzle(getProdDB() as D1Database, {
            schema
        });
        c.set('db', db);
    } else {
        c.set('db', db);
    }

    return await next();
});