import type { Router } from '$lib/api/api';
import { hc } from 'hono/client';
import { PUBLIC_BASE_URL } from '$env/static/public';

let browserClient: ReturnType<typeof hc<Router>>;

export const makeClient = (fetch: Window['fetch']) => {
    const isBrowser = typeof window !== 'undefined';
    const origin = isBrowser ? window.location.origin : PUBLIC_BASE_URL;

    if (isBrowser && browserClient) {
        return browserClient;
    }

    const client = hc<Router>(origin + '/api', { fetch });

    if (isBrowser) {
        browserClient = client;
    }

    return client;
};
