import createApp, { createRouter } from '$lib/api/lib/createApp';
import configureOpenAPI from '$lib/api/lib/configure-openapi';
import index from '$lib/api/routes/index.route';
import tasks from '$lib/api/routes/tasks/tasks.index';

const app = createApp();

const apiRouter = createRouter()
    .route('', index)
    .route('', tasks);

configureOpenAPI(apiRouter);

app.route('/api', apiRouter);

export type Router = typeof apiRouter;

export default app;
