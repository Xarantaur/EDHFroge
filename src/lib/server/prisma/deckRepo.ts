import { prisma } from '$lib/server/prisma'
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
import type { DeckCardImage } from '@prisma/client'
import { deckCardSelect } from './selects';

export async function deleteRemovedCards(deckId: string, cardIdsToKeep: string[]) {
    await prisma.deckCard.deleteMany({
        where: { deckId, id: { notIn: cardIdsToKeep }}
    });
}

export async function createDeckCard(deckId: string, card: ParsedDeckCard) {
    return prisma.deckCard.create({
        data: {
                deckId,
                cardName: card.cardName,
                typeLine: card.typeLine,
                cmc: card.cmc,
                quantity: card.quantity ?? 1,
                images: {
                createMany: {
                    data: card.images.map((img: Omit<DeckCardImage, 'id' | 'deckCardId'>) => ({
                    imageType: img.imageType,
                    uri: img.uri
                    }))
                }
                },
                colorIdentity: {
                createMany: {
                    data: card.colorIdentity
                            }
                        }
                    }
                })
            }

export async function updateDeckName(deckId: string, name: string) {
    return prisma.deck.update({
        where: {id: deckId },
        data: { name }
    })
}

export async function findCommanderByDeckAndName(deckId: string, cardName: string){
    return await prisma.deckCard.findFirst({
        where: {
            deckId,
            cardName
        }
    });
}

export async function setCommander(deckId: string, commander:ParsedDeckCard ) {
    return await prisma.deckCard.create({
				data: {
					deckId,
					cardName: commander.cardName,
					typeLine: commander.typeLine,
					cmc: commander.cmc,
					images: {
						createMany: {
							data: commander.images.map((img: Omit<DeckCardImage, 'id' | 'deckCardId'>) => ({
								imageType: img.imageType,
								uri: img.uri
							}))
						}
					},
					colorIdentity: {
						createMany: {
							data: commander.colorIdentity
						}
					}
				}
			});
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

export async function updateCardQuantity(cards: ParsedDeckCard[]) {
    const updateCards = cards.filter(card => card.deckId !== undefined && card.quantity !== undefined);

    for (const card of updateCards) {
        await prisma.deckCard.update({
            where: { id: card.id },
            data: {
                quantity: card.quantity
            }
        });
    }
}


export async function saveNewDeck({
    userId,
    name,
    commander,
    cards
}: {
    userId: string,
    name: string,
    commander: ParsedDeckCard;
    cards: ParsedDeckCard[]
}) {
    const deck = await prisma.deck.create({
			data: {
				name,
				userId
			}
		});

        const commanderCard = await setCommander(deck.id, commander);
        for (const card of cards) {
            await createDeckCard(deck.id, card);

        }

        await prisma.deckCommander.create({
            data: {
                deckId: deck.id,
                deckCardId: commanderCard.id
            }
        })

        return deck
}