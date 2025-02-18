import { describe, it, expect, expectTypeOf } from 'vitest';
import { makeClient } from '$lib/api/make-client';

const client = makeClient(fetch, true);

describe('Tasks list', () => {
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
