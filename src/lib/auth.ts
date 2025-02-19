import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { ENVIRONMENT } from "$env/static/private";

import { db, getProdDB } from "$lib/db/db";
import * as schema from "$lib/db/schema";
import { drizzle } from 'drizzle-orm/d1';

function getDB() {
    if (ENVIRONMENT === "development") {
        return db as DB;
    }
    console.log("Waiting for DB");
    console.log(getProdDB());
    return drizzle(getProdDB() as D1Database, {
        schema
    }) as DB;
}

export const auth = betterAuth({
    database: drizzleAdapter(getDB(), {
        provider: "sqlite",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
    }
})