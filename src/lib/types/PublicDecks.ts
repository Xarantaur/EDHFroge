import type { Deck as PrismaDeck } from '@prisma/client'

export type PublicDeck = Omit<PrismaDeck, 'userId'> & {
    commander: {
        cardName: string;
        images: {
            imageType: string;
            uri: string;
        }[];
        colorIdentity: {
            color: string;
        }[]
    } | null;
    cards: {
        id: string;
        cardName: string;
        typeLine: string;
        cmc: number;
        quantity: number;
    }[]
}