import { BASIC_LAND_TYPES } from "$lib/domain/domainCardTypes";
import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";


export function removeCardFromDeck(deck: ParsedDeckCard[], cardToRemove: ParsedDeckCard): ParsedDeckCard[] {
    return deck.flatMap(card => {
        const isSameCard = card.cardName === cardToRemove.cardName;
        const isBasicLand = BASIC_LAND_TYPES.includes(card.cardName)

        if(!isSameCard) return [card];

        if (isBasicLand && card.quantity > 1) {
            return [{ ...card, quantity: card.quantity - 1}]
        }

        return []
    })
}

export function addCardToDeck(deck: ParsedDeckCard[], newCard: ParsedDeckCard): ParsedDeckCard[] {
    const isBasicLand = BASIC_LAND_TYPES.includes(newCard.cardName);
    const existingCard = deck.find(card => card.cardName === newCard.cardName)

    if( isBasicLand && existingCard) {
        return deck.map(card => 
            card.cardName === newCard.cardName
            ? {...card, quantity: (card.quantity ?? 1) + 1}
            : card
            )
        }

        if(isBasicLand){
            return [...deck, { ...newCard, quantity: 1 }]
        }

        return [...deck, newCard]
}
