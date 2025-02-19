import { drizzle } from 'drizzle-orm/d1';

import * as schema from '$lib/db/schema';

let _prodDB: D1Database | null = null;

export const getProdDB = () => _prodDB;
export const setProdDB = (db: D1Database) => {
    _prodDB = db;
};

async function initDbConnectionDev() {
    if (process.env.NODE_ENV === "development") {
        const { getPlatformProxy } = await import('wrangler');
        const { env } = await getPlatformProxy();
        return drizzle(env.DB as D1Database, {
            schema
        });
    }
}

function initDbConnection() {
    return drizzle(_prodDB as D1Database, {
        schema
    });
}

export const db = process.env.NODE_ENV === "production" ? initDbConnection() : await initDbConnectionDev()