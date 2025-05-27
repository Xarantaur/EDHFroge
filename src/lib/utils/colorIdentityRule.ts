import type { DeckCard } from "$lib/types/cards";

export function isCardLegal(card:DeckCard, identity: string[]): boolean {
    return card.color_identity.every((color) => identity.includes(color))
}

export function getCardClassName(card: DeckCard, commander?: DeckCard): string {
    const isIllegal = commander && !isCardLegal(card, commander.color_identity);
    return isIllegal
        ? 'text-red-500 line-through opacity-80 italic'
        : 'text-gray-800'
}