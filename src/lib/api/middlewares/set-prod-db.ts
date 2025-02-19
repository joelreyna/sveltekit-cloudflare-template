import { createMiddleware } from 'hono/factory';
import { getProdDB, setProdDB } from '$lib/db/db';
import { ENVIRONMENT } from '$env/static/private';

export const setProdDBMiddleware = createMiddleware(async (c, next) => {
    console.log("Setting Prod DB")
    console.log(ENVIRONMENT)
    console.log(getProdDB())
    console.log(c.env.DB)
    if (ENVIRONMENT === "production" && getProdDB() === null) {
        console.log("Entered Setting Prod DB")
        setProdDB(c.env.DB);
    }
    return await next();
});