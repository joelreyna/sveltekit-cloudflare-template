import { api } from '$lib/api/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request }) => api.fetch(request);
export const POST: RequestHandler = ({ request }) => api.fetch(request);