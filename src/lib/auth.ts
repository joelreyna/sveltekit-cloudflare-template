import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { ENVIRONMENT } from "$env/static/private";

import { db } from "$lib/db/db";
import * as schema from "$lib/db/schema";
import { drizzle } from 'drizzle-orm/d1';

export const initializeAuth = (d1Database?: D1Database) => {
    let _db;

    if (ENVIRONMENT === "development") {
        _db = db as DB;
    } else {
        _db = drizzle(d1Database as D1Database, {
            schema
        }) as DB;
    }

    return betterAuth({
        database: drizzleAdapter(_db, {
        provider: "sqlite",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
        }
    })
}