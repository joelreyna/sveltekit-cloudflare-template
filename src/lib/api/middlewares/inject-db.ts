import { createMiddleware } from 'hono/factory';

import { dbTesting } from '$lib/api/lib/test-setup';
import { db } from '$lib/db/db';

export const injectDB = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        c.set('db', dbTesting);
    } else {
        console.log("Injecting DB")
        console.log(db)
        c.set('db', db);
    }

    return await next();
});