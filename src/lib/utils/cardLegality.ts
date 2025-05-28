import type { DeckCard } from "$lib/types/cards";
import { bannedCards } from "$lib/domain/banList";
export let commander: DeckCard 

 function isCardBanned(card: DeckCard): boolean {
    return bannedCards.includes(card.name);
} 

 function respectsColorIdentity(card: DeckCard, identity: string[]): boolean {
    return card.color_identity.every((color) => identity.includes(color));
}

export function getLegalityClass(card: DeckCard, commander?:DeckCard): string {
    if(isCardBanned(card)) return 'text-red-500 line-through opacity-80 italic';
    if(commander && !respectsColorIdentity(card, commander.color_identity)) {
        return 'text-red-500 line-through opacity-80 italic'
    }
    return 'text-gray-800'
} 