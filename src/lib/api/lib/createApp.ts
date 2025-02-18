import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { pinoLoggerMiddleware } from '$lib/api/middlewares/pinno-logger';
import { injectDB } from '$lib/api/middlewares/inject-db';
import { injectDBTesting } from '$lib/api/middlewares/inject-db-testing';
import type { AppBindings } from './types';

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook
    });
}

export default function createApp({ testing = false }: { testing?: boolean }) {
    const app = new OpenAPIHono<AppBindings>({
        strict: false
    });
    app.use(serveEmojiFavicon("👋"));
    if (!testing) {
        app.use(pinoLoggerMiddleware());
        app.use(injectDB);
    } else {
        app.use(injectDBTesting);
    }

    app.notFound(notFound);
    app.onError(onError);
    return app;
}