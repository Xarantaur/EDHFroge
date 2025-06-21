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

export async function updateDeck({
    deckId,
    name,
    cards,
    commander
}: {
    deckId: string;
    name: string;
    cards: ParsedDeckCard[];
    commander: ParsedDeckCard;
}) {
        const idsToKeep = cards.filter(card => card.deckId !== undefined).map(card => card.id).filter((id): id is string => typeof id === 'string');
        const newCards = cards.filter(card => card.deckId === undefined)
        
            await updateCardQuantity(cards)
            await deleteRemovedCards(deckId, idsToKeep)
            
            let commanderRecord = await findCommanderByDeckAndName(deckId, commander.cardName)
            
            if(!commanderRecord){
                commanderRecord = await setCommander(deckId, commander)
            }
                
            if(!commanderRecord) {
                 throw new Error('Commander not found')
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
}