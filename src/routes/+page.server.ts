import { makeClient } from '$lib/api/make-client';
import type { Actions } from '@sveltejs/kit';
import { insertTasksSchema } from '$lib/db/schema';
import { ZodError } from 'zod';

export const actions = {
    async default({ fetch, request }) {
        console.log('actions');
        const client = makeClient(fetch);
        const form = await request.formData();
        console.log('actions');
        console.log(form);

        try {
            const data = insertTasksSchema.parse(Object.fromEntries(form));
            const response = await client.tasks.$post({
                json: data
            });

            if (!response.ok) {
                return {
                    message: 'An error occurred'
                };
            }

            return await response.json();
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: 'Invalid form data'
                };
            }
            throw error;
        }
    }
} satisfies Actions;