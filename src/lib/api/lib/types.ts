import type { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino'
import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import type { User, Session } from 'better-auth';
import * as schema from '$lib/db/schema';
export interface AppBindings {
    Variables: {
        logger: PinoLogger,
        db: DrizzleD1Database<typeof schema>,
        user: User | null,
        session: Session | null
    },
    Bindings: {
        DB: D1Database
    }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;