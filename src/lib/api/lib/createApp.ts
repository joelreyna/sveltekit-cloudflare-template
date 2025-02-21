import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { pinoLoggerMiddleware } from '$lib/api/middlewares/pinno-logger';
import { injectDB } from '$lib/api/middlewares/inject-db';
import { injectAuth } from '$lib/api/middlewares/inject-auth';
import type { AppBindings } from './types';

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook
    });
}

export default function createApp() {
    const app = new OpenAPIHono<AppBindings>({
        strict: false
    });
    app.use(serveEmojiFavicon("👋"));
    if (process.env.VITEST !== 'true') {
        app.use(pinoLoggerMiddleware());
    }
    app.use(injectDB);
    app.use(injectAuth);

    app.notFound(notFound);
    app.onError(onError);
    return app;
}