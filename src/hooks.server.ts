import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const protectedRoutes = ['/decks', '/profile'];

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!session) {
			throw redirect(303, '/login');
		}
	}
    
	return resolve(event);
};