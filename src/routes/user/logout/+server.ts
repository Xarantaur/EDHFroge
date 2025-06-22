import type { RequestHandler  } from './$types';
import { redirect } from '@sveltejs/kit';
import { logoutUser } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('session')

	if (token) {
		await logoutUser(token)
	}

	cookies.delete('session', { path: '/' });

	throw redirect(303, '/user/login');
};