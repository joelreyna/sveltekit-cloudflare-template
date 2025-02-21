import { createMiddleware } from 'hono/factory';
import { initializeAuth } from '$lib/auth';

export const injectAuth = createMiddleware(async (c, next) => {
    if (process.env.VITEST) {
        return await next();
    } else {
        const auth = initializeAuth(c.env.DB);

        const session = await auth.api.getSession({
            headers: c.req.raw.headers
        });

        if (!session) {
            c.set('user', null);
            c.set('session', null);
            return await next();
        }

        c.set('user', session.user);
        c.set('session', session.session);
    }

    return await next();
});