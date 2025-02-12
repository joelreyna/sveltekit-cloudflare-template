import type { AppRouteHandler } from '$lib/api/lib/types';
import type { ListRoute } from './tasks.routes';

export const list: AppRouteHandler<ListRoute> = (c) => {
    return c.json([{
        name: 'Task 1',
        done: false
    }, {
        name: 'Task 2',
        done: true
    }]);
}
