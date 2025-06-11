import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/utils/prisma';

const protectedRoutes = ['/decks', '/profile'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');


	if (token) {
		const session = await prisma.session.findUnique({
			where: { token },
			include: { user: true }
			
		})

		if (session && session.expiresAt > new Date()) {
			event.locals.user = {
				id: session.user.id,
			};
		}
	}

	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!event.locals.user) {
			throw redirect(303, '/login');
		}
	}
    
	return resolve(event);
};
