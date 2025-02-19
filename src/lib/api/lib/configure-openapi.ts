import type { AppOpenAPI } from './types';
import { apiReference } from '@scalar/hono-api-reference';

import { PUBLIC_BASE_URL } from '$env/static/public';
import packageJSON from '../../../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: packageJSON.name + ' API',
        }
    });

    app.get('/reference', apiReference({
        theme: 'saturn',
        layout: 'classic',
        servers: [
            {
                url: PUBLIC_BASE_URL + '/api',
                description: 'Localhost',
            },
        ],
        defaultHttpClient: {
            targetKey: 'JavaScript',
            clientKey: 'Fetch',
        },
        spec: {
            url: '/api/doc',
        },
    }))
}