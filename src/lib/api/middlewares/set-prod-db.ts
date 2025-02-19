import { createMiddleware } from 'hono/factory';
import { getProdDB, setProdDB } from '$lib/db/db';

export const setProdDBMiddleware = createMiddleware(async (c, next) => {
    console.log("Setting Prod DB")
    console.log(process.env.NODE_ENV)
    console.log(getProdDB())
    console.log(c.env.DB)
    if (process.env.NODE_ENV === "production" && getProdDB() === null) {
        setProdDB(c.env.DB);
    }
    return await next();
});