import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'
import { error, redirect } from "@sveltejs/kit";
import { transformToParsedDeckCardFromDb } from '$lib/utils/transformToParsedDeckCardFromDb';
import { addPricesToCards, withPrice } from '$lib/utils/addPrice';

export const load: PageServerLoad = async ({ params, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    
    const deck = await prisma.deck.findUnique({
        where: {
            id: params.id,
        },
        include: { 
            cards: {
                select: {
                    id: true,
                    cardName: true,
                    typeLine: true,
                    cmc: true,
                    quantity: true,
                    images: {
                        select: {
                            imageType: true,
                            uri: true
                        }
                    },
                    colors: {
                        select: { color: true}
                    },
                    colorIdentity: { 
                        select: { color: true } 
                    }
                }
            },
            commanderEntry: {
                include: {
                    card: { 
                        select: {
                           id: true,
							cardName: true,
							typeLine: true,
							cmc: true,
							quantity: true,
							images: {
								select: {
									imageType: true,
									uri: true
								}
							},
                                colorIdentity: {
                                         select: {
                                             color: true
                                                }
                                           }
                                       }
                                  }
                            }
                         }
                    }
                });

    if(!deck || deck.userId !== locals.user.id ) {
        throw error(404, 'Deck not Found')
    }
    
    const commander = deck.commanderEntry?.card ? transformToParsedDeckCardFromDb(deck.commanderEntry.card) : null
    const regularCards = await addPricesToCards(
        deck.cards
            .filter((card) => card.id !== commander?.card.id)
            .map(transformToParsedDeckCardFromDb)
    )
       
    return { deck: {
        ...deck,
        cards: regularCards,
        commander
    } }
}