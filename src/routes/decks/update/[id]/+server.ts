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

        await prisma.deckCard.deleteMany({ where: { deckId } });

        const commanderRecord = await prisma.deckCard.create({
            data: {
                deckId,
                cardName: commander.cardName,
                image_uris: commander.image_uris,
                typeLine: commander.typeLine,
                cmc: commander.cmc,
                colors: commander.colors,
                colorIdentity: commander.colorIdentity
            }
        });

        if(cards.length > 0 ) {
            await prisma.deckCard.createMany({
                data: cards.map((card) => ({
                deckId,
                cardName: card.cardName,
                image_uris: card.image_uris,
                typeLine: card.typeLine,
                cmc: card.cmc,
                colors: card.colors,
                colorIdentity: card.colorIdentity,
                quantity: card.quantity
                }))
            })
        }

        await prisma.deck.update({
            where: { id: deckId },
            data: { 
                name,
                commanderId: commanderRecord.id
             }
        });
    
    return json({ success: true, deckId });
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};