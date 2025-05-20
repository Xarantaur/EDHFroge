import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';
import { json, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;

	if (!user) {
		throw redirect(303, '/login');
	}

     const { name, cards } = await request.json();

     if (!name || !Array.isArray(cards) || cards.length === 0) {
		return json({ error: 'Missing or invalid deck data.' }, { status: 400 });
	}

    const deck = await prisma.deck.create({
		data: {
			name,
			userId: user.id,
			cards: {
				create: cards.map(card => ({
					cardName: card.cardName,
					imageUrl: card.imageUrl
				}))
			}
		}
	});

	return json({ success: true, deckId: deck.id });
}