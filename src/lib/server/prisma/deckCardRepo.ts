import { prisma } from '$lib/server/prisma'
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard'
import type { DeckCardImage } from '$lib/types/DeckCardImage'

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

export async function findCommanderByDeckAndName(deckId: string, cardName: string){
    return await prisma.deckCard.findFirst({
        where: {
                     deckId,
                        cardName
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

export async function deleteRemovedCards(deckId: string, cardIdsToKeep: string[]) {
    await prisma.deckCard.deleteMany({
        where: { deckId, id: { notIn: cardIdsToKeep }}
    });
}


            