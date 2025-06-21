import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, redirect } from "@sveltejs/kit";
import { transformToParsedDeckCardFromDb } from '$lib/utils/transformToParsedDeckCardFromDb';
import { addPricesToCards } from '$lib/utils/addPrice';
import { deckCardSelect } from '$lib/server/prisma/selects';

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) throw redirect(303, '/user/login');
    
    const deck = await prisma.deck.findUnique({
        where: {
            id: params.id,
        },
        include: { 
            cards: {
                select: deckCardSelect
            },
            commanderEntry: {
                include: {
                    card: { 
                        select: deckCardSelect
                        }
                    }
             }
        }
    });

    if(!deck || deck.userId !== locals.user.id ) {
        throw error(404, 'Deck not Found')
    }

    const commander = deck.commanderEntry?.card ? transformToParsedDeckCardFromDb(deck.commanderEntry.card) : null
   /*  console.time('hele agten, transformering + fetch')
    const regularCards = deck.cards.filter((card) => card.id !== commander?.id).map(transformToParsedDeckCardFromDb)
    
    const cardNames = regularCards.map(card => card.cardName)
    console.time('getCardPricesBatch')
    const priceMap = await getCardPricesBatch(cardNames);
    console.timeEnd('getCardPricesBatch')
    const cardsWithPrices = regularCards.map(card => ({
        ...card, 
        price: priceMap[card.cardName] ?? null
    }))
    console.timeEnd('hele agten, transformering + fetch') */

    console.time('addpricestocards')
    const regularCards2 = await addPricesToCards(
        deck.cards.filter((card) => card.id !== commander?.id)
        .map(transformToParsedDeckCardFromDb)
    )
    console.timeEnd('addpricestocards')

    console.log({
         deck: {
        ...deck,
        cards: regularCards2,
        commander
    }
    })

    return { deck: {
        ...deck,
        cards: regularCards2,
        commander
    } }
}