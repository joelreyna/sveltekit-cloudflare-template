import type { AppRouteHandler } from '$lib/api/lib/types';
import { tasks } from '$lib/db/schema';
import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './tasks.routes';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';
import { eq } from 'drizzle-orm';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasks = await c.var.db.query.tasks.findMany();
    return c.json(tasks);
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid('json');
    const [inserted] = await c.var.db.insert(tasks).values({
        name: task.name,
        done: task.done
    }).returning();
    return c.json(inserted, HttpStatusCodes.OK);
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid('param');
    const task = await c.var.db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        }
    });
    if (!task) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json(task, HttpStatusCodes.OK);
}

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid('param');
    const updates = c.req.valid('json');
    const [task] = await c.var.db.update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();
    if (!task) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json(task, HttpStatusCodes.OK);
}

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
    const { id } = c.req.valid('param');
    const result = await c.var.db.delete(tasks).where(eq(tasks.id, id));
    if (result.meta.changes === 0) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }
    return c.body(null, HttpStatusCodes.NO_CONTENT);
}
