import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";
import { getCardPrice } from "../api/scryfall";

export async function withPrice<T extends {cardName: string}>(card: T ): Promise<T & {price: string | null}> {
    try {
        const priceData = await getCardPrice(card.cardName);
        return {
            ...card,
            price: priceData.eur ?? null
        };
    } catch {
        return {
            ...card,
            price: null
        };
    }
}

export async function addPricesToCards(cards: ParsedDeckCard[]): Promise<ParsedDeckCard[]> {
	return Promise.all(cards.map(withPrice));
}