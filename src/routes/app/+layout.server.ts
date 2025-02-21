import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = locals.session;
    const user = locals.user;

    console.log(user);

    if (!session) {
        throw redirect(302, '/');
    }
};