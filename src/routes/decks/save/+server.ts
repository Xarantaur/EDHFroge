import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';
import { json, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;

	if (!user) {
		throw redirect(303, '/login');
	}

     const { name, cards, commander } = await request.json();

     if (!name || !Array.isArray(cards) || cards.length === 0 || !commander) {
		return json({ error: 'Missing or invalid deck data.' }, { status: 400 });
	}
	
	try {
		const result = await prisma.$transaction(async (tx) => {
			const deck = await tx.deck.create({
				data: {
					name,
					userId: user.id,
				}
			});

			const commanderCard = await tx.deckCard.create({
				data: {
					deckId: deck.id,
					cardName: commander.cardName,
					 image_uris: {
						normal: commander.image_uris?.normal,
						art_crop: commander.image_uris?.art_crop,
					},
					typeLine: commander.typeLine,
					cmc: commander.cmc,
					colors: commander.colors,
					colorIdentity: commander.colorIdentity
				}
			});


			await tx.deckCard.createMany({
				data: cards.map(card => ({
					deckId: deck.id,
					cardName: card.cardName,
					 image_uris: {
						normal: card.image_uris?.normal,
						art_crop: card.image_uris?.art_crop
					},
					typeLine: card.typeLine,
					cmc: card.cmc,
					colors: card.colors,
					colorIdentity: card.colorIdentity
				}))
			});

			await tx.deck.update({
				where: { id: deck.id },
				data: { 
					commanderId: commanderCard.id
				}
			});

			return deck.id;
		});

		return json({ success: true, deckId: result });
	} catch (error) {
		console.error('Transaction failed:', error)
		return json({ error: 'Failed to save deck.' }, { status: 500})
	}
};