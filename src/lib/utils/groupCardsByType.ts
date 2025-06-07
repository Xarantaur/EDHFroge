import { BASIC_LAND_TYPES, MAIN_TYPES } from "$lib/domain/domainCardTypes";
import type { DeckCard } from "$lib/types/cards";

export function groupCardsByType(cards: DeckCard[]): Record<string, DeckCard[]> {
    const group: Record<string, DeckCard[]> = {};
    
    for(const card of cards) {
        if(!card.typeLine) continue;

        const isCreature = card.typeLine.includes("Creature");
        const primaryType = isCreature ? "Creature" : MAIN_TYPES.find(type => card.typeLine!.includes(type));

        if(!primaryType) continue;

        if(!group[primaryType]) group[primaryType] = [];

        if(BASIC_LAND_TYPES.includes(card.cardName)) {
            const existing = group[primaryType].find((c) => c.cardName === card.cardName);
            if (existing) {
                existing.quantity = (existing.quantity ?? 1) + (card.quantity ?? 1)
            } else {
                group[primaryType].push({...card, quantity: card.quantity ?? 1})
            }
        } else {
            group[primaryType].push(card);
        }

    }
    
    return group;
}