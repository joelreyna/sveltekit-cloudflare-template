import { initializeAuth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";

export async function handle({ event, resolve }) {
    const auth = initializeAuth(event.platform?.env.DB);
    return svelteKitHandler({ event, resolve, auth });
}