import { betterAuth } from "better-auth";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";

import { db } from "$lib/db/db";
import * as schema from "$lib/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db as DB, {
        provider: "sqlite",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
    }
})