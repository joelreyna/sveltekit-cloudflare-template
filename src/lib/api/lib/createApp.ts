import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { pinoLoggerMiddleware } from '$lib/api/middlewares/pinno-logger';
import type { AppBindings } from './types';
import { defaultHook } from 'stoker/openapi';
import { injectDB } from '../middlewares/inject-db';

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
    app.use(pinoLoggerMiddleware());
    app.use(injectDB);

    app.notFound(notFound);
    app.onError(onError);
    return app;
}