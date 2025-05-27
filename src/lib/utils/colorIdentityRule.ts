import type { DeckCard } from "$lib/types/cards";

export function isCardLegal(card:DeckCard, identity: string[]): boolean {
    return card.color_identity.every((color) => identity.includes(color))
}