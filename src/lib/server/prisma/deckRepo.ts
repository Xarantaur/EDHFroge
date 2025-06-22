import { prisma } from '$lib/server/prisma'
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
import type { DeckCardImage } from '@prisma/client'
import { deckCardSelect } from '$lib/server/prisma/selects';


export async function createDeck(userId: string, name: string) {
    return prisma.deck.create({
        data: { name, userId }
    });
}

export async function updateDeckName(deckId: string, name: string) {
    return prisma.deck.update({
        where: {id: deckId },
        data: { name }
    })
}


export async function getDeckWithCommander(deckId: string) {
    return await prisma.deck.findUnique({
            where: {
                id: deckId,
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
}


export async function getDecksByUser(userId: string) {
    return prisma.deck.findMany({
		where: { userId },
		include: { commanderEntry: {
			include: {
				card: {
					include: {
						images: true,
						colors: true,
						colorIdentity: true
					}
				}
			}
		} },
		orderBy: { createdAt: 'desc' }
	});
}

export async function DeleteDeck(deckId:string ) {
   return prisma.deck.delete({
		where: { id: deckId }
	});
}