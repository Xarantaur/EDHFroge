import type { Deck as PrismaDeck } from '@prisma/client'

export type PublicDeck = Omit<PrismaDeck, 'userId'> & {
    commander: {
        cardName: string;
        image_uris: {
            normal: string;
            art_crop: string;
        };
        colorIdentity: string[]
    } | null;
}