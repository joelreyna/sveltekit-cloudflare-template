import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { ENVIRONMENT } from "$env/static/private";

import { db, getProdDB } from "$lib/db/db";
import * as schema from "$lib/db/schema";
import { drizzle } from 'drizzle-orm/d1';

async function getDB() {
    if (ENVIRONMENT === "development") {
        return db as DB;
    }
    
    const waitForDB = () => {
        return new Promise<DB>((resolve) => {
            console.log("Waiting for DB");
            console.log(getProdDB());
            if (getProdDB() !== null) {
                resolve(drizzle(getProdDB() as D1Database, { schema }) as DB);
            } else {
                setTimeout(() => waitForDB().then(resolve), 500);
            }
        });
    };

    return await waitForDB();
}

export const auth = betterAuth({
    database: drizzleAdapter(await getDB(), {
        provider: "sqlite",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
    }
})