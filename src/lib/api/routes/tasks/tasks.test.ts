import { describe, it, expect, expectTypeOf } from 'vitest';
import { testClient } from 'hono/testing';

import createApp from '$lib/api/lib/createApp';
import router from './tasks.index';

const app = createApp({ testing: true });
const client = testClient(app.route('', router));

describe('Tasks list', () => {
    const id = 1;
    const name = "Learn vitest";

    it("post /tasks creates a task", async () => {
        const response = await client.tasks.$post({
        json: {
            name,
            done: false,
        },
        });
        expect(response.status).toBe(200);
        if (response.status === 200) {
            const json = await response.json();
            expect(json.name).toBe(name);
            expect(json.done).toBe(false);
        }
    });

    it('responds with an array', async () => {
        const res = await client.tasks.$get();
        const result = await res.json();

        expect(res.status).toBe(200);
        expectTypeOf(result).toBeArray();
    });

    it('responds with an array', async () => {
        const res = await client.tasks.$get();
        const result = await res.json();

        expect(res.status).toBe(200);
        expectTypeOf(result).toBeArray();
    });

    it('validates the id param', async () => {
        const res = await client.tasks[":id"].$get({
            param: {
                // @ts-expect-error
                id: 'wat'
            }
        });

        expect(res.status).toBe(422);
    });

    it('validates the body when creating', async () => {
        const res = await client.tasks.$post({
            json: {
                // @ts-expect-error
                name: 123
            }
        });

        expect(res.status).toBe(422);
    });
});
