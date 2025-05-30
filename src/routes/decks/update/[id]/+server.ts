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
            await tx.deckCard.deleteMany({
                where: { deckId: deckId,
                    id: { not: commander.id }
                 }
            });

            await tx.deckCard.update({
                where: { id: commander.id },
                data: {
                    cardName: commander.cardName,
                    image_uris: {
                        normal: commander.image_uris?.normal,
                        art_crop: commander.image_uris?.art_crop
                    },
                    typeLine: commander.typeLine,
                    cmc: commander.cmc,
                    colors: commander.colors,
                    colorIdentity: commander.colorIdentity
                }
            })

            await Promise.all(cards.map(card => {
                return tx.deckCard.upsert({
                where: { id: card.id ?? '' },
                update: {
                    cardName: card.cardName,
                    image_uris: {
                        normal: card.image_uris?.normal,
                        art_crop: card.image_uris?.art_crop
                    },
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
            });
            
        }));

        await tx.deck.update({
            where: { id: deckId },
            data: { name }
        });

        return deckId;
    });
    
    return json({ success: true, deckId: result});
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};