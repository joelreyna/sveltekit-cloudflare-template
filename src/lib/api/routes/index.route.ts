import { createRouter } from '$lib/api/lib/createApp';
import { createRoute } from '@hono/zod-openapi';
import { jsonContent } from 'stoker/openapi/helpers';
import * as HttpStatusCodes from 'stoker/http-status-codes';

import { createMessageObjectSchema } from 'stoker/openapi/schemas';

const router = createRouter()
    .openapi(createRoute({
        tags: ['Index'],
        method: 'get',
        path: '',
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                createMessageObjectSchema("Tasks API"),
                "Tasks API Index"
            )
        }
    }),
    async (c) => {
        return c.json({
            message: 'Tasks API'
        }, HttpStatusCodes.OK);
    }
);

export default router;