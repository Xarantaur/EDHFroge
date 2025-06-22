import type { RequestHandler } from './$types';
import { json, redirect } from '@sveltejs/kit';
import { saveNewDeck } from '$lib/services/deckService';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;

	if (!user) {
		throw redirect(303, '/user/login');
	}

     const { name, cards, commander } = await request.json();

     if (!name || !Array.isArray(cards) || cards.length === 0 || !commander) {
		return json({ error: 'Missing or invalid deck data.' }, { status: 400 });
	}
	
	try {
		const deck = await saveNewDeck({
			userId: user.id,
			name,
			commander,
			cards
		})
		
		return json({ success: true, deckId: deck.id  });
	} catch (error) {
		return json({ error: 'Failed to save deck.' }, { status: 500})
	}
	
};