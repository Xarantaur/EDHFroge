import { MAIN_TYPES } from "$lib/domain/domainCardTypes";
import type { DeckCard } from "$lib/types/cards";

export function groupCardsByType(cards: DeckCard[]): Record<string, DeckCard[]> {
    const group: Record<string, DeckCard[]> = {};
    
    for(const card of cards) {
        if(!card.typeLine) continue;

        const isCreature = card.typeLine.includes("Creature");
        const primaryType = isCreature ? "Creature" : MAIN_TYPES.find(type => card.typeLine!.includes(type));

        if(!primaryType) continue;

        if(!group[primaryType]) group[primaryType] = [];
        group[primaryType].push(card);
    }
    
    return group;
}