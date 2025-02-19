import { getPlatformProxy } from "wrangler";
import { drizzle } from 'drizzle-orm/d1';

import * as schema from '$lib/db/schema';
const { env } = await getPlatformProxy();

async function initDbConnectionDev() {
    return drizzle(env.DB as D1Database, {
        schema
    });
}

function initDbConnection() {
    return drizzle(process.env.DB as unknown as D1Database, {
        schema
    });
}

export const db = process.env.NODE_ENV === "production" ? initDbConnection() : await initDbConnectionDev()