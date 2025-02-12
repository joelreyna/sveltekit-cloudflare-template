import { createRouter } from '$lib/api/lib/createApp';
import * as handlers from './tasks.handlers';
import * as routes from './tasks.routes';

const router = createRouter()
    .openapi(routes.list, handlers.list);

export default router;