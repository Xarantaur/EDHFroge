import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';
import { json, redirect } from '@sveltejs/kit';
import type { DeckCardImage } from '$lib/types/DeckCardImage';

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

		const deck = await prisma.deck.create({
			data: {
				name,
				userId: user.id
			}
		});

		const commanderCard = await prisma.deckCard.create({
			data: {
				deckId: deck.id,
				cardName: commander.card.cardName,
				typeLine: commander.card.typeLine,
				cmc: commander.card.cmc,
				 images: {
					createMany: {
						data: commander.images.map((img: Omit<DeckCardImage, 'id'>) => ({
							imageType: img.imageType,
							uri: img.uri
						}))
					}
				},
				colors: {
					createMany: {
						data: commander.colors
					}
				},
				colorIdentity: {
					createMany: {
						data: commander.colorIdentity
					}
				}
			},
			include: {
				images: true
			}
		});

		if (cards.length > 0) {
			for (const card of cards) {
				await prisma.deckCard.create({
					data: {
						deckId: deck.id,
						cardName: card.card.cardName,
						typeLine: card.card.typeLine,
						cmc: card.card.cmc,
						quantity: card.card.quantity ?? 1,
						images: {
							createMany: {
								data: card.images.map((img: Omit<DeckCardImage, 'id'>) => ({
									imageType: img.imageType,
									uri: img.uri
								}))
							}
						},
						colors: {
							createMany: {
								data: card.colors
							}
						},
						colorIdentity: {
							createMany: {
								data: card.colorIdentity
							}
						}
					}
				});
			}
		}

			await prisma.deckCommander.create({
					data: {
						deckId: deck.id,
						deckCardId: commanderCard.id
				}
});
		return json({ success: true, deckId: deck.id  });
	} catch (error) {
		return json({ error: 'Failed to save deck.' }, { status: 500})
	}
};