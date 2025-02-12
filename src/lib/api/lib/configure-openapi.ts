import type { AppOpenAPI } from './types';
import { apiReference } from '@scalar/hono-api-reference';

import packageJSON from '../../../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/api/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: packageJSON.name + ' API',
        }
    });

    app.get('/api/reference', apiReference({
        theme: 'saturn',
        layout: 'classic',
        defaultHttpClient: {
            targetKey: 'JavaScript',
            clientKey: 'Fetch',
        },
        spec: {
            url: '/api/doc',
        },
    }))
}