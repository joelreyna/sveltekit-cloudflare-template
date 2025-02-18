import type { Router } from '$lib/api/api';
import { hc } from 'hono/client';

let browserClient: ReturnType<typeof hc<Router>>;

export const makeClient = (fetch: Window['fetch'], isTest = false) => {
    const isBrowser = typeof window !== 'undefined';
    const origin = isBrowser ? window.location.origin : '';

    if (isBrowser && browserClient) {
        return browserClient;
    }

    const client = hc<Router>(isTest ? 'http://localhost:5173/api' : origin + '/api', { fetch });

    if (isBrowser) {
        browserClient = client;
    }

    return client;
};
