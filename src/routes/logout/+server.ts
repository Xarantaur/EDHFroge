import type { RequestHandler  } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('session')

	if (token) {
		await prisma.session.delete({ where: { token } });
	}

	cookies.delete('session', { path: '/' });

	throw redirect(303, '/login');
};