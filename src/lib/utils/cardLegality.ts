import type { DeckCard } from "$lib/types/cards";
import { bannedCards } from "$lib/domain/banList";
import { BASIC_LAND_TYPES } from "$lib/domain/domainCardTypes";
import { toastStore } from "$lib/stores/toast";
export let commander: DeckCard 

 function isCardBanned(card: DeckCard): boolean {
    return bannedCards.includes(card.cardName);
} 

 function respectsColorIdentity(card: DeckCard, identity: string[]): boolean {
    return card.colorIdentity.every((color) => identity.includes(color));
}

export function passingSingletonRule(deck: DeckCard[], newCard: DeckCard, commander:DeckCard | null): boolean {
    const name = newCard.cardName;
    
    if(BASIC_LAND_TYPES.includes(name)) {
        return true;
    }

    if(name === commander?.cardName) {
        toastStore.error("Card is your Commander")
        return false;
    }
    
    if(deck.some((card) => card.cardName === name)) {
        toastStore.error("Card is already in deck")
        return false
    }
    
    return true;
}

export function getCardLegalityReason(card: DeckCard, commander?: DeckCard): 'banned' | 'color-identity' | 'legal' {
    if(!commander) return 'legal';
    if(isCardBanned(card)) return 'banned';
    if (!respectsColorIdentity(card, commander.colorIdentity)) return 'color-identity';
    return 'legal'
}

export function getLegalityClass(card: DeckCard, commander?: DeckCard): string {
   const reason = getCardLegalityReason(card, commander);

   switch (reason) {
    case 'banned':
    case 'color-identity':
        return 'text-red-500 line-through opacity-80 italic'
    default:
        return 'text-gray-800'    
   }
} 

export function getLegalityMessage(card: DeckCard, commander?: DeckCard): string | null {
    const reason = getCardLegalityReason(card, commander)

    switch (reason) {
        case 'banned':
            return 'Banned in Commander'

        case 'color-identity':
            return 'Color Identity Violation'

        default:
             return null;
    }
}
