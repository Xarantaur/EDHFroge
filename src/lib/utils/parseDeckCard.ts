import type { DeckCard } from "$lib/types/cards";

export function parseDeckCard(raw: any): DeckCard {
    const face = raw.image_uris ? raw : raw.card_faces?.[0];
    const back = raw.card_faces?.[1]
    

    return {
        id: raw.id,
        deckId: raw.deckId,
        cardName: raw.name,
        image_uris: {
            normal: face?.image_uris?.normal ?? '',
            art_crop: face?.image_uris?.art_crop ?? '',
            backside: back?.image_uris ?? '' ? {
                 normal: back.image_uris.normal ?? '',
                 art_crop: back.image_uris.art_crop ?? ''
            }: null,
        },
        typeLine: face?.type_line ?? raw.type_line,
        colorIdentity: raw.color_identity ?? [],
        colors: raw.colors ?? [],
        cmc: raw.cmc ?? 0,
        
        
    };
}