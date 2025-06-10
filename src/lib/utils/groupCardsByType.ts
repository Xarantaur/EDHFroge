import { BASIC_LAND_TYPES, MAIN_TYPES } from "$lib/domain/domainCardTypes";
import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";

export function groupCardsByType(cards: ParsedDeckCard[]): Record<string, ParsedDeckCard[]> {
	const grouped: Record<string, ParsedDeckCard[]> = {};

	for (const card of cards) {
		const primaryType = getPrimaryCardType(card.card.typeLine);
		if (!primaryType) continue;

		if (!grouped[primaryType]) {
			grouped[primaryType] = [];
		}

	
		if (isBasicLand(card)) {
			mergeBasicLandCard(grouped[primaryType], card);
		} else {
			grouped[primaryType].push(card);
		}
	}
	return grouped;
}


function getPrimaryCardType(typeLine: string): string | undefined {
	if (!typeLine) return undefined;
	if (typeLine.includes("Creature")) return "Creature";
	return MAIN_TYPES.find(type => typeLine.includes(type));
}

function isBasicLand(card: ParsedDeckCard): boolean {
	return BASIC_LAND_TYPES.includes(card.card.cardName);
}

function mergeBasicLandCard(group: ParsedDeckCard[], card: ParsedDeckCard): void {
	const existing = group.find(c => c.card.cardName === card.card.cardName);
	if (existing) {
		existing.card.quantity = (existing.card.quantity ?? 1) + (card.card.quantity ?? 1);
	} else {
		group.push({
			...card,
			card: {
				...card.card,
				quantity: card.card.quantity ?? 1
			}
		});
	}
}
