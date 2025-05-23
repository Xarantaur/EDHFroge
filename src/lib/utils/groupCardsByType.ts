import { MAIN_TYPES } from "$lib/domain/domainCardTypes";
import type { DeckCard } from "$lib/types/cards";

export function groupCardsByType(cards: DeckCard[]): Record<string, DeckCard[]> {
    return MAIN_TYPES.reduce((acc, type) => {
        const matches = cards.filter(card => card.type_line.includes(type));
        if(matches.length > 0 ) acc[type] = matches;
        return acc;
    }, {} as Record<string, DeckCard[]>)
}