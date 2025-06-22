import { prisma } from '$lib/server/prisma'
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
import * as deckRepo from '$lib/server/prisma/deckRepo'
import * as deckCardRepo from '$lib/server/prisma/deckCardRepo'
import * as deckCommanderRepo from  '$lib/server/prisma/deckCommanderRepo'


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
    console.time('promise all')
    const deck = await deckRepo.createDeck(userId, name)

    const commanderCard = await deckCardRepo.setCommander(deck.id, commander);

        await Promise.all(cards.map(card => deckCardRepo.createDeckCard(deck.id, card)));

        await deckCommanderRepo.createDeckCommanderLink(deck.id, commanderCard.id)
    console.timeEnd('promise all')
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
        
            await deckCardRepo.updateCardQuantity(cards)
            await deckCardRepo.deleteRemovedCards(deckId, idsToKeep)
            
            let commanderRecord = await deckCardRepo.findCommanderByDeckAndName(deckId, commander.cardName)
            
            if(!commanderRecord){
                commanderRecord = await deckCardRepo.setCommander(deckId, commander)
            }
                
            if(!commanderRecord) {
                 throw new Error('Commander not found')
            }
    
           await Promise.all(cards.map(card => deckCardRepo.createDeckCard(deckId, card)));
    
            await deckRepo.updateDeckName(deckId, name)
    
           const existingCommander = await deckCommanderRepo.findExistingCommanderByDeckId(deckId)
    
        
            if (existingCommander) {
                await deckCommanderRepo.updateDeckCommander(existingCommander.id, commanderRecord.id )
            } else {
                await prisma.deckCommander.create({
                    data: {
                        deckId,
                        deckCardId: commanderRecord.id
                    }
                });
    }
}

export async function deleteDeck(deckId: string) {
    return deckRepo.DeleteDeck(deckId)
}