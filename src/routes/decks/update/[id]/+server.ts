import type { RequestHandler } from "./$types";
import { prisma } from '$lib/server/prisma'
import { json, redirect } from "@sveltejs/kit"
import { createDeckCard, deleteRemovedCards, findCommanderByDeckAndName, setCommander, updateCardQuantity, updateDeckName } from "$lib/server/prisma/deckRepo";

export const POST: RequestHandler = async ({ request, params, locals }) => {
    const user = locals.user;
    const deckId = params.id;

    if(!user) {
        throw redirect( 303, '/user/login')
    }

    const { name, cards, commander } = await request.json();

    if(!name || !Array.isArray(cards) || !commander) {
        return json({ error: 'Missing or invalid deck data.' }, { status: 400 })
    }

	const idsToKeep = cards.filter(card => card.deckId !== undefined).map(card => card.id);
	const newCards = cards.filter(card => card.deckId === undefined)
    try {

		await updateCardQuantity(cards)
		await deleteRemovedCards(deckId, idsToKeep)
		
		let commanderRecord = await findCommanderByDeckAndName(deckId, commander.cardName)
		
		if(!commanderRecord){
			commanderRecord = await setCommander(deckId, commander)
		}
			
		if(!commanderRecord) {
			return json({ error: 'Commander not found'}, { status: 400 })
		}

       for (const card of newCards) {
			await createDeckCard(deckId, card)
		}

        await updateDeckName(deckId, name)

       const existingCommander = await prisma.deckCommander.findUnique({
			where: { deckId }
		});

		if (existingCommander) {
			await prisma.deckCommander.update({
				where: { id: existingCommander.id },
				data: { deckCardId: commanderRecord.id }
			});
		} else {
			await prisma.deckCommander.create({
				data: {
					deckId,
					deckCardId: commanderRecord.id
				}
			});
		}

    return json({ success: true, deckId });
    } catch (error) {
        console.error('Deck Update failed:', error);
        return json({ error: 'Internal server Error'}, { status: 500 })
    }
};