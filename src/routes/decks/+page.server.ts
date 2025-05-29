import type { PageServerLoad } from './$types';
import { prisma } from '$lib/utils/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const decks = await prisma.deck.findMany({
		where: { userId: locals.user.id },
		include: { commander: true },
		orderBy: { createdAt: 'desc' }
	});
	
	return { decks };
};
