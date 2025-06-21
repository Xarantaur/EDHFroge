import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, redirect } from "@sveltejs/kit";
import { transformToParsedDeckCardFromDb } from '$lib/utils/transformToParsedDeckCardFromDb';
import { addPricesToCards } from '$lib/utils/addPrice';
import { getDeckWithCommander } from '$lib/server/prisma/deckRepo';

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) throw redirect(303, '/user/login');
    
    const deck = await getDeckWithCommander(params.id)

    if(!deck || deck.userId !== locals.user.id ) {
        throw error(404, 'Deck not Found')
    }

    const commander = deck.commanderEntry?.card ? transformToParsedDeckCardFromDb(deck.commanderEntry.card) : null

    const regularCards2 = await addPricesToCards(
        deck.cards.filter((card) => card.id !== commander?.id)
        .map(transformToParsedDeckCardFromDb)
    )
    
    return { deck: {
        ...deck,
        cards: regularCards2,
        commander
    } }
}