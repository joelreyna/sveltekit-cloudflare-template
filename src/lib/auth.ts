import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/d1';

import * as schema from "$lib/db/schema";

export const initializeAuth = (d1Database?: D1Database) => {
    const db = drizzle(d1Database as D1Database, {
        schema
    }) as DB;

    return betterAuth({
        database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
        }
    })
}