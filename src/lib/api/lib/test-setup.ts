import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { join } from 'path';
import fs from 'fs';

import * as schema from '$lib/db/schema';

let sqlite: Database.Database;
export let dbTesting: ReturnType<typeof drizzle>;

if (process.env.VITEST) {
    const { beforeAll, afterAll } = await import('vitest');
    
    beforeAll(() => {
        fs.rmSync('./test.db', { force: true });
        sqlite = new Database('./test.db');
        dbTesting = drizzle(sqlite, { schema });
        
        const { migrate } = require('drizzle-orm/better-sqlite3/migrator');
        migrate(dbTesting, {
            migrationsFolder: join(process.cwd(), 'src/lib/db/migrations')
        });
    });

    afterAll(() => {
        sqlite?.close();
        fs.rmSync('./test.db', { force: true });
    });
} 