import { createMiddleware } from 'hono/factory';
import { getProdDB, setProdDB } from '$lib/db/db';
import { ENVIRONMENT } from '$env/static/private';

export const setProdDBMiddleware = createMiddleware(async (c, next) => {
    if (ENVIRONMENT === "production" && getProdDB() === null) {
        setProdDB(c.env.DB);
    }
    return await next();
});