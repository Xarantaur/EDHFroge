import { toastStore } from "$lib/stores/toast";
import type { DeckCard } from "$lib/types/cards";

export function totalCardCount(deck: DeckCard[], commander: DeckCard | null): number {
    const aggregatedDeckSize = deck.length + (commander ? 1 : 0);
	
	if(aggregatedDeckSize > 100 ) {
		toastStore.error(`Deck too Large: ${aggregatedDeckSize} cards (max 100 including commander)`)
	}
    return aggregatedDeckSize
}
