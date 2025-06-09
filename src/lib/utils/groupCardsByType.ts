import { BASIC_LAND_TYPES, MAIN_TYPES } from "$lib/domain/domainCardTypes";
import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";

export function groupCardsByType(cards: ParsedDeckCard[]): Record<string, ParsedDeckCard[]> {
    const group: Record<string, ParsedDeckCard[]> = {};
    
    for(const card of cards) {
        if(!card.card.typeLine) continue;

        const isCreature = card.card.typeLine.includes("Creature");
        const primaryType = isCreature ? "Creature" : MAIN_TYPES.find(type => card.card.typeLine!.includes(type));

        if(!primaryType) continue;

        if(!group[primaryType]) group[primaryType] = [];

        if(BASIC_LAND_TYPES.includes(card.card.cardName)) {
            const existing = group[primaryType].find((c) => c.card.cardName === card.card.cardName);
            if (existing) {
                existing.card.quantity = (existing.card.quantity ?? 1) + (card.card.quantity ?? 1)
            } else {
                group[primaryType].push({...card, card: { ...card.card, quantity: card.card.quantity ?? 1 } })
            }
        } else {
            group[primaryType].push(card);
        }

    }
    
    return group;
}