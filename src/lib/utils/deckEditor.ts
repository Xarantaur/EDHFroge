import { BASIC_LAND_TYPES } from "$lib/domain/domainCardTypes";
import type { DeckCard } from "$lib/types/cards";


export function removeCardFromDeck(deck: DeckCard[], cardToRemove: DeckCard): DeckCard[] {
    return deck.flatMap(card => {
        if (card.cardName !== cardToRemove.cardName) return [card];

        if(BASIC_LAND_TYPES.includes(card.cardName) && card.quantity && card.quantity > 1 ) {
            return [{ ...card, quantity: card.quantity - 1}]
        }

        return []
    })
}

export function addCardToDeck(deck: DeckCard[], newCard: DeckCard): DeckCard[] {
    if (BASIC_LAND_TYPES.includes(newCard.cardName)) {
        const existing = deck.find(card => card.cardName === newCard.cardName);
        if(existing) {
            return deck.map(card => 
                card.cardName === newCard.cardName ? {...card, quantity: (card.quantity ?? 1) + 1} : card
            );
        }
        return [...deck, {...newCard, quantity: 1}]
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
    commander: DeckCard;
    deck: DeckCard[];
    url: string;
}): Promise<{ success: boolean; error?: string}> {
    if(!commander) Promise.resolve({ success: false, error: 'Commander is required'});
    if (!name || name.trim().length < 1 ) Promise.resolve({ success: false, error: 'Deck must have a name'});

    try {
        const response = await fetch(url, {
            method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
                ...(deckId ? { id: deckId } : {}),
                name,
                commander: {
                    id: commander.id,
                    cardName: commander.cardName,
                    image_uris: {
						normal: commander.image_uris?.normal,
						small: commander.image_uris?.small,
						art_crop: commander.image_uris?.art_crop,
                },  
                    typeLine: commander?.typeLine,
                    cmc: commander?.cmc,
                    colors: commander?.colors,
                    colorIdentity: commander?.colorIdentity
            },
            cards: deck.map(card => ({
                id: card.id,
                cardName: card.cardName,
                quantity: card.quantity ?? 1,
                image_uris: card.image_uris,
                typeLine: card.typeLine,
                cmc: card.cmc,
                colorIdentity: card.colorIdentity
            }))
        })
    });
    
    if(!response.ok){
        const errorText = await response.text();
    return { success: false, error: errorText };
}
    return { success: true }
} catch (error) {
    console.error('Deck Save Error', error)
    return { success: false, error: 'Network or server error'}
}
}
