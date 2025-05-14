import type { PageServerLoad } from './$types'
import { prisma } from '$lib/utils/prisma'
import { redirect } from '@sveltejs/kit'


export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	
	const user = await prisma.user.findUnique({
		where: { id: locals.user.id },
		select: {
			id: true,
			email: true,
			decks: true,
			createdAt: true, 
		}
	});

	return { user }
};