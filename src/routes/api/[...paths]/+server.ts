import app from '$lib/api/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request, platform }) => app.fetch(request, platform?.env);
export const POST: RequestHandler = ({ request, platform }) => app.fetch(request, platform?.env);
export const PATCH: RequestHandler = ({ request, platform }) => app.fetch(request, platform?.env);
export const DELETE: RequestHandler = ({ request, platform }) => app.fetch(request, platform?.env);
