import { getCardPrice } from "./scryfall";

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

export async function addPricesToCards(cards: { card: { cardName: string } }[]) {
	return Promise.all(cards.map(async (c) => {
		const price = await withPrice(c.card);
		return {
			...c,
			card: price
		};
	}));
}