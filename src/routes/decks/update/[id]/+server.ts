import type { RequestHandler } from "./$types";
import { prisma } from '$lib/utils/prisma'
import { json, redirect } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request, params, locals }) => {
    const user = locals.user;
    const deckId = params.id;

    if(!user) {
        throw redirect( 303, '/login')
    }

    const { name, cards, commander } = await request.json();

    if(!name || !Array.isArray(cards) || !commander) {
        return json({ error: 'Missing or invalid deck data.' }, { status: 400 })
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const incomingIds = new Set(cards.map((c) => c.id));
            const commanderId = commander.id


            await tx.deckCard.deleteMany({
                where: {
                    deckId,
                    id: {
                        notIn: [...incomingIds, commanderId]
                    }
                }
            });

            const commanderRecord = await tx.deckCard.upsert({
                where: { id: commander.id ?? ''},
                update: {
                    cardName: commander.cardName,
                    image_uris: {
                        normal: commander.image_uris?.normal,
                        small: commander.image_uris?.small,
                        art_crop: commander.image_uris?.art_crop
                    },
                    typeLine: commander.typeLine,
                    cmc: commander.cmc,
                    colors: commander.colors,
                    colorIdentity: commander.colorIdentity
                },
                create: {
                    deckId,
                   cardName: commander.cardName,
                    image_uris: {
                        normal: commander.image_uris?.normal,
                        small: commander.image_uris?.small,
                        art_crop: commander.image_uris?.art_crop
                    },
                    typeLine: commander.typeLine,
                    cmc: commander.cmc,
                    colors: commander.colors,
                    colorIdentity: commander.colorIdentity
                }
            });


            await Promise.all(
                cards.map((card) =>
					tx.deckCard.upsert({
						where: { id: card.id ?? '' },
						update: {
							cardName: card.cardName,
							image_uris: card.image_uris,
							typeLine: card.typeLine,
							cmc: card.cmc,
							colors: card.colors,
							colorIdentity: card.colorIdentity
						},
						create: {
							deckId,
							cardName: card.cardName,
							image_uris: card.image_uris,
							typeLine: card.typeLine,
							cmc: card.cmc,
							colors: card.colors,
							colorIdentity: card.colorIdentity
						}
					})
				)
			);

        await tx.deck.update({
            where: { id: deckId },
            data: { 
                name,
                commanderId: commanderRecord.id
             }
        });

        return deckId;
    },
    {
		maxWait: 10000,
		timeout: 10000
	});
    
    return json({ success: true, deckId: result});
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};