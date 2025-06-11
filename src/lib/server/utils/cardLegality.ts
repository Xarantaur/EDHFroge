import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";
import { bannedCards } from "$lib/domain/banList";
import { BASIC_LAND_TYPES } from "$lib/domain/domainCardTypes";
import { toastStore } from "$lib/stores/toast";
export let commander: ParsedDeckCard 

 function isCardBanned(card: ParsedDeckCard): boolean {
    return bannedCards.includes(card.card.cardName);
} 

 function respectsColorIdentity(card: ParsedDeckCard, identity: string[]): boolean {
    const cardColors = card.colorIdentity.map((c) => c.color)
    return cardColors.every((color) => identity.includes(color));
}

export function passingSingletonRule(deck: ParsedDeckCard[], newCard: ParsedDeckCard, commander:ParsedDeckCard | null): boolean {
    const name = newCard.card.cardName;
    
    if(BASIC_LAND_TYPES.includes(name)) {
        return true;
    }

    if(commander && name === commander?.card.cardName) {
        toastStore.error("Card is your Commander")
        return false;
    }
    
    if(deck.some((card) => card.card.cardName === name)) {
        toastStore.error("Card is already in deck")
        return false
    }
    
    return true;
}

export function getCardLegalityReason(card: ParsedDeckCard, commander?: ParsedDeckCard): 'banned' | 'color-identity' | 'legal' {
    if(!commander) return 'legal';
    if(isCardBanned(card)) return 'banned';

    const commanderIdentity = commander.colorIdentity.map((c) => c.color)

    if (!respectsColorIdentity(card, commanderIdentity)) return 'color-identity';
    return 'legal'
}

export function getLegalityClass(card: ParsedDeckCard, commander?: ParsedDeckCard): string {
   const reason = getCardLegalityReason(card, commander);

   switch (reason) {
    case 'banned':
    case 'color-identity':
        return 'text-red-500 line-through opacity-80 italic'
    default:
        return 'text-gray-800'    
   }
} 

export function getLegalityMessage(card: ParsedDeckCard, commander?: ParsedDeckCard): string | null {
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
