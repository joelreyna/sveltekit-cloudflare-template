import { createMiddleware } from 'hono/factory';
import { getProdDB, setProdDB } from '$lib/db/db';

export const setProdDBMiddleware = createMiddleware(async (c, next) => {
    if (process.env.NODE_ENV === "production" && getProdDB() === null) {
        setProdDB(c.env.DB);
    }
    return await next();
});