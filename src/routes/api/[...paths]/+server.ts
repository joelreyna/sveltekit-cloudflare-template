import { api } from '$lib/api/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request, platform }) => api.fetch(request, platform?.env);
export const POST: RequestHandler = ({ request, platform }) => api.fetch(request, platform?.env);
export const PATCH: RequestHandler = ({ request, platform }) => api.fetch(request, platform?.env);
export const DELETE: RequestHandler = ({ request, platform }) => api.fetch(request, platform?.env);
