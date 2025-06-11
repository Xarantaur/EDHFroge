import { BASIC_LAND_TYPES } from "$lib/domain/domainCardTypes";
import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";


export function removeCardFromDeck(deck: ParsedDeckCard[], cardToRemove: ParsedDeckCard): ParsedDeckCard[] {
    return deck.flatMap(card => {
        if (card.card.cardName !== cardToRemove.card.cardName) return [card];

        if(BASIC_LAND_TYPES.includes(card.card.cardName) && card.card.quantity && card.card.quantity > 1 ) {
            return [{ ...card, card: { ...card.card, quantity: card.card.quantity - 1} }]
        }

        return []
    })
}

export function addCardToDeck(deck: ParsedDeckCard[], newCard: ParsedDeckCard): ParsedDeckCard[] {
    if (BASIC_LAND_TYPES.includes(newCard.card.cardName)) {
        const existing = deck.find(card => card.card.cardName === newCard.card.cardName);
        if(existing) {
            return deck.map(card => 
                card.card.cardName === newCard.card.cardName ? {...card, card: {...card.card, quantity: (card.card.quantity ?? 1) + 1 } } : card
            );
        }
        return [...deck, {...newCard, card: {...newCard.card, quantity: 1}} ]
    }
    return [...deck, newCard]
}

export async function saveDeckToServer({
    deckId,
    name,
    commander,
    deck,
    url
}:{
    deckId?: string;
    name: string;
    commander: ParsedDeckCard;
    deck: ParsedDeckCard[];
    url: string;
}): Promise<{ success: true; deckId: string } | { success: false; error?: string }> {
    if(!commander) return Promise.resolve({ success: false, error: 'Commander is required'});
    if (!name || name.trim().length < 1 ) return Promise.resolve({ success: false, error: 'Deck must have a name'});

    try {
        const response = await fetch(url, {
            method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                ...(deckId ? { id: deckId } : {}),
                name,
                commander: {
                    card: {
                        ...commander.card,
                        typeLine: commander.card.typeLine
                    },
                    images: commander.images,
                    colors: commander.colors,
                    colorIdentity: commander.colorIdentity,
                }, 
                    cards: deck.map(card => ({
                        card: {
                            ...card.card,
                            typeLine: card.card.typeLine
                        },
                        images: card.images,
                        colors: card.colors,
                        colorIdentity: card.colorIdentity,
            }))
        }),
    })
        
    const result = await response.json();
        
    if(!response.ok || !result.success ){
        const errorText = await response.text();
    return { success: false, error: errorText };
}
    if(result.deckId){
        return { success: true, deckId: result.deckId}
    }

    return { success: true, deckId: deckId ?? '' }
} catch (error) {
    console.error('Deck Save Error', error)
    return { success: false, error: 'Network or server error'}
}
}
