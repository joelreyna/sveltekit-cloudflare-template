import { createMiddleware } from 'hono/factory';
import { db } from '$lib/api/lib/test-setup';

export const injectDBTesting = createMiddleware(async (c, next) => {
    c.set('db', db);
    return await next();
});