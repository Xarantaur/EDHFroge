import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getDecksByUser } from '$lib/server/prisma/deckRepo';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/user/login');
	}

	const decks = await getDecksByUser( locals.user.id )

	const transformedDecks = decks.map(deck => ({
		...deck,
		commander: deck.commanderEntry?.card
	}))
	
	return { decks: transformedDecks };
};
