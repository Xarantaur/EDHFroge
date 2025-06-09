import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";

export function transformToParsedDeckCardFromDb(raw: any): ParsedDeckCard {
    return {
        card: {
			id: raw.id,
			deckId: raw.deckId,
			cardName: raw.cardName,
			typeLine: raw.typeLine,
			cmc: raw.cmc ?? 0,
			quantity: raw.quantity ?? 1
		},
		images: raw.images ?? [],
		colors: raw.colors ?? [],
		colorIdentity: raw.colorIdentity ?? []
	};
}