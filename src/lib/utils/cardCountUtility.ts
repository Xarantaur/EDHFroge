import { toastStore } from "$lib/stores/toast";
import type { DeckCard } from "$lib/types/cards";

export function totalCardCount(deck: DeckCard[], commander: DeckCard | null): number {
	const total = deck.reduce((acc, card) => {
			const qty = card.quantity ?? 1;
			return acc + qty;
	}, commander ? 1 : 0)

	if(total > 100) {
		toastStore.error(`Deck too Large: ${total} cards (max 100 including commander)`)
	}

	return total;
}
