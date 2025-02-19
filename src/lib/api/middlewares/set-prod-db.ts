import { createMiddleware } from 'hono/factory';
import { getProdDB, setProdDB } from '$lib/db/db';
import { ENVIRONMENT } from '$env/static/private';
import * as process from 'node:process';

export const setProdDBMiddleware = createMiddleware(async (c, next) => {
    if (ENVIRONMENT === "production" && getProdDB() === null) {
        process.env.DB = c.env.DB;
        setProdDB(c.env.DB);
    }
    return await next();
});